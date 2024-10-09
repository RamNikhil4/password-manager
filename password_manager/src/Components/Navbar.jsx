import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white w-full'>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className="logo font-bold text-2xl"> 
        <span className='text-green-700 '>&lt;</span>
                <span>Password</span>
            <span className='text-green-700 '>BANK/&gt;</span>
            </div>
        {/*<ul>
            <li className='flex gap-4'>
                <a href="/" className='hover:font-bold'>Home</a>
                <a href="#" className='hover:font-bold'>About</a>
                <a href="#"className='hover:font-bold'>Contact</a>
            </li>
        </ul>*/}
        <button className='text-white bg-green-700 my-5 rounded-full flex  justify-between items-center ring-white ring-1'>
            <img className='invert w-10 p-1' src='/icons/github-mark.svg' alt='github'/>
            <span className='font-bold px-2'> Github</span>
        </button>
        </div>
    </nav>
   
  )
}

export default Navbar