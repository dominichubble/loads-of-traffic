"use client";
import React, { useState } from "react";
import Input from "./shared/input";
import Label from "./shared/label";
import Textarea from "./shared/textarea";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const ContactForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form rounded-[2rem] border border-white/40 bg-white p-7 text-primary shadow-[0_24px_70px_rgba(83,0,32,0.18)] sm:p-10 lg:p-14"
      aria-busy={status === "submitting"}
    >
      {/* Honeypot field: hidden from real visitors, bots tend to fill every field in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <span className="page-kicker text-accent">Your details</span>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
          Tell us about your goals
        </h2>
        <p className="text-primary/65 mt-3 text-sm leading-relaxed">
          Required fields are marked with an asterisk.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">
            Full name <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Jane Smith"
            required
            maxLength={200}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            Work email <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@company.com"
            required
            maxLength={200}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="companyName">Company name</Label>
          <Input
            id="companyName"
            name="companyName"
            autoComplete="organization"
            placeholder="Company Ltd"
            maxLength={200}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="companyRole">Your role</Label>
          <Input
            id="companyRole"
            name="companyRole"
            autoComplete="organization-title"
            placeholder="Marketing Director"
            maxLength={200}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="message">
            How can we help? <span aria-hidden="true">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your challenge, goals, and ideal next step."
            required
            rows={6}
            maxLength={5000}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-primary/55 text-xs leading-relaxed sm:max-w-[25ch] sm:text-right">
          We only use your details to respond to this enquiry.
        </p>
      </div>

      <div className="mt-5 min-h-6" aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Thanks for reaching out! We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p
            className="flex items-center gap-2 text-sm font-semibold text-accent"
            role="alert"
          >
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
