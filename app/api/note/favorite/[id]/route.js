import { Favorites } from "@/app/models/favorite"; // Adjust the path to your favorite model
import { NextResponse } from "next/server";

// POST handler for creating a new favorite trip
export async function POST(request, { params }) {
  const { userId } = params;  // Get the user ID from the URL parameters

  try {
    const body = await request.json();
    const { tripName, tripCountry, startDate, endDate, noteId } = body;  // Include noteId

    // Validate the request body
    if (!tripName || !tripCountry || !startDate || !endDate || !userId || !noteId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new favorite trip
    const newFavorite = new Favorites({
      tripName,
      tripCountry,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId,  // Use the user ID from the URL
      noteId,  // Add the note ID
    });

    // Save the favorite trip to the database
    await newFavorite.save();

    // Return the saved favorite trip data
    return NextResponse.json(
      {
        _id: newFavorite._id,
        tripName: newFavorite.tripName,
        tripCountry: newFavorite.tripCountry,
        startDate: newFavorite.startDate,
        endDate: newFavorite.endDate,
        userId: newFavorite.userId,
        noteId: newFavorite.noteId,  // Include note ID in the response
        message: "Favorite trip added successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding favorite trip:", error);
    return NextResponse.json(
      { message: "Failed to add favorite trip", error: error.message },
      { status: 500 }
    );
  }
}
