import React from 'react'
import { HeaderRow, TextCol } from "./Text"

const MetreTag = (props: { metreCode: string, metreName: string }) => {
    return (
        <div className="grid bg-transparent grid-cols-2 pt-6 px-6 gap-6">
            <div className="text-gray-300 text-center opacity-80 border-dotted border-l-2 text-2xl px-4 border-opacity-20">{props.metreCode}</div>
            <div className="text-gray-300 text-center opacity-80 text-2xl">{props.metreName}</div>
        </div>
    )
}

export const Card = (props: {
    metreComb: { encoding: string, name: string, afaeel: string }, words: string[],
    weights: string[], correction: string[], fluencyScores: number
}) => {

    const state = props.weights.join() === props.correction.join() ? "hidden" : ""
    return (
        <div className="grid bg-gray-700 rounded-t-2xl lg:max-w-xl bg-opacity-20 grid-cols-1 gap-6">
            <MetreTag metreCode={props.metreComb.afaeel} metreName={props.metreComb.name}></MetreTag>
            <div className="grid justify-center items-center px-10 text-3xl text-bold col-span-2 text-white">{props.words.join(' ')}</div>
            <div dir="rtl" className="grid col-span-2 grid-flow-row overflow-auto gap-6">
                <HeaderRow state={state}></HeaderRow>
                {props.words.map((val, ind) => {  //if islah is removing words
                    if (props.weights[ind] !== props.correction[ind] && props.metreComb.afaeel !== props.metreComb.name) {
                        const cor = (props.correction[ind] === "") ? "حذف" : props.correction[ind]
                        return <TextCol word={val} weight={props.weights[ind]} correction={cor} key={cor + val}></TextCol>
                    } else { //if word is unknown
                        return (props.weights[ind] === "نامعلوم") ?
                            <TextCol word={val} weight={props.weights[ind]} correction={"حذف"} key={ind + val + props.weights[ind]}></TextCol> : null
                    }
                })}
            </div>
            <Label weights={props.weights} correction={props.correction} fluencyscore={props.fluencyScores}></Label>
        </div>
    )
}

const green = { background: "#85fc98" };
const red = { background: "#f4544a", color: "#fff3f0" };

const Label = (props: { weights: string[], correction: string[], fluencyscore: number }) => {
    if (props.weights.join('') === props.correction.join('')) {
        return (<div className="flex flex-col col-span-2 rounded-b-3xl bg-transparent self-end text-center text-white">
            <div className="grid bg-gray-600 bg-opacity-30 h-14 items-center">روانی سکور</div>
            <div className="grid text-3xl text-gray-900 h-12 rounded-b-2xl items-center justify-center text-center" style={green}>{props.fluencyscore}</div>
        </div>)
    }
    else
        return <div className="col-span-2 h-12 rounded-b-3xl grid items-center self-end justify-center" style={red}>ناموزوں</div>
}

