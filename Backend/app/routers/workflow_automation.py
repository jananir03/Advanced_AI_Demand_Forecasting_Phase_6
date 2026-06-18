from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from datetime import datetime

from app.config.database import (
    get_db
)

from app.models.workflow_automation import (
    WorkflowAutomation
)

from app.schemas.workflow_automation_schema import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowStatusUpdate
)

from app.models.user import User

from app.core.auth import (
    get_current_user
)

from app.services.notification_service import (
    create_notification
)

router = APIRouter(

    prefix="/workflow-automation",

    tags=["Workflow Automation"]

)


@router.post("/")
def create_workflow(

    payload: WorkflowCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    workflow = WorkflowAutomation(

        workflow_name=
            payload.workflow_name,

        workflow_type=
            payload.workflow_type,

        trigger_event=
            payload.trigger_event,

        created_by=
            current_user.id

    )

    db.add(
        workflow
    )

    db.commit()

    db.refresh(
        workflow
    )

    create_notification(

        db=db,

        user_id=current_user.id,

        title="Workflow Created",

        message=f"{payload.workflow_name} workflow created"

    )

    return workflow


@router.get("/")
def get_workflows(

    db: Session = Depends(get_db)

):

    return db.query(
        WorkflowAutomation
    ).order_by(

        WorkflowAutomation.id.desc()

    ).all()


@router.put("/{workflow_id}")
def update_workflow(

    workflow_id: int,

    payload: WorkflowUpdate,

    db: Session = Depends(get_db)

):

    workflow = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.id
        ==
        workflow_id

    ).first()

    if not workflow:

        return {
            "message":
            "Workflow not found"
        }

    workflow.workflow_name = (
        payload.workflow_name
    )

    workflow.workflow_type = (
        payload.workflow_type
    )

    workflow.trigger_event = (
        payload.trigger_event
    )

    workflow.execution_status = (
        payload.execution_status
    )

    db.commit()

    return {
        "message":
        "Workflow updated successfully"
    }


@router.put("/pause/{workflow_id}")
def pause_workflow(

    workflow_id: int,

    db: Session = Depends(get_db)

):

    workflow = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.id
        ==
        workflow_id

    ).first()

    if not workflow:

        return {
            "message":
            "Workflow not found"
        }

    workflow.execution_status = (
        "paused"
    )

    db.commit()

    return {
        "message":
        "Workflow paused successfully"
    }


@router.put("/resume/{workflow_id}")
def resume_workflow(

    workflow_id: int,

    db: Session = Depends(get_db)

):

    workflow = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.id
        ==
        workflow_id

    ).first()

    if not workflow:

        return {
            "message":
            "Workflow not found"
        }

    workflow.execution_status = (
        "active"
    )

    db.commit()

    return {
        "message":
        "Workflow resumed successfully"
    }


@router.post("/execute/{workflow_id}")
def execute_workflow(

    workflow_id: int,

    db: Session = Depends(get_db)

):

    workflow = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.id
        ==
        workflow_id

    ).first()

    if not workflow:

        return {
            "message":
            "Workflow not found"
        }

    workflow.last_execution = (
        datetime.utcnow()
    )

    db.commit()

    return {
        "message":
        "Workflow executed successfully"
    }


@router.get("/stats/summary")
def workflow_summary(

    db: Session = Depends(get_db)

):

    total = db.query(
        WorkflowAutomation
    ).count()

    active = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.execution_status
        ==
        "active"

    ).count()

    paused = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.execution_status
        ==
        "paused"

    ).count()

    completed = db.query(
        WorkflowAutomation
    ).filter(

        WorkflowAutomation.execution_status
        ==
        "completed"

    ).count()

    return {

        "total":
            total,

        "active":
            active,

        "paused":
            paused,

        "completed":
            completed

    }