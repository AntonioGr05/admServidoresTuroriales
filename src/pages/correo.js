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
          <h1 className='text-6xl font-bold font-mono text-center mt-20 mb-5'>Correo </h1>
        </div>
        <div className="prose prose-slate m-auto w-2/4 mt-10">
        {/* < ReactMarkdown ReactMarkdown className="markdown__preview w-full">{markdown}</ReactMarkdown> */}
        
        <div dangerouslySetInnerHTML={{ __html: `
<html><head></head><body><h1>Instalación del sistema de correo en Ubuntu</h1>
<p>Primera mente debemos actualizar el sistema operativo con los siguientes comandos:</p>
<pre><code class="language-bash">    sudo apt update
    sudo apt upgrade
</code></pre>
<h2>Instalar Postfix</h2>
<pre><code class="language-bash">sudo apt update
sudo apt install postfix
</code></pre>
<p>Durante la instalación, se te harán varias preguntas. Si estás instalando Postfix en un servidor dedicado, selecciona "Sitio de Internet" y sigue las instrucciones. Esto configurará Postfix para enviar correos electrónicos desde el propio servidor.</p>
<p>El siguiente paso será configurar un archivo de postfix, pero antes debemos de realizarle una copia por seguridad</p>
<pre><code class="language-bash">sudo cp /etc/postfix/main.cf /etc/postfix/main.cf.orig
</code></pre>
<p>Ahora debemos de editar el archivo con el siguiente comando:</p>
<pre><code class="language-bash">sudo nano /etc/postfix/main.cf
</code></pre>
<p>Se modifican tres cosas:</p>
<ul>
<li>“Myhostname”: en esta parte se coloca el nombre del dominio que pusimos al instalar postfix.</li>
<li>“Mydestination”: en este no es necesario mover nada, solo observar que el dominio que creamos al instalar postfix aparezca ahí.</li>
<li>“mynetworks”: únicamente debemos agregar sin borrar nada, nuestra ip local en la que estamos trabajando, en mi caso es la 10.0.1.0/24, con su subsufijo de mascara dependiendo el que tengan.</li>
<li>Agregaremos la carpeta donde se guardaran los correos electrónicos, <code>home_mailbox = Maildir/</code></li>
</ul>
<pre><code class="language-bash">
bash
Una vez configurado todo, guardamos el archivo y salimos, para reiniciar el servicio con lo siguiente
bash
sudo systemctl restart postfix
</code></pre>
<p>Después instalaremos la siguiente librería para poder enviar correos electrónicos desde la terminal</p>
<pre><code class="language-bash">sudo apt install mailutils
</code></pre>
<p>Después se debe salir e instalar la siguiente librería dovecot-core y dovecot-imapd</p>
<pre><code class="language-bash">sudo apt install dovecot-core dovecot-imapd
</code></pre>
<p>Ahora debemos de editar el archivo con el siguiente comando:</p>
<pre><code class="language-bash">sudo nano /etc/dovecot/conf.d/10-mail.conf
</code></pre>
<p>Dentro del archivo debemos de buscar la siguiente linea y descomentarla, para que quede de la siguiente manera:</p>
<pre><code class="language-bash">mail_location = maildir:~/Maildir
</code></pre>
<p>Ahora ingresaremos al siguiente archivo 10-ssl.conf</p>
<pre><code class="language-bash">sudo nano /etc/dovecot/conf.d/10-ssl.conf
</code></pre>
<p>La línea que dice “ssl = yes”, deben cambiarla por no</p>
<pre><code class="language-bash">ssl = no
</code></pre>
<p>Ahora ingresaremos al siguiente archivo 10-auth.conf</p>
<pre><code class="language-bash">sudo nano /etc/dovecot/conf.d/10-auth.conf
</code></pre>
<p>Dentro del archivo debemos de buscar la siguiente linea y descomentarla, para que quede de la siguiente manera:</p>
<pre><code class="language-bash">disable_plaintext_auth = no
</code></pre>
<p>Ahora reiniciamos el servicio de dovecot, para ejecutar todos los cambios</p>
<pre><code class="language-bash">sudo systemctl restart dovecot
</code></pre>
<p>Ahora debemos de crear un usuario para poder enviar correos electrónicos, con el siguiente comando:</p>
<pre><code class="language-bash">sudo adduser usuario
</code></pre>
<h2>Prueba de envío de correo</h2>
<p>Para enviar un correo electrónico, debemos de ejecutar el siguiente comando:</p>
<pre><code class="language-bash">echo "Mensaje de prueba" | mail -s "Asunto del correo"
</code></pre>
<p>Para verificar que el correo se envió correctamente, debemos de ejecutar el siguiente comando:</p>
<pre><code class="language-bash">mail
</code></pre>
<p>Para salir del correo, debemos de presionar la tecla “q”</p>
<blockquote>
<p>Ahora con el servicio instalado podemos ingresar por thunderbird, para poder enviar correos electrónicos.</p>
</blockquote>
<p>utilizamos las credenciales como el usuario y contraseña que creamos anteriormente junto con la ip de nuestro servidor, utilizando imap y el puerto 143 para poder recibir correos electrónicos.</p>
</body></html>

        ` }} />

        </div>
        <FOOTER/>
      </>
      
    )
}