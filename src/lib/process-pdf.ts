import { createResource } from "@/lib/actions/resources";
import pdf from "pdf-parse";

export async function processPdf(filename: string, buffer: Buffer) {
  const data = await pdf(buffer);
  await createResource({ filename: filename }, data.text);
}