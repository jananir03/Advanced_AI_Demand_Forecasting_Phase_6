import json

from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.user import User

from app.models.dashboard_widget import (
    DashboardWidget
)

from app.models.dashboard_layout import (
    DashboardLayout
)

from app.schemas.dashboard_widgets import (
    WidgetUpdateSchema,
    LayoutSchema
)

from app.core.auth import (
    get_current_user
)

router = APIRouter(
    prefix="/dashboard-widgets",
    tags=["Dashboard Widgets"]
)

@router.get("/")
def get_widgets(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    widgets = db.query(
        DashboardWidget
    ).filter(

        DashboardWidget.user_id ==
        current_user.id

    ).order_by(

        DashboardWidget.position

    ).all()

    return widgets

@router.post("/save")
def save_widgets(

    widgets: list[WidgetUpdateSchema],

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    db.query(
        DashboardWidget
    ).filter(

        DashboardWidget.user_id ==
        current_user.id

    ).delete()

    for widget in widgets:

        db_widget = DashboardWidget(

            user_id=current_user.id,

            widget_name=widget.widget_name,

            widget_type=widget.widget_type,

            is_visible=widget.is_visible,

            position=widget.position
        )

        db.add(db_widget)

    db.commit()

    return {
        "message":
        "Dashboard widgets saved successfully"
    }

@router.post("/layout")
def save_layout(

    layout: LayoutSchema,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    existing = db.query(
        DashboardLayout
    ).filter(

        DashboardLayout.user_id ==
        current_user.id

    ).first()

    if existing:

        existing.layout_json = (
            layout.layout_json
        )

    else:

        existing = DashboardLayout(

            user_id=current_user.id,

            layout_json=layout.layout_json
        )

        db.add(existing)

    db.commit()

    return {
        "message":
        "Dashboard layout saved"
    }

@router.get("/layout")
def get_layout(

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    layout = db.query(
        DashboardLayout
    ).filter(

        DashboardLayout.user_id ==
        current_user.id

    ).first()

    if not layout:

        return {
            "layout_json": "[]"
        }

    return {
        "layout_json":
        layout.layout_json
    }