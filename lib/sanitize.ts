import DOMPurify from "dompurify"

/**
 * Sanitize HTML content to prevent XSS attacks
 * Use this before saving rich text content to the database
 */
export function sanitizeHTML(html: string): string {
    // Only run on client side (DOMPurify needs window)
    if (typeof window === "undefined") {
        return html
    }

    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "u",
            "h1",
            "h2",
            "h3",
            "h4",
            "ul",
            "ol",
            "li",
            "a",
            "blockquote",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
    })
}
