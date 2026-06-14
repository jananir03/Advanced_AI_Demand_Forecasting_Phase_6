from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.models.forecast_workspace import (
    ForecastWorkspace
)

router = APIRouter(
    prefix="/forecast-workspaces",
    tags=["Forecast Workspaces"]
)


@router.post("/create")
def create_workspace(
    payload: dict,
    db: Session = Depends(get_db)
):

    workspace = ForecastWorkspace(
        workspace_name=payload.get(
            "workspace_name"
        ),
        description=payload.get(
            "description"
        ),
        owner_id=payload.get(
            "owner_id"
        )
    )

    db.add(workspace)

    db.commit()

    db.refresh(workspace)

    return {
        "message": "Workspace created",
        "workspace": {
            "id": workspace.id,
            "workspace_name": workspace.workspace_name,
            "description": workspace.description,
            "owner_id": workspace.owner_id
        }
    }


@router.get("/")
def get_workspaces(
    db: Session = Depends(get_db)
):

    workspaces = db.query(
        ForecastWorkspace
    ).all()

    return workspaces


@router.get("/{workspace_id}")
def get_workspace(
    workspace_id: int,
    db: Session = Depends(get_db)
):

    workspace = db.query(
        ForecastWorkspace
    ).filter(
        ForecastWorkspace.id == workspace_id
    ).first()

    if not workspace:

        raise HTTPException(
            status_code=404,
            detail="Workspace not found"
        )

    return workspace


@router.put("/{workspace_id}")
def update_workspace(
    workspace_id: int,
    payload: dict,
    db: Session = Depends(get_db)
):

    workspace = db.query(
        ForecastWorkspace
    ).filter(
        ForecastWorkspace.id == workspace_id
    ).first()

    if not workspace:

        raise HTTPException(
            status_code=404,
            detail="Workspace not found"
        )

    workspace.workspace_name = payload.get(
        "workspace_name",
        workspace.workspace_name
    )

    workspace.description = payload.get(
        "description",
        workspace.description
    )

    workspace.status = payload.get(
        "status",
        workspace.status
    )

    db.commit()

    return {
        "message": "Workspace updated"
    }


@router.delete("/{workspace_id}")
def delete_workspace(
    workspace_id: int,
    db: Session = Depends(get_db)
):

    workspace = db.query(
        ForecastWorkspace
    ).filter(
        ForecastWorkspace.id == workspace_id
    ).first()

    if not workspace:

        raise HTTPException(
            status_code=404,
            detail="Workspace not found"
        )

    db.delete(workspace)

    db.commit()

    return {
        "message": "Workspace deleted"
    }


@router.get("/activity/all")
def workspace_activity(
    db: Session = Depends(get_db)
):

    workspaces = db.query(
        ForecastWorkspace
    ).all()

    activity = []

    for item in workspaces:

        activity.append({

            "workspace_id": item.id,

            "workspace_name": item.workspace_name,

            "owner_id": item.owner_id,

            "status": item.status,

            "created_at": item.created_at

        })

    return activity