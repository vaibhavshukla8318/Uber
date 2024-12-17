import React, {useRef, useEffect } from 'react'
import './css/confirmRideMapPage.css'
import { gsap } from 'gsap/gsap-core'
import FinishRide from './component/FinishRide'

const ConfirmRideMapPage = () => {
  const expandRef = useRef(null);
  const handleExpand = () => {
    // Collapse the full-height container
    gsap.to(expandRef.current, { top: "20%", duration: 0.5 });
  };
  useEffect(()=>{
    gsap.to(".destinationDistance", {top:"85%", duration: 0.5 });
  })

  return (
    <div className='container'>
     <div className='confirmRideMapPage'>
      <img src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif" alt="mapImage" />
      <div className='destinationDistance'>
        <h3>4 KM away</h3>
        <button onClick={handleExpand}>Complete Ride</button>
      </div>
     </div>
      <div className='confirmToStart' ref={expandRef}>
        <FinishRide />
      </div>
    </div>
  )
}

export default ConfirmRideMapPage