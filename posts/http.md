# Insalalacion de un servidor apache en ubuntu server

## Actualizacion del sistema

Primera mente debemos actualizar el sistema operativo con los siguientes comandos:

```bash
sudo apt update
sudo apt upgrade
```

## Instalacion de apache

Para instalar apache debemos ejecutar el siguiente comando:

```bash
sudo apt install apache2
```

Ahora escribiremos esta línea para que el firewall permita ejecutar esto en el puerto 80

```bash
sudo ufw allow Apache
```

>Para verificar que el servicio se instalo correctamente ejecutamos el siguiente comando:

```bash
sudo systemctl status apache2
```

Cuando todo este funcionando bien, la ruta que se especifica a continuación es donde está el archivo HTML (index.html) que se muestra, si se requiere mostrar otro, el contenido de este HTML debe ser suplido por el requerido, luego guardado y todos los elementos que se necesiten deben estar dentro de esta carpeta, pero el principal siempre debe estar en el index

```bash
/var/www/html
```

## Edicion del archivo index.html

Para editar el archivo index.html debemos ejecutar el siguiente comando:

```bash
sudo nano /var/www/html/index.html
```
>Ahora podemos modificar ese archivo a nuestro gusto para darle un buen diseño a nuestra pagina en nuestro servidor apache

### Gracias por ver
