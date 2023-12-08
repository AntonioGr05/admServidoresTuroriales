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
          <h1 className='text-6xl font-bold font-mono text-center mt-20 mb-5'>FTP </h1>
        </div>
        <div className="prose prose-slate m-auto w-2/4 mt-10">
        {/* < ReactMarkdown ReactMarkdown className="markdown__preview w-full">{markdown}</ReactMarkdown> */}
        
        <div dangerouslySetInnerHTML={{ __html: `

<html><head></head><body><h1>Instalacion de servidor FTP en ubuntu Server</h1>
<h2>Actualizacion del sistema</h2>
<p>Primera mente debemos actualizar el sistema operativo con los siguientes comandos:</p>
<pre><code class="language-bash">sudo apt update
sudo apt upgrade
</code></pre>
<p>Despues debemos de instalar el servidor FTP con el siguiente comando:</p>
<pre><code class="language-bash">sudo apt install vsftpd
</code></pre>
<p>Deberemos realizar una copia del archivso que se especifica a continuación, para tener un respaldo por si se llegaramos a necesitar si cometemos algun error</p>
<pre><code class="language-bash">sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
</code></pre>
<p>Después debemos de ingresar estas líneas para autorizar los puertos para el FTP</p>
<pre><code class="language-bash">sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
</code></pre>
<p>Ahora espues de realizar la copia del archivo, procedemos a editar el archivo con el siguiente comando:</p>
<pre><code class="language-bash">sudo nano /etc/vsftpd.conf
</code></pre>
<p>En el archivo debemos de buscar las siguientes lineas y descomentarlas, para que queden de la siguiente manera:</p>
<pre><code class="language-bash">write_enable=YES
chroot_local_user=YES
chroot_list_file=/etc/vsftpd.chroot_list
</code></pre>
<p>en la ultima parte del archivo agragamos lo siguiente</p>
<pre><code class="language-bash">user_sub_token=$USER
local_root=/home/$USER/ftp
pasv-min-port=40000
pasv-max-port=50000
</code></pre>
<p>El siguiente paso será crear una carpeta llamada ftp estando dentro solo del usuario</p>
<pre><code class="language-bash">mkdir ftp
</code></pre>
<p>Después debemos de cambiar los permisos de la carpeta con el siguiente comando:</p>
<pre><code class="language-bash">sudo chmod a-w /home/ubuntu/ftp
</code></pre>
<p>Ahora debemos de crear un archivo llamado vsftpd.chroot_list con el siguiente comando:</p>
<pre><code class="language-bash">sudo nano /etc/vsftpd.chroot_list
</code></pre>
<p>Dentro del archivo debemos de agregar el nombre del usuario que queremos que tenga acceso al FTP</p>
<pre><code class="language-bash">USUARIOS
</code></pre>
<p>Ahora debemos de reiniciar el servicio con el siguiente comando:</p>
<pre><code class="language-bash">sudo systemctl restart vsftpd
</code></pre>
<p>Para probar que el servicio este funcionando correctamente, debemos de ingresar el siguiente comando:</p>
<pre><code class="language-bash">sudo systemctl status vsftpd
</code></pre>
<p>Si el servicio esta activo, podemos probar el servicio con el siguiente comando:</p>
<pre><code class="language-bash">ftp localhost
</code></pre>
<p>Si nos pide un usuario y contraseña, el servicio esta funcionando correctamente.</p>
<blockquote>
<p>Tambien podemos probarlo mediate filezilla, ingresando la ip del servidor, el usuario y contraseña.</p>
</blockquote>
</body></html>
        ` }} />

        </div>
        <FOOTER/>
      </>
      
    )
}