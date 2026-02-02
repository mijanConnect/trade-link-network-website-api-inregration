"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useState } from "react";

export default function ProfileImage() {
  const [preview, setPreview] = useState<string>("/assets/avatar.png");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  return (
    <div className="relative w-35 h-35">
      {/* Profile Image */}
      <Image
        src={preview}
        alt="Profile Image"
        fill
        className="rounded-full object-cover border"
      />

      {/* Upload Button */}
      <label className="absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer shadow-md hover:bg-green-600 transition">
        <Camera className="w-4 h-4 text-white" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
