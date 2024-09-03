import { z } from "zod"

export const updateFileSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, { message: "Name is too short" }),
  language: z.union(
    [
      z.literal("ANGULAR", { message: "Invalid language" }),
      z.literal("ASTRO"),
      z.literal("CSS"),
      z.literal("CPP"),
      z.literal("GO"),
      z.literal("HTML"),
      z.literal("JAVA"),
      z.literal("JAVASCRIPT"),
      z.literal("JSON"),
      z.literal("JSX"),
      z.literal("PHP"),
      z.literal("PYTHON"),
      z.literal("SVELTE"),
      z.literal("TSX"),
      z.literal("TYPESCRIPT"),
      z.literal("VUE"),
      z.literal("YAML"),
    ],
    { message: "Invalid language" }
  ),
  content: z
    .string({
      message: "Content is required",
      required_error: "Content is required",
    })
    .min(1, { message: "Content is required" }),
  snippetId: z.string().uuid(),
})
