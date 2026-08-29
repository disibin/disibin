import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

// GET all product showcase images (Public)
export async function GET() {
    try {
        const res = await dbQuery(`
            SELECT id, name, title, slug, image, image_id, link, created_at
            FROM products
            WHERE image IS NOT NULL AND image != ''
            ORDER BY created_at DESC
        `).catch(() => ({ rows: [] }));

        return NextResponse.json({ success: true, data: res.rows });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

