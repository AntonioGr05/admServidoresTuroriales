import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className='flex content-center items-center text-2xl bg-[#403C35] h-16 p-3'>
      <div className='flex w-3/5'>
        <Link href={"/"} className='text-white roboto font-roboto'><p>Administracion de Servidores</p></Link>
      </div>
      <ul className='flex w-2/5 justify-between' >
        <Link href={"/"} className='flex  bg-[#73675D] h-10 w-20 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>DNS</p>
        </Link>
        <li className='flex bg-[#73675D] h-10 w-20 rounded-md content-center justify-center hover:bg-[#D9D6D0]'>
          <Link href={"/"} className=' text-white mt-1 hover:text-black'>DHCP</Link>
        </li>
        <li className='flex bg-[#73675D] h-10 w-20 rounded-md content-center justify-center hover:bg-[#D9D6D0]'>
          <Link href={"/"} className=' text-white mt-1 hover:text-black'>FTP</Link>
        </li>
        <li className='flex bg-[#73675D] h-10 w-20 rounded-md content-center justify-center hover:bg-[#D9D6D0]'>
          <Link href={"/"} className=' text-white mt-1 hover:text-black'>FTP</Link>
        </li>
        <li className='flex bg-[#73675D] h-10 w-20 rounded-md content-center justify-center hover:bg-[#D9D6D0]'>
          <Link href={"/"} className=' text-white mt-1 hover:text-black'>FTP</Link>
        </li>
        <li className='flex bg-[#73675D] h-10 w-20 rounded-md content-center justify-center hover:bg-[#D9D6D0]'>
          <Link href={"/"} className=' text-white mt-1 hover:text-black'>FTP</Link>
        </li>
      </ul>
    </nav>
  )
}
