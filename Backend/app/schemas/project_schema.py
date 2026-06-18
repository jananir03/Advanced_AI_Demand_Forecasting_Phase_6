from pydantic import BaseModel


class ProjectCreate(
    BaseModel
):

    project_name: str

    description: str

    organization_name: str

    owner_name: str


class ProjectUpdate(
    BaseModel
):

    project_name: str

    description: str

    organization_name: str

    owner_name: str

    status: str