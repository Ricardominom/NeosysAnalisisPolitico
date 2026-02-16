# Inteligencia Política Digital

Aplicación web para la creación y gestión de estudios de inteligencia política digital.

## Características

- ✅ Autenticación dummy (acepta cualquier credencial)
- ✅ Dashboard con búsqueda y gestión de estudios
- ✅ Editor completo de estudios con:
  - Arquetipo de liderazgo
  - Puntos positivos y negativos
  - Gestión de candidatos con adjetivación digital
  - Universo digital electoral
  - Bloques A y B con tablas dinámicas
  - Niveles de incertidumbre por sección
- ✅ Vista previa en tiempo real con formato de consultoría
- ✅ Exportación a PDF (mediante window.print)
- ✅ Persistencia en localStorage con datos de ejemplo
- ✅ Diseño responsive con Tailwind CSS

## Stack Tecnológico

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router v6** - Enrutamiento
- **Tailwind CSS** - Estilos
- **Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Uso

1. Acceder a la aplicación en `http://localhost:5173`
2. Ingresar cualquier correo y contraseña en la pantalla de login
3. El dashboard mostrará estudios de ejemplo precargados
4. Crear nuevo estudio o editar existentes
5. Navegar por las secciones usando la barra lateral
6. Ver vista previa en tiempo real en el panel derecho
7. Exportar a PDF usando el botón "Exportar a PDF"

## Estructura del Proyecto

```
src/
├── components/
│   ├── editor/           # Componentes del editor
│   ├── ui/               # Componentes reutilizables de UI
│   └── ProtectedRoute.tsx
├── context/              # React Context (AuthContext)
├── hooks/                # Custom hooks (useStudies)
├── layouts/              # Layouts (Navbar, MainLayout)
├── pages/                # Páginas principales
├── services/             # Servicios (auth, studies)
├── types/                # Definiciones de TypeScript
├── utils/                # Utilidades (seedData)
├── App.tsx
├── main.tsx
└── index.css
```

## Características Especiales

### Candidato Requerido
El cuarto candidato "Wblester Santiago Pineda" está pre-configurado y su nombre no puede ser editado, pero sí sus demás datos.

### Vista Previa con Adjetivación Inteligente
Los adjetivos de los candidatos se formatean automáticamente:
- **Negrita** si coinciden con palabras clave de puntos positivos
- ~~Tachado~~ si coinciden con palabras clave de puntos negativos

### Exportación PDF
La función de exportar a PDF usa `window.print()` con estilos optimizados para impresión.

## Licencia

MIT
# AnalisisPolitico
# AnalisisPolitico
# AnalisisPolitico
