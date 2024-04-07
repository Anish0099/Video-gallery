
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { UserButton, auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const DashboardPage = async () => {
    const { userId } = auth();
    console.log(userId)


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
                        <Link href={"/video-call"}>
                            <Button>
                                Start Video
                            </Button>
                        </Link>

                        <div></div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default DashboardPage;