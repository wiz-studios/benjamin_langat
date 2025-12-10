import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("politician").select("*").single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();

    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();

        // We assume there's only one politician profile, so we query it first to get the ID
        const { data: current, error: fetchError } = await supabase
            .from("politician")
            .select("id")
            .single();

        if (fetchError || !current) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const { error: updateError } = await supabase
            .from("politician")
            .update(body)
            .eq("id", current.id);

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
