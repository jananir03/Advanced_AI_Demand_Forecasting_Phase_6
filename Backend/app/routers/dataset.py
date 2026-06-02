from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

import pandas as pd

from app.config.database import get_db

from app.models.dataset import Dataset
from app.models.sales_record import SalesRecord
from app.models.user import User

from app.core.auth import get_current_user

from app.utils.preprocessing import (
    validate_dataset,
    clean_dataset
)

from app.services.notification_service import (
    create_notification
)

from app.services.activity_service import (
    create_activity
)

router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)


@router.post("/upload")
async def upload_dataset(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    if not file.filename.endswith(
        (".csv", ".xlsx")
    ):

        raise HTTPException(

            status_code=400,

            detail="Only CSV or Excel files allowed"
        )

    try:

        if file.filename.endswith(".csv"):

            df = pd.read_csv(file.file)

        else:

            df = pd.read_excel(file.file)

    except Exception:

        raise HTTPException(

            status_code=400,

            detail="Invalid file format"
        )

    missing_columns = validate_dataset(df)

    if missing_columns:

        raise HTTPException(

            status_code=400,

            detail=f"Missing columns: {missing_columns}"
        )

    df, missing_values, duplicates_removed = (
        clean_dataset(df)
    )

    dataset = Dataset(

        dataset_name=file.filename,

        original_filename=file.filename,

        total_records=len(df),

        missing_values=missing_values,

        duplicates_removed=duplicates_removed,

        user_id=current_user.id
    )

    db.add(dataset)

    db.commit()

    db.refresh(dataset)

    for _, row in df.iterrows():

        sales_record = SalesRecord(

            product_name=row["product"],

            category=row.get(
                "category",
                None
            ),

            region=row.get(
                "region",
                None
            ),

            sales_date=pd.to_datetime(
                row["date"]
            ),

            sales_amount=float(
                row["sales"]
            ),

            quantity=int(
                row["quantity"]
            ),

            dataset_id=dataset.id
        )

        db.add(sales_record)

    db.commit()

    create_activity(

        db=db,

        user_id=current_user.id,

        activity_type="Dataset Upload",

        description=f"{current_user.username} uploaded {file.filename}"
    )

    # -----------------------------------
    # Create Notification
    # -----------------------------------

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Dataset Uploaded",

        message=f"{file.filename} uploaded successfully"
    )

    return {

        "message":
            "Dataset uploaded successfully",

        "dataset_id":
            int(dataset.id),

        "total_records":
            int(len(df)),

        "missing_values":
            int(missing_values),

        "duplicates_removed":
            int(duplicates_removed)
    }

# -----------------------------------
# Get All Uploaded Datasets
# -----------------------------------

@router.get("/")

def get_datasets(

    db: Session = Depends(get_db)
):

    datasets = db.query(
        Dataset
    ).all()

    return [

        {

            "id":
                dataset.id,

            "name":
                dataset.dataset_name
        }

        for dataset in datasets
    ]