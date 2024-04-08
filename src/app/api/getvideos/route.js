import connectDB from "@/lib/db";
import { Video } from "@/lib/modals/Video";


export async function GET() {
    try {
        // Ensure Mongoose connection is established before querying
        await connectDB();

        // Fetch videos with a timeout
        const videos = await Video.find().timeout(30000); // Timeout after 30 seconds

        return Response.json(videos);
    } catch (error) {
        // Handle potential timeout errors and log details
        console.error("Error fetching videos:", error);
        return Response.status(500).json({ message: "Error fetching videos" });
    }
}