# Instalacion de DHCP en Ubuntu Server

## Actualizacion del sistema

Primera mente debemos actualizar el sistema operativo con los siguientes comandos:

```bash
    sudo apt update
    sudo apt upgrade
```

El primer paso para hacer la configuracion del dhcp es comenzando a colocar una ip estaica en nuestro servidor para que no cambie la ip cada vez que se reinicie el servidor y ocacione problemas en la red.

Para esto nos dirigimos al siguiente archivo y colocamos la ip que queremos que tenga nuestro servidor.

```bash
    sudo nano /etc/netplan/00-installer-config.yaml
```

```bash
    network:
        ethernets:
            enp0s3:
                dhcp4: false
                addresses: [la ip que queremos que tenga nuestro servidor]
                gateway4: [la ip de nuestro router]
                nameservers:
                    addresses: [la ip de nuestro router]
        version: 2
```

Despues debemos aplicar los cambios con el siguiente comando

```bash
    sudo netplan apply
```

>Aparecen muchas advertencias para indicar que el archivo que se modifico es público, solo continue no causan ningún problema.

Ahora devemos instalar el servicio de dhcp con el siguiente comando

```bash
    sudo apt install isc-dhcp-server
```

Ahora debemos saber el nombre de nuestra interfas de red para esto colocamos el siguiente comando

```bash
    ip a
```

Si la interfas de red es enp0s3 debemos modificar el siguiente archivo

>Si la interfas de red es diferente debemos modificar el archivo con el nombre de nuestra interfas de red

```bash
    sudo nano /etc/default/isc-dhcp-server
```

Estando dentro, donde dice INTERFACESv4, debe colocar el nombre de su interfaz de red entre comillas vista al presionar ip a en la terminal, después guarde (CTRL + O, enter (intro)) y salga (CTRL + X).

---
### Configuracion del archivo dhcpd.conf

```bash
    sudo nano /etc/dhcp/dhcpd.conf
```

Haremos dos cosas descomentar donde dice authoritative

```bash
    # If this DHCP server is the official DHCP server for the local
    # network, the authoritative directive should be uncommented.
    authoritative;
```

Por ultimo al final del archivo debe de ingresar las siguientes líneas, utilizando su IP que pusieron en el primer archivo, guarde y salga del archivo.

``` BASH
subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
  option domain-name "tudominio.local";
  default-lease-time 600;
  max-lease-time 7200;
}
```

### Reinicio del servicio

```bash
    sudo systemctl restart isc-dhcp-server
```

Ahora puede comprobarlo, en otra computadora que este conectada a la misma red que el servidor Ubuntu, como se muestra a continuación.

Tenemos que entrar a las propiedades de nuestras interfas y colocar la ip de nuestro servidor en DNS para que nos auto configure la ip de nuestra maquina con nuestto servidor DHCP.