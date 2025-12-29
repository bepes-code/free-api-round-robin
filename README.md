# Free Round Robin API Access

Use multiple free-tier AI APIs (Groq + Cerebras) with a simple round-robin router. This project spreads requests across providers to reduce rate-limit pain, while keeping setup lightweight and no credit card required for free-tier keys.

## Why this exists

- **Avoid rate limits** by alternating providers on each request.
- **Stay free** with Groq and Cerebras free-tier API keys.
- **Zero credit card** setup for free-tier access (no billing forms needed).
- **Drop-in HTTP API** that streams responses as they arrive.

## How it works

The server exposes a single `/chat` endpoint. Every request is routed to the next provider in a round-robin sequence:

1. Groq
2. Cerebras
3. Groq
4. Cerebras
5. ...and so on

Streaming is preserved end-to-end using `text/event-stream`.

## Providers

- **Groq**: fast LLM inference with a free tier.
- **Cerebras**: free-tier access to Llama 3.1 models.

## Quick start

### 1) Install dependencies

```bash
bun install
```

### 2) Configure environment

Create a `.env` file (or copy `.env.example`) and add your free-tier keys:

```bash
GROQ_API_KEY="your-api-key-here"
CEREBAS_API_KEY=csk-"your-api-key-here"
PORT=3000
```

### 3) Run the server

```bash
bun run index.ts
```

Server starts on `http://localhost:3000`.

## API

### POST `/chat`

Send OpenAI-style messages. The response is streamed as `text/event-stream`.

```bash
curl -N http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "Explain round robin in one sentence." }
    ]
  }'
```

## Notes

- This project is intentionally minimal. Add logging, retries, or fallback logic if needed.
- If a provider key is missing, requests will fail for that provider.
