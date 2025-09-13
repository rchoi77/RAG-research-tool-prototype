import { createResource } from "@/lib/actions/resources";
import { getDocument } from 'pdfjs-dist';

export async function processPdf(filename: string, buffer: Buffer) {
  console.log("start parsing.");
  const pdfContent = await parsePdf(buffer);
  console.log("gonna create resource");
  await createResource({ filename: filename }, pdfContent);
}

// generate string array where each element is a page's text
async function parsePdf(buffer: Buffer) {
  // dynamic import because this library was not meant for server side rendering
  console.log("start importing.");
  // @ts-ignore
  await import('pdfjs-dist/build/pdf.worker.mjs');

  console.log("start the parsing fr.");
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;

  const pdfContent: string[] = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    pdfContent.push(content.items.map((item: any) => item.str).join(" "));
    /* TODO: Try to detect paragraph start and end and add in special chars (\n, \t, whatever) 
     * that we can use as delimiters when breaking into chunks.
     */
  }

  return pdfContent;
}