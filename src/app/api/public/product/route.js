import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

// GET all products (Public Portfolio)
export async function GET() {
    try {
        const res = await dbQuery(`
            SELECT id, name, title, slug, image, image_id, link, created_at, updated_at
            FROM products
            ORDER BY created_at DESC
        `);

        return NextResponse.json({ success: true, data: res.rows });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

