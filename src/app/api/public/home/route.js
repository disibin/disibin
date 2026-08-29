import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

export async function GET() {
    try {
        // Fetch actual counts from products and partners
        const productsRes = await dbQuery("SELECT COUNT(*) as count FROM products", []).catch(() => ({ rows: [{ count: 0 }] }));
        const partnersRes = await dbQuery("SELECT COUNT(*) as count FROM partners", []).catch(() => ({ rows: [{ count: 0 }] }));

        const productsCount = parseInt(productsRes.rows[0]?.count) || 0;
        const partnersCount = parseInt(partnersRes.rows[0]?.count) || 0;

        // Base values combined with DB counts
        const businesses = 120 + partnersCount;
        const projects = 50 + productsCount;
        const years = 6;

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    businesses,
                    projects,
                    years
                }
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

