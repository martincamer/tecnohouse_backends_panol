import { z } from "zod";

export const createCategoriaSchema = z.object({
  detalle: z.string({
    required_error: "Detalle es requerido",
  }),
});
