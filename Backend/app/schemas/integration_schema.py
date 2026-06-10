from pydantic import BaseModel


class IntegrationCreate(
    BaseModel
):

    name: str

    integration_type: str

    api_url: str

    api_key: str