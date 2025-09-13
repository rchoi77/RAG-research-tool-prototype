import { embed, embedMany } from 'ai';
import { db } from '../db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddings } from '../db/schema/embeddings';

// TODO: un hardcode embedding model
const embeddingModel = 'openai/text-embedding-3-small';

 // TODO: let this be set by the user
const maxRetrievedChunks = 4;

const generateChunks = (input: string): string[] => {
  // Do we want chunking done by the pdf parser, or here, where we generate the embeddings?
  return input
    .trim()
    .split(/\n\s*\n/)
    .filter(i => i !== '');
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({
      content: embeddings.content,
      similarity,
      filename: embeddings.filename,
    })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy(t => desc(t.similarity))
    .limit(maxRetrievedChunks);
  return similarGuides;
};