# Legal Document RAG Search API

## Project Overview

This project implements a Retrieval-Augmented Generation (RAG) search API for legal documents in Nepal. Currently it made for english converted nepali 'ACTS' and aims to be flexible in the near future. It leverages advanced natural language processing techniques to enable semantic search and context-aware querying of legal texts.

## Key Features

- Hybrid embedding search (BERT + TF-IDF)
## Kanun AI — Legal Document Retrieval (Legal-RAG)

Professional, production-oriented Retrieval-Augmented Generation (RAG) API focused on semantic search over legal documents (Nepal-focused corpus). This service combines dense vector search, lightweight classical retrieval, and reranking to deliver accurate, context-aware results at scale.

Key goals:
- Provide fast, explainable retrieval for legal acts and statutory texts
- Support simple HTTP API for integration with front-ends or downstream applications
- Enable reproducible indexing and evaluation (MRR/MAP) for retrieval quality

---

## Features

- Hybrid retrieval: dense embeddings (sentence-transformers) + classical techniques (TF-IDF / Scikit-learn)
- Reranker stage to improve top-k precision
- Document chunking and metadata-aware indexing for section-level retrieval
- FastAPI backend with OpenAPI (Swagger) docs for easy integration
- Qdrant vector database for efficient nearest-neighbor search and persistence
- Evaluation endpoints to compute retrieval metrics (MRR, MAP)

---

## Technology & Architecture

- Language: Python 3.8+
- Web: FastAPI + Uvicorn
- Embeddings / Models: sentence-transformers, Hugging Face Transformers
- Vector store: Qdrant (via qdrant-client)
- ML / Data: NumPy, Scikit-learn, PyTorch (if using certain transformer backends)
- PDF / doc handling: PyMuPDF (pymupdf), pypdf
- Config: python-dotenv

Dependencies (primary):
- fastapi, uvicorn
- sentence-transformers, transformers
- qdrant-client
- scikit-learn, numpy
- pypdf, pymupdf
- python-dotenv

Refer to `requirements.txt` for the full pin list used by the project.

---

## Quick start (developer)

Prereqs: Python 3.8+, pip, Docker (for Qdrant)

1. Clone

```bash
git clone https://github.com/pantshaswat/Legal-RAG.git
cd Legal-RAG
```

2. Create and activate virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Start Qdrant (local development)

```bash
docker run -d --name qdrant -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage \
    qdrant/qdrant
```

5. Configure environment

Create a `.env` file at the project root and set any required API keys and configuration values (example keys used by services in `app/services/`). Typical entries:

```
# .env
QDRANT_URL=http://localhost:6333
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
OPENAI_API_KEY=...
GROQ_API_KEY=...  # if using Groq/Gemini-style backends
```

6. Run the API (development)

```bash
cd app
uvicorn main:app --reload --port 8000
```

Visit http://localhost:8000/docs for interactive Swagger/OpenAPI docs.

---

## Usage & Endpoints

High-level endpoints (subject to the implementation in `app/api/endpoints.py`):

- GET /api/v1/available-files
    - Returns the list of indexed files/collections and basic metadata.
- POST /api/v1/query
    - Accepts a natural language query, returns ranked documents/sections with scores and source metadata.
- POST /api/v1/test
    - Utility endpoint for storing or reindexing embeddings for a specific legal act (development/testing).
- POST /api/v1/evaluate
    - Runs retrieval evaluation (MRR, MAP) against the evaluation dataset.
- DELETE /api/v1/document/{collection_name}
    - Delete a collection/document and its vectors from Qdrant.

See the API doc pages at `/docs` for request/response schemas and examples.

Example query payload:

```
{
    "query": "What are the penalties for money laundering under the Finance Act?",
    "top_k": 5
}
```

---

## Data preparation

1. Place preprocessed JSON documents under `data/processed/json/<collection>/`.
2. Each JSON should contain the document text divided into chunks/sections with clear metadata (title, section id, act name, page, etc.).
3. Run the indexing flow (see `app/act_chunker.py` and indexing handlers in `app/api/handlers.py`) to compute embeddings and populate Qdrant.

Tip: The repo includes an `app/act_chunker.py` file to assist splitting acts into indexable chunks. Maintain consistent metadata for better provenance and result display.

---

## Configuration & Environment

- `QDRANT_URL` — base URL for Qdrant (default http://localhost:6333)
- `EMBEDDING_MODEL` — HF/sentence-transformers model name or local path
- API keys for any external LLM providers (if used) — set in `.env`

---

## Evaluation

The `/api/v1/evaluate` endpoint computes retrieval metrics such as Mean Reciprocal Rank (MRR) and Mean Average Precision (MAP) against the prepared evaluation dataset in `evaluation/`.

---

## Project Layout (key files)

- `app/main.py` — FastAPI application entrypoint
- `app/api/endpoints.py` — API routes
- `app/api/handlers.py` — request handlers and orchestration logic
- `app/services/` — embedding, vector store, and retrieval implementations (qdrant_client_init.py, embeddings.py, retrival.py, vectorizer_manager.py, grokLlm.py)
- `app/act_chunker.py` — helper to turn legal acts into indexable chunks
- `data/processed/json/` — source legal documents (chunked JSON)
- `evaluation/` — evaluation datasets and expected relevancies

---

## Contributing

We welcome contributions. Small, well-scoped PRs are easiest to review.

Workflow:
1. Fork and create a feature branch
2. Add tests for new behaviors where applicable
3. Run formatting and linting as appropriate
4. Open a pull request with a clear description of the change

Coding conventions:
- Keep functions small and focused
- Include docstrings for public functions and modules

---

## Security & Privacy

- Do not commit secrets. Use `.env` or secret managers for keys.
- If working with sensitive legal documents, ensure access control and secure storage for the `data/` and `qdrant_storage` directories.

---

## Contact & License

Maintainer: Shaswat Pant — pantshaswat@gmail.com

Repository: https://github.com/pantshaswat/Legal-RAG

License: MIT

---

If you'd like, I can also:
- update the root Kanun-AI homepage URL and `package.json` to point at a polished project site
- add a small example client or Postman collection for quick integration tests
