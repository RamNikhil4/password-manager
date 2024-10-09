import React from 'react'

const footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'> 
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-700 '>&lt;</span>
                <span>Password</span>
                <span className='text-green-700 '>BANK/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                created with <img  src="icons/heart-2.png" alt="heart" className='w-6' /> by ram Nikhil
            </div>
        </div>
    )
}

export default footer