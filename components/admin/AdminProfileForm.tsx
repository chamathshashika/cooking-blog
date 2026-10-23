"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Shield,
  KeyRound,
  Upload,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Mail,
  Lock,
  Link as LinkIcon,
} from "lucide-react";
import {
  updateUserProfile,
  changePassword,
  type UserProfileData,
} from "@/lib/actions/user";
import { uploadAvatarImage } from "@/lib/actions/upload";
import { useToast } from "@/components/ToastProvider";
import { getBlobDisplayUrl, isBlobProxyUrl } from "@/lib/blob-util";

type Props = {
  initialUser: UserProfileData;
};

export default function AdminProfileForm({ initialUser }: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  // Active tab state
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Profile Information State
  const [name, setName] = useState(initialUser.name || "");
  const [bio, setBio] = useState(initialUser.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(initialUser.avatar || "");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Async Pending States
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke temporary object URLs on cleanup
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  // Handle avatar file selection & upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      showToast(
        "Invalid file format. Please choose a JPG, PNG, WebP, AVIF, or GIF image.",
        "error"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Avatar image must be under 5MB in size.", "error");
      return;
    }

    // Set immediate local preview
    const tempUrl = URL.createObjectURL(file);
    setLocalPreview(tempUrl);
    setAvatarError(false);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadAvatarImage(formData);
      if (result.success && result.url) {
        setAvatarUrl(result.url);
        setLocalPreview(null);
        showToast("Profile photo uploaded to cloud storage!", "success");
      } else {
        showToast(result.error || "Failed to upload avatar image.", "error");
        setLocalPreview(null);
      }
    } catch (err: unknown) {
      console.error("Avatar upload error:", err);
      showToast("Failed to upload image. Please try again.", "error");
      setLocalPreview(null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Remove avatar
  const handleRemoveAvatar = () => {
    setAvatarUrl("");
    setLocalPreview(null);
    setAvatarError(false);
    showToast("Profile picture cleared. Click 'Save Profile' to apply.", "info");
  };

  // Apply custom URL
  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    setAvatarUrl(customUrl.trim());
    setLocalPreview(null);
    setAvatarError(false);
    setShowUrlInput(false);
    setCustomUrl("");
    showToast("Custom avatar URL set!", "info");
  };

  // Submit Profile Information
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      showToast("Name must be at least 2 characters.", "error");
      return;
    }

    startProfileTransition(async () => {
      const result = await updateUserProfile({
        name: name.trim(),
        avatar: avatarUrl,
        bio: bio.trim(),
      });

      if (result.success) {
        showToast(result.message || "Profile updated successfully!", "success");
        router.refresh();
      } else {
        showToast(result.error || "Failed to update profile.", "error");
      }
    });
  };

  // Submit Password Change
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast("Please provide your current account password.", "error");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      showToast("New password must be at least 6 characters long.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New password and confirmation do not match.", "error");
      return;
    }

    if (currentPassword === newPassword) {
      showToast("New password must be different from current password.", "error");
      return;
    }

    startPasswordTransition(async () => {
      const result = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (result.success) {
        showToast(result.message || "Password changed successfully!", "success");
        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(result.error || "Failed to change password.", "error");
      }
    });
  };

  const currentDisplayAvatar = localPreview || avatarUrl;
  const isPasswordsMatching =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const isPasswordsMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;
  const isNewPasswordValid = newPassword.length >= 6;

  return (
    <div className="space-y-6">
      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-2 border-b border-ink/10 dark:border-hairline pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-ui text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "profile"
              ? "bg-sage dark:bg-emerald-600 text-white shadow-xs"
              : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice hover:bg-cream/40 dark:hover:bg-panel"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile & Picture</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-ui text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === "password"
              ? "bg-sage dark:bg-emerald-600 text-white shadow-xs"
              : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice hover:bg-cream/40 dark:hover:bg-panel"
          }`}
        >
          <KeyRound className="h-4 w-4" />
          <span>Change Password</span>
        </button>
      </div>

      {/* TAB 1: Profile & Avatar Management */}
      {activeTab === "profile" && (
        <form
          onSubmit={handleProfileSubmit}
          className="rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-8 shadow-xs space-y-8"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 dark:border-hairline pb-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-ink dark:text-ice">
                Profile Information
              </h2>
              <p className="mt-1 font-display text-xs text-muted dark:text-slate-muted">
                Manage your public chef identity, photo avatar, and culinary biography.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream dark:bg-panel border border-ink/15 dark:border-hairline px-3 py-1 font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice">
                <Shield className="h-3 w-3 text-sage dark:text-gold" />
                <span>Role: {initialUser.role}</span>
              </span>
            </div>
          </div>

          {/* Profile Picture (Avatar) Block */}
          <div className="space-y-4">
            <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice">
              Profile Picture / Avatar
            </label>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 sm:p-6 rounded-lg bg-linen/25 dark:bg-panel/40 border border-ink/10 dark:border-hairline">
              {/* Circular Avatar Preview */}
              <div className="relative group shrink-0">
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-sage/40 dark:border-amber-primary/40 bg-white dark:bg-panel shadow-md flex items-center justify-center">
                  {currentDisplayAvatar && !avatarError ? (
                    <Image
                      src={getBlobDisplayUrl(currentDisplayAvatar)}
                      alt={name || "Chef Profile"}
                      fill
                      sizes="112px"
                      unoptimized={isBlobProxyUrl(currentDisplayAvatar)}
                      className="object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-muted dark:text-slate-muted">
                      {name ? (
                        <span className="font-display text-4xl text-ink dark:text-ice font-bold">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className="h-10 w-10 stroke-[1.5]" />
                      )}
                    </div>
                  )}

                  {/* Upload Overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-[10px] font-ui uppercase font-bold mt-1">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>

                {/* Camera Quick Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || isProfilePending}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-sage dark:bg-emerald-600 text-white shadow-md hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  title="Upload new photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Action Controls & Guidelines */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isProfilePending}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-sage dark:bg-emerald-600 px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-sage-dark dark:hover:bg-emerald-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload New Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    disabled={isUploading || isProfilePending}
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3 py-2 font-ui text-[11px] font-bold uppercase tracking-wider text-ink dark:text-ice shadow-2xs hover:border-sage dark:hover:border-amber-primary transition-colors"
                  >
                    <LinkIcon className="h-3.5 w-3.5 text-muted dark:text-slate-muted" />
                    <span>Paste Image URL</span>
                  </button>

                  {currentDisplayAvatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={isUploading || isProfilePending}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-red-200 dark:border-red-900/40 bg-white dark:bg-panel px-3 py-2 font-ui text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 shadow-2xs hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Optional Direct URL Input Drawer */}
                {showUrlInput && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="url"
                      placeholder="https://example.com/avatar.jpg"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1 rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3 py-1.5 font-sans text-xs text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:border-sage dark:focus:border-amber-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCustomUrl}
                      className="min-h-[34px] rounded-md bg-ink dark:bg-ice px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-white dark:text-obsidian"
                    >
                      Apply
                    </button>
                  </div>
                )}

                <p className="font-sans text-xs text-muted dark:text-slate-muted">
                  Supports JPEG, PNG, WebP, or GIF (max 5MB). Photo is automatically cropped into a round chef avatar.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="user-name"
                className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
              >
                Chef / Display Name <span className="text-red-500">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chef Kasun Silva"
                className="w-full rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2.5 font-sans text-sm text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus:ring-1 focus:ring-sage dark:focus:ring-amber-primary"
              />
              <p className="font-sans text-[11px] text-muted dark:text-slate-muted">
                This name appears on all recipe cards and culinary articles authored by you.
              </p>
            </div>

            {/* Email Address (Read-Only) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="user-email"
                  className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
                >
                  Email Address
                </label>
                <span className="flex items-center gap-1 font-ui text-[10px] uppercase font-bold text-sage dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified Login</span>
                </span>
              </div>
              <div className="relative">
                <input
                  id="user-email"
                  type="email"
                  disabled
                  value={initialUser.email}
                  className="w-full rounded-md border border-ink/10 dark:border-hairline bg-linen/30 dark:bg-panel/50 px-3.5 py-2.5 font-sans text-sm text-muted dark:text-slate-muted cursor-not-allowed pl-9"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted/60 dark:text-slate-muted/60" />
              </div>
              <p className="font-sans text-[11px] text-muted dark:text-slate-muted">
                Email address is your account identifier and cannot be changed here.
              </p>
            </div>

            {/* Author Biography */}
            <div className="sm:col-span-2 space-y-1.5">
              <label
                htmlFor="user-bio"
                className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
              >
                Culinary Biography & Story
              </label>
              <textarea
                id="user-bio"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share a short culinary background, regional specialty (e.g. Southern Sri Lankan curries), or passion for authentic spice blends..."
                className="w-full rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel p-3.5 font-sans text-sm text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus:ring-1 focus:ring-sage dark:focus:ring-amber-primary resize-y"
              />
              <p className="font-sans text-[11px] text-muted dark:text-slate-muted">
                Optional author bio shown on public recipe detail pages.
              </p>
            </div>
          </div>

          {/* Form Submit Bar */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink/10 dark:border-hairline">
            <button
              type="submit"
              disabled={isProfilePending || isUploading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-sage hover:bg-sage-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
            >
              {isProfilePending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Change Password */}
      {activeTab === "password" && (
        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-8 shadow-xs space-y-6 w-full max-w-4xl"
        >
          {/* Section Header */}
          <div className="border-b border-ink/10 dark:border-hairline pb-5">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-sage dark:text-gold" />
              <h2 className="font-display text-xl sm:text-2xl text-ink dark:text-ice">
                Change Password
              </h2>
            </div>
            <p className="mt-1 font-display text-xs text-muted dark:text-slate-muted">
              Ensure your account is protected with a secure password. You will need your current password to confirm this change.
            </p>
          </div>

          {/* Current Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="current-password"
              className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
            >
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2.5 pr-10 font-sans text-sm text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus:ring-1 focus:ring-sage dark:focus:ring-amber-primary"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-3 text-muted hover:text-ink dark:text-slate-muted dark:hover:text-ice"
                title={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="new-password"
                className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
              >
                New Password <span className="text-red-500">*</span>
              </label>
              <span
                className={`font-ui text-[10px] uppercase font-bold flex items-center gap-1 ${
                  isNewPasswordValid
                    ? "text-sage dark:text-emerald-400"
                    : "text-muted dark:text-slate-muted"
                }`}
              >
                {isNewPasswordValid && <CheckCircle2 className="h-3 w-3" />}
                <span>At least 6 characters</span>
              </span>
            </div>
            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                className="w-full rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel px-3.5 py-2.5 pr-10 font-sans text-sm text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:border-sage dark:focus:border-amber-primary focus:outline-none focus:ring-1 focus:ring-sage dark:focus:ring-amber-primary"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-muted hover:text-ink dark:text-slate-muted dark:hover:text-ice"
                title={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm-password"
                className="block font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice"
              >
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              {isPasswordsMatching && (
                <span className="flex items-center gap-1 font-ui text-[10px] uppercase font-bold text-sage dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Passwords match</span>
                </span>
              )}
              {isPasswordsMismatch && (
                <span className="flex items-center gap-1 font-ui text-[10px] uppercase font-bold text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  <span>Passwords do not match</span>
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className={`w-full rounded-md border px-3.5 py-2.5 pr-10 font-sans text-sm text-ink dark:text-ice placeholder:text-muted/60 dark:placeholder:text-slate-muted/60 focus:outline-none focus:ring-1 ${
                  isPasswordsMismatch
                    ? "border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-500"
                    : "border-ink/15 dark:border-hairline bg-white dark:bg-panel focus:border-sage dark:focus:border-amber-primary focus:ring-sage dark:focus:ring-amber-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted hover:text-ink dark:text-slate-muted dark:hover:text-ice"
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Security Best Practices Card */}
          <div className="rounded-lg bg-linen/25 dark:bg-panel/40 border border-ink/10 dark:border-hairline p-4 space-y-2">
            <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-sage dark:text-gold" />
              <span>Password Security Requirements</span>
            </h4>
            <ul className="text-xs text-muted dark:text-slate-muted space-y-1 list-disc list-inside">
              <li>Must be at least 6 characters in length.</li>
              <li>Include uppercase and lowercase letters, numbers, and symbols for best security.</li>
              <li>Never share your admin studio credentials with others.</li>
            </ul>
          </div>

          {/* Form Submit Bar */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-ink/10 dark:border-hairline">
            <button
              type="submit"
              disabled={
                isPasswordPending ||
                !currentPassword ||
                !isNewPasswordValid ||
                isPasswordsMismatch
              }
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-sage hover:bg-sage-dark dark:bg-emerald-600 dark:hover:bg-emerald-500 px-6 py-2.5 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-50"
            >
              {isPasswordPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
