// to make the file a module and avoid the TypeScript error
// src/types/express/index.d.ts
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      cleanBody?: any;
      rol_id?: Number;
      rawBody?: Buffer;
    }
  }
}