from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.config.database import (
    get_db
)

from app.models.project import (
    Project
)

from app.schemas.project_schema import (
    ProjectCreate,
    ProjectUpdate
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/projects",

    tags=["Projects"]
)


@router.post("/")
def create_project(

    payload: ProjectCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )
):

    project = Project(

        project_name=
            payload.project_name,

        description=
            payload.description,

        organization_name=
            payload.organization_name,

        owner_name=
            payload.owner_name
    )

    db.add(
        project
    )

    db.commit()

    db.refresh(
        project
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Project Created",

        message=f"{payload.project_name} project created successfully"
    )

    return project


@router.get("/")
def get_projects(

    db: Session = Depends(get_db)
):

    return db.query(
        Project
    ).order_by(
        Project.id.desc()
    ).all()


@router.put("/{project_id}")
def update_project(

    project_id: int,

    payload: ProjectUpdate,

    db: Session = Depends(get_db)
):

    project = db.query(
        Project
    ).filter(

        Project.id
        ==
        project_id

    ).first()

    if not project:

        return {

            "message":
            "Project not found"
        }

    project.project_name = (
        payload.project_name
    )

    project.description = (
        payload.description
    )

    project.organization_name = (
        payload.organization_name
    )

    project.owner_name = (
        payload.owner_name
    )

    project.status = (
        payload.status
    )

    db.commit()

    return {

        "message":
        "Project updated successfully"
    }


@router.delete("/{project_id}")
def delete_project(

    project_id: int,

    db: Session = Depends(get_db)
):

    project = db.query(
        Project
    ).filter(

        Project.id
        ==
        project_id

    ).first()

    if not project:

        return {

            "message":
            "Project not found"
        }

    db.delete(
        project
    )

    db.commit()

    return {

        "message":
        "Project deleted successfully"
    }


@router.get("/stats/summary")
def project_summary(

    db: Session = Depends(get_db)
):

    total_projects = db.query(
        Project
    ).count()

    active_projects = db.query(
        Project
    ).filter(

        Project.status
        ==
        "active"

    ).count()

    completed_projects = db.query(
        Project
    ).filter(

        Project.status
        ==
        "completed"

    ).count()

    return {

        "total_projects":
            total_projects,

        "active_projects":
            active_projects,

        "completed_projects":
            completed_projects
    }