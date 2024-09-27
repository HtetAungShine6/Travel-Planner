import { Notes } from "@/app/models/note";  // Ensure the correct path
import { NextResponse } from "next/server";

// PUT handler for updating a note by its ID and user ID
export async function PUT(request) {
  try {
    const body = await request.json();  // Parse the request body
    const { noteId, tripName, tripCountry, startDate, endDate, description, userId } = body;

    // Validate if the necessary fields are present
    if (!noteId || !tripName || !tripCountry || !startDate || !endDate || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the note by its ID and userId to ensure only the owner can update it
    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return NextResponse.json(
        { message: "Note not found or you do not have permission to update it" },
        { status: 404 }
      );
    }

    // Update the note details
    note.tripName = tripName;
    note.tripCountry = tripCountry;
    note.startDate = new Date(startDate);
    note.endDate = new Date(endDate);
    note.description = description;

    // Save the updated note
    await note.save();

    // Return the updated note data along with a success message
    return NextResponse.json(
      {
        message: "Note updated successfully!",  // Success message
        note: {  // Return the updated note data
          _id: note._id,
          tripName: note.tripName,
          tripCountry: note.tripCountry,
          startDate: note.startDate,
          endDate: note.endDate,
          description: note.description,
          userId: note.userId,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { message: "Failed to update note", error: error.message },
      { status: 500 }
    );
  }
}
