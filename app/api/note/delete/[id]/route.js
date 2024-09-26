import { Notes } from "@/app/models/note";  
import { NextResponse } from "next/server";

// DELETE handler for deleting a note by its ID
export async function DELETE(request, { params }) {
  const { id } = params;  // Get the note ID from the URL parameters

  try {
    // Find and delete the note
    const deletedNote = await Notes.findByIdAndDelete(id);

    // Check if the note was found and deleted
    if (!deletedNote) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    // Return success message
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { message: "Failed to delete note", error: error.message },
      { status: 500 }
    );
  }
}
