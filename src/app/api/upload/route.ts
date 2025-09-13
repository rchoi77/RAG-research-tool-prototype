import { createResource } from "@/lib/actions/resources";
import fs from "node:fs/promises";
import path from 'node:path';


export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("file") as File[];

  for (const file of files) {
    // store file locally
    const uploadDir = "/uploads";
    await fs.mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    const filepath = path.join(uploadDir, file.name);
    await fs.writeFile(filepath, buffer);

    // Parse pdf
    // TODO: pdf parser
    const text = await file.text();

    // upload to database
    await createResource({ filename: file.name }, text);
  }

  return Response.json({ success: true });
}