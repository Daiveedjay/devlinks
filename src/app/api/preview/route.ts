import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio"; // For parsing HTML

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const { data } = await axios.get(url, {
      timeout: 5000,
      headers: { "User-Agent": "Mozilla/5.0" },
    }); // Fetch page
    const $ = cheerio.load(data); // Load HTML into Cheerio

    // Extract Open Graph metadata
    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || "";
    const favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href") ||
      "";

    return NextResponse.json({ title, description, image, favicon });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch metadata: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
