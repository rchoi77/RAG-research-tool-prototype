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

Make sure database url and AI Gateway key are set.

Adjust max number of chunks retrieved in `src/lib/ai/embedding.ts`.

Upload pdfs at the pdf upload page accessible from the sidebar.

Start a chat, and ask a question!

## Other Notes

### Design Choices
- PostgreSQL. Because it's free for my use case. Using Vercel's free plan for database hosting, but the project is set up so you can use local/other provider via url.
- Vercel's AI Gateway. Easy way to offer multiple models, only needing one API key.
- Chunk article text into paragraphs. Sentences on their own likely cannot carry enough semantic meaning to get a scientific point across.
- Not offering page number in citations. Associating text chunks with their page number requires a more complicated PDF parsing procedure that I do not have time to implement. The current pdf parsing package in use returns the PDF's text all as one. With more time, I could naively implement this by breaking each pdf into pages and parsing each page. Or, by using/making a pdf parser that either does the chunking with associated page numbers, or lets you stream text a page at a time.
- For now, store uploaded PDF files locally, as opposed to embedding then being done with them. In the future, 
- Two database tables. The resources table stores filenames with ids. The embeddings table stores embeddings associated with the id of the file they came from. I wanted to keep each embedding associated to the original file to allow the LLM to return files when cited, as a future feature. The two table setup is an archaic artifact from my initial plan to store PDFs in the resources table as binary. It turns out, this is not very scaleable. With a little more time, I would rewrite to just use one table, but for now it works,

### Features left to implement:
- address TODOs, remove // DEBUGs
- error handling
- Hashing pdf uploads, storing hash as id to prevent duplicate uploads. Also, responsive pdf upload UI.s
- Zod schema input validation for vector embedding generator. Previously, it took the same (validated) input as createResource in `src/lib/actions/resources.ts`, but now it doesn't, so input must also be validated.
- Database key should really be stored in .env.local.
- User auth; save keys, security, SidebarFooter, etc.
- With user auth, add server storage of question history. Right now, history is client side and lost on refresh.

### Improvements to be made in the future:
- The PDF parsing procedure needs to be improved greatly. Chunking text into paragraphs seems ideal, but the current method of splitting with an indent character as the delimiter does not guarantee correct chunking behavior.
- Store pdf uploads on the cloud instead of locally. Return files to user when cited.
- Ability to accurately parse tables and figures in documents and embed them. Allow the LLM to include these tables and figures in their answer.

### Questions left unanswered:
- Shared or personal pdf databases?
- How do you clean up the database? Never? Automatically, or manually?
- What to choose for db entry id lengths, vector embedding dimensions, etc.
- What's a good maxOutputTokens? Do we need to be worried about limiting token usage? 

