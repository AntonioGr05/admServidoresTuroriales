import React from 'react'
import Image from 'next/image'
import DNS from '../../../public/dns.svg'
import FTP from '../../../public/ftp.svg'
import DHCP from '../../../public/dhcp.svg'

export default function TarjetasInfo() {
  return (
    <>  
      <div className='flex flex-row w-4/5 m-auto h-[26rem]'>
        <div className='borde mt-10 m-2 h-1/1'>
            <div className='flex flex-col justify-center border p-2 rounded-lg shadow-xl bg-[#9d9188] h-full'>
                <Image className='m-auto' src={DNS} alt='Ubuntu Logo' width={160} />
                <div className='flex flex-col text-center'>
                    <h3 className='text-white text-2xl font-bold'>DNS</h3>
                    <p className='text-white'>El Sistema de Nombres de Dominio (DNS) es un protocolo fundamental en internet que traduce los nombres de dominio legibles por humanos en direcciones IP utilizadas por las computadoras para identificar y comunicarse entre sí.</p>
                </div>
            </div>
        </div>
        <div className='borde mt-10 m-2 h-1/1'>
            <div className='flex flex-col justify-center borde p-2 rounded-lg shadow-xl bg-[#9d9188] h-full pb-3'>
                <Image className='m-auto' src={FTP} alt='Ubuntu Logo' width={160} />
                <div className='flex flex-col text-center '>
                    <h3 className='text-white text-2xl font-bold'>FTP</h3>
                    <p className='text-white'>El Protocolo de Transferencia de Archivos (FTP) es un estándar de red utilizado para la transferencia de archivos entre sistemas en una red. En el contexto de una tarjeta web, FTP juega un papel importante en la gestión y transferencia de archivos entre el servidor web y los usuarios.</p>
                </div>
            </div>
        </div>
        <div className='borde mt-10 m-2 h-1/1'>
            <div className='flex flex-col justify-center borde p-2 rounded-lg shadow-xl bg-[#9d9188] h-full'>
                <Image className='m-auto' src={DHCP} alt='Ubuntu Logo' width={160} />
                <div className='flex flex-col text-center'>
                    <h3 className='text-white text-2xl font-bold'>DHCP</h3>
                    <p className='text-white'>El Protocolo de Configuración Dinámica de Hosts (DHCP) es un protocolo de red que permite a los dispositivos obtener automáticamente una configuración de red, incluida una dirección IP, cuando se conectan a una red. </p>
                </div>
            </div>
        </div>
      </div>
        
    </>
  )
}
