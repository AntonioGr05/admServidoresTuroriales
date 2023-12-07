# Instalación de DNS en Ubuntu Server

## Actualizacion del sistema

Primera mente debemos actualizar el sistema operativo con los siguientes comandos:

```bash
    sudo apt update
    sudo apt upgrade
```

## Instalacion de bind9 (DNS)

Para instalar bind9 debemos ejecutar el siguiente comando:

```bash
    sudo apt install bind9
```

>Para verificar que el servicio se instalo correctamente ejecutamos el siguiente comando:

```bash
    sudo systemctl status bind9
```

![Bind9Status](./img/bind9Status.png "Texto del título")

>En active (running) nos indica que el servicio esta corriendo correctamente.

>Si el estado esta active con errores continuaremos configurando el firewall para que permita el trafico de DNS.

## Configuracion del firewall

para la configuracion del firewall colocamos el siguiente comando

```bash
    sudo ufw allow bind9
```

Después ingresamos al siguiente archivo para ingresar las direcciones que funcionaran, en caso de que nuestro dominio no funcione.

```bash
    sudo nano /etc/bind/named.conf.options
```

En el archivo verificamos que la informacion sea la siguiente

```bash
options {
    directory "/var/cache/bind";

    forwarders {
        8.8.8.8;
        8.8.4.4;
    };

    auth-nxdomain no;    # conform to RFC1035
    listen-on-v6 { any; };
};
```

Debemos reiniciar el servicio para que los cambios se apliquen

```bash
    sudo systemctl restart bind9
```

## Configuracion de zona

El siguiente paso es modificar el siguiente archivo, recuerda que despues de db debe ser el nombre de tu dominio

```bash
    sudo nano /etc/bind/db.prueba.com
```

Lo llenaremos con la siguiente informacion

```bash 
$TTL    604800
@ IN SOA ns1.tudominio.com. admin.tudominio.com. (
        3         ; Serial
        604800    ; Refresh
        86400     ; Retry
        2419200   ; Expire
        604800 )  ; Negative Cache TTL

; Registros NS (servidores de zonas)
@   IN    NS    ns1.tudominio.com.
ns  IN    A     192.168.1.10 ; IP del servidor DNS
router  IN  A   192.168.1.1 ; IP del router 
eql1   IN  A    192.168.1.50; IP del equipo 1


```

>Recuerda que la ip debe ser la ip de tu servidor

>Para verificar que todo este correcto ejecutamos el siguiente comando

```bash
    sudo named-checkzone tudominio.com /etc/bind/db.prueba.com
```

>Si todo esta correcto nos mostrara el siguiente mensaje

```bash
    zone tudominio.com/IN: loaded serial 3
    OK
```

Después entraremos al siguiente archivo e incluiremos en zone, nuestro dominio DNS que ingresamos en el archivo del paso 7, después donde dice file deben de poner la ruta de ese archivo con su nombre.

```bash
    sudo nano /etc/bind/named.conf.local
```

```bash
    zone "tudominio.com" {
        type master;
        file "/etc/bind/db.tudominio.com";
    };
```

Una vez con todo esto deben de reiniciar el servicio de nuevo con esta línea siguiente.

```bash
    sudo systemctl reload named
```

Por último podrán comprobar que funcione en una computadora cliente conectada a la misma red que el servidor y con la siguiente línea deben aparecer resultados como lo siguiente.

```bash
    nslookup tudominio.com
```

resultados:

```bash
    Server: la ip del servidor
    Address: la ip del servidor#53
    Name: tudominio.com
    Address: la ip del servidor
```

>Si todo esta correcto ya tendremos nuestro DNS funcionando correctamente.





.