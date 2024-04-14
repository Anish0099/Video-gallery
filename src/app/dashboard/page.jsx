"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { DialogDemo } from "@/components/UploadFiles";



const DashboardPage = () => {
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('/api/getvideos');
            const data = await response.json();
            setVideos(data);


        };

        fetchVideos();
    }, []);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    async function handlesubmit(formData) {


        console.log(formData.get('title'))
        console.log(formData.get('file'))
        const response = await fetch('/api/video', {
            method: 'POST',
            body: formData,
        })
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
                    <div className="flex gap-4">
                        <div className="w-full flex gap-2 p-3">
                            {/* <label>
                                <input className="hidden" name="file" type="file" id="file" />
                                <span>Upload File</span>
                            </label>
                            <label></label>
                            <input className="w-full" type="text" name="title" id="title" value={title} onChange={handleTitle} />
                            <Button type="submit" >
                                Add
                            </Button> */}
                            <Dialog >
                                <DialogTrigger asChild>
                                    <Button onClick={handleOpen} variant="outline">Upload</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Upload Video</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form action={handlesubmit} >
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Title
                                                </Label>
                                                <Input onChange={handleTitle} type="text" id="title"
                                                    name="title" className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Video
                                                </Label>
                                                <Input type="file" name="file" className="col-span-3" />
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <Button type="submit">Save</Button>
                                        </div>
                                    </form>

                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="h-8"></div>


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        {videos.map((video) => (
                            /* eslint-disable react/jsx-key */
                            <section key={video.url} className="p-2">
                                <Suspense fallback={<p>Loading video...</p>}>

                                    <VideoComponent src={video.url} title={video.title} />
                                    {/* <div className="bg-slate-300 font-bold p-2 my-2 rounded-sm">{video.title}</div> */}
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