from pydantic import BaseModel


class ScenarioCreateSchema(
    BaseModel
):

    scenario_name: str

    sales_growth: float

    seasonality_factor: float

    demand_factor: float

    best_case: float

    normal_case: float

    worst_case: float

    