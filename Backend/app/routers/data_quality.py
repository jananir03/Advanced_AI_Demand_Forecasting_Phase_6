from fastapi import (
    APIRouter,
    Depends,
    Body
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.data_quality import (
    DataQuality
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/data-quality",

    tags=["Data Quality"]

)


@router.post("/")
def create_quality_record(

    payload: dict = Body(...),

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    total_records = int(
        payload.get(
            "total_records",
            0
        )
    )

    valid_records = int(
        payload.get(
            "valid_records",
            0
        )
    )

    missing_records = int(
        payload.get(
            "missing_records",
            0
        )
    )

    duplicate_records = int(
        payload.get(
            "duplicate_records",
            0
        )
    )

    quality_score = 0

    if total_records > 0:

        quality_score = round(

            (
                valid_records /
                total_records
            ) * 100,

            2

        )

    quality_status = "good"

    if quality_score >= 95:

        quality_status = (
            "excellent"
        )

    elif quality_score >= 80:

        quality_status = (
            "good"
        )

    elif quality_score >= 60:

        quality_status = (
            "warning"
        )

    else:

        quality_status = (
            "critical"
        )

    validation_summary = (

        f"Valid: {valid_records}, "

        f"Missing: {missing_records}, "

        f"Duplicate: {duplicate_records}"

    )

    quality = DataQuality(

        dataset_name=
            payload.get(
                "dataset_name"
            ),

        total_records=
            total_records,

        valid_records=
            valid_records,

        missing_records=
            missing_records,

        duplicate_records=
            duplicate_records,

        quality_score=
            quality_score,

        quality_status=
            quality_status,

        validation_summary=
            validation_summary,

        created_by=
            current_user.id

    )

    db.add(
        quality
    )

    db.commit()

    db.refresh(
        quality
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Data Quality Report Generated",

        message=f"{quality.dataset_name} quality report created"

    )

    return quality


@router.get("/")
def get_quality_reports(

    db: Session = Depends(get_db)

):

    return db.query(
        DataQuality
    ).order_by(

        DataQuality.id.desc()

    ).all()


@router.get("/{quality_id}")
def get_quality_report(

    quality_id: int,

    db: Session = Depends(get_db)

):

    return db.query(
        DataQuality
    ).filter(

        DataQuality.id
        ==
        quality_id

    ).first()


@router.put("/{quality_id}")
def update_quality_report(

    quality_id: int,

    payload: dict = Body(...),

    db: Session = Depends(get_db)

):

    quality = db.query(
        DataQuality
    ).filter(

        DataQuality.id
        ==
        quality_id

    ).first()

    if not quality:

        return {
            "message":
            "Quality report not found"
        }

    quality.dataset_name = payload.get(
        "dataset_name",
        quality.dataset_name
    )

    quality.total_records = int(
        payload.get(
            "total_records",
            quality.total_records
        )
    )

    quality.valid_records = int(
        payload.get(
            "valid_records",
            quality.valid_records
        )
    )

    quality.missing_records = int(
        payload.get(
            "missing_records",
            quality.missing_records
        )
    )

    quality.duplicate_records = int(
        payload.get(
            "duplicate_records",
            quality.duplicate_records
        )
    )

    db.commit()

    return {
        "message":
        "Quality report updated successfully"
    }


@router.delete("/{quality_id}")
def delete_quality_report(

    quality_id: int,

    db: Session = Depends(get_db)

):

    quality = db.query(
        DataQuality
    ).filter(

        DataQuality.id
        ==
        quality_id

    ).first()

    if not quality:

        return {
            "message":
            "Quality report not found"
        }

    db.delete(
        quality
    )

    db.commit()

    return {
        "message":
        "Quality report deleted successfully"
    }


@router.get("/stats/summary")
def quality_summary(

    db: Session = Depends(get_db)

):

    total_reports = db.query(
        DataQuality
    ).count()

    excellent = db.query(
        DataQuality
    ).filter(

        DataQuality.quality_status
        ==
        "excellent"

    ).count()

    warning = db.query(
        DataQuality
    ).filter(

        DataQuality.quality_status
        ==
        "warning"

    ).count()

    critical = db.query(
        DataQuality
    ).filter(

        DataQuality.quality_status
        ==
        "critical"

    ).count()

    avg_quality_score = 0

    reports = db.query(
        DataQuality
    ).all()

    if reports:

        avg_quality_score = round(

            sum(
                r.quality_score
                for r in reports
            )
            /
            len(reports),

            2

        )

    return {

        "total_reports":
            total_reports,

        "excellent":
            excellent,

        "warning":
            warning,

        "critical":
            critical,

        "average_quality_score":
            avg_quality_score

    }