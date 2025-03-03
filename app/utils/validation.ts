// validation.ts
import { z } from 'zod';

// Error message constants
export const XSS_ERROR_MESSAGE = 'Content contains potentially unsafe patterns';
export const EMAIL_ERROR_MESSAGE = 'Please enter a valid email address';
export const URL_ERROR_MESSAGE = 'Please enter a valid URL';
export const MIN_LENGTH_ERROR_MESSAGE = (minLength: number) => `Must be at least ${minLength} characters`;
export const MAX_LENGTH_ERROR_MESSAGE = (maxLength: number) => `Must not exceed ${maxLength} characters`;
export const INVALID_PHONE_NUMBER_ERROR_MESSAGE = 'Phone number contains invalid characters';

/**
 * Comprehensive XSS detection patterns
 * These patterns cover common XSS attack vectors including:
 * - Script tags
 * - JavaScript protocol in URLs
 * - Event handlers (onclick, onload, etc.)
 * - Data URIs with JavaScript
 * - HTML entity encoding tricks
 * - Various injection techniques
 */
export const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i, // <script> tags
  /javascript:\s*/i, // javascript: protocol
  /\bon\w+\s*=/i, // Event handlers (onclick, onload, etc.)
  /data:(?:text\/html|application\/javascript|text\/javascript)/i, // Data URIs with JavaScript
  /<iframe\b[^>]*>/i, // <iframe> tags
  /<img\b[^>]*\sonerror\s*=/i, // <img> with onerror
  /&#x?[0-9a-f]+;/i, // HTML entity encoding (hexadecimal)
  /expression\s*\(|eval\s*\(|Function\s*\(/i, // JavaScript expressions, eval, Function constructor
  /<svg\b[^>]*>.*<script\b[^>]*>/i, // SVG with embedded scripts
  /url\s*\(\s*['"]?\s*javascript:/i, // CSS url() with javascript:
  /vbscript:/i, // Added vbscript protocol
  /data:text\/plain;base64,/i, // Detect base64 encoded text
];

/**
 * Creates a Zod refinement that checks for common XSS patterns
 * @param errorMessage Custom error message to display when XSS is detected
 * @returns A Zod refinement function that can be chained to any string schema
 */
export const noXSS = (errorMessage: string = XSS_ERROR_MESSAGE) => {
  return (schema: z.ZodString) =>
    schema.refine(
      (value) => !XSS_PATTERNS.some((pattern) => pattern.test(value)),
      { message: errorMessage }
    );
};

/**
 * Pre-configured string schema with XSS protection
 * @param options Optional configuration options
 * @returns A Zod string schema with XSS protection
 */
export const safeString = (options?: {
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
}) => {
  let schema = z.string();

  if (options?.minLength !== undefined) {
    schema = schema.min(options.minLength,
      options.errorMessage || MIN_LENGTH_ERROR_MESSAGE(options.minLength));
  }

  if (options?.maxLength !== undefined) {
    schema = schema.max(options.maxLength,
      options.errorMessage || MAX_LENGTH_ERROR_MESSAGE(options.maxLength));
  }

  return schema.pipe(
    z.string().refine(
      (value) => !XSS_PATTERNS.some((pattern) => pattern.test(value)),
      { message: options?.errorMessage || XSS_ERROR_MESSAGE }
    )
  );
};

/**
 * Safe email schema with XSS protection
 * @param errorMessage Custom error message for XSS detection
 * @returns A Zod email schema with XSS protection
 */
export const safeEmail = (errorMessage: string = XSS_ERROR_MESSAGE) => {
  return z.string()
    .email(EMAIL_ERROR_MESSAGE)
    .pipe(
      z.string().refine(
        (value) => !XSS_PATTERNS.some((pattern) => pattern.test(value)),
        { message: errorMessage }
      )
    );
};

/**
 * Safe URL schema with XSS protection
 * @param errorMessage Custom error message for XSS detection
 * @returns A Zod URL schema with XSS protection
 */
export const safeUrl = (errorMessage: string = XSS_ERROR_MESSAGE) => {
  return z.string()
    .url(URL_ERROR_MESSAGE)
    .pipe(
      z.string().refine(
        (value) => !XSS_PATTERNS.some((pattern) => pattern.test(value)),
        { message: errorMessage }
      )
    );
};

export const safePhoneNumber = (errorMessage: string = INVALID_PHONE_NUMBER_ERROR_MESSAGE) => {
  return z.string().pipe(
    z.string().refine(
      (value) => !XSS_PATTERNS.some((pattern) => pattern.test(value)),
      { message: errorMessage }
    )
  );
};
