import { Favorites } from "@/app/models/favorite"; // Adjust the path to your Favorites model
import { NextResponse } from "next/server";

// DELETE handler for deleting a favorite trip by ID
export async function DELETE(request, { params }) {
  const { id } = params;  // Get the favorite trip ID from the URL parameters

  try {
    // Find and delete the favorite trip by ID
    const deletedFavorite = await Favorites.findByIdAndDelete(id);

    // Check if the favorite trip was found and deleted
    if (!deletedFavorite) {
      return NextResponse.json(
        { message: "Favorite trip not found" },
        { status: 404 }
      );
    }

    // Return success message
    return NextResponse.json(
      { message: "Favorite trip deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting favorite trip:", error);
    return NextResponse.json(
      { message: "Failed to delete favorite trip", error: error.message },
      { status: 500 }
    );
  }
}
