from pydantic import BaseModel


class OrganizationCreate(
    BaseModel
):

    name: str

    industry: str

    description: str


class OrganizationUpdate(
    BaseModel
):

    name: str

    industry: str

    description: str

    status: str