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
      className="contact-form relative flex flex-col rounded-[1.5rem] border border-white/50 bg-white p-5 text-primary shadow-[0_28px_80px_rgba(0,0,79,0.2)] sm:p-6 lg:p-8"
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

      <div className="shrink-0">
        <span className="page-kicker text-accent">Your details</span>
        <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:mt-3 md:text-2xl">
          Tell us about your goals
        </h2>
        <p className="text-primary/65 mt-1.5 text-xs leading-relaxed md:text-sm">
          Required fields are marked with an asterisk.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 content-start gap-3 sm:grid-cols-2 sm:gap-3.5 md:mt-5">
        <div className="flex flex-col gap-1.5">
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
            className="min-h-10 py-2.5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
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
            className="min-h-10 py-2.5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companyName">Company name</Label>
          <Input
            id="companyName"
            name="companyName"
            autoComplete="organization"
            placeholder="Company Ltd"
            maxLength={200}
            className="min-h-10 py-2.5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companyRole">Your role</Label>
          <Input
            id="companyRole"
            name="companyRole"
            autoComplete="organization-title"
            placeholder="Marketing Director"
            maxLength={200}
            className="min-h-10 py-2.5"
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="message">
            How can we help? <span aria-hidden="true">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your challenge, goals, and ideal next step."
            required
            rows={5}
            maxLength={5000}
            className="min-h-[7rem] py-2.5"
          />
        </div>
      </div>

      <div className="mt-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-primary/55 text-xs leading-relaxed sm:max-w-[25ch] sm:text-right">
          We only use your details to respond to this enquiry.
        </p>
      </div>

      {status === "success" && (
        <p
          className="mt-3 flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Thanks for reaching out! We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p
          className="mt-3 flex shrink-0 items-center gap-2 text-sm font-semibold text-accent"
          role="alert"
        >
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
