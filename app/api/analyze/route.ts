import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { createWorker } from "tesseract.js";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    // Step 1: Try normal PDF text extraction
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    extractedText = result.text.trim();

    // Step 2: If PDF is scanned, use OCR
    if (
      extractedText
        .replace(/-- \d+ of \d+ --/g, "")
        .trim()
        .length < 50
    ) {
      console.log("No readable text found. Starting OCR...");

      // Dynamically load pdf-to-img on the server
      const { pdf } = await import("pdf-to-img");

      const document = await pdf(buffer, {
        scale: 2,
      });

      const worker = await createWorker("eng", undefined, {
        workerPath: path.join(
          process.cwd(),
          "node_modules",
          "tesseract.js",
          "src",
          "worker-script",
          "node",
          "index.js"
        ),
      });

      let pageNum = 0;

      for await (const image of document) {
        pageNum++;

        console.log(`Processing page ${pageNum}...`);

        const { data } = await worker.recognize(image);

        extractedText += "\n" + data.text;
      }

      await worker.terminate();
      await document.destroy();
    }

    return NextResponse.json({
      message: "Contract uploaded successfully",
      fileName: file.name,
      textLength: extractedText.length,
      textPreview: extractedText.slice(0, 5000),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to process PDF",
      },
      {
        status: 500,
      }
    );
  }
}