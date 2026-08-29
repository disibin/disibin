import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

// GET - List all partners (Public)
export async function GET() {
    try {
        const res = await dbQuery(`
            SELECT id, company_name, slug, business_url, image, image_id, email, created_at
            FROM partners
            ORDER BY created_at DESC
        `);
        return NextResponse.json({ success: true, data: res.rows });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

