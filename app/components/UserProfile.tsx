"use client";

import { useUser } from "@/app/contexts/UserContext";
import { useState, useRef } from "react";

interface UserProfileProps {
  variant: "center" | "compact";
  className?: string;
}

export default function UserProfile({ variant, className = "" }: UserProfileProps) {
  const { username, avatarUrl, loading, updateUsername, updateAvatar } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className={`flex flex-col items-center animate-pulse ${className}`}>
        {variant === "center" ? (
          <div className="w-20 h-20 rounded-2xl bg-gray-200 mb-3" />
        ) : (
          <div className="bg-gray-200 p-3 rounded-xl w-10 h-10 mb-2" />
        )}
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
    );
  }

  // Handle Username editing
  const handleEditClick = () => {
    setEditName(username);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editName.trim() || editName.trim() === username) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    await updateUsername(editName.trim());
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  // Handle Avatar uploading
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const processFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // We resize aggressively to Base64 to fit in standard JWT and Header limits
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 120;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/webp", 0.6); // aggressively compress
          await updateAvatar(compressedDataUrl);
        }
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const renderNameElement = () => {
    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            autoFocus
            className="bg-white/50 border border-gray-300 rounded px-2 py-0.5 text-center outline-none focus:ring-2 focus:ring-pink-300 w-28 text-gray-800"
          />
          {isSaving && <span className="text-xs text-gray-500 animate-pulse">Saving...</span>}
        </div>
      );
    }

    return (
      <>
        <span>{username}</span>
        <button 
          onClick={handleEditClick} 
          className="text-gray-500 hover:text-gray-800 transition pl-1"
          title="Edit Name"
        >
          ✎
        </button>
      </>
    );
  };

  const renderAvatarContent = () => {
    if (isUploading) return <span className="text-sm font-medium animate-pulse text-gray-600">...</span>;
    if (avatarUrl) return <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />;
    return <span className={variant === "center" ? "text-3xl" : "text-xl"}>👤</span>;
  };

  if (variant === "compact") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div 
          className="bg-yellow-200 p-2 rounded-xl shadow cursor-pointer hover:bg-yellow-300 transition w-10 h-10 flex items-center justify-center overflow-hidden relative group"
          onClick={handleAvatarClick}
        >
          {renderAvatarContent()}
          <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-[10px]">Edit</span>
          </div>
        </div>
        <input type="file" ref={fileInputRef} onChange={processFile} accept="image/*" className="hidden" />

        <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full mt-2 text-sm shadow">
          {renderNameElement()}
        </div>
      </div>
    );
  }

  // center variant
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div 
        className="w-20 h-20 rounded-2xl bg-yellow-200 flex items-center justify-center mb-3 shadow cursor-pointer hover:bg-yellow-300 transition overflow-hidden relative group"
        onClick={handleAvatarClick}
        title="Upload Image"
      >
        {renderAvatarContent()}
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs">Update</span>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={processFile} accept="image/*" className="hidden" />

      <div className="flex items-center gap-2 bg-white/70 px-5 py-2 rounded-full text-sm shadow">
        {renderNameElement()}
      </div>
    </div>
  );
}
