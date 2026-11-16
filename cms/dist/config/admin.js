"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    secrets: {
        encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
        docLinks: env.bool('FLAG_DOC_LINKS', true),
    },
    preview: {
        enabled: true,
        config: {
            allowedOrigins: [env("CLIENT_URL")],
            async handler(uid, { documentId, locale, status }) {
                const previewSecret = env("PREVIEW_SECRET");
                const clientUrl = env("CLIENT_URL");
                console.log(clientUrl);
                const document = await strapi.documents(uid).findOne({ documentId });
                const pathname = getPreviewPathname(uid, { locale, document });
                // disable pathname
                if (!pathname) {
                    return null;
                }
                const urlSearchParams = new URLSearchParams({
                    url: pathname,
                    secret: previewSecret,
                    status,
                });
                return `${clientUrl}/api/preview?${urlSearchParams}`;
            },
        }
    }
});
const getPreviewPathname = (uid, { locale, document }) => {
    const { slug } = document;
    // Handle different content types with their specific URL patterns
    switch (uid) {
        // Handle pages with predefined routes
        case "api::page.page":
            switch (slug) {
                case "homepage":
                    return `/${locale}`;
                case "solutions":
                    return "/solutions";
                case "community":
                    return "/community";
                case "faq":
                    return "/faq"; // FAQ page
            }
        // Handle product pages
        // case "api::product.product": {
        //   if (!slug) {
        //     return "/products"; // Products listing page
        //   }
        //   return `/products/${slug}`; // Individual product page
        // }
        // Handle blog articles
        case "api::article.article": {
            if (!slug) {
                return "/blog"; // Blog listing page
            }
            return `/blog/${slug}`; // Individual article page
        }
        case "api::event.event": {
            if (!slug) {
                return "/events";
            }
            return `/events/${slug}`;
        }
        default: {
            return null;
        }
    }
};
exports.default = config;
