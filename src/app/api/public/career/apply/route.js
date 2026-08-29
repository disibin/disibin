import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/database/pg";
import cloudinary from "@/lib/database/cloudinary";

// POST submit job application (Public candidate submission with resume upload)
export async function POST(req) {
    try {
        const formData = await req.formData();

        const job_id = formData.get('job_id');
        const full_name = formData.get('full_name');
        const email = formData.get('email');
        const cover_letter = formData.get('cover_letter');
        const resumeFile = formData.get('resume'); // File object

        if (!job_id || !full_name || !email) {
            return NextResponse.json({ success: false, message: "Missing required fields (job_id, full_name, email)" }, { status: 400 });
        }

        // Upload resume to Cloudinary if provided as a File or String
        let resume_url = "";

        if (resumeFile && typeof resumeFile === 'object' && resumeFile.arrayBuffer) {
            try {
                const bytes = await resumeFile.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "resumes",
                            resource_type: "auto",
                            public_id: `resume_${Date.now()}_${full_name.trim().replace(/\s+/g, '_')}`
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                resume_url = uploadResult.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary resume upload failed:", uploadError);
                return NextResponse.json({ success: false, message: "Failed to upload resume document" }, { status: 500 });
            }
        } else if (typeof resumeFile === 'string' && resumeFile.trim()) {
            resume_url = resumeFile.trim();
        } else {
            return NextResponse.json({ success: false, message: "Please attach a resume file" }, { status: 400 });
        }

        const subject = `Job Application - Position #${job_id}`;
        const description = `Candidate: ${full_name.trim()}\nEmail: ${email.trim()}\nResume: ${resume_url}\n\nCover Letter:\n${cover_letter ? cover_letter.trim() : 'N/A'}`;

        const res = await dbQuery(
            `INSERT INTO supports (name, email, subject, description)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email, subject, created_at`,
            [full_name.trim(), email.trim().toLowerCase(), subject, description]
        );

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully!",
            data: res.rows[0]
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

