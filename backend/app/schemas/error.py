from typing import Any

from pydantic import BaseModel, Field


class ErrorDetail(BaseModel):
    loc: list[Any] | None = Field(None, json_schema_extra={"example": ["body", "username"]})
    msg: str = Field(..., json_schema_extra={"example": "Field required"})
    type: str | None = Field(None, json_schema_extra={"example": "value_error.missing"})


class ApiErrorPayload(BaseModel):
    code: str = Field(..., json_schema_extra={"example": "VALIDATION_ERROR"})
    message: str = Field(..., json_schema_extra={"example": "The request could not be processed."})
    details: list[ErrorDetail] = Field(default_factory=list)


class ErrorResponse(BaseModel):
    error: ApiErrorPayload
