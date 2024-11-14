"use client";

import { sendEmail } from "@/actions/sendEmail";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { RxReload } from "react-icons/rx";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-carbon text-whisper py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <RxReload className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        "Send Message"
      )}
    </button>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    await sendEmail(formData);
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.push("/");
    }, 2500);
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-carbon mb-8">
          Get in Touch
        </h1>

        <p className="text-graphite text-lg mb-8">
          I&apos;m always open to new opportunities and collaborations. Whether
          you&apos;re a recruiter, potential client, or just want to say hello,
          I&apos;d love to hear from you.
        </p>

        {submitted ? (
          <div className="text-center p-8 bg-green-50 rounded-lg">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Message Sent!
            </h2>
            <p className="text-green-600">
              Thanks for reaching out. I&apos;ll get back to you soon!
            </p>
          </div>
        ) : (
          <form action={clientAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-carbon mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-carbon mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-carbon mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-carbon mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carbon focus:border-transparent outline-none transition-all resize-none"
                placeholder="Your message here..."
              />
            </div>

            <SubmitButton />
          </form>
        )}
      </section>
    </div>
  );
};

export default ContactPage;
