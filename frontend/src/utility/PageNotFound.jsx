import React from 'react'
import pageNotFound from '/pageNotFound.svg'

const PageNotFound = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <img className='h-1/3' src={pageNotFound} alt="404" />
    </div>
  )
}

export default PageNotFound