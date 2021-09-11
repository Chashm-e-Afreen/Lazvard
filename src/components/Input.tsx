import React, { useState, ChangeEvent } from 'react';
import { MainCourse } from '../core/Output';
import { partition, splitInput } from '../core/ProcessInput';
import '../utils/css/components/input.css';

export var output: LineOutput[] = []

export interface LineOutput {
    metreComb: { encoding: string, name: string, afaeel: string },
    words: string[],
    weights: string[],
    correction: string[],
    fluencyScore: number
}

function isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
}


export function InputBox(props: { update: Function, setLoading: Function }) {
    const [text, setText] = useState("");
    const handleChange = (event: ChangeEvent<{ value: string, selectionEnd: number, setSelectionRange: Function }>) => {
        const value = event?.currentTarget.value;
        setText(value);
    }


    return (
        <div className="lg:w-2/3 w-5/6 mt-16 lg:mt-6 flex items-center justify-center flex-col gap-10">
            <textarea dir="rtl" name="input" id="InputText" className="w-full lg:w-11/12 shadow-sm rounded-lg plex mt-6
             h-96 text-lg outline-none text-white ring-gray-200 focus:ring-blue-400 ring-1 focus:ring-2 ring-opacity-30 border-gray-700 
            py-7 px-7 resize-none leading-loose bg-gray-700 bg-opacity-10 focus:bg-transparent transition-colors duration-200 ease-in-out opacity-75" onChange={handleChange}></textarea>
            <button id="SubmitButton" onClick={GetResult} className="text-white w-48 h-24 plex bg-gray-700 border-0 border-transparent shadow-none py-2 px-6 focus:outline-none hover:bg-white hover:text-gray-800 rounded-xl text-3xl duration-500">ارسال</button>
        </div>
    )

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function GetResult() {
        if (isBlank(text)) return

        props.setLoading("h-14 w-14 mt-10")
        window.location.hash = ""
        window.location.hash = "loader"
        await sleep(5)

        const lines = splitInput(text)
        const [valid, invalid] = partition(lines, el => el.unknownWords.length === 0)

        const output = MainCourse(valid, invalid)

        await sleep(5);
        props.update(output)
        props.setLoading("hidden")
        window.location.hash = "output"
    }

}

