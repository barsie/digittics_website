// contain social media links

import React from 'react'

type CTAtype = {
  text?: string
}

const CTA = ({text}:CTAtype) => {
  return (
    <div>{text}</div>
  )
}

export default CTA