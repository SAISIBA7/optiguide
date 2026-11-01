from pydantic import BaseModel, Field


class PaginatedResponse[T](BaseModel):
    items: list[T] = Field(default_factory=list)
    total: int = Field(..., json_schema_extra={"example": 42})
    page: int = Field(default=1, json_schema_extra={"example": 1})
    page_size: int = Field(default=20, json_schema_extra={"example": 20})
