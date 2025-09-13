import { processPdf } from "@/lib/process-pdf";
import fs from "node:fs/promises";
import path from 'node:path';


export async function GET() {
  console.log("UPLOAD GET HIT");
  return Response.json({ status: "API alive" });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    for (const file of files) {
        // store file locally
        const uploadDir = path.join(process.cwd(), "uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());
        const filepath = path.join(uploadDir, file.name);
        await fs.writeFile(filepath, buffer);

        // processPDF parses and uploads to database tables
        await processPdf(file.name, buffer);
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error", hi: "hi!!!" }
    );
  }
}