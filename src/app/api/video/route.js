import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
import { Video } from "@/lib/modals/Video";
import connectDB from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
    await connectDB();
    const { userId } = auth();
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');
    if (formData.has('file')) {
        console.log(file);
        console.log(title);
        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });

        const randomId = uniqid();
        const ext = file.name.split('.').pop();
        console.log(ext);
        const newFilename = randomId + '.' + ext;
        const bucketName = process.env.BUCKET_NAME;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }

        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            ACL: 'public-read',
            Body: Buffer.concat(chunks),
            ContentType: file.type,
        }));

        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        console.log(link)




        const newVideo = await new Video({
            userId: userId,
            title,
            url: link
        });

        await newVideo.save();

        console.log('Video saved to database:', link);
        console.log(newVideo)

        return Response.json(newVideo);
    }

}


