import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/db/productsSchema.ts',
    './src/db/usersSchema.ts',
    './src/db/ordersSchema.ts',
    './src/db/actividadUsuarioSchema.ts',
    './src/db/asistenciasUsuarioSchema.ts',
    './src/db/conversacionesSchema.ts',
    './src/db/eventosSchema.ts',
    './src/db/forosSchema.ts',
    './src/db/mensajesSchema.ts',
    './src/db/oportunidadesSchema.ts',
    './src/db/rolesProyectoSchema.ts',
    './src/db/rolesUsuarioSchema.ts',
    './src/db/tagsSchema.ts',
    './src/db/universidadesSchema.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});