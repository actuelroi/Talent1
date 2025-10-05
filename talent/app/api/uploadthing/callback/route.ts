// src/app/api/uploadthing/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📨 Uploadthing callback received:", body);
    
    // Handle the callback from Uploadthing
    // You can process the uploaded file data here if needed
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error handling upload callback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Uploadthing callback endpoint" });
}