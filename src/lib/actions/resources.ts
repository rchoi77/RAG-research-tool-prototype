'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbeddings } from '../ai/embedding';
import { embeddings as embeddingsTable } from '../db/schema/embeddings';

export const createResource = async (input: NewResourceParams, content: string[]) => {
  try {
    console.log("let's try");
    const { filename } = insertResourceSchema.parse(input);
    // add filename to resources db
    const [resource] = await db
      .insert(resources)
      .values({ filename })
      .returning();
    for (const [i, pageText] of content.entries()) {
      // chunk each page's text and add embeddings to embeddings db. associate original resource + page number
      const embeddings = await generateEmbeddings(pageText);
      console.log("adding a page to embeddings table");
      await db.insert(embeddingsTable).values(
        embeddings.map(embedding => ({
          resourceId: resource.id,
          filename: filename,
          pageNum: i + 1,
          ...embedding, // expands to content: text, embedding: vector
        })),
      );
    }

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};