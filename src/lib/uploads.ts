// send files to upload api endpoint
export async function uploadPdfs(files: File[]) {
  const formData = new FormData();

  for (const file of files) {
    formData.append("file", file);
  }

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}