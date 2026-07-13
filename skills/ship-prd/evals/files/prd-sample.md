# Sample PRD for ship-prd evals

## Goal

Ship a minimal "Notes" feature: create a note via API and show it in a simple web list.

## Requirements

1. `POST /notes` persists a note with title and body.
2. `GET /notes` returns all notes.
3. A web page lists notes and has a form to create one.

## Non-goals

Auth, sharing, rich text.
