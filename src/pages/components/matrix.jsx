import React from 'react'

export default function matrix() {
  return (
    <main className=' border border-black w-full h-full flex'>
      <div className='flex justify-center m-auto mt-10 flex-col'>
        <div className='m-auto'>
          <h1 className='text-6xl font-bold font-mono'>Administracion De Servidores</h1>
        </div>
        <div className='border border-black w-3/4 m-auto mt-14 font-6xl'>
          <p className='font-mono text-2xl text-center'>La administración de servidores es una tarea fundamental en entornos de tecnología de la información (TI) y redes. Involucra la configuración, monitoreo, mantenimiento y gestión general de servidores para garantizar su funcionamiento eficiente, seguro y confiable.</p>
        </div>
      </div>
      <div id="matrix" className="matrix"></div>
    </main>
  )
}
