"use client";

import Button from "@/app/components/ui/Button";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 bg-opacity-20">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
        <h2 className="text-lg font-semibold text-primaryText mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600 text-sm mb-6">{description}</p>
        )}
        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={isDangerous ? "outline" : "primary"}
            size="md"
            className={
              isDangerous
                ? "border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white"
                : ""
            }
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
