import { Favorites } from "@/app/models/favorite"; // Ensure the correct path to your Favorites model
import { NextResponse } from "next/server";

// GET handler for fetching favorites by user ID
export async function GET(request, { params }) {
  const { id } = params;  // Get the user ID from the URL parameters

  try {
    // Fetch favorite trips for the user with the given ID
    const userFavorites = await Favorites.find({ userId: id }); // Adjust based on your data structure

    // Check if favorites were found
    if (!userFavorites || userFavorites.length === 0) {
      return NextResponse.json(
        { message: "No favorites found for this user" },
        { status: 404 }
      );
    }

    // Return the favorites
    return NextResponse.json(userFavorites, { status: 200 });

  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Failed to fetch favorites", error: error.message },
      { status: 500 }
    );
  }
}
