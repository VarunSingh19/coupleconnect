"use server";
import clientPromise from "@/lib/mongodb";
import { getCurrentUser } from "./auth-actions";
import { uploadImage } from "@/lib/cloudinary";

export async function getRecentMedia(limit = 3) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected");
    }

    const client = await clientPromise;
    const db = client.db("couples_app");

    const media = await db
      .collection("media")
      .find({
        $or: [{ userId: user.id }, { userId: user.partnerId }],
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return media.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      url: item.url,
      createdAt: item.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error getting recent media:", error);
    return [];
  }
}

export async function getAllMedia() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected");
    }

    const client = await clientPromise;
    const db = client.db("couples_app");

    const media = await db
      .collection("media")
      .find({
        $or: [{ userId: user.id }, { userId: user.partnerId }],
      })
      .sort({ createdAt: -1 })
      .toArray();

    return media.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      description: item.description,
      url: item.url,
      mediaType: item.mediaType,
      createdAt: item.createdAt.toISOString(),
      userId: item.userId,
    }));
  } catch (error) {
    console.error("Error getting all media:", error);
    return [];
  }
}

export async function uploadMedia(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    const title = (formData.get("title") as string) || file.name;
    const description = (formData.get("description") as string) || "";

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadImage(file);

    // Save reference in MongoDB
    const client = await clientPromise;
    const db = client.db("couples_app");

    const mediaItem = {
      userId: user.id,
      title,
      description,
      mediaType: file.type.startsWith("image/") ? "image" : "video",
      url: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
      createdAt: new Date(),
    };

    const result = await db.collection("media").insertOne(mediaItem);

    return {
      success: true,
      media: {
        id: result.insertedId.toString(),
        title: mediaItem.title,
        url: mediaItem.url,
        createdAt: mediaItem.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error uploading media:", error);
    throw error;
  }
}
