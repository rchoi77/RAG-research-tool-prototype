# RAG Research Tool

This is a prototype of an application to help answer researcher questions.

Users upload scientific journal articles to the server and can ask questions through the chat interface.

RAG is used to retrieve relevant articles from the database of uploaded papers. The attached LLM can then provide relevant answers with evidence sourced from the given material.

## Setup

### Set up database and keys
Create `/.env` and store `DATABASE_URL=<your key>` to store it as an environment variable. Then,
```bash
npm run db:migrate
```

Create `/.env.local` and store your Vercel [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started#set-up-your-api-key).

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Hey!

## Other Notes

### Design Choices
- PostgreSQL. Because it's free for my use case.
- Vercel's AI Gateway. Easy way to offer multiple models, only needing one API key.
- Chunk.

### Features left to implement / future features:
- address TODOs
- Ability to keep one conversation going
- User auth; save keys, security, SidebarFooter, etc.
- Database key should really be stored in .env.local.
- With user auth, add server storage of question history. Right now, history is client side and lost on refresh.

### Questions left unanswered:
- Shared or personal pdf databases?
- How do you clean up the database? Never? Automatically, or manually?
- What to choose for db entry id lengths, vector embedding dimensions, etc.
- What's a good maxOutputTokens? Do we need to be worried about limiting token usage? 

