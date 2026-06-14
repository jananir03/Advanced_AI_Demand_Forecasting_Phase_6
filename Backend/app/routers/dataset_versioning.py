from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.dataset_version import (
    DatasetVersion
)

router = APIRouter(
    prefix="/dataset-versioning",
    tags=["Dataset Versioning"]
)


@router.post("/create")
def create_version(
    payload: dict,
    db: Session = Depends(get_db)
):

    version = DatasetVersion(

        dataset_id=payload.get(
            "dataset_id"
        ),

        version_name=payload.get(
            "version_name"
        ),

        uploaded_by=payload.get(
            "uploaded_by"
        )
    )

    db.add(version)

    db.commit()

    db.refresh(version)

    return {

        "message":
        "Version created",

        "version_id":
        version.id

    }


@router.get("/")
def get_versions(
    db: Session = Depends(get_db)
):

    return db.query(
        DatasetVersion
    ).all()


@router.get("/{dataset_id}")
def dataset_versions(
    dataset_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        DatasetVersion
    ).filter(
        DatasetVersion.dataset_id == dataset_id
    ).all()


@router.put("/archive/{version_id}")
def archive_version(
    version_id: int,
    db: Session = Depends(get_db)
):

    version = db.query(
        DatasetVersion
    ).filter(
        DatasetVersion.id == version_id
    ).first()

    if not version:

        raise HTTPException(
            status_code=404,
            detail="Version not found"
        )

    version.status = "archived"

    db.commit()

    return {

        "message":
        "Dataset archived"

    }


@router.get("/upload-history/all")
def upload_history(
    db: Session = Depends(get_db)
):

    return db.query(
        DatasetVersion
    ).order_by(
        DatasetVersion.created_at.desc()
    ).all()


@router.get("/comparison/{dataset_id}")
def compare_versions(
    dataset_id: int,
    db: Session = Depends(get_db)
):

    versions = db.query(
        DatasetVersion
    ).filter(
        DatasetVersion.dataset_id == dataset_id
    ).all()

    comparison = []

    for item in versions:

        comparison.append({

            "version_id":
            item.id,

            "version_name":
            item.version_name,

            "status":
            item.status,

            "created_at":
            item.created_at

        })

    return comparison