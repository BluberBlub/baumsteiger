import { useState } from "react";
import { cn } from "../../lib/cn";
import type { ContactFormData } from "../../types";

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>("idle");
    const [serverMessage, setServerMessage] = useState("");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Bitte geben Sie Ihren Namen ein";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Bitte geben Sie eine Nachricht ein";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus("submitting");
        setServerMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setServerMessage(result.message);
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus("error");
                setServerMessage(result.message || "Ein Fehler ist aufgetreten");
            }
        } catch {
            setStatus("error");
            setServerMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-8 h-8 text-accent"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 mb-2">
                    Vielen Dank!
                </h4>
                <p className="text-neutral-700">{serverMessage}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-primary hover:text-primary-dark font-medium transition-colors"
                >
                    Neue Nachricht senden
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        errors.name
                            ? "border-red-500 bg-red-50"
                            : "border-neutral-300 bg-white"
                    )}
                    placeholder="Ihr Name"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-neutral-300 bg-white"
                    )}
                    placeholder="ihre@email.de"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Phone Field (Optional) */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Telefon <span className="text-neutral-400">(optional)</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="+49 1234 567890"
                />
            </div>

            {/* Message Field */}
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nachricht <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-colors resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                        errors.message
                            ? "border-red-500 bg-red-50"
                            : "border-neutral-300 bg-white"
                    )}
                    placeholder="Wie können wir Ihnen helfen?"
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
            </div>

            {/* Error Message */}
            {status === "error" && serverMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {serverMessage}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                    "w-full py-3 px-6 rounded-lg font-medium transition-all duration-200",
                    "bg-primary text-white hover:bg-primary-dark",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Wird gesendet...
                    </span>
                ) : (
                    "Nachricht senden"
                )}
            </button>

            {/* Privacy Notice */}
            <p className="text-xs text-neutral-700 text-center">
                Mit dem Absenden stimmen Sie unserer{" "}
                <a href="/datenschutz" className="text-primary hover:underline">
                    Datenschutzerklärung
                </a>{" "}
                zu.
            </p>
        </form>
    );
}
