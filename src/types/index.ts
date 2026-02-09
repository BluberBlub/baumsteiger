/**
 * Service offering interface
 */
export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    details?: string[];
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

/**
 * Contact form API response
 */
export interface ContactFormResponse {
    success: boolean;
    message: string;
    errors?: Record<string, string>;
}

/**
 * SEO meta properties
 */
export interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
}

/**
 * Navigation link interface
 */
export interface NavLink {
    label: string;
    href: string;
    isExternal?: boolean;
}

/**
 * Gallery image interface
 */
export interface GalleryImage {
    src: string;
    alt: string;
    width: number;
    height: number;
}
