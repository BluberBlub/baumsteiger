
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Image {
    src: string;
    alt: string;
}

interface Props {
    images: Image[];
}

export default function GalleryLightbox({ images }: Props) {
    const [index, setIndex] = useState<number | null>(null);

    const openLightbox = (i: number) => setIndex(i);
    const closeLightbox = () => setIndex(null);

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (index === null) return;

            switch (e.key) {
                case "Escape":
                    closeLightbox();
                    break;
                case "ArrowRight":
                    nextImage();
                    break;
                case "ArrowLeft":
                    prevImage();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index, nextImage, prevImage]);

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {images.map((image, i) => (
                    <motion.div
                        key={i}
                        layoutId={`gallery-item-${i}`}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-200 cursor-pointer"
                        onClick={() => openLightbox(i)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            loading={i < 3 ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <p className="text-white text-sm font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" style={{ color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                                {image.alt}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {index !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full p-2 transition-colors z-50"
                            onClick={closeLightbox}
                            aria-label="Galerie schließen"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        {/* Prev Button */}
                        <button
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full p-2 transition-colors z-40"
                            onClick={prevImage}
                            aria-label="Vorheriges Bild"
                        >
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        {/* Next Button */}
                        <button
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/20 hover:bg-white/10 rounded-full p-2 transition-colors z-40"
                            onClick={nextImage}
                            aria-label="Nächstes Bild"
                        >
                            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                        </button>

                        {/* Image Container */}
                        <div
                            className="relative w-full h-full flex items-center justify-center pointer-events-none"
                        >
                            <motion.img
                                layoutId={`gallery-item-${index}`}
                                src={images[index].src}
                                alt={images[index].alt}
                                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            {/* Caption */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-4 left-0 right-0 text-center pointer-events-none"
                            >
                                <p className="text-white text-lg font-semibold px-4 py-2 bg-black/60 inline-block rounded-lg backdrop-blur-md" style={{ color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                                    {images[index].alt}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
