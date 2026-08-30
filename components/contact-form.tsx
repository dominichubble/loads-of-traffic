"use client";
import React, { useState } from "react";
import Input from "./shared/input";
import Label from "./shared/label";
import Textarea from "./shared/textarea";
import { cn } from "@/utils";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldLabelClass =
  "text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary/55";

const Field = ({
  id,
  label,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <Label htmlFor={id} className={fieldLabelClass}>
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {children}
    </div>
  );
};

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
      className="contact-form @container mx-auto flex h-full min-h-0 w-full max-w-[46rem] flex-col px-[var(--container-padding-x)] text-primary lg:pl-10 lg:pr-[var(--container-padding-x)] xl:pl-14"
      aria-busy={status === "submitting"}
    >
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
        <h2 className="page-kicker text-accent">The brief</h2>
        <p className="contact-form-helper text-primary/55 mt-4 max-w-[36ch] text-sm leading-relaxed">
          A few lines is enough. Required fields are marked with an asterisk.
        </p>
      </div>

      <div className="no-scrollbar mt-[var(--contact-stack-gap)] flex min-h-0 flex-1 flex-col gap-[var(--contact-stack-gap)] overflow-y-auto overscroll-contain">
        <div className="contact-fields-grid grid shrink-0 grid-cols-2 gap-x-[var(--contact-field-gap)] gap-y-[var(--contact-field-gap)] @[34rem]:gap-x-10">
          <Field id="fullName" label="Full name" required>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              placeholder="Jane Smith"
              required
              maxLength={200}
            />
          </Field>
          <Field id="email" label="Work email" required>
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
          </Field>
          <Field id="companyName" label="Company">
            <Input
              id="companyName"
              name="companyName"
              autoComplete="organization"
              placeholder="Company Ltd"
              maxLength={200}
            />
          </Field>
          <Field id="companyRole" label="Role">
            <Input
              id="companyRole"
              name="companyRole"
              autoComplete="organization-title"
              placeholder="Marketing Director"
              maxLength={200}
            />
          </Field>
        </div>

        <Field
          id="message"
          label="How can we help?"
          required
          className="min-h-0 flex-1"
        >
          <Textarea
            id="message"
            name="message"
            placeholder="The challenge, the support you need, and what a good next step looks like."
            required
            rows={6}
            maxLength={5000}
            className="flex-1"
          />
        </Field>

        {status === "success" && (
          <p
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-primary"
            aria-live="polite"
          >
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Thanks for reaching out! We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p
            className="flex shrink-0 items-center gap-2 text-sm font-semibold text-accent"
            role="alert"
          >
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            {errorMessage}
          </p>
        )}
      </div>

      <div className="mt-[var(--contact-stack-gap)] flex shrink-0 flex-row flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-yellow px-7 py-3 text-sm font-semibold text-primary shadow-[0_12px_30px_rgba(255,166,0,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          style={{ minHeight: "var(--contact-input-h, 3.15rem)" }}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="contact-form-caption text-primary/50 max-w-[24ch] text-right text-xs leading-relaxed">
          We only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
