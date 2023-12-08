# Instalacion de servidor FTP en ubuntu Server

## Actualizacion del sistema

Primera mente debemos actualizar el sistema operativo con los siguientes comandos:

```bash
sudo apt update
sudo apt upgrade
```

Despues debemos de instalar el servidor FTP con el siguiente comando:

```bash
sudo apt install vsftpd
```

Deberemos realizar una copia del archivso que se especifica a continuación, para tener un respaldo por si se llegaramos a necesitar si cometemos algun error

```bash
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.orig
```

Después debemos de ingresar estas líneas para autorizar los puertos para el FTP

```bash
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp
```

Ahora espues de realizar la copia del archivo, procedemos a editar el archivo con el siguiente comando:

```bash
sudo nano /etc/vsftpd.conf
```

En el archivo debemos de buscar las siguientes lineas y descomentarlas, para que queden de la siguiente manera:

```bash
write_enable=YES
chroot_local_user=YES
chroot_list_file=/etc/vsftpd.chroot_list
```
en la ultima parte del archivo agragamos lo siguiente

```bash
user_sub_token=$USER
local_root=/home/$USER/ftp
pasv-min-port=40000
pasv-max-port=50000
```

El siguiente paso será crear una carpeta llamada ftp estando dentro solo del usuario

```bash
mkdir ftp
```

Después debemos de cambiar los permisos de la carpeta con el siguiente comando:

```bash
sudo chmod a-w /home/ubuntu/ftp
```

Ahora debemos de crear un archivo llamado vsftpd.chroot_list con el siguiente comando:

```bash
sudo nano /etc/vsftpd.chroot_list
```

Dentro del archivo debemos de agregar el nombre del usuario que queremos que tenga acceso al FTP

```bash
USUARIOS
```

Ahora debemos de reiniciar el servicio con el siguiente comando:

```bash
sudo systemctl restart vsftpd
```

Para probar que el servicio este funcionando correctamente, debemos de ingresar el siguiente comando:

```bash
sudo systemctl status vsftpd
```

Si el servicio esta activo, podemos probar el servicio con el siguiente comando:

```bash
ftp localhost
```

Si nos pide un usuario y contraseña, el servicio esta funcionando correctamente.

>Tambien podemos probarlo mediate filezilla, ingresando la ip del servidor, el usuario y contraseña.