import { Notes } from "@/app/models/note";  // Ensure the correct path
import { NextResponse } from "next/server";

// POST handler for creating a new note
export async function POST(request) {
  try {
    const body = await request.json();
    const { tripName, tripCountry, startDate, endDate, description, userId } = body;

    // Validate the request body
    if (!tripName || !tripCountry || !startDate || !endDate || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new note
    const newNote = new Notes({
      tripName,
      tripCountry,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      description,
      userId,  // Use the MongoDB user ID
    });

    // Save the note to the database
    await newNote.save();

    // Return the saved note data along with a success message
    return NextResponse.json(
      {
        message: "Note created successfully!",  // Success message
        note: {  // Return the note data
          _id: newNote._id,
          tripName: newNote.tripName,
          tripCountry: newNote.tripCountry,
          startDate: newNote.startDate,
          endDate: newNote.endDate,
          description: newNote.description,
          userId: newNote.userId,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { message: "Failed to create note", error: error.message },
      { status: 500 }
    );
  }
}
