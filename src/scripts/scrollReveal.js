import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const $targets = document.querySelectorAll("[data-reveal]");
    if (!$targets.length) return;

    $targets.forEach(($el) => {
        gsap.set($el, { opacity: 0, y: 32 });

        gsap.to($el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: $el,
                start: "top 85%",
                once: true,
            },
        });
    });
}