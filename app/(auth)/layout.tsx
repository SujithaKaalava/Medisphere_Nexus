import Image from 'next/image'
import React from 'react'

const Authlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-1/2 h-full flex items-center justify-center'>{children}</div>
        <div className='hidden md:flex w-1/2 h-full relative'>  
        <Image
        src="https://media.istockphoto.com/id/2153813386/photo/hospital-teamwork-and-doctors-with-folder-tablet-and-brainstorming-for-healthcare-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=l0MBHeoRSdW2QqYMyRCwS4JT6RdOlDDrdpnzu1uWZW8="
        height={5000}
        width={1500}
        alt="doctors"
        className="w-full h-full object-cover"
        unoptimized
        />
        <div className='absolute top-0 w-full h-full bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center'>
            <h1 className='text-3xl text-white 2xl:text-5xl font-bold'>Kinda HMS</h1>
            <p className='text-blue-600 text-base'>you are welcome!</p>
        </div>
        </div>
    </div>
  )
}

export default Authlayout
