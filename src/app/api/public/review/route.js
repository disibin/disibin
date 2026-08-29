import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

// GET — Public approved reviews
export async function GET() {
    try {
        const res = await dbQuery(`
            SELECT id, tenant_name, rating, comment, reply, created_at
            FROM reviews
            WHERE is_approved = true
            ORDER BY created_at DESC
        `);

        return NextResponse.json({ success: true, data: res.rows });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
