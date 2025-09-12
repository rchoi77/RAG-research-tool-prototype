import { createResource } from "@/lib/actions/resources";

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("file") as File[];

  for (const file of files) {
    // TODO: pdf parser
    const text = await file.text();

    // upload to database
    await createResource({ content: text });
  }

  return Response.json({ success: true });
}