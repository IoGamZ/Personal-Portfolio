import { useEffect, useRef, useState } from "react";

export const StarBackground = () => {
  const [meteors, setMeteors] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const canvasRef = useRef(null);
  const isDarkModeRef = useRef(isDarkMode);

  // =========================================================
  // THEME
  // =========================================================

  useEffect(() => {
    isDarkModeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const updateTheme = () => {
      const dark =
        document.documentElement.classList.contains("dark");

      setIsDarkMode(dark);
      isDarkModeRef.current = dark;
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // METEORS
  // =========================================================

  useEffect(() => {
    const numberOfMeteors = 6;

    setMeteors(
      Array.from({ length: numberOfMeteors }, (_, id) => ({
        id,
        size: Math.random() * 0.5 + 0.8,
        x: Math.random() * 100,
        y: Math.random() * 55,

        // Falling direction
        angle: 40,

        // Different speeds
        speed: Math.random() * 2 + 4,

        // Random starting point
        delay: Math.random() * 6,
      }))
    );
  }, []);

  // =========================================================
  // PLEXUS
  // =========================================================

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    // =======================================================
    // PLEXUS PARTICLES
    // =======================================================

    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,

      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,

      radius: Math.random() * 1.5 + 1,
    }));

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dark = isDarkModeRef.current;

      const particleColor = dark
        ? "#FFFFFF"
        : "#AD974F";

      const lineColor = dark
        ? "255, 255, 255"
        : "142, 121, 62";

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (
          particle.x <= 0 ||
          particle.x >= width
        ) {
          particle.vx *= -1;
        }

        if (
          particle.y <= 0 ||
          particle.y >= height
        ) {
          particle.vy *= -1;
        }

        // ---------------------------------------------------
        // PARTICLE
        // ---------------------------------------------------

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = particleColor;
        ctx.fill();

        // ---------------------------------------------------
        // CONNECTIONS
        // ---------------------------------------------------

        for (
          let nextIndex = index + 1;
          nextIndex < particles.length;
          nextIndex++
        ) {
          const nextParticle = particles[nextIndex];

          const dx =
            particle.x - nextParticle.x;

          const dy =
            particle.y - nextParticle.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          const maxDistance = 110;

          if (distance < maxDistance) {
            const opacity =
              1 - distance / maxDistance;

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
              `rgba(${lineColor}, ${opacity * 0.45})`;

            ctx.stroke();
          }
        }
      });

      animationFrameId =
        requestAnimationFrame(render);
    };

    render();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

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

      {/* =====================================================
          METEORS / STARS
          ===================================================== */}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="star-meteor"
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y * 2}%`,

            "--size": `${meteor.size * 20}px`,
            "--angle": `${meteor.angle}deg`,
            "--speed": `${meteor.speed}s`,

            animationDelay: `-${meteor.delay}s`,
          }}
        >
          {/* Trail */}

          <div className="star-trail" />

          {/* Rotating 3D star */}

          <div className="rotating-star">
            <div className="star-layer star-layer-1" />
            <div className="star-layer star-layer-2" />
            <div className="star-layer star-layer-3" />
            <div className="star-core" />
          </div>
        </div>
      ))}

    </div>
  );
};