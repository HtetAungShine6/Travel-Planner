import { Users } from "@/app/models/user";  // Correct path to the user model
import { NextResponse } from "next/server";

// POST handler for user sign-in and registration
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, fId } = body;  // Get email and fId from request body

    // Validate request
    if (!email || !fId) {
      return NextResponse.json(
        { message: "Email and fId are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ email, fId });

    if (existingUser) {
      // User exists, return user data
      return NextResponse.json(
        {
          _id: existingUser._id,
          email: existingUser.email,
          fId: existingUser.fId,
        },
        { status: 200 }
      );
    }

    // If user doesn't exist, create a new one
    const newUser = new Users({
      email,
      fId,
    });

    // Save the new user to the database
    await newUser.save();

    // Return the newly created user's data
    return NextResponse.json(
      {
        _id: newUser._id,
        email: newUser.email,
        fId: newUser.fId,
        message: "New user created successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "An error occurred during sign-in", error: error.message },
      { status: 500 }
    );
  }
}
