from pydantic import BaseModel


class ProfileUpdateSchema(
    BaseModel
):

    username: str

    email: str


class PasswordResetSchema(
    BaseModel
):

    new_password: str