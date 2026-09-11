import { type NextRequest, NextResponse } from "next/server";

// Fallback to the Cloudinary permanent asset if env var is not specified
const DEFAULT_RESUME_VIEW_URL =
  "https://res.cloudinary.com/do9zzg13j/image/upload/resume.pdf";
const DEFAULT_RESUME_DOWNLOAD_URL =
  "https://res.cloudinary.com/do9zzg13j/image/upload/fl_attachment:Prathmesh_Ojha_Resume/resume.pdf";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isDownload =
    searchParams.get("download") === "1" ||
    searchParams.get("download") === "true";

  const targetUrl = isDownload
    ? process.env.RESUME_DOWNLOAD_URL || DEFAULT_RESUME_DOWNLOAD_URL
    : process.env.RESUME_URL || DEFAULT_RESUME_VIEW_URL;

  // Use 307 Temporary Redirect and disable caching so replaced resumes are served instantly
  const response = NextResponse.redirect(targetUrl, 307);
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
