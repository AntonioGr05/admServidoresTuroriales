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
          <h1 className='text-6xl font-bold font-mono text-center mt-20 mb-5'>HTTP</h1>
        </div>
        <div className="prose prose-slate m-auto w-2/4 mt-10">
        {/* < ReactMarkdown ReactMarkdown className="markdown__preview w-full">{markdown}</ReactMarkdown> */}
        
        <div dangerouslySetInnerHTML={{ __html: `

<html><head></head><body><h1>Insalalacion de un servidor apache en ubuntu server</h1>
<h2>Actualizacion del sistema</h2>
<p>Primera mente debemos actualizar el sistema operativo con los siguientes comandos:</p>
<pre><code class="language-bash">sudo apt update
sudo apt upgrade
</code></pre>
<h2>Instalacion de apache</h2>
<p>Para instalar apache debemos ejecutar el siguiente comando:</p>
<pre><code class="language-bash">sudo apt install apache2
</code></pre>
<p>Ahora escribiremos esta línea para que el firewall permita ejecutar esto en el puerto 80</p>
<pre><code class="language-bash">sudo ufw allow Apache
</code></pre>
<blockquote>
<p>Para verificar que el servicio se instalo correctamente ejecutamos el siguiente comando:</p>
</blockquote>
<pre><code class="language-bash">sudo systemctl status apache2
</code></pre>
<p>Cuando todo este funcionando bien, la ruta que se especifica a continuación es donde está el archivo HTML (index.html) que se muestra, si se requiere mostrar otro, el contenido de este HTML debe ser suplido por el requerido, luego guardado y todos los elementos que se necesiten deben estar dentro de esta carpeta, pero el principal siempre debe estar en el index</p>
<pre><code class="language-bash">/var/www/html
</code></pre>
<h2>Edicion del archivo index.html</h2>
<p>Para editar el archivo index.html debemos ejecutar el siguiente comando:</p>
<pre><code class="language-bash">sudo nano /var/www/html/index.html
</code></pre>
<blockquote>
<p>Ahora podemos modificar ese archivo a nuestro gusto para darle un buen diseño a nuestra pagina en nuestro servidor apache</p>
</blockquote>
<h3>Gracias por ver</h3>
</body></html>
        ` }} />

        </div>
        <FOOTER/>
      </>
      
    )
}