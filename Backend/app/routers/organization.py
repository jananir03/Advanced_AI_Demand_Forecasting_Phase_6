from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.organization import (
    Organization
)

from app.schemas.organization_schema import (
    OrganizationCreate,
    OrganizationUpdate
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/organizations",

    tags=["Organizations"]
)


@router.post("/")
def create_organization(

    payload: OrganizationCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    organization = Organization(

        name=payload.name,

        industry=payload.industry,

        description=payload.description
    )

    db.add(
        organization
    )

    db.commit()

    db.refresh(
        organization
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Organization Created",

        message=f"{payload.name} organization created successfully"
    )

    return{

        "message":
        "Organization created Successfully!"
    }


@router.get("/")
def get_organizations(

    db: Session = Depends(get_db)
):

    return db.query(
        Organization
    ).order_by(
        Organization.id.desc()
    ).all()


@router.put("/{organization_id}")
def update_organization(

    organization_id: int,

    payload: OrganizationUpdate,

    db: Session = Depends(get_db)
):

    organization = db.query(
        Organization
    ).filter(

        Organization.id
        ==
        organization_id

    ).first()

    if not organization:

        return {

            "message":
            "Organization not found"
        }

    organization.name = (
        payload.name
    )

    organization.industry = (
        payload.industry
    )

    organization.description = (
        payload.description
    )

    organization.status = (
        payload.status
    )

    db.commit()

    return {

        "message":
        "Organization updated successfully"
    }


@router.delete("/{organization_id}")
def delete_organization(

    organization_id: int,

    db: Session = Depends(get_db)
):

    organization = db.query(
        Organization
    ).filter(

        Organization.id
        ==
        organization_id

    ).first()

    if not organization:

        return {

            "message":
            "Organization not found"
        }

    db.delete(
        organization
    )

    db.commit()

    return {

        "message":
        "Organization deleted successfully"
    }


@router.get("/stats/summary")
def organization_summary(

    db: Session = Depends(get_db)
):

    total_organizations = db.query(
        Organization
    ).count()

    active_organizations = db.query(
        Organization
    ).filter(

        Organization.status
        ==
        "active"

    ).count()

    return {

        "total_organizations":
            total_organizations,

        "active_organizations":
            active_organizations
    }