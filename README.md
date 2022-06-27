# Next.js Open Jira App
Para correr localmente se necesita la db.

```
docker-compose up -d
```
* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Llenar la db con información de pruebas

Llamará: 
```
http://localhost:3000/api/seed
```