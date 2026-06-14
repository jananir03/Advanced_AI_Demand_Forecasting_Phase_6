from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.forecast_comment import (
    ForecastComment
)

router = APIRouter(
    prefix="/forecast-collaboration",
    tags=["Forecast Collaboration"]
)


@router.post("/comments")
def add_comment(
    payload: dict,
    db: Session = Depends(get_db)
):

    comment = ForecastComment(

        forecast_id=payload.get(
            "forecast_id"
        ),

        user_id=payload.get(
            "user_id"
        ),

        comment=payload.get(
            "comment"
        )
    )

    db.add(comment)

    db.commit()

    db.refresh(comment)

    return {

        "message":
        "Comment added successfully",

        "comment_id":
        comment.id

    }


@router.get("/comments")
def get_comments(
    db: Session = Depends(get_db)
):

    return db.query(
        ForecastComment
    ).order_by(
        ForecastComment.created_at.desc()
    ).all()


@router.get("/comments/{forecast_id}")
def comments_by_forecast(
    forecast_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        ForecastComment
    ).filter(
        ForecastComment.forecast_id == forecast_id
    ).all()


@router.delete("/comments/{comment_id}")
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db)
):

    comment = db.query(
        ForecastComment
    ).filter(
        ForecastComment.id == comment_id
    ).first()

    if not comment:

        raise HTTPException(
            status_code=404,
            detail="Comment not found"
        )

    db.delete(comment)

    db.commit()

    return {

        "message":
        "Comment deleted"

    }


@router.get("/activity-timeline")
def activity_timeline(
    db: Session = Depends(get_db)
):

    comments = db.query(
        ForecastComment
    ).order_by(
        ForecastComment.created_at.desc()
    ).all()

    timeline = []

    for item in comments:

        timeline.append({

            "forecast_id":
            item.forecast_id,

            "user_id":
            item.user_id,

            "activity":
            item.comment,

            "created_at":
            item.created_at

        })

    return timeline


@router.get("/revision-history")
def revision_history(
    db: Session = Depends(get_db)
):

    comments = db.query(
        ForecastComment
    ).order_by(
        ForecastComment.created_at.desc()
    ).all()

    history = []

    for item in comments:

        history.append({

            "forecast_id":
            item.forecast_id,

            "revision_note":
            item.comment,

            "timestamp":
            item.created_at

        })

    return history


@router.get("/report-sharing")
def report_sharing():

    return {

        "status":
        "enabled",

        "message":
        "Reports can be shared among project members"

    }