import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    // Fetch albums with their images ordered by the 'order' field
    const { data, error } = await supabase
        .from("gallery_albums")
        .select(`
      *,
      images:gallery_images(*)
    `)
        .order("order", { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend expectation (sorting images if needed)
    const albums = data.map(album => ({
        ...album,
        images: (album.images || []).sort((a: any, b: any) => a.order - b.order)
    }));

    return NextResponse.json({ albums });
}

export async function POST(request: Request) {
    // CREATE ALBUM
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        // Check if it's an album creation or image addition?
        // For simplicity, let's assume this endpoint handles album creation/updates
        // But dealing with nested images is complex.
        // Let's implement basic Album CRUD here.

        // If body has 'images', we might need to handle them separately or in a transaction.
        // For now, let's just insert the album.

        const { images, ...albumData } = body;

        const { data: newAlbum, error } = await supabase
            .from("gallery_albums")
            .insert(albumData)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true, album: newAlbum });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    // UPDATE ALBUM
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { id, images, ...updates } = body; // Segregate images from album fields

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        const { error } = await supabase
            .from("gallery_albums")
            .update(updates)
            .eq("id", id);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    // DELETE ALBUM (Cascade deletes images)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await supabase.from("gallery_albums").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
