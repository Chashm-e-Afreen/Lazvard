import React from 'react';
import { LineOutput } from '../components/Input'
import { Card } from '../components/Card';
import "../utils/css/components/output.css"

export const Output = (props: {output: LineOutput[]}) => {
    return (
        <div dir="rtl" id="output" className={`grid output-grid lg:border-l-4 mt-5 py-10 lg:gap-8 gap-16 border-gray-200 border-dotted border-opacity-10 justify-center lg:row-span-2 lg:overflow-auto`}>
            {props.output?.map((elem, ind) => <Card metreComb={elem.metreComb} words={elem.words} weights={elem.weights}
                correction={elem.correction} fluencyScores={elem.fluencyScore} key={elem.words[ind] + elem.correction[ind]}></Card>)}
        </div>
    )
}