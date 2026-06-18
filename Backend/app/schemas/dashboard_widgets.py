from pydantic import BaseModel
from typing import List


class WidgetUpdateSchema(BaseModel):

    widget_name: str

    widget_type: str

    is_visible: bool

    position: int


class LayoutSchema(BaseModel):

    layout_json: str


class WidgetResponseSchema(BaseModel):

    id: int

    widget_name: str

    widget_type: str

    is_visible: bool

    position: int

    class Config:
        from_attributes = True