# Instalación del sistema de correo en Ubuntu

Primera mente debemos actualizar el sistema operativo con los siguientes comandos:

```bash
    sudo apt update
    sudo apt upgrade
```

## Instalar Postfix

```bash
sudo apt update
sudo apt install postfix
```

Durante la instalación, se te harán varias preguntas. Si estás instalando Postfix en un servidor dedicado, selecciona "Sitio de Internet" y sigue las instrucciones. Esto configurará Postfix para enviar correos electrónicos desde el propio servidor.

El siguiente paso será configurar un archivo de postfix, pero antes debemos de realizarle una copia por seguridad

```bash
sudo cp /etc/postfix/main.cf /etc/postfix/main.cf.orig
```

Ahora debemos de editar el archivo con el siguiente comando:

```bash
sudo nano /etc/postfix/main.cf
```

Se modifican tres cosas:

- “Myhostname”: en esta parte se coloca el nombre del dominio que pusimos al instalar postfix.
- “Mydestination”: en este no es necesario mover nada, solo observar que el dominio que creamos al instalar postfix aparezca ahí.
- “mynetworks”: únicamente debemos agregar sin borrar nada, nuestra ip local en la que estamos trabajando, en mi caso es la 10.0.1.0/24, con su subsufijo de mascara dependiendo el que tengan.
- Agregaremos la carpeta donde se guardaran los correos electrónicos, `home_mailbox = Maildir/`

```bash

```bash
Una vez configurado todo, guardamos el archivo y salimos, para reiniciar el servicio con lo siguiente

```bash
sudo systemctl restart postfix
```

Después instalaremos la siguiente librería para poder enviar correos electrónicos desde la terminal

```bash
sudo apt install mailutils
```

Después se debe salir e instalar la siguiente librería dovecot-core y dovecot-imapd

```bash
sudo apt install dovecot-core dovecot-imapd
```

Ahora debemos de editar el archivo con el siguiente comando:

```bash
sudo nano /etc/dovecot/conf.d/10-mail.conf
```

Dentro del archivo debemos de buscar la siguiente linea y descomentarla, para que quede de la siguiente manera:

```bash
mail_location = maildir:~/Maildir
```

Ahora ingresaremos al siguiente archivo 10-ssl.conf

```bash
sudo nano /etc/dovecot/conf.d/10-ssl.conf
```

La línea que dice “ssl = yes”, deben cambiarla por no

```bash
ssl = no
```

Ahora ingresaremos al siguiente archivo 10-auth.conf

```bash
sudo nano /etc/dovecot/conf.d/10-auth.conf
```

Dentro del archivo debemos de buscar la siguiente linea y descomentarla, para que quede de la siguiente manera:

```bash
disable_plaintext_auth = no
```

Ahora reiniciamos el servicio de dovecot, para ejecutar todos los cambios

```bash
sudo systemctl restart dovecot
```

Ahora debemos de crear un usuario para poder enviar correos electrónicos, con el siguiente comando:

```bash
sudo adduser usuario
```

## Prueba de envío de correo

Para enviar un correo electrónico, debemos de ejecutar el siguiente comando:

```bash
echo "Mensaje de prueba" | mail -s "Asunto del correo"
```

Para verificar que el correo se envió correctamente, debemos de ejecutar el siguiente comando:

```bash
mail
```

Para salir del correo, debemos de presionar la tecla “q”

>Ahora con el servicio instalado podemos ingresar por thunderbird, para poder enviar correos electrónicos.

utilizamos las credenciales como el usuario y contraseña que creamos anteriormente junto con la ip de nuestro servidor, utilizando imap y el puerto 143 para poder recibir correos electrónicos.
