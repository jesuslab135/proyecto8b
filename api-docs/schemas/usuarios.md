# 👥 Schemas de Usuarios y Autenticación

## 📋 Tabla: usuarios

### Estructura
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  rol_id INTEGER REFERENCES roles_usuario(id),
  universidad_id INTEGER REFERENCES universidades(id),
  fecha_registro TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT true,
  email_verificado BOOLEAN DEFAULT false,
  ultimo_login TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Campos
- **id**: Identificador único (auto-generado)
- **nombre**: Nombre completo del usuario
- **email**: Correo electrónico (único)
- **password**: Contraseña hasheada
- **rol_id**: Referencia al rol del usuario
- **universidad_id**: Referencia a la universidad
- **fecha_registro**: Fecha de registro
- **activo**: Estado del usuario
- **email_verificado**: Estado de verificación del email
- **ultimo_login**: Última vez que inició sesión
- **updated_at**: Última actualización

### Relaciones
- **rol_id** → `roles_usuario.id`
- **universidad_id** → `universidades.id`

### Validaciones Zod
```typescript
export const insertUsuarioSchema = z.object({
  nombre: z.string().max(100),
  email: z.string().email().max(150),
  password: z.string().min(6).max(255),
  rol_id: z.number().int(),
  universidad_id: z.number().int(),
  activo: z.boolean().optional(),
  email_verificado: z.boolean().optional()
});

export const updateUsuarioSchema = insertUsuarioSchema.partial();
```

---

## 📋 Tabla: roles_usuario

### Estructura
```sql
CREATE TABLE roles_usuario (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(50)
);
```

### Roles del Sistema
1. **Admin** - Administrador del sistema
2. **Universidad** - Representante institucional
3. **Usuario** - Usuario estándar

### Campos
- **id**: Identificador único
- **nombre**: Nombre del rol

### Validaciones Zod
```typescript
export const insertRolUsuarioSchema = z.object({
  nombre: z.string().max(50)
});

export const updateRolUsuarioSchema = insertRolUsuarioSchema.partial();
```

---

## 📋 Tabla: perfiles

### Estructura
```sql
CREATE TABLE perfiles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usuario_id INTEGER REFERENCES usuarios(id),
  cv_url TEXT,
  skills TEXT,
  historial_participacion TEXT
);
```

### Campos
- **id**: Identificador único
- **usuario_id**: Referencia al usuario
- **cv_url**: URL del CV
- **skills**: Habilidades del usuario
- **historial_participacion**: Historial de participaciones

### Relaciones
- **usuario_id** → `usuarios.id`

### Validaciones Zod
```typescript
export const insertPerfilSchema = z.object({
  usuario_id: z.number().int(),
  cv_url: z.string(),
  skills: z.string(),
  historial_participacion: z.string()
});

export const updatePerfilSchema = insertPerfilSchema.partial();
```

---

## 📋 Tabla: user_skills

### Estructura
```sql
CREATE TABLE user_skills (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, skill_name)
);
```

### Campos
- **id**: Identificador único
- **usuario_id**: Referencia al usuario
- **skill_name**: Nombre de la habilidad
- **proficiency_level**: Nivel de competencia (1-5)
- **created_at**: Fecha de creación

### Niveles de Competencia
1. **Principiante** - Conocimiento básico
2. **Básico** - Puede realizar tareas simples
3. **Intermedio** - Competencia sólida
4. **Avanzado** - Experto en el área
5. **Experto** - Nivel de especialista

### Relaciones
- **usuario_id** → `usuarios.id` (CASCADE DELETE)

### Validaciones Zod
```typescript
export const insertUserSkillSchema = z.object({
  usuario_id: z.number().int(),
  skill_name: z.string().max(100),
  proficiency_level: z.number().int().min(1).max(5)
});
```

---

## 📋 Tabla: tokens_iniciales_acceso

### Estructura
```sql
CREATE TABLE tokens_iniciales_acceso (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usuario_id INTEGER REFERENCES usuarios(id),
  token_acceso VARCHAR(100),
  usado BOOLEAN DEFAULT false,
  generado_en TIMESTAMP DEFAULT NOW(),
  correo VARCHAR(150)
);
```

### Campos
- **id**: Identificador único
- **usuario_id**: Referencia al usuario (opcional)
- **token_acceso**: Token único de acceso
- **usado**: Estado del token
- **generado_en**: Fecha de generación
- **correo**: Email asociado al token

### Propósito
Tokens generados para permitir el primer acceso de usuarios invitados por universidades.

### Relaciones
- **usuario_id** → `usuarios.id`

### Validaciones Zod
```typescript
export const insertTokenAccesoSchema = z.object({
  usuario_id: z.number().optional(),
  token_acceso: z.string().max(100),
  usado: z.boolean().optional(),
  generado_en: z.date().optional(),
  correo: z.string().max(150)
});
```

---

## 📋 Tabla: actividad_usuario

### Estructura
```sql
CREATE TABLE actividad_usuario (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usuario_id INTEGER REFERENCES usuarios(id),
  tipo_actividad VARCHAR(100),
  objeto_id INTEGER,
  contexto VARCHAR(50),
  fecha TIMESTAMP DEFAULT NOW()
);
```

### Campos
- **id**: Identificador único
- **usuario_id**: Usuario que realizó la actividad
- **tipo_actividad**: Tipo de actividad realizada
- **objeto_id**: ID del objeto relacionado
- **contexto**: Contexto de la actividad
- **fecha**: Timestamp de la actividad

### Tipos de Actividad
- `proyecto_creado`
- `proyecto_editado`
- `mensaje_enviado`
- `postulacion_enviada`
- `evento_asistido`
- `perfil_actualizado`

### Relaciones
- **usuario_id** → `usuarios.id`

### Validaciones Zod
```typescript
export const insertActividadUsuarioSchema = z.object({
  usuario_id: z.number().int(),
  tipo_actividad: z.string().max(100),
  objeto_id: z.number().int(),
  contexto: z.string().max(50)
});
```

---

## 📋 Tabla: experiencia_usuario

### Estructura
```sql
CREATE TABLE experiencia_usuario (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  usuario_id INTEGER REFERENCES usuarios(id),
  tipo VARCHAR(50),
  titulo VARCHAR(100),
  descripcion TEXT,
  fecha_inicio DATE,
  fecha_fin DATE
);
```

### Campos
- **id**: Identificador único
- **usuario_id**: Referencia al usuario
- **tipo**: Tipo de experiencia
- **titulo**: Título del puesto/experiencia
- **descripcion**: Descripción detallada
- **fecha_inicio**: Fecha de inicio
- **fecha_fin**: Fecha de fin (opcional)

### Tipos de Experiencia
- `trabajo`
- `practicas`
- `voluntariado`
- `proyecto_personal`
- `certificacion`

### Relaciones
- **usuario_id** → `usuarios.id`

---

## 🏛️ Tabla: universidades

### Estructura
```sql
CREATE TABLE universidades (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nombre VARCHAR(150),
  dominio_correo VARCHAR(100),
  logo_url TEXT
);
```

### Campos
- **id**: Identificador único
- **nombre**: Nombre de la universidad
- **dominio_correo**: Dominio de email institucional
- **logo_url**: URL del logo

### Validaciones Zod
```typescript
export const insertUniversidadSchema = z.object({
  nombre: z.string().max(150),
  dominio_correo: z.string().max(100),
  logo_url: z.string().nullable().optional()
});

export const updateUniversidadSchema = insertUniversidadSchema.partial();
```

---

## 🔍 Índices y Constraints

### Índices Recomendados
```sql
-- Usuarios
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_universidad ON usuarios(universidad_id);
CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);

-- Perfiles
CREATE INDEX idx_perfiles_usuario ON perfiles(usuario_id);

-- Skills
CREATE INDEX idx_user_skills_usuario ON user_skills(usuario_id);
CREATE INDEX idx_user_skills_name ON user_skills(skill_name);

-- Actividad
CREATE INDEX idx_actividad_usuario ON actividad_usuario(usuario_id);
CREATE INDEX idx_actividad_fecha ON actividad_usuario(fecha);
CREATE INDEX idx_actividad_tipo ON actividad_usuario(tipo_actividad);

-- Tokens
CREATE INDEX idx_tokens_correo ON tokens_iniciales_acceso(correo);
CREATE INDEX idx_tokens_usado ON tokens_iniciales_acceso(usado);
```

### Constraints Importantes
- Email único en usuarios
- Constraint de nivel de skill (1-5)
- Unique constraint en user_skills (usuario_id, skill_name)
- Foreign keys con CASCADE DELETE donde corresponde

---

## 📊 Queries Comunes

### Obtener perfil completo de usuario
```sql
SELECT 
  u.*,
  r.nombre as rol_nombre,
  uni.nombre as universidad_nombre,
  p.cv_url,
  p.skills,
  array_agg(
    json_build_object(
      'skill', us.skill_name,
      'level', us.proficiency_level
    )
  ) as user_skills
FROM usuarios u
LEFT JOIN roles_usuario r ON u.rol_id = r.id
LEFT JOIN universidades uni ON u.universidad_id = uni.id
LEFT JOIN perfiles p ON u.id = p.usuario_id
LEFT JOIN user_skills us ON u.id = us.usuario_id
WHERE u.id = $1
GROUP BY u.id, r.nombre, uni.nombre, p.cv_url, p.skills;
```

### Actividad reciente de usuario
```sql
SELECT 
  au.*,
  u.nombre as usuario_nombre
FROM actividad_usuario au
JOIN usuarios u ON au.usuario_id = u.id
WHERE au.usuario_id = $1
ORDER BY au.fecha DESC
LIMIT 20;
```

---

*Última actualización: 2025-08-01*
