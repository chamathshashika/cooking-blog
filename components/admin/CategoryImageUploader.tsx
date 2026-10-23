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
import { uploadCategoryImage } from "@/lib/actions/upload";
import { useToast } from "@/components/ToastProvider";
import { getBlobDisplayUrl } from "@/lib/blob-util";

type Props = {
  imageUrl: string;
  onImageChange: (url: string) => void;
  onUploadStatusChange?: (isUploading: boolean) => void;
  disabled?: boolean;
};

export default function CategoryImageUploader({
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

  // Clean up object URL when component unmounts or localPreview changes
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileSelect = async (file: File) => {
    // 1. Client-side validation
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      showToast("Invalid file format. Please select a JPG or PNG image.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("File is too large. Category images must be under 5MB.", "error");
      return;
    }

    // 2. Immediately show local object URL preview in Carousel Preview
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    setFailedUrl(null);

    // 3. Perform upload
    setIsUploading(true);
    onUploadStatusChange?.(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadCategoryImage(formData);

      if (result.success && result.url) {
        onImageChange(result.url);
        setLocalPreview(null);
        setFailedUrl(null);
        showToast("Category image uploaded successfully!", "success");
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

  // Clean and resolve imageUrl using getBlobDisplayUrl
  const cleanImageUrl = imageUrl?.trim() || "";
  const resolvedUrl = cleanImageUrl ? getBlobDisplayUrl(cleanImageUrl) : "";
  const displayUrl = localPreview || resolvedUrl;
  const isImageBroken = Boolean(displayUrl && failedUrl === displayUrl);

  const isVercelBlob = Boolean(
    displayUrl &&
      (displayUrl.includes("vercel-storage.com") ||
        displayUrl.startsWith("/api/blob") ||
        (process.env.NEXT_PUBLIC_BLOB_STORE_URL &&
          displayUrl.includes(process.env.NEXT_PUBLIC_BLOB_STORE_URL)))
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice">
          Category Image *
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1 font-ui text-[11px] font-semibold text-sage dark:text-amber-text hover:text-sage-dark dark:hover:text-amber-primary transition-colors cursor-pointer"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showUrlInput ? "Hide Direct URL" : "Enter Direct URL"}</span>
        </button>
      </div>

      {/* Upload Zone & Preview Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
        {/* Left: Interactive Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`sm:col-span-8 group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all cursor-pointer ${
            dragActive
              ? "border-sage dark:border-amber-primary bg-cream/40 dark:bg-amber-primary/10 scale-[1.01]"
              : "border-ink/20 dark:border-hairline bg-linen/20 dark:bg-panel/30 hover:border-sage/70 dark:hover:border-amber-primary/70 hover:bg-cream/20 dark:hover:bg-panel/60"
          } ${disabled || isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,.jpg,.jpeg,.png"
            disabled={disabled || isUploading}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {isUploading ? (
            <div className="py-2.5 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-sage dark:text-amber-primary" />
              <span className="font-ui text-xs font-bold text-ink dark:text-ice">
                Uploading to Vercel Blob...
              </span>
              <span className="font-ui text-[10px] text-muted dark:text-slate-muted">
                Optimizing & storing securely in the cloud
              </span>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center justify-center gap-1.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream dark:bg-surface text-ink/80 dark:text-ice group-hover:bg-sunshine dark:group-hover:bg-amber-primary group-hover:text-ink dark:group-hover:text-obsidian transition-colors border border-transparent dark:border-hairline">
                <Upload className="h-4 w-4" />
              </div>
              <div className="font-ui text-xs font-semibold text-ink dark:text-ice">
                <span className="text-sage dark:text-amber-text underline underline-offset-2">
                  Click to upload
                </span>{" "}
                or drag and drop
              </div>
              <p className="font-ui text-[10px] text-muted dark:text-slate-muted">
                JPG or PNG (Max 5MB) • Hosted via @vercel/blob
              </p>
            </div>
          )}
        </div>

        {/* Right: Live Circular Carousel Preview */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center rounded-xl border border-ink/10 dark:border-hairline bg-linen/30 dark:bg-panel/40 p-3 text-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-surface shadow-sm bg-cream dark:bg-surface">
            {displayUrl && !isImageBroken ? (
              localPreview?.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayUrl}
                  alt="Carousel Preview"
                  onError={() => setFailedUrl(displayUrl)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={displayUrl}
                  alt="Carousel Preview"
                  fill
                  sizes="80px"
                  unoptimized
                  onError={() => setFailedUrl(displayUrl)}
                  className="object-cover"
                />
              )
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-muted dark:text-slate-muted p-1">
                <ImageIcon className="h-6 w-6 text-muted/60 dark:text-slate-muted/60" />
                <span className="text-[9px] font-ui text-muted dark:text-slate-muted mt-0.5">
                  {isImageBroken ? "Invalid URL" : "No image"}
                </span>
              </div>
            )}
          </div>
          <span className="mt-2 font-ui text-[10px] font-bold uppercase tracking-wider text-ink/80 dark:text-ice/80">
            Carousel Preview
          </span>
          {isVercelBlob && (
            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-transparent dark:border-emerald-800/40 px-2 py-0.5 font-ui text-[9px] font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Vercel Blob
            </span>
          )}
        </div>
      </div>

      {/* Manual URL Input (Optional Fallback / Direct Editor) */}
      {showUrlInput && (
        <div className="rounded-lg border border-ink/10 dark:border-hairline bg-white dark:bg-panel p-3 space-y-1.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="font-ui text-[11px] font-bold text-ink dark:text-ice">
              Direct Image URL
            </span>
            <span className="font-ui text-[10px] text-muted dark:text-slate-muted">
              Auto-synced with file upload
            </span>
          </div>
          <input
            type="text"
            required
            disabled={disabled || isUploading}
            value={imageUrl}
            onChange={(e) => {
              setLocalPreview(null);
              setFailedUrl(null);
              onImageChange(e.target.value);
            }}
            placeholder="https://... or uploaded blob URL"
            className="w-full rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-surface px-3 py-1.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted/50 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-60"
          />
        </div>
      )}
    </div>
  );
}
