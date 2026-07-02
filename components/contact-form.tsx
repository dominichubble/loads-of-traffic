"use client";
import React, { useState } from "react";
import Input from "./shared/input";
import Label from "./shared/label";
import Textarea from "./shared/textarea";

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
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form flex flex-col gap-6 rounded-2xl bg-white p-6 sm:p-8"
      noValidate
    >
      {/* Honeypot field: hidden from real visitors, bots tend to fill every field in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" name="fullName" placeholder="Full name" required maxLength={200} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Email" required maxLength={200} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="companyName">Company name</Label>
        <Input id="companyName" name="companyName" placeholder="Company name" maxLength={200} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="companyRole">Company role</Label>
        <Input id="companyRole" name="companyRole" placeholder="Company role" maxLength={200} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Message" required rows={5} maxLength={5000} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase text-white transition-opacity disabled:opacity-50 md:text-base"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="text-sm font-bold text-primary">
            Thanks for reaching out! We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-bold text-accent">{errorMessage}</p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
