import { gsap } from "gsap";

export function initMagnifier() {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 48rem)").matches) return;

    const $targets = document.querySelectorAll("[data-magnify]");
    if (!$targets.length) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    const ZOOM = 2.2;
    const SIZE = 220; // px, lens diameter

    const $lens = document.createElement("div");
    $lens.className = "magnifier-lens";
    $lens.style.width = `${SIZE}px`;
    $lens.style.height = `${SIZE}px`;
    document.body.appendChild($lens);

    let xTo, yTo;
    if (!prefersReducedMotion) {
        xTo = gsap.quickTo($lens, "x", { duration: 0.15, ease: "power2.out" });
        yTo = gsap.quickTo($lens, "y", { duration: 0.15, ease: "power2.out" });
    }

    function moveLens(clientX, clientY) {
        const left = clientX - SIZE / 2;
        const top = clientY - SIZE / 2;

        if (prefersReducedMotion) {
            $lens.style.transform = `translate(${left}px, ${top}px)`;
        } else {
            xTo(left);
            yTo(top);
        }
    }

    $targets.forEach(($img) => {
        $img.addEventListener("mouseenter", () => {
            $lens.style.backgroundImage = `url(${$img.currentSrc || $img.src})`;
            $lens.style.opacity = "1";
        });

        $img.addEventListener("mousemove", (event) => {
            const rect = $img.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            $lens.style.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;
            $lens.style.backgroundPosition = `${-(offsetX * ZOOM - SIZE / 2)}px ${-(offsetY * ZOOM - SIZE / 2)}px`;

            moveLens(event.clientX, event.clientY);
        });

        $img.addEventListener("mouseleave", () => {
            $lens.style.opacity = "0";
        });
    });
}