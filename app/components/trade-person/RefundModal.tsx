"use client";

import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { toast } from "sonner";
import Image from "next/image";

type RefundModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { reason: string; image: File | null }) => Promise<void>;
    isLoading?: boolean;
    jobId: string;
};

export default function RefundModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    jobId,
}: RefundModalProps) {
    const [reason, setReason] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setReason("");
            setSelectedImage(null);
            setImagePreview(null);
        }
    }, [isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        setSelectedImage(file);
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
    };

    const handleSubmit = async () => {
        if (!reason.trim()) {
            toast.error("Please provide a reason for refund");
            return;
        }

        if (!selectedImage) {
            toast.error("Please upload a proof image");
            return;
        }

        try {
            await onSubmit({ reason: reason.trim(), image: selectedImage });
            // Reset form on success
            setReason("");
            setSelectedImage(null);
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(null);
        } catch (error) {
            // Error handling is done in parent component
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4  ">
            <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-white p-4 shadow-lg md:p-6   max-h-[90vh] overflow-y-auto ">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] font-bold text-primaryText">
                        Request Refund
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        <X className="h-6 w-6 text-slate-600" />
                    </button>
                </div>

                {/* policy text */}

                <div>
                    <h2 className="text-[16px] font-semibold text-primaryText">
                        Refund Policy
                    </h2>
                    <p className="text-[14px] text-primaryText">
                        You may request a refund only after 24 hours of making the payment. Within these first 24 hours, you must actively try to connect with the client through available communication methods.
                    </p>
                    <h3 className="text-[14px] font-semibold text-primaryText">
                        Requirements:
                    </h3>
                    <p className="text-[14px] text-primaryText">
                        You must provide proof that you attempted to contact the client.
                        If the client does not respond, submit your refund request with the evidence.
                    </p>
                    <h3 className="text-[14px] font-semibold text-primaryText">
                        Review Process:
                    </h3>
                    <p className="text-[14px] text-primaryText">
                        After submitting the request, please allow up to 72 hours for review.
                        During this time, we will also attempt to contact the client.
                    </p>

                </div>

                {/* Reason Textarea */}
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-primaryText">
                        Reason for Refund <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please provide a detailed reason for requesting a refund..."
                        className="min-h-[120px] w-full rounded-lg border border-slate-300 px-4 py-3 text-[14px] text-primaryText placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-slate-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <p className="text-[12px] text-slate-500">
                        {reason.length}/500 characters
                    </p>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-primaryText">
                        Proof Image <span className="text-red-500">*</span>
                    </label>
                    {imagePreview ? (
                        <div className="relative">
                            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-slate-300">
                                <Image
                                    src={imagePreview}
                                    alt="Proof image preview"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <button
                                onClick={handleRemoveImage}
                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 transition"
                                disabled={isLoading}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border  border-slate-300 bg-slate-50 p-6 transition  hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-slate-400" />
                                <div className="text-center">
                                    <span className="text-[14px] font-medium text-primaryText">
                                        Click to upload or drag and drop
                                    </span>
                                    <p className="mt-1 text-[12px] text-slate-500">
                                        PNG, JPG, GIF up to 5MB
                                    </p>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                                disabled={isLoading}
                            />
                        </label>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {/* <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button> */}
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleSubmit}
                        disabled={isLoading || !reason.trim() || !selectedImage}
                        loading={isLoading}
                        className="flex-1"
                    >
                        Submit Request
                    </Button>
                </div>
            </div>
        </div>
    );
}
