# ✨ Desván

[![GitHub stars](https://img.shields.io/github/stars/4GeeksAcademy/Project-DESVAN?style=flat-square)](https://github.com/4GeeksAcademy/Project-DESVAN/stargazers) [![GitHub forks](https://img.shields.io/github/forks/4GeeksAcademy/Project-DESVAN?style=flat-square)](https://github.com/4GeeksAcademy/Project-DESVAN/network/members) [![Built with](https://img.shields.io/badge/React%20%2B%20Flask-Modern-orange?style=flat-square)](https://github.com/4GeeksAcademy/Project-DESVAN)

Una plataforma elegante para descubrir, explorar y reservar garage sales, open houses y eventos comunitarios al estilo de las ventas de garaje de Estados Unidos. Desván combina una interfaz moderna en React con una API en Flask para ofrecer una experiencia de usuario fluida y herramientas de publicación de eventos.

---

**Estado:** En desarrollo ⚙️ • **Stack:** React + Vite • Flask (API) • SQLAlchemy

## ¿Qué es Desván?

Desván es una web enfocada en los típicos garage sales de Estados Unidos: mercadillos, casas abiertas y ventas de garaje donde personas y comunidades publican eventos para vender objetos de segunda mano, antigüedades y curiosidades.

Los usuarios pueden explorar eventos creados por otras personas (open houses, community yard sales, mercadillos) o crear sus propios eventos para publicar artículos y organizar ventas en su barrio. Cada evento tiene página detallada con galería, ubicación en mapa, y opciones para reservar/mostrar interés o guardar en favoritos.

Se diseñó con foco en:

- Facilitar la creación y descubrimiento de garage sales y ventas de barrio.
- Experiencias visuales modernas y tipografía cuidada.
- Fluidez en navegación cliente/servidor (SPA con React Router) y API REST en Flask para autenticación y persistencia.

## Características principales

- Navegación SPA con rutas para lista de eventos, creación de eventos y detalle.
- Exploración de garage sales, open houses y mercadillos creados por la comunidad.
- Publicación de eventos propios para ventas de garaje, casas abiertas y mercadillos locales.
- Páginas de evento con galería, mapa, detalles de ubicación y acciones (guardar, compartir, reservar/interesar).
- Área de cuenta con perfil, favoritos, reservas y eventos propios.
- Backend RESTful con endpoints para autenticación, eventos, reservas y gestión de usuarios.

## Tecnología

- Frontend: React 18, Vite, React Router
- Backend: Python, Flask, Flask-Migrate, Flask-JWT-Extended
- Base de datos: SQLite (por defecto) / PostgreSQL (recomendada en producción)
- Estilos: CSS moderno con variables (Space Grotesk y DM Serif Text)

## Instalación rápida (entorno de desarrollo)

Requisitos:

- Node.js v20+
- Python 3.10+

1. Instalar dependencias del backend

```bash
python -m pip install -r requirements.txt
```

2. Levantar el servidor backend (forma directa)

```bash
python src/app.py

```

3. Instalar y levantar el frontend

```bash
npm install
npm run dev

```

## Variables de entorno importantes

- `DATABASE_URL` — URL de conexión a la base de datos (postgres/mysql/sqlite)
- `JWT_SECRET_KEY` — clave secreta para tokens JWT en el backend

Puedes crear un archivo `.env` en la raíz para tus variables.

## Estructura relevante del proyecto

- `src/front/` — código del frontend (React)
- `src/api/` — rutas, modelos y comandos del backend
- `src/app.py` — arranque del servidor Flask
- `public/` — assets estáticos para producción

## Autores

- Jose Manuel Baena — (https://github.com/JoseBaena97)
- Alicia López — (https://github.com/Alicia2202)

---
