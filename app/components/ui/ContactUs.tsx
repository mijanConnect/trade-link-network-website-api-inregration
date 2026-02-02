"use client";

import { useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";

interface ContactUsProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    email: string;
    title: string;
    message: string;
  }) => void;
}

export default function ContactUs({
  isOpen,
  onClose,
  onSubmit,
}: ContactUsProps) {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ email, title, message });
    }
    setEmail("");
    setTitle("");
    setMessage("");
    onClose();
  };

  const handleClose = () => {
    setEmail("");
    setTitle("");
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-5 shadow-lg md:p-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-primaryText">
            Contact Us
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close contact form"
            className="rounded-lg p-1 hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-primaryText">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-primaryText">
            Issue title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-primaryText">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your issue"
              className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!email || !title || !message}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
