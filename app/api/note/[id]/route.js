import { Notes } from "@/app/models/note";  
import { NextResponse } from "next/server";

// GET handler for fetching notes by user ID
export async function GET(request, { params }) {
  const { id } = params;  // Get the user ID from the URL parameters

  try {
    // Fetch notes created by the user with the given ID
    const userNotes = await Notes.find({ userId: id });

    // Check if notes were found
    if (!userNotes.length) {
      return NextResponse.json(
        { message: "No notes found for this user" },
        { status: 404 }
      );
    }

    // Return the notes with a success message
    return NextResponse.json(
      {
        message: "Notes fetched successfully",  // Success message
        notes: userNotes,  // Include the fetched notes
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { message: "Failed to fetch notes", error: error.message },
      { status: 500 }
    );
  }
}
