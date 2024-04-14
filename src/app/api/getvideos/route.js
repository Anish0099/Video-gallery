import connectDB from "@/lib/db";
import { Video } from "@/lib/modals/Video";
import { auth } from "@clerk/nextjs";


export async function GET() {
    const { userId } = auth();
    try {
        // Ensure Mongoose connection is established before querying
        await connectDB();

        // Fetch videos with a timeout
        const videos = await Video.find().where('userId', userId); // Timeout after 30 seconds
        console.log(videos);
        return Response.json(videos);
    } catch (error) {
        // Handle potential timeout errors and log details
        console.error("Error fetching videos:", error);
        return Response.status(500).json({ message: "Error fetching videos" });
    }
}