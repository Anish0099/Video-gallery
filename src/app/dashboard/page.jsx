"use client"
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/InputFile";
import { Separator } from "@/components/ui/separator";

import { UserButton, auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import VideoComponent from "@/components/ui/video-component";



const DashboardPage = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('/api/getvideos');
            const data = await response.json();
            setVideos(data);
        };

        fetchVideos();
    }, []);



    function handleFileChange(ev) {
        const file = ev.target.files?.[0];
        console.log(file)
        if (file) {
            const data = new FormData;
            data.set('file', file);
            fetch('/api/video', {
                method: 'POST',
                body: data,
            }).then(res => {
                res.json().then(link => {
                    console.log(link);
                })
            })

        }
    }


    return (
        <>
            <div className="grainy min-w-screen min-h-screen">
                <div className="max-w-7xl mx-auto p-10">
                    <div className="h-14"></div>
                    <div className="flex justify-between items-center md:flex-row flex-col">
                        <div className="flex items-center">
                            <Link href="/">
                                <Button className="bg-violet-900" size="sm">
                                    <ArrowLeft className="mr-1 w-4 h-4" />
                                    Back
                                </Button>
                            </Link>
                            <div className="w-4"></div>
                            <h1 className="text-3xl font-bold text-gray-900">PLayground</h1>
                            <div className="w-4"></div>
                            <UserButton />
                        </div>
                    </div>

                    <div className="h-8"></div>
                    <Separator />
                    <div className="h-8"></div>
                    <div className="flex gap-3">
                        <form>
                            <input type="file" onChange={handleFileChange} />
                            <Button >
                                Add
                            </Button>
                        </form>
                        <div className="h-8"></div>


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        {videos.map((video) => (
                            <section key={video.url} className="p-2">
                                <Suspense fallback={<p>Loading video...</p>}>
                                    <VideoComponent src={video.url} />
                                </Suspense>
                                {/* Other content of the page */}
                            </section>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default DashboardPage;