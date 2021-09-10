import React from "react";

export function TextCol(props: { word: string, weight: string, correction: string }) {
    const classname = "text-white border-2 rounded-lg border-opacity-20 border-gray-100 text-center border-dashed"
    return (
        <div dir="rtl" className="grid bg-transparent text-2xl justify-center items-center grid-cols-3 rounded col-span-3 gap-1">
            <div className={classname}>{props.word}</div>
            <div className={classname}>{props.weight}</div>
            <div className={classname}>{props.correction}</div>
        </div>
    );
}

export function HeaderRow(props: { state: string }) {

    const classname = `grid w-full h-6 bg-transparent justify-center grid-cols-3 col-span-3 ${props.state}`
    return (
        <div dir="rtl" className={classname}>
            <div className="text-gray-200 text-2xl text-center flex flex-row gap-2 items-center justify-center">
            <div className="text-right opacity-70">{"لفظ"}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
            <div className="text-gray-200 text-2xl text-center flex flex-row gap-2 items-center justify-center">
                <div className="text-right opacity-70">{"وزن"}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="text-gray-200 text-2xl text-center flex flex-row gap-2 items-center justify-center">
                <div className="text-right opacity-70">{"مجوزہ وزن"}</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            </div>
        </div>
    );
}

