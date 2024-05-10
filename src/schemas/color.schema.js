import { z } from "zod";

export const createColorSchema = z.object({
  name: z
    .string({
      required_error: "El nombre del color es requerido",
    })
    .min(1, "El nombre no puede estar vacío"),
});
