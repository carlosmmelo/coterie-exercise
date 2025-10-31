/**
 * Zod schemas and helpers for response validation.
 * Ensures we validate structure and types, not exact dynamic values.
 */
import { z } from 'zod';

export const QuoteResponseSchema = z.object({
  premium: z.number().finite().nonnegative(),
  quoteId: z.string().min(1)
});

export type QuoteResponseSchemaType = z.infer<typeof QuoteResponseSchema>;

/**
 * Validates arbitrary data against a Zod schema and returns a uniform result.
 */
export function validateSchema<T>(schema: z.ZodType<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    errors: result.error.issues.map(i => `${i.path.join('.') || '(root)'}: ${i.message}`)
  };
}


