# LuxSteps-FrontEnd

Frontend de LuxSteps construido con React + Vite, consumiendo la API en `LuxSteps-API`.

## Estructura del proyecto

```
LuxSteps-FrontEnd/
├── public/
│   ├── logo.png         # Reemplazar con el logo real
│   └── images/
├── src/
│   ├── components/      # Componentes reutilizables (Navbar, Footer, ProductCard, ProductForm, LoginForm, RegisterForm)
│   ├── services/        # Llamadas a la API (authService, productService)
│   ├── pages/           # Vistas de la aplicación, organizadas por ruta
│   │   ├── Login/
│   │   ├── Registro/
│   │   ├── Productos/           # Listado y detalle ([id])
│   │   ├── Carrito/
│   │   └── Admin/
│   │       ├── Productos/       # Listado, Nuevo, Editar/[id]
│   │       └── Usuarios/
│   ├── App.jsx           # Definición de rutas (react-router-dom)
│   └── main.jsx
├── .env.local            # Variables de entorno (URL de la API)
└── vite.config.js
```

> Nota: este proyecto usa Vite (no Next.js), por lo que el enrutamiento por
> archivos de `app/` se reemplazó por `src/pages/` + `react-router-dom`,
> manteniendo las mismas rutas (`/productos/:id`, `/admin/productos/editar/:id`, etc.).

## Requisitos

- Node.js 18+
- La API de LuxSteps corriendo (ver `../LuxSteps-API`)

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta la URL de la API si es necesario:

```
VITE_API_URL=http://localhost:5000/api
```

## Scripts

```bash
npm install       # Instalar dependencias
npm run dev        # Servidor de desarrollo
npm run build       # Build de producción
npm run preview      # Previsualizar el build
npm run lint        # Linter (oxlint)
```

## Autenticación y autorización

- `src/context/AuthContext.jsx` maneja login/registro/logout y persiste el token JWT en `localStorage`. Al montar la app, si hay token, se valida contra `GET /api/auth/profile`.
- Las rutas `/admin/*` están protegidas por `src/components/RequireAuth.jsx`: si no hay sesión, redirige a `/login` y vuelve a la ruta original tras iniciar sesión.
- El backend (`protect` middleware) solo exige *estar autenticado*, no un rol específico; cualquier usuario registrado puede operar el CRUD de productos. El campo `role` existe en el modelo pero no se usa aún para restringir accesos.
- Un interceptor de Axios (`src/services/api.js`) detecta respuestas 401 y cierra la sesión automáticamente (token vencido/ inválido).

## Carrito de compras

- `src/context/CartContext.jsx` es un carrito 100% de cliente (persistido en `localStorage`), disponible tanto para usuarios logueados como anónimos — no depende de un endpoint de carrito en la API (no existe uno).
- "Agregar al carrito" está disponible desde el listado de productos y desde el detalle (con selección de talla/cantidad si el producto las tiene).
- `/carrito` permite editar cantidades, eliminar ítems y vaciar el carrito. No hay checkout real porque la API no tiene endpoint de órdenes.

## Pendientes conocidos

- `public/logo.png` es un placeholder: falta añadir el logo real.
- La API todavía no expone endpoints de gestión de usuarios ni de órdenes; `pages/Admin/Usuarios` y el checkout del carrito quedan pendientes de un backend que los soporte.
