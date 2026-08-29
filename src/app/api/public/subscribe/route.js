import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email || typeof email !== 'string' || !email.trim()) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address" },
                { status: 400 }
            );
        }

        const cleanEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address format" },
                { status: 400 }
            );
        }

        // Check if email already subscribed in supports table
        const checkRes = await dbQuery(
            "SELECT id FROM supports WHERE LOWER(email) = $1 AND subject = 'Newsletter Subscription'",
            [cleanEmail]
        );

        if (checkRes.rows.length > 0) {
            return NextResponse.json(
                { success: false, message: "You are already subscribed to our newsletter!" },
                { status: 400 }
            );
        }

        const rawPrefix = cleanEmail.split('@')[0] || 'Subscriber';
        const extractedName = rawPrefix.charAt(0).toUpperCase() + rawPrefix.slice(1);

        const insertRes = await dbQuery(
            `INSERT INTO supports (name, email, subject, description)
             VALUES ($1, $2, 'Newsletter Subscription', 'Subscribed via Website Footer Newsletter')
             RETURNING id, name, email, subject, created_at`,
            [extractedName, cleanEmail]
        );

        return NextResponse.json(
            {
                success: true,
                message: "Thank you for subscribing to our newsletter!",
                data: insertRes.rows[0]
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message || "Failed to subscribe" },
            { status: 500 }
        );
    }
}

