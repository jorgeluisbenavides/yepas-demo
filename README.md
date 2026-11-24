# Yepas Demo

Proyecto Full-Stack para la demo de Yepas, compuesto por un frontend estático (HTML/Tailwind), una API REST en Node.js (Express + Knex) y una base de datos PostgreSQL orquestados mediante **Docker Compose**.

---

## 📁 Estructura del Proyecto

```text
yepas-demo/
├── docker-compose.yml      # Configuración de Docker Compose (servicios: db, api, web)
├── README.md               # Documentación general
├── .gitignore
├── frontend/               # Vistas estáticas HTML
│   ├── Dockerfile          # Contenedor Nginx para servir el frontend
│   ├── .dockerignore
│   ├── index.html
│   ├── administrador.html
│   ├── administrador-login.html
│   ├── iniciar-sesion.html
│   ├── registro.html
│   └── user.html
└── api/                    # Backend REST API (Node.js 24 + Express + Knex)
    ├── Dockerfile          # Contenedor Node.js
    ├── .dockerignore
    ├── package.json
    ├── knexfile.js
    ├── migrations/
    ├── src/
    └── tests/
```

---

## 🚀 Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/) (v2+)

---

## 🛠️ Comandos de Docker Compose

### 1. Iniciar todos los servicios en segundo plano
Construye las imágenes e inicia los contenedores (`db`, `api`, `web`):
```bash
docker compose up -d --build
```

### 2. Ejecutar las migraciones de base de datos
Una vez que el servicio `api` y `db` estén corriendo, ejecuta:
```bash
docker compose exec api npm run migrate:latest
```

### 3. Revertir migraciones (Rollback)
```bash
docker compose exec api npm run migrate:rollback
```

### 4. Ver logs en tiempo real
```bash
# Todos los servicios
docker compose logs -f

# O un servicio en específico (api, web o db)
docker compose logs -f api
docker compose logs -f web
docker compose logs -f db
```

### 5. Correr pruebas unitarias y de integración
```bash
docker compose exec api npm run test
```

### 6. Detener los servicios
```bash
# Detiene los contenedores manteniendo los datos de la base de datos
docker compose down

# Detiene y elimina volúmenes (reinicia la BD desde cero)
docker compose down -v
```

---

## 🌐 Servicios y Puertos

| Servicio | Tecnología | Puerto Local | Descripción / URL |
| :--- | :--- | :--- | :--- |
| **Frontend (`web`)** | Nginx Alpine | `8086` | [http://localhost:80](http://localhost:80) |
| **Backend (`api`)** | Node.js 24 | `8085` | [http://localhost:8001/internal/api/yepas-cms-loyalty-demo/](http://localhost:8001/internal/api/yepas-cms-loyalty-demo/) |
| **Base de Datos (`db`)** | PostgreSQL 16 | `5433` | `localhost:5433` (externo) / `db:5432` (red Docker) |

### Credenciales de Base de Datos (desarrollo):
- **Host:** `localhost` (desde tu máquina) / `db` (desde la red de Docker)
- **Puerto:** `5433` (desde tu máquina) / `5432` (desde Docker)
- **Usuario:** `postgres`
- **Contraseña:** `postgrespassword`
- **Base de Datos:** `yepas_demo`
