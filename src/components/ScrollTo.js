import React from 'react'

function ScrollTo(){
  return (
    <img src="/pixel.png" alt={""} onLoad={(e) => e.target.scrollIntoView() }/>
  )
}

export default ScrollTo;
