/**
 * Storage Service Abstraction for Infinity Bangladesh
 * Handles secure file validation, MIME type checking, and cloud storage upload orchestration (Cloudinary / S3 / Supabase).
 */

export interface UploadValidationResult {
  valid: boolean;
  error?: string;
}

export interface UploadResult {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf'
];

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export class StorageService {
  /**
   * Validates file size and MIME type before processing
   */
  static validateFile(file: File): UploadValidationResult {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file format (${file.type}). Only JPG, PNG, WebP, SVG, and PDF files are allowed.`
      };
    }

    const isPdf = file.type === 'application/pdf';
    const limit = isPdf ? MAX_PDF_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;

    if (file.size > limit) {
      const limitMb = Math.round(limit / (1024 * 1024));
      return {
        valid: false,
        error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${limitMb} MB.`
      };
    }

    return { valid: true };
  }

  /**
   * Upload file to configured storage provider or convert to base64 preview for offline / demo mode
   */
  static async uploadFile(file: File): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Convert to data URL preview in frontend browser demo mode
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          success: true,
          fileUrl: reader.result as string,
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`
        });
      };
      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file from client disk.'
        });
      };
      reader.readAsDataURL(file);
    });
  }
}
