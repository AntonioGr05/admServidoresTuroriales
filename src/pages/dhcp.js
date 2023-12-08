import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import axios from "axios";
import NAVBAR from './components/barranav'
import FOOTER from './components/footer'

export default function MarkdownToHtml(){

    const [markdown, setMarkdown] = useState('')

    const content = async () => {
        const res = await axios.get('./api/dns')
        setMarkdown(res.data)
    }

    useEffect(() => {
        content()
    }, [])

    return (
      <>

        <NAVBAR/>
        <div>
          <h1 className='text-6xl font-bold font-mono text-center mt-20 mb-5'>DHCP</h1>
        </div>
        <div className="prose prose-slate m-auto w-2/4 mt-10">
        {/* < ReactMarkdown ReactMarkdown className="markdown__preview w-full">{markdown}</ReactMarkdown> */}
        
        <div dangerouslySetInnerHTML={{ __html: `

<html><head></head><body><h1>Instalacion de DHCP en Ubuntu Server</h1>
<p>El primer paso para hacer la configuracion del dhcp es comenzando a colocar una ip estaica en nuestro servidor para que no cambie la ip cada vez que se reinicie el servidor y ocacione problemas en la red.</p>
<p>Para esto nos dirigimos al siguiente archivo y colocamos la ip que queremos que tenga nuestro servidor.</p>
<pre><code class="language-bash">    sudo nano /etc/netplan/00-installer-config.yaml
</code></pre>
<pre><code class="language-bash">    network:
        ethernets:
            enp0s3:
                dhcp4: false
                addresses: [la ip que queremos que tenga nuestro servidor]
                gateway4: [la ip de nuestro router]
                nameservers:
                    addresses: [la ip de nuestro router]
        version: 2
</code></pre>
<p>Despues debemos aplicar los cambios con el siguiente comando</p>
<pre><code class="language-bash">    sudo netplan apply
</code></pre>
<blockquote>
<p>Aparecen muchas advertencias para indicar que el archivo que se modifico es público, solo continue no causan ningún problema.</p>
</blockquote>
<p>Ahora devemos instalar el servicio de dhcp con el siguiente comando</p>
<pre><code class="language-bash">    sudo apt install isc-dhcp-server
</code></pre>
<p>Ahora debemos saber el nombre de nuestra interfas de red para esto colocamos el siguiente comando</p>
<pre><code class="language-bash">    ip a
</code></pre>
<p>Si la interfas de red es enp0s3 debemos modificar el siguiente archivo</p>
<blockquote>
<p>Si la interfas de red es diferente debemos modificar el archivo con el nombre de nuestra interfas de red</p>
</blockquote>
<pre><code class="language-bash">    sudo nano /etc/default/isc-dhcp-server
</code></pre>
<p>Estando dentro, donde dice INTERFACESv4, debe colocar el nombre de su interfaz de red entre comillas vista al presionar ip a en la terminal, después guarde (CTRL + O, enter (intro)) y salga (CTRL + X).</p>
<hr>
<h3>Configuracion del archivo dhcpd.conf</h3>
<pre><code class="language-bash">    sudo nano /etc/dhcp/dhcpd.conf
</code></pre>
<p>Haremos dos cosas descomentar donde dice authoritative</p>
<pre><code class="language-bash">    # If this DHCP server is the official DHCP server for the local
    # network, the authoritative directive should be uncommented.
    authoritative;
</code></pre>
<p>Por ultimo al final del archivo debe de ingresar las siguientes líneas, utilizando su IP que pusieron en el primer archivo, guarde y salga del archivo.</p>
<pre><code class="language-BASH">subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
  option domain-name "tudominio.local";
  default-lease-time 600;
  max-lease-time 7200;
}
</code></pre>
<h3>Reinicio del servicio</h3>
<pre><code class="language-bash">    sudo systemctl restart isc-dhcp-server
</code></pre>
<p>Ahora puede comprobarlo, en otra computadora que este conectada a la misma red que el servidor Ubuntu, como se muestra a continuación.</p>
<p>Tenemos que entrar a las propiedades de nuestras interfas y colocar la ip de nuestro servidor en DNS para que nos auto configure la ip de nuestra maquina con nuestto servidor DHCP.</p>
</body></html>
<P>.</P>
        ` }} />

        </div>
        <FOOTER/>
      </>
      
    )
}