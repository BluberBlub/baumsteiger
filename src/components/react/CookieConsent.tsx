import { useState, useEffect } from "react";
import { cn } from "../../lib/cn";

const CONSENT_KEY = "baumsteiger-cookie-consent";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent has already been given
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({
            accepted: true,
            timestamp: new Date().toISOString()
        }));
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({
            accepted: false,
            timestamp: new Date().toISOString()
        }));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 z-[970] transition-opacity duration-300"
                aria-hidden="true"
            />
            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-[980]",
                    "bg-white border-t border-neutral-200 shadow-lg",
                    "animate-slide-up"
                )}
                role="dialog"
                aria-label="Cookie-Einstellungen"
            >
                <div className="container py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        {/* Text */}
                        <div className="flex-1">
                            <p className="text-sm text-neutral-700 leading-relaxed">
                                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                                Technisch notwendige Cookies sind für die Funktion der Website erforderlich.
                                Weitere Informationen finden Sie in unserer{" "}
                                <a
                                    href="/datenschutz"
                                    className="text-primary hover:underline"
                                >
                                    Datenschutzerklärung
                                </a>.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                className={cn(
                                    "px-5 py-2.5 rounded-lg font-medium text-sm transition-colors",
                                    "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                                )}
                            >
                                Nur notwendige
                            </button>
                            <button
                                onClick={handleAccept}
                                className={cn(
                                    "px-5 py-2.5 rounded-lg font-medium text-sm transition-colors",
                                    "bg-primary text-white hover:bg-primary-dark"
                                )}
                            >
                                Alle akzeptieren
                            </button>
                        </div>
                    </div>
                </div>

                {/* Animation styles */}
                <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
            </div>
        </>
    );
}
