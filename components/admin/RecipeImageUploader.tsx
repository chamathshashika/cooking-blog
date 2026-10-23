"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Link as LinkIcon,
} from "lucide-react";
import { uploadRecipeImage } from "@/lib/actions/upload";
import { useToast } from "@/components/ToastProvider";
import { getBlobDisplayUrl } from "@/lib/blob-util";

type Props = {
  imageUrl: string;
  onImageChange: (url: string) => void;
  onUploadStatusChange?: (isUploading: boolean) => void;
  disabled?: boolean;
};

export default function RecipeImageUploader({
  imageUrl,
  onImageChange,
  onUploadStatusChange,
  disabled = false,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileSelect = async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      showToast("Invalid file format. Please select a JPG or PNG image.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("File is too large. Recipe images must be under 5MB.", "error");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setFailedUrl(null);

    setIsUploading(true);
    onUploadStatusChange?.(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadRecipeImage(formData);

      if (result.success && result.url) {
        onImageChange(result.url);
        setLocalPreview(null);
        setFailedUrl(null);
        showToast("Recipe image uploaded successfully!", "success");
      } else {
        showToast(result.error || "Failed to upload image to Vercel Blob.", "error");
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during image upload.";
      showToast(errorMessage, "error");
    } finally {
      setIsUploading(false);
      onUploadStatusChange?.(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled || isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const currentDisplayUrl = localPreview || imageUrl;
  const isVercelBlob =
    imageUrl.includes("blob.vercel-storage.com") ||
    imageUrl.startsWith("/api/blob");
  const isImageFailed = failedUrl === currentDisplayUrl;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Live Recipe Image Preview */}
        <div className="relative h-44 w-full sm:w-56 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-ink/20 dark:border-hairline bg-linen/50 dark:bg-panel/40 flex flex-col items-center justify-center shadow-xs">
          {currentDisplayUrl && !isImageFailed ? (
            <div className="relative h-full w-full group">
              <Image
                src={getBlobDisplayUrl(currentDisplayUrl)}
                alt="Recipe preview"
                fill
                sizes="224px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized={
                  currentDisplayUrl.startsWith("blob:") ||
                  currentDisplayUrl.startsWith("data:")
                }
                onError={() => setFailedUrl(currentDisplayUrl)}
              />
              <div className="absolute inset-0 bg-ink/10 dark:bg-obsidian/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              {isVercelBlob && (
                <div className="absolute top-2 right-2 rounded bg-ink/75 dark:bg-obsidian/80 px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider text-white dark:text-ice backdrop-blur-xs flex items-center gap-1 shadow-xs border border-transparent dark:border-hairline">
                  <CheckCircle2 className="h-2.5 w-2.5 text-sage dark:text-amber-primary" />
                  <span>Vercel Blob</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center text-muted dark:text-slate-muted">
              <ImageIcon className="h-10 w-10 text-muted/40 dark:text-slate-muted/40 mb-1" />
              <span className="font-ui text-xs font-medium text-ink dark:text-ice">
                {isImageFailed ? "Failed to load image" : "No image selected"}
              </span>
              <span className="font-ui text-[10px] text-muted/70 dark:text-slate-muted/70 mt-0.5">
                Recommended 4:3 or 3:4 ratio
              </span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-surface/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-10">
              <Loader2 className="h-6 w-6 animate-spin text-sage dark:text-amber-primary" />
              <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice">
                Uploading image...
              </span>
            </div>
          )}
        </div>

        {/* Upload Drop Zone & Controls */}
        <div className="flex-1 w-full space-y-3">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => {
              if (!disabled && !isUploading) {
                fileInputRef.current?.click();
              }
            }}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all ${
              dragActive
                ? "border-sage dark:border-amber-primary bg-sage/5 dark:bg-amber-primary/10 scale-[1.01]"
                : "border-ink/20 dark:border-hairline hover:border-sage dark:hover:border-amber-primary/50 hover:bg-linen/30 dark:hover:bg-panel/60 bg-transparent"
            } ${disabled || isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              className="hidden"
              disabled={disabled || isUploading}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="rounded-full bg-cream dark:bg-surface p-2 text-ink dark:text-ice shadow-2xs border border-transparent dark:border-hairline">
                <Upload className="h-4 w-4 text-sage dark:text-amber-primary" />
              </div>
              <p className="font-ui text-xs font-semibold text-ink dark:text-ice">
                <span className="text-sage dark:text-amber-text hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="font-ui text-[11px] text-muted dark:text-slate-muted">
                JPG or PNG up to 5MB (Stored on Vercel Blob)
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1.5 font-ui text-[11px] font-semibold text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors"
            >
              <LinkIcon className="h-3 w-3" />
              <span>{showUrlInput ? "Hide custom URL input" : "Or enter custom image URL"}</span>
            </button>
            {imageUrl && (
              <span className="font-ui text-[10px] text-muted dark:text-slate-muted truncate max-w-[200px]" title={imageUrl}>
                {imageUrl.startsWith("/api/blob") ? "Vercel Blob Image" : imageUrl}
              </span>
            )}
          </div>

          {showUrlInput && (
            <div className="mt-2 space-y-1">
              <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                Direct Image URL or Path
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... or /images/recipes/..."
                  value={imageUrl}
                  onChange={(e) => {
                    setLocalPreview(null);
                    setFailedUrl(null);
                    onImageChange(e.target.value);
                  }}
                  disabled={disabled || isUploading}
                  className="flex-1 rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
