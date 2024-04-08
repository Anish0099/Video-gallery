import connectDB from "@/lib/db";
import { Video } from "@/lib/modals/Video";


export async function GET() {
    connectDB();
    const videos = await Video.find();
    return Response.json(videos);
}