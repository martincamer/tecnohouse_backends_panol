import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z.string({
    required_error: "Nombre es requerido",
  }),
  apellido: z.string({
    required_error: "Apellido es requerido",
  }),
  fabrica: z.string({
    required_error: "Fabrica es requerida",
  }),
  zona: z.string({
    required_error: "Zona es requerida",
  }),
});
