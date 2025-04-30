// "use server";

// import { hash, compare } from "bcryptjs";

// import { sign } from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { ObjectId } from "mongodb";
// import clientPromise from "@/lib/mongodb";
// import { generateConnectionCode } from "@/lib/utils";

// export async function createUser(userData: {
//   name: string;
//   email: string;
//   password: string;
// }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("couples_app");

//     // Check if user already exists
//     const existingUser = await db
//       .collection("users")
//       .findOne({ email: userData.email });
//     if (existingUser) {
//       return { success: false, error: "Email already in use" };
//     }

//     // Hash password
//     const hashedPassword = await hash(userData.password, 10);

//     // Generate connection code
//     const connectionCode = generateConnectionCode();

//     // Create user
//     const result = await db.collection("users").insertOne({
//       name: userData.name,
//       email: userData.email,
//       password: hashedPassword,
//       connectionCode,
//       partnerId: null,
//       createdAt: new Date(),
//       lastActive: new Date(),
//     });

//     // Create session
//     const token = sign(
//       { userId: result.insertedId.toString() },
//       process.env.JWT_SECRET || "fallback_secret",
//       {
//         expiresIn: "7d",
//       }
//     );

//     const cookieStore = await cookies();
//     cookieStore.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: "/",
//     });

//     return {
//       success: true,
//       connectionCode,
//     };
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return { success: false, error: "Failed to create user" };
//   }
// }

// export async function joinWithCode(userData: {
//   name: string;
//   email: string;
//   password: string;
//   connectionCode: string;
// }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("couples_app");

//     // Check if user already exists
//     const existingUser = await db
//       .collection("users")
//       .findOne({ email: userData.email });
//     if (existingUser) {
//       return { success: false, error: "Email already in use" };
//     }

//     // Find partner with connection code
//     const partner = await db
//       .collection("users")
//       .findOne({ connectionCode: userData.connectionCode });
//     if (!partner) {
//       return { success: false, error: "Invalid connection code" };
//     }

//     // Hash password
//     const hashedPassword = await hash(userData.password, 10);

//     // Create user
//     const result = await db.collection("users").insertOne({
//       name: userData.name,
//       email: userData.email,
//       password: hashedPassword,
//       connectionCode: null, // No need for a connection code
//       partnerId: partner._id,
//       createdAt: new Date(),
//       lastActive: new Date(),
//     });

//     // Update partner with this user's ID
//     await db.collection("users").updateOne(
//       { _id: partner._id },
//       {
//         $set: {
//           partnerId: result.insertedId,
//           connectionCode: null, // Clear connection code after it's used
//         },
//       }
//     );

//     // Create session
//     const token = sign(
//       { userId: result.insertedId.toString() },
//       process.env.JWT_SECRET || "fallback_secret",
//       {
//         expiresIn: "7d",
//       }
//     );

//     const cookieStore = await cookies();
//     cookieStore.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: "/",
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error joining with code:", error);
//     return { success: false, error: "Failed to join" };
//   }
// }

// export async function signIn(credentials: { email: string; password: string }) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("couples_app");

//     // Find user
//     const user = await db
//       .collection("users")
//       .findOne({ email: credentials.email });
//     if (!user) {
//       return { success: false, error: "Invalid email or password" };
//     }

//     // Verify password
//     const isPasswordValid = await compare(credentials.password, user.password);
//     if (!isPasswordValid) {
//       return { success: false, error: "Invalid email or password" };
//     }

//     // Update last active
//     await db
//       .collection("users")
//       .updateOne({ _id: user._id }, { $set: { lastActive: new Date() } });

//     // Create session
//     const token = sign(
//       { userId: user._id.toString() },
//       process.env.JWT_SECRET || "fallback_secret",
//       {
//         expiresIn: "7d",
//       }
//     );

//     const cookieStore = await cookies();
//     cookieStore.set("auth_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: "/",
//     });

//     return { success: true };
//   } catch (error) {
//     console.error("Error signing in:", error);
//     return { success: false, error: "Failed to sign in" };
//   }
// }

// export async function signOut() {
//   const cookieStore = await cookies();
//   cookieStore.delete("auth_token");
//   redirect("/");
// }

// export async function getCurrentUser() {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("auth_token")?.value;
//     if (!token) return null;

//     const decoded = verify(
//       token,
//       process.env.JWT_SECRET || "fallback_secret"
//     ) as { userId: string };

//     const client = await clientPromise;
//     const db = client.db("couples_app");

//     const user = await db
//       .collection("users")
//       .findOne({ _id: new ObjectId(decoded.userId) });
//     if (!user) return null;

//     return {
//       id: user._id.toString(),
//       name: user.name,
//       email: user.email,
//       partnerId: user.partnerId ? user.partnerId.toString() : null,
//     };
//   } catch (error) {
//     console.error("Error getting current user:", error);
//     return null;
//   }
// }

// function verify(token: string, secret: string) {
//   try {
//     return require("jsonwebtoken").verify(token, secret);
//   } catch (error) {
//     return null;
//   }
// }
"use server";

import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { generateConnectionCode } from "@/lib/utils";

// Create a new user and set an auth token cookie.
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db("couples_app");

    // Check if user already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: userData.email });
    if (existingUser) {
      return { success: false, error: "Email already in use" };
    }

    // Hash password and generate connection code
    const hashedPassword = await hash(userData.password, 10);
    const connectionCode = generateConnectionCode();

    // Insert new user in the database
    const result = await db.collection("users").insertOne({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      connectionCode,
      partnerId: null,
      createdAt: new Date(),
      lastActive: new Date(),
    });

    // Create a session token
    const token = sign(
      { userId: result.insertedId.toString() },
      process.env.JWT_SECRET || "varunuzhat",
      { expiresIn: "7d" }
    );

    // Set the auth token cookie (secure flag only in production)
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure only in production
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    });

    return { success: true, connectionCode };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

// Create a new user by joining with a partner's connection code.
export async function joinWithCode(userData: {
  name: string;
  email: string;
  password: string;
  connectionCode: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db("couples_app");

    // Check if user already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: userData.email });
    if (existingUser) {
      return { success: false, error: "Email already in use" };
    }

    // Find the partner by connection code
    const partner = await db
      .collection("users")
      .findOne({ connectionCode: userData.connectionCode });
    if (!partner) {
      return { success: false, error: "Invalid connection code" };
    }

    // Hash password and create the new user
    const hashedPassword = await hash(userData.password, 10);
    const result = await db.collection("users").insertOne({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      connectionCode: null, // No need for a connection code after joining
      partnerId: partner._id,
      createdAt: new Date(),
      lastActive: new Date(),
    });

    // Update partner document to link the two users and clear the connection code
    await db
      .collection("users")
      .updateOne(
        { _id: partner._id },
        { $set: { partnerId: result.insertedId, connectionCode: null } }
      );

    // Create session token
    const token = sign(
      { userId: result.insertedId.toString() },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Set the auth token cookie (secure flag only in production)
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error joining with code:", error);
    return { success: false, error: "Failed to join" };
  }
}

// Sign in an existing user.
export async function signIn(credentials: { email: string; password: string }) {
  try {
    const client = await clientPromise;
    const db = client.db("couples_app");

    // Find the user by email
    const user = await db
      .collection("users")
      .findOne({ email: credentials.email });
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Verify the password
    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // Update the lastActive timestamp
    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: { lastActive: new Date() } });

    // Create a session token
    const token = sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Set the auth token cookie (secure flag only in production)
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error signing in:", error);
    return { success: false, error: "Failed to sign in" };
  }
}

// Sign out the current user by deleting the auth token cookie.
export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/");
}

// Retrieve the current user based on the auth token cookie.
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return null;

    const decoded = verifyToken(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );
    if (!decoded) return null;

    const client = await clientPromise;
    const db = client.db("couples_app");

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) return null;

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      partnerId: user.partnerId ? user.partnerId.toString() : null,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Helper function to verify JWT tokens.
function verifyToken(token: string, secret: string) {
  try {
    return require("jsonwebtoken").verify(token, secret) as { userId: string };
  } catch (error) {
    return null;
  }
}
