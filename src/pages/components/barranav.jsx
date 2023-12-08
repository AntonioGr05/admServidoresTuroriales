import React from 'react'
import Link from 'next/link'
export default function Navbar() {
  return (
    <nav className='flex fixedtop content-center items-center text-2xl bg-[#403C35] h-16 p-3 mb-2'>
      <div className='flex w-3/5'>
        <Link href={"/"} className='text-white roboto font-roboto'><p>Administracion de Servidores</p></Link>
      </div>
      <ul className='flex w-2/5 justify-between' >
        <Link href={"/dns"} className='flex  bg-[#73675D] h-10 w-20 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>DNS</p>
        </Link>
        <Link href={"/dhcp"} className='flex  bg-[#73675D] h-10 w-20 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>DHCP</p>
        </Link>
        <Link href={"/ftp"} className='flex  bg-[#73675D] h-10 w-20 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>FTP</p>
        </Link>
        <Link href={"/correo"} className='flex  bg-[#73675D] h-10 w-28 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>CORREO</p>
        </Link>
        <Link href={"/http"} className='flex  bg-[#73675D] h-10 w-20 rounded-md content-center justify-center font-roboto hover:bg-[#D9D6D0]'>
          <p className='mt-1 text-white hover:text-black'>HTTP</p>
        </Link>
      </ul>
    </nav>
  )
}
