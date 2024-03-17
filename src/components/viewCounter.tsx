"use client";
 
import { useEffect } from "react";
import useSWR from "swr";
import { EyeIcon } from "@heroicons/react/24/outline"; 

export default function ViewCounter({ slug, noIncrement }: { slug: string, noIncrement?: boolean}) {

    const { data, error, isLoading } = useSWR(`/api/view/${slug}`, async (url) => {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.json();
    });

    useEffect(() => {
        if (!noIncrement) {
            fetch(`/api/view/${slug}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }, [slug, noIncrement]);

    return (
        <span
            style={{
                fontSize: '20px',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                height: '30px',
            }}
        >
            <EyeIcon
                style={{ 
                    width: '20px',
                    height: '20px',
                    color: "#555"
                }}
            />{" "}
            <span> 
                {
                    isLoading ?
                            'Loading'
                        :
                            (
                                error || !data ?
                                        'Not found'
                                    :
                                        Intl.NumberFormat("en-US", { notation: "compact" }).format(data.views)
                            )
                }
            </span>
        </span>
    )
};