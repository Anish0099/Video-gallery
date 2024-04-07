"use client";
import React from "react";
import Typewriter from "typewriter-effect";



const TypewriterTitle = () => {
    return (
        <Typewriter
            options={{
                loop: true,
            }}
            onInit={(typewriter) => {
                typewriter
                    .typeString("🧑‍💻 Coding platform")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("🤖 Pair programming")
                    .start();
            }}
        />
    );
};

export default TypewriterTitle;
