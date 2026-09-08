import { useEffect, useRef, useState } from "react";

function createMeteors() {
    const numberOfMeteors = 6;
    const newMeteors = [];

    for (
        let i = 0;
        i < numberOfMeteors;
        i++
    ) {
        newMeteors.push({
            id: i,
            size: Math.random() * 1.5 + 2,
            x: Math.random() * 120 - 20,
            y: Math.random() * 40 - 30,
            delay: Math.random() * -2,
            animationDuration: Math.random() * 2 + 2.5,
            isAnimating: true,
            animationKey: 0,
        });
    }

    return newMeteors;
}

export const StarBackground = () => {
    const canvasRef = useRef(null);

    const isDarkModeRef = useRef(
        localStorage.getItem("theme") === "dark"
    );

    const [meteors, setMeteors] = useState(createMeteors);

    useEffect(() => {
        const handleResize = () => {
            window.dispatchEvent(
                new Event("plexusRefresh")
            );
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // =======================================================
        // THEME CHANGE
        // =======================================================

        const handleThemeChange = (event) => {
            isDarkModeRef.current =
                event.detail.isDarkMode;
        };

        window.addEventListener(
            "themeChange",
            handleThemeChange
        );

        // =======================================================
        // CANVAS VARIABLES
        // =======================================================

        let width = window.innerWidth;
        let height = window.innerHeight;

        let animationFrameId;

        // =======================================================
        // RESIZE CANVAS
        // =======================================================

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            const dpr =
                window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );
        };

        resizeCanvas();

        // =======================================================
        // PLEXUS PARTICLES
        // =======================================================

        let particles = Array.from(
            { length: 65 },
            () => ({
                x: Math.random() * width,
                y: Math.random() * height,

                vx:
                    (Math.random() - 0.5) *
                    0.8,

                vy:
                    (Math.random() - 0.5) *
                    0.8,

                radius:
                    Math.random() * 2 + 1,
            })
        );

        const refreshParticles = () => {
            particles = Array.from(
                { length: 65 },
                () => ({
                    x:
                        Math.random() *
                        width,

                    y:
                        Math.random() *
                        height,

                    vx:
                        (Math.random() - 0.5) *
                        0.8,

                    vy:
                        (Math.random() - 0.5) *
                        0.8,

                    radius:
                        Math.random() * 2 + 1,
                })
            );
        };

        window.addEventListener(
            "plexusRefresh",
            refreshParticles
        );

        // =======================================================
        // PLEXUS COLORS
        // =======================================================

        const darkParticle = {
            r: 255,
            g: 255,
            b: 255,
        };

        const lightParticle = {
            r: 173,
            g: 151,
            b: 79,
        };

        const darkLine = {
            r: 255,
            g: 255,
            b: 255,
        };

        const lightLine = {
            r: 142,
            g: 121,
            b: 62,
        };

        let particleColor = {
            r: isDarkModeRef.current
                ? darkParticle.r
                : lightParticle.r,

            g: isDarkModeRef.current
                ? darkParticle.g
                : lightParticle.g,

            b: isDarkModeRef.current
                ? darkParticle.b
                : lightParticle.b,
        };

        let lineColor = {
            r: isDarkModeRef.current
                ? darkLine.r
                : lightLine.r,

            g: isDarkModeRef.current
                ? darkLine.g
                : lightLine.g,

            b: isDarkModeRef.current
                ? darkLine.b
                : lightLine.b,
        };

        // =======================================================
        // COLOR INTERPOLATION
        // =======================================================

        const lerp = (
            start,
            end,
            amount
        ) => {
            return (
                start +
                (end - start) *
                amount
            );
        };

        // =======================================================
        // RENDER
        // =======================================================

        const render = () => {
            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            const dark =
                isDarkModeRef.current;

            const targetParticle =
                dark
                    ? darkParticle
                    : lightParticle;

            const targetLine =
                dark
                    ? darkLine
                    : lightLine;

            // ---------------------------------------------------
            // Smooth particle color transition
            // ---------------------------------------------------

            particleColor.r = lerp(
                particleColor.r,
                targetParticle.r,
                0.08
            );

            particleColor.g = lerp(
                particleColor.g,
                targetParticle.g,
                0.08
            );

            particleColor.b = lerp(
                particleColor.b,
                targetParticle.b,
                0.08
            );

            // ---------------------------------------------------
            // Smooth line color transition
            // ---------------------------------------------------

            lineColor.r = lerp(
                lineColor.r,
                targetLine.r,
                0.08
            );

            lineColor.g = lerp(
                lineColor.g,
                targetLine.g,
                0.08
            );

            lineColor.b = lerp(
                lineColor.b,
                targetLine.b,
                0.08
            );

            const particleColorString =
                `rgb(
                    ${particleColor.r},
                    ${particleColor.g},
                    ${particleColor.b}
                )`;

            const lineColorString =
                `${lineColor.r},
                 ${lineColor.g},
                 ${lineColor.b}`;

            // ===================================================
            // PARTICLES
            // ===================================================

            particles.forEach(
                (particle, index) => {

                    // ------------------------------------------------
                    // Move particle
                    // ------------------------------------------------

                    particle.x +=
                        particle.vx;

                    particle.y +=
                        particle.vy;

                    // ------------------------------------------------
                    // Bounce horizontally
                    // ------------------------------------------------

                    if (
                        particle.x <= 0 ||
                        particle.x >= width
                    ) {
                        particle.vx *= -1;
                    }

                    // ------------------------------------------------
                    // Bounce vertically
                    // ------------------------------------------------

                    if (
                        particle.y <= 0 ||
                        particle.y >= height
                    ) {
                        particle.vy *= -1;
                    }

                    // ------------------------------------------------
                    // Draw particle
                    // ------------------------------------------------

                    ctx.beginPath();

                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.radius,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        particleColorString;

                    ctx.fill();

                    // ------------------------------------------------
                    // Draw connections
                    // ------------------------------------------------

                    for (
                        let nextIndex =
                            index + 1;

                        nextIndex <
                        particles.length;

                        nextIndex++
                    ) {
                        const nextParticle =
                            particles[
                                nextIndex
                            ];

                        const dx =
                            particle.x -
                            nextParticle.x;

                        const dy =
                            particle.y -
                            nextParticle.y;

                        const distance =
                            Math.sqrt(
                                dx * dx +
                                dy * dy
                            );

                        const maxDistance =
                            110;

                        if (
                            distance <
                            maxDistance
                        ) {
                            const opacity =
                                1 -
                                distance /
                                    maxDistance;

                            ctx.beginPath();

                            ctx.moveTo(
                                particle.x,
                                particle.y
                            );

                            ctx.lineTo(
                                nextParticle.x,
                                nextParticle.y
                            );

                            ctx.lineWidth = 0.6;

                            ctx.strokeStyle =
                                `rgba(
                                    ${lineColorString},
                                    ${opacity * 0.45}
                                )`;

                            ctx.stroke();
                        }
                    }
                }
            );

            animationFrameId =
                requestAnimationFrame(
                    render
                );
        };

        render();

        // RESIZE LISTENER
        window.addEventListener(
            "resize",
            resizeCanvas
        );

        // CLEANUP
        return () => {
            window.removeEventListener(
                "resize",
                resizeCanvas
            );
            window.removeEventListener(
                "plexusRefresh",
                refreshParticles
            );
            window.removeEventListener(
                "themeChange",
                handleThemeChange
            );
            cancelAnimationFrame(
                animationFrameId
            );
        };
    }, []);
        // =========================================================
    // METEORS
    // =========================================================

    const regenerateMeteor = (
        id
    ) => {
        setMeteors(
            (currentMeteors) =>
                currentMeteors.map(
                    (meteor) => {
                        if (
                            meteor.id !== id ||
                            meteor.isAnimating
                        ) {
                            return meteor;
                        }

                        return {
                            ...meteor,

                            x:
                                Math.random() * 120 - 20,

                            y:
                                Math.random() * 50 - 30,

                            // Respawn from the start instead of reusing the
                            // initial negative stagger delay.
                            delay: 0,

                            isAnimating: true,
                            
                            animationKey:
                                meteor.animationKey + 1,
                        };
                    }
                )
        );
    };

    const finishMeteorAnimation = (
        id
    ) => {
        // First mark THIS meteor as finished.
        setMeteors(
            (currentMeteors) =>
                currentMeteors.map(
                    (meteor) =>
                        meteor.id === id
                            ? {
                                ...meteor,
                                isAnimating: false,
                            }
                            : meteor
                )
        );

        // Wait one frame so the finished animation
        // is completely removed before changing
        // its position and starting another cycle.
        requestAnimationFrame(() => {
            regenerateMeteor(id);
        });
    };
    // =========================================================
    // RENDER
    // =========================================================

    return (
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none bg-transparent">
            {/* =====================================================
                PLEXUS
                ===================================================== */}

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {meteors.map((meteor) => (
                <div
                    key={`${meteor.id}-${meteor.animationKey}`}
                    className="meteor animate-meteor"
                    onAnimationEnd={() =>
                        finishMeteorAnimation(meteor.id)
                    }
                    style={{
                        width: meteor.size * 50 + "px",
                        height: meteor.size * 2 + "px",
                        left: meteor.x + "%",
                        top: meteor.y + "%",
                        animationDelay: meteor.delay * 2 + "s",
                        animationDuration:
                            meteor.animationDuration * 1.5 + "s",
                        animationFillMode: "both",
                        opacity: 0,
                        background:
                            "linear-gradient(90deg, #FFFFFF, #22d3ee, #3b82f6)",
                        boxShadow:
                            "0 0 8px #22d3ee, 0 0 16px #3b82f6",
                    }}
                />
            ))}
        </div>
    );
};