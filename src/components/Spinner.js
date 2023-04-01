import React from 'react'
import loading from '../loading.gif'
export default function Spinner() {
  return (
    <div className='text-center'>
      <img src={loading} alt="" className='w-5' />
    </div>
  )
}
