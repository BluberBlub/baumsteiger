import { useState, useEffect } from "react";
import { cn } from "../../lib/cn";

interface NavLink {
    label: string;
    href: string;
}

interface Props {
    navigation: NavLink[];
}

export default function MobileNav({ navigation }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when clicking outside or pressing Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
                aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={isOpen}
            >
                <div className="relative w-6 h-5">
                    <span
                        className={cn(
                            "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                            isOpen ? "top-2 rotate-45" : "top-0"
                        )}
                    />
                    <span
                        className={cn(
                            "absolute left-0 top-2 h-0.5 w-6 bg-current transition-all duration-300",
                            isOpen && "opacity-0"
                        )}
                    />
                    <span
                        className={cn(
                            "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                            isOpen ? "top-2 -rotate-45" : "top-4"
                        )}
                    />
                </div>
            </button>

            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu */}
            <nav
                className={cn(
                    "fixed top-0 right-0 z-40 h-full w-72 bg-white shadow-xl transition-transform duration-300 md:hidden",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-label="Mobile Navigation"
            >
                <div className="pt-20 px-6">
                    <ul className="space-y-4">
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className="block py-3 text-lg font-medium text-neutral-700 hover:text-primary transition-colors border-b border-neutral-100"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li className="pt-4">
                            <a
                                href="#kontakt"
                                onClick={handleLinkClick}
                                className="block w-full py-3 px-6 bg-primary text-white text-center rounded-lg font-medium hover:bg-primary-dark transition-colors"
                            >
                                Kontakt aufnehmen
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
