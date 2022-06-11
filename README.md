# P-Reserva-API
P-Reserva-API es un proyecto basico basado en Nodejs y express para generar endpoints para un  sistema de reservas de habitación de un hotel haciendo uso de mongoDB.
Este proyecto consiste principalmente de 3 enpoints los cuales son:

1.	http://localhost:3000/reserva/crearReserva (POST)

Este endpoint se encarga de generar la reserva en la base de datos y para ello recibe el siguiente body:
 ```
 {
    
    "montoPagado":200,
    "metodoDePago":"tarjeta",
    "detalleCuarto":{
        "cantidadCamas":2,
        "baños":1
    },
    "diasDeEstadia":"3",
    "detalleFactura":{
        "fechaFacturacion":"10-10-10",
        "montoTotal":200
    },
    "estado":"PENDIENTE",
    "usuarioId":"11111111"
  }
 
 ```
Se asume que estos datos seran proveidos de una vista, una ves recibido el objeto el endpoint se encargara de valida que ninguno de los parametros vengan vacios y en el caso de la variable estado que sea igual a PENDIENTE.

Si todos los datos son correcto se obtendra la siguiente respuesta:
 ```
 {
    "msg": "Su reserva se ah cargado exitosamente con los siguientes Datos",
    "reserva": {
        "id": "reserva-1111-225",
        "montoPagado": 200,
        "metodoDePago": "tarjeta",
        "detalleCuarto": {
            "cantidadCamas": 2,
            "baños": 1
        },
        "diasDeEstadia": "3",
        "detalleFactura": {
            "fechaFacturacion": "10-10-10",
            "montoTotal": 200
        },
        "estado": "PENDIENTE",
        "usuarioId": "1111111",
        "_id": "62a3d26b7fa4478113061309"
    }
}
  ```

2.	http://localhost:3000/reserva/actualizarEstadoDeReserva (PUT)

Este endpoint se encarga de actualizar la reserva en la base de datos y para ello recibe el siguiente body:

```
  {
    "id":"reserva-11111-304",
    "estado":"ELIMINADO" 
  }
```
El id es el identificador unico con el cual se genero la reserva.
variable estado es el atributo que se actualmente se puede modifica a PENDIENTE, ELIMINADO, PAGADO. En caso que se quiera actualizar otros parametros se debera ajustar el update de la funcion de la base datos

el resultado de este endpoint debe ser el siguiente
```
{
    "msg": "La reserva con id: reserva-1111-304 se ah pasado a ELIMINADO exitosamente"
}
```



3.	http://localhost:3000/reserva/obtenerReserva (POST)

Este endpoint se encarga de devolver la reserva hecha por id  y para ello recibe el siguiente body:

```
  {
    "id":"reserva-11111-304",
  }
```
y el resultado debe ser:

```
{
    "result": {
        "_id": "62a3ca820be51e0f6602f1b2",
        "id": "reserva-11111-304",
        "montoPagado": 200,
        "metodoDePago": "tarjeta",
        "detalleCuarto": {
            "cantidadCamas": 2,
            "baños": 1
        },
        "diasDeEstadia": "3",
        "detalleFactura": {
            "fechaFacturacion": "10-10-10",
            "montoTotal": 200
        },
        "estado": "ELIMINADO",
        "usuarioId": "111111"
    }
}
```


# Para iniciar el proyecto

Para correr el proyecto primero se debe instalar las dependencias con  ```npm install```

Deberas configurar las siguientes variables de entorno en el .env
```
DB_CONN_STRING="mongodb://localhost:27018/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

DB_NAME="Reserva-API"

EMAIL_USER=""

EMAIL_PASSWORD=""

EMAIL_RECIBERS=""
```

una ves hecho esto escribe en la terminal  ```npm start``` y tendra el proyecto corriendo.

En caso de que quiera correr pruebas unitarias use  ```npm test```