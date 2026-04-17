import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

const BUCKET = process.env.S3_BUCKET || "rw-1";

const MIME_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  pdf: "application/pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const decodedPath = path.map(decodeURIComponent).join("/");
  const ext = decodedPath.split(".").pop()?.toLowerCase() || "";
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  const rangeHeader = request.headers.get("range");

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: decodedPath,
      ...(rangeHeader ? { Range: rangeHeader } : {}),
    });

    const response = await s3.send(command);

    if (!response.Body) {
      return NextResponse.json({ error: "Empty response" }, { status: 500 });
    }

    const stream = response.Body.transformToWebStream();

    if (rangeHeader && response.ContentRange) {
      return new Response(stream, {
        status: 206,
        headers: {
          "Content-Range": response.ContentRange,
          "Accept-Ranges": "bytes",
          "Content-Length": String(response.ContentLength || 0),
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Length": String(response.ContentLength || 0),
        "Content-Type": contentType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("NoSuchKey") || message.includes("not found")) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
