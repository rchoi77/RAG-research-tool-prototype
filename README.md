# RAG Research Tool

This is a prototype of an application to help answer researcher questions.

Users upload scientific journal articles to the server and can ask questions through the chat interface.

RAG is used to retrieve relevant articles from the database of uploaded papers. The attached LLM can then provide relevant answers with evidence sourced from the given material.

## Setup

### Set up the database
In `/.env`, set the `DATABASE_URL` environment variable. Then,
```bash
npm run db:migrate
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Hey!

## Other Notes

### Design Choices
- 

### Features left to implement / future features:
- Ability to keep one conversation going
- User auth; save keys, security, SidebarFooter, etc.
- With user auth, add server storage of question history. Right now, history is client side and lost on refresh.

### Questions left unanswered:
- Shared or personal pdf databases?
- How do you clean up the database? Never? Automatically, or manually?

