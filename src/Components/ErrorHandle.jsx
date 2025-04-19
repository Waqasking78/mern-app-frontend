import React from 'react'

const ErrorHandle = ({err}) => {
  return (
    <div>
        <p className='text-xs text-red-500'>{err}</p>
    </div>
  )
}

export default ErrorHandle