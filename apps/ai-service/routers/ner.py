from fastapi import APIRouter
from pydantic import BaseModel

from models.ner_model import extract_target_entities, extract_all_entities

router = APIRouter()


class NERInput(BaseModel):
    text: str
    targets: list[str] = []
    extract_all: bool = False


class Entity(BaseModel):
    text: str
    label: str
    start: int
    end: int
    confidence: float = 1.0


class NERResult(BaseModel):
    entities: list[Entity]
    target_hits: list[str]


@router.post("", response_model=NERResult)
def extract_entities(payload: NERInput) -> NERResult:
    """Extract named entities and detect target identifier hits."""
    target_entities = extract_target_entities(payload.text, payload.targets)
    hits = list({e.text.lower() for e in target_entities})

    all_entities = extract_all_entities(payload.text) if payload.extract_all else []
    combined = {(e.start, e.end): e for e in (target_entities + all_entities)}
    entities = [
        Entity(
            text=e.text,
            label=e.label,
            start=e.start,
            end=e.end,
            confidence=e.confidence,
        )
        for e in combined.values()
    ]

    return NERResult(entities=entities, target_hits=hits)
