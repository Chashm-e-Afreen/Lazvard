
import React from "react"
import '../utils/css/components/loader.css';


export const Loader = (props: { loading: string }) => {
  return (
    <div className={`js-loading ${props.loading}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className={`inner-loading ${props.loading}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export const WaveLoader = (props: { loading: string }) => {
  return (
      <div className={`loading ${props.loading}`} id="loader">
        <div className='loader'></div>
        loading
      </div>
  )
}

