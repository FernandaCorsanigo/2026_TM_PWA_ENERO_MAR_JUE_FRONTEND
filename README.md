# 💬 Slack Clone — PWA Frontend

## 📁 Estructura del proyecto

```
src/
├── App.jsx                  # Rutas principales de la app
├── main.jsx                 # Punto de entrada
├── Global.css               # Estilos globales
│
├── Screens/                 # Pantallas principales
│   ├── LoginScreen/         # Inicio de sesión
│   ├── RegisterScreen/      # Registro de usuario
│   ├── HomeScreen/          # Listado de workspaces
│   ├── WorkspaceScreen/     # Vista de canales del workspace
│   └── CreateWorkspaceScreen/
│
├── Components/              # Componentes reutilizables
│   ├── Workspaces/          # Listado y cards de workspaces
│   ├── Messages/            # Pantalla de mensajes
│   ├── Channels/            # Lista de canales
│   └── ...
│
├── Context/                 # Proveedores de contexto global
│   ├── AuthContext.jsx
│   ├── WorkspaceContext.jsx
│   ├── ChannelContext.jsx
│   └── MessageContext.jsx
│
├── hooks/                   # Custom hooks (lógica de negocio)
│   ├── useLogin.jsx
│   ├── useCreateWorkspace.jsx
│   ├── useCreateChannel.jsx
│   └── ...
│
├── services/                # Llamadas a la API REST
├── Middlewares/             # Protección de rutas (AuthMiddleware)
└── utils/                   # Utilidades generales
```

---

## ⚙️ Instalación y uso

### Requisitos previos
- Node.js v18+
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Build para producción
npm run build
```

La app estará disponible en `http://localhost:5173` por defecto.

---

## 🗺️ Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` o `/login` | Pantalla de inicio de sesión |
| `/register` | Pantalla de registro |
| `/home` | Listado de workspaces del usuario |
| `/create-workspace` | Crear un nuevo workspace |
| `/:workspace_id/channels` | Vista de canales del workspace |
| `/:workspace_id/channels/:channel_id/messages` | Vista de mensajes del canal |

---

## ✨ Funcionalidades principales

- Autenticación (login y registro)
- Crear y listar workspaces
- Crear y listar canales dentro de un workspace
- Enviar y recibir mensajes en tiempo real
- Diseño responsive (mobile-first)
- Rutas protegidas por autenticación

