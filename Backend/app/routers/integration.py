from fastapi import (
    APIRouter,
    Depends
)

import requests

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.integration import (
    Integration
)

from app.schemas.integration_schema import (
    IntegrationCreate
)

from app.services.notification_service import (
    create_notification
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

router = APIRouter(

    prefix="/integrations",

    tags=["Integrations"]
)

@router.post("/")
def create_integration(

    payload: IntegrationCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):
    integration = Integration(

        name=payload.name,

        integration_type=
            payload.integration_type,

        api_url=
            payload.api_url,

        api_key=
            payload.api_key
    )

    db.add(
        integration
    )

    db.commit()

    db.refresh(
        integration
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Integration Created",

        message=f"{payload.name} integration created successfully"
    )
    return integration

@router.get("/")
def get_integrations(

    db: Session = Depends(get_db)
):

    return db.query(
        Integration
    ).all()

@router.put("/{integration_id}/toggle")
def toggle_integration(

    integration_id: int,

    db: Session = Depends(get_db)
):

    integration = db.query(
        Integration
    ).filter(

        Integration.id ==
        integration_id

    ).first()

    if not integration:

        return {

            "message":
                "Integration not found"
        }

    integration.is_active = (

        not integration.is_active
    )

    db.commit()

    return {

        "status":
            integration.is_active
    }

# -----------------------------------
# WEBHOOK INVENTORY UPDATE
# -----------------------------------

@router.post(
    "/webhooks/inventory-update"
)
def inventory_webhook(

    payload: dict
):

    return {

        "message":
            "Webhook received successfully",

        "data":
            payload
    }


# -----------------------------------
# TEST EXTERNAL API CONNECTION
# -----------------------------------

@router.get(
    "/test-connection"
)
def test_connection():

    try:

        response = requests.get(

            "https://jsonplaceholder.typicode.com/posts/1"
        )

        return {

            "status":
                response.status_code,

            "connection":
                "Success",

            "message":
                "External API reachable"
        }

    except Exception as e:

        return {

            "status":
                "Failed",

            "error":
                str(e)
        }