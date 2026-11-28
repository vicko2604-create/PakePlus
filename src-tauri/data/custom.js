window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});
(() => {
    "use strict";

    if (window.__WEB_ADBLOCK__) return;
    window.__WEB_ADBLOCK__ = true;

    const blockedDomains = [
        "doubleclick.net",
        "googlesyndication.com",
        "googleadservices.com",
        "adservice.google.com",
        "adnxs.com",
        "adform.net",
        "popads.net",
        "popcash.net",
        "taboola.com",
        "outbrain.com",
        "zedo.com",
        "adsterra.com"
    ];

    const adSelectors = [
        'iframe[src*="doubleclick"]',
        'iframe[src*="googlesyndication"]',
        'iframe[src*="adservice"]',
        '[id*="google_ads"]',
        '[id^="ad-container"]',
        '[class*="advertisement"]',
        '[class*="advert-banner"]',
        '[class*="ad-banner"]',
        '[class*="adsbygoogle"]',
        '[data-ad-slot]',
        'ins.adsbygoogle'
    ];

    // Comprobar dominios publicitarios
    function isAdDomain(url) {
        try {
            const host = new URL(url, location.href).hostname;
            return blockedDomains.some(domain =>
                host === domain || host.endsWith("." + domain)
            );
        } catch {
            return false;
        }
    }

    // Ocultar elementos publicitarios
    function removeAds(root = document) {
        if (!root.querySelectorAll) return;

        adSelectors.forEach(selector => {
            root.querySelectorAll(selector).forEach(element => {
                element.style.setProperty(
                    "display", "none", "important"
                );
            });
        });

        root.querySelectorAll("iframe[src]").forEach(iframe => {
            if (isAdDomain(iframe.src)) {
                iframe.remove();
            }
        });
    }

    // CSS de bloqueo visual
    const style = document.createElement("style");
    style.textContent = `
        ${adSelectors.join(",")} {
            display: none !important;
            visibility: hidden !important;
        }
    `;
    (document.head || document.documentElement)
        .appendChild(style);

    // Detectar publicidad dinámica
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    removeAds(node);
                }
            });
        });
    });

    function start() {
        removeAds();

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        console.log("[Web AdBlock] Activado");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, {
            once: true
        });
    } else {
        start();
    }

})();
