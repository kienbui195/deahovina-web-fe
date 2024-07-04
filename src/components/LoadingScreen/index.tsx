import * as React from 'react'

const LoadingScreen = () => {
  return <div className='fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center'>
    <div className='w-36 h-36 border-2 border-l-0 border-blue-700 animate-spin'></div>
  </div>
}

export default LoadingScreen