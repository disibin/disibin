import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

// GET public job openings
export async function GET() {
    try {
        const query = `
            SELECT job_id, title, location, job_type, level, compensation, description,
                   responsibilities, skills, nice_to_have, is_published, created_at
            FROM careers
            WHERE is_published = true
            ORDER BY created_at DESC
        `;
        const res = await dbQuery(query);

        return NextResponse.json({ success: true, data: res.rows });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

