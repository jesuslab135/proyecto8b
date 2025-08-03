# 📚 Schemas de Proyectos y Colaboración

## 📋 Tabla: proyectos

### Estructura
```sql
CREATE TABLE proyectos (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(200),
  descripcion TEXT,
  creador_id INTEGER REFERENCES usuarios(id),
  universidad_id INTEGER REFERENCES universidades(id),
  estado_verificacion VARCHAR(50),
  vista_publica BOOLEAN DEFAULT true,
  creado_en TIMESTAMP DEFAULT NOW(),
  repositorio_url TEXT,
  demo_url TEXT,
  updated_at TIMESTAMP,
  state_id INTEGER REFERENCES system_states(id)
);
```

### Campos
- **id**: Identificador único
- **nombre**: Nombre del proyecto
- **descripcion**: Descripción detallada
- **creador_id**: Usuario que creó el proyecto
- **universidad_id**: Universidad asociada
- **estado_verificacion**: Estado de validación académica
- **vista_publica**: Visibilidad del proyecto
- **creado_en**: Fecha de creación
- **repositorio_url**: URL del repositorio de código
- **demo_url**: URL de la demo
- **updated_at**: Última actualización
- **state_id**: Estado del sistema

### Estados de Verificación
- `pendiente` - En espera de validación
- `aprobado` - Validado por la universidad
- `rechazado` - Rechazado en validación
- `en_revision` - En proceso de revisión

### Relaciones
- **creador_id** → `usuarios.id`
- **universidad_id** → `universidades.id`
- **state_id** → `system_states.id`

---

## 📋 Tabla: participaciones_proyecto

### Estructura
```sql
CREATE TABLE participaciones_proyecto (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  proyecto_id INTEGER REFERENCES proyectos(id),
  usuario_id INTEGER REFERENCES usuarios(id),
  rol_id INTEGER REFERENCES roles_proyecto(id),
  estado VARCHAR(50),
  invitado_por INTEGER REFERENCES usuarios(id),
  fecha_invitacion TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **proyecto_id**: Proyecto al que pertenece
- **usuario_id**: Usuario participante
- **rol_id**: Rol en el proyecto
- **estado**: Estado de la participación
- **invitado_por**: Usuario que envió la invitación
- **fecha_invitacion**: Fecha de invitación

### Estados de Participación
- `invitado` - Invitación pendiente
- `aceptado` - Participación activa
- `rechazado` - Invitación rechazada
- `removido` - Removido del proyecto

### Relaciones
- **proyecto_id** → `proyectos.id`
- **usuario_id** → `usuarios.id`
- **rol_id** → `roles_proyecto.id`
- **invitado_por** → `usuarios.id`

---

## 📋 Tabla: roles_proyecto

### Estructura
```sql
CREATE TABLE roles_proyecto (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(50),
  puede_editar BOOLEAN DEFAULT false,
  puede_comentar BOOLEAN DEFAULT true,
  puede_subir_archivos BOOLEAN DEFAULT false,
  puede_validar BOOLEAN DEFAULT false
);
```

### Campos
- **id**: Identificador único
- **nombre**: Nombre del rol
- **puede_editar**: Permiso de edición
- **puede_comentar**: Permiso de comentarios
- **puede_subir_archivos**: Permiso de subida de archivos
- **puede_validar**: Permiso de validación

### Roles Predefinidos
1. **Líder** - Todos los permisos
2. **Colaborador** - Edición y comentarios
3. **Observador** - Solo comentarios
4. **Validador** - Permisos de validación

---

## 📋 Tabla: project_technologies

### Estructura
```sql
CREATE TABLE project_technologies (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  technology_name VARCHAR(50) NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(proyecto_id, technology_name)
);
```

### Campos
- **id**: Identificador único
- **proyecto_id**: Referencia al proyecto
- **technology_name**: Nombre de la tecnología
- **proficiency_level**: Nivel requerido (1-5)
- **created_at**: Fecha de creación

### Tecnologías Comunes
- Frontend: React, Vue, Angular, HTML, CSS, JavaScript
- Backend: Node.js, Python, Java, PHP, .NET
- Bases de Datos: PostgreSQL, MySQL, MongoDB
- Mobile: React Native, Flutter, Swift, Kotlin
- DevOps: Docker, AWS, Azure, Git

---

## 📋 Tabla: paginas_colaborativas

### Estructura
```sql
CREATE TABLE paginas_colaborativas (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
  titulo VARCHAR(200),
  descripcion TEXT,
  creada_por INTEGER REFERENCES usuarios(id),
  permisos_lectura TEXT[],
  permisos_escritura TEXT[],
  orden INTEGER DEFAULT 0,
  creada_en TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **proyecto_id**: Proyecto al que pertenece
- **titulo**: Título de la página
- **descripcion**: Descripción de la página
- **creada_por**: Usuario creador
- **permisos_lectura**: Array de permisos de lectura
- **permisos_escritura**: Array de permisos de escritura
- **orden**: Orden de visualización
- **creada_en**: Fecha de creación

### Tipos de Páginas
- `documentacion` - Documentación del proyecto
- `requisitos` - Análisis de requisitos
- `diseño` - Documentos de diseño
- `planificacion` - Planificación del proyecto
- `testing` - Documentación de testing

---

## 📋 Tabla: bloques

### Estructura
```sql
CREATE TABLE bloques (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  pagina_id INTEGER REFERENCES paginas_colaborativas(id),
  tipo VARCHAR(50),
  contenido JSONB,
  orden INTEGER DEFAULT 0,
  creado_por INTEGER REFERENCES usuarios(id),
  creado_en TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **pagina_id**: Página a la que pertenece
- **tipo**: Tipo de bloque
- **contenido**: Contenido en formato JSON
- **orden**: Orden dentro de la página
- **creado_por**: Usuario creador
- **creado_en**: Fecha de creación

### Tipos de Bloques
- `texto` - Bloque de texto
- `codigo` - Bloque de código
- `imagen` - Bloque de imagen
- `lista` - Lista de elementos
- `tabla` - Tabla de datos
- `enlace` - Enlaces externos
- `archivo` - Archivos adjuntos

### Estructura de Contenido
```json
{
  "texto": {
    "content": "Contenido del texto",
    "format": "markdown|html|plain"
  },
  "codigo": {
    "content": "código fuente",
    "language": "javascript|python|java",
    "theme": "dark|light"
  },
  "imagen": {
    "url": "https://...",
    "alt": "texto alternativo",
    "caption": "descripción"
  }
}
```

---

## 📋 Tabla: versiones_bloques

### Estructura
```sql
CREATE TABLE versiones_bloques (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bloque_id INTEGER REFERENCES bloques(id) NOT NULL,
  contenido JSONB,
  editado_por INTEGER REFERENCES usuarios(id),
  editado_en TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **bloque_id**: Bloque versionado
- **contenido**: Contenido de la versión
- **editado_por**: Usuario que hizo el cambio
- **editado_en**: Fecha del cambio

### Propósito
Sistema de versionado para rastrear cambios en bloques colaborativos.

---

## 📋 Tabla: relaciones_bloques

### Estructura
```sql
CREATE TABLE relaciones_bloques (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bloque_padre_id INTEGER NOT NULL REFERENCES bloques(id),
  bloque_hijo_id INTEGER NOT NULL REFERENCES bloques(id)
);
```

### Campos
- **id**: Identificador único
- **bloque_padre_id**: Bloque padre
- **bloque_hijo_id**: Bloque hijo

### Propósito
Permite crear jerarquías y relaciones entre bloques para organizarlos de manera lógica.

---

## 📋 Tabla: collaborative_page_permissions

### Estructura
```sql
CREATE TABLE collaborative_page_permissions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page_id INTEGER NOT NULL REFERENCES paginas_colaborativas(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  permission_type_id INTEGER NOT NULL REFERENCES permission_types(id),
  granted_by INTEGER REFERENCES usuarios(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(page_id, user_id, permission_type_id)
);
```

### Campos
- **id**: Identificador único
- **page_id**: Página colaborativa
- **user_id**: Usuario con permisos
- **permission_type_id**: Tipo de permiso
- **granted_by**: Usuario que otorgó el permiso
- **granted_at**: Fecha de otorgamiento
- **is_active**: Estado del permiso

---

## 📋 Tabla: proyectos_validaciones

### Estructura
```sql
CREATE TABLE proyectos_validaciones (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
  admin_id INTEGER REFERENCES usuarios(id),
  comentarios TEXT,
  estado VARCHAR(50),
  fecha_validacion TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **proyecto_id**: Proyecto validado
- **admin_id**: Administrador validador
- **comentarios**: Comentarios de validación
- **estado**: Estado de la validación
- **fecha_validacion**: Fecha de validación

### Estados de Validación
- `aprobado` - Proyecto aprobado
- `rechazado` - Proyecto rechazado
- `pendiente_documentos` - Falta documentación
- `revision_adicional` - Necesita más revisión

---

## 📋 Tabla: validation_documents

### Estructura
```sql
CREATE TABLE validation_documents (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  validation_id INTEGER NOT NULL REFERENCES proyectos_validaciones(id) ON DELETE CASCADE,
  document_name VARCHAR(100) NOT NULL,
  document_url TEXT,
  is_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **validation_id**: Validación asociada
- **document_name**: Nombre del documento
- **document_url**: URL del documento
- **is_submitted**: Estado de entrega
- **created_at**: Fecha de creación

---

## 🔍 Índices y Constraints

### Índices Recomendados
```sql
-- Proyectos
CREATE INDEX idx_proyectos_creador ON proyectos(creador_id);
CREATE INDEX idx_proyectos_universidad ON proyectos(universidad_id);
CREATE INDEX idx_proyectos_estado ON proyectos(estado_verificacion);
CREATE INDEX idx_proyectos_publico ON proyectos(vista_publica);

-- Participaciones
CREATE INDEX idx_participaciones_proyecto ON participaciones_proyecto(proyecto_id);
CREATE INDEX idx_participaciones_usuario ON participaciones_proyecto(usuario_id);
CREATE INDEX idx_participaciones_estado ON participaciones_proyecto(estado);

-- Páginas colaborativas
CREATE INDEX idx_paginas_proyecto ON paginas_colaborativas(proyecto_id);
CREATE INDEX idx_paginas_creador ON paginas_colaborativas(creada_por);

-- Bloques
CREATE INDEX idx_bloques_pagina ON bloques(pagina_id);
CREATE INDEX idx_bloques_tipo ON bloques(tipo);
CREATE INDEX idx_bloques_orden ON bloques(pagina_id, orden);

-- Versiones
CREATE INDEX idx_versiones_bloque ON versiones_bloques(bloque_id);
CREATE INDEX idx_versiones_fecha ON versiones_bloques(editado_en);
```

---

## 📊 Queries Comunes

### Obtener proyecto completo con participantes
```sql
SELECT 
  p.*,
  u.nombre as creador_nombre,
  uni.nombre as universidad_nombre,
  COUNT(pp.id) as total_participantes,
  array_agg(
    json_build_object(
      'usuario', pu.nombre,
      'rol', rp.nombre,
      'estado', pp.estado
    )
  ) FILTER (WHERE pp.id IS NOT NULL) as participantes
FROM proyectos p
LEFT JOIN usuarios u ON p.creador_id = u.id
LEFT JOIN universidades uni ON p.universidad_id = uni.id
LEFT JOIN participaciones_proyecto pp ON p.id = pp.proyecto_id
LEFT JOIN usuarios pu ON pp.usuario_id = pu.id
LEFT JOIN roles_proyecto rp ON pp.rol_id = rp.id
WHERE p.id = $1
GROUP BY p.id, u.nombre, uni.nombre;
```

### Obtener páginas colaborativas con bloques
```sql
SELECT 
  pc.*,
  COUNT(b.id) as total_bloques,
  array_agg(
    json_build_object(
      'id', b.id,
      'tipo', b.tipo,
      'orden', b.orden
    ) ORDER BY b.orden
  ) FILTER (WHERE b.id IS NOT NULL) as bloques
FROM paginas_colaborativas pc
LEFT JOIN bloques b ON pc.id = b.pagina_id
WHERE pc.proyecto_id = $1
GROUP BY pc.id
ORDER BY pc.orden;
```

---

*Última actualización: 2025-08-01*
