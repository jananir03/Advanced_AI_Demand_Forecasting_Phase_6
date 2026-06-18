from pydantic import BaseModel


class WorkflowCreate(
    BaseModel
):

    workflow_name: str

    workflow_type: str

    trigger_event: str


class WorkflowUpdate(
    BaseModel
):

    workflow_name: str

    workflow_type: str

    trigger_event: str

    execution_status: str


class WorkflowStatusUpdate(
    BaseModel
):

    execution_status: str


class WorkflowExecutionUpdate(
    BaseModel
):

    last_execution: str

    next_execution: str