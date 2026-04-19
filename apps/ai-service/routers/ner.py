import re
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class NERInput(BaseModel):
    text: str
    targets: list[str] = []


class Entity(BaseModel):
    text: str
    label: str
    start: int
    end: int


class NERResult(BaseModel):
    entities: list[Entity]
    target_hits: list[str]


@router.post("", response_model=NERResult)
def extract_entities(payload: NERInput) -> NERResult:
    """Lightweight NER stub — replace with fine-tuned model in production."""
    entities: list[Entity] = []
    hits: list[str] = []

    for target in payload.targets:
        for match in re.finditer(re.escape(target), payload.text, re.IGNORECASE):
            entities.append(Entity(
                text=match.group(),
                label="TARGET_ENTITY",
                start=match.start(),
                end=match.end(),
            ))
            if target not in hits:
                hits.append(target)

    return NERResult(entities=entities, target_hits=hits)
