'use client'
import AppCard from "../elements/appcard";
import React from "react";
import Image from "next/image";
import { formatDateTime } from "@/utils/logic/helper";
import Markdown from "react-markdown";

export default function PatFindingSingle({ finding, patid, dict, lang, classname, children }) {
    const [open, setOpen] = React.useState(false);
    const images = [
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_1.jpg",
        //     width: "1024",
        //     height: "768",
        // },
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_2.jpg",
        //     width: "1024",
        //     height: "768",
        // },
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_3.jpg",
        //     width: "1024",
        //     height: "768",
        // },
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_4.jpg",
        //     width: "1024",
        //     height: "768",
        // },
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_5.jpg",
        //     width: "1024",
        //     height: "768",
        // },
        // {
        //     src: "https://ik.imagekit.io/cieslik/ultrasound/us_6.jpg",
        //     width: "1024",
        //     height: "768",
        // },
    ];

    return (
        <div className="mt-4">
            <AppCard classname="col-span-1 sm:col-span-2" title={dict.general.finding+": " + finding.data.title + "; " + formatDateTime(finding.date)}>
                <Markdown >{finding.data.text}</Markdown>
                {finding.data?.images == undefined ? null : <div className="grid grid-cols-3 gap-4">
                    {finding.data.images.map((image, index) => (
                        <div key={index}>
                            <a href={image} target="_">
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    layout="responsive"
                                />
                            </a>
                        </div>
                    ))}
                </div>}
            </AppCard>
        </div>
    )
}
