import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Load saved theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;

        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        // Tell StarBackground that the theme changed
        window.dispatchEvent(
            new CustomEvent("themeChange", {
                detail: {
                    isDarkMode: newDarkMode,
                },
            })
        );
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
                    : "py-5"
            )}
        >
            <div className="container flex items-center justify-between gap-4">

                {/* Portfolio name */}
                <a
                    className="text-xl font-bold text-primary flex items-center shrink-0 transition-colors duration-500"
                    href="#hero"
                >
                    <span className="relative z-10">
                        <span className="text-glow text-foreground transition-colors duration-500">
                            IoGamZ
                        </span>{" "}
                        Portfolio
                    </span>
                </a>

                {/* Desktop navigation + theme toggle */}
                <div className="hidden md:flex items-center gap-6">

                    {/* Navigation links */}
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300 whitespace-nowrap"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-colors duration-300 focus:outline-none hover:bg-foreground/10 shrink-0"
                        aria-label={
                            isDarkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        {isDarkMode ? (
                            <Sun className="h-6 w-6 text-yellow-300" />
                        ) : (
                            <Moon className="h-6 w-6 text-blue-900" />
                        )}
                    </button>
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-2">

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-colors duration-300 focus:outline-none hover:bg-foreground/10"
                        aria-label={
                            isDarkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        {isDarkMode ? (
                            <Sun className="h-6 w-6 text-yellow-300" />
                        ) : (
                            <Moon className="h-6 w-6 text-blue-900" />
                        )}
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="p-2 text-foreground z-50"
                        aria-label={
                            isMenuOpen
                                ? "Close Menu"
                                : "Open Menu"
                        }
                    >
                        {isMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>

                {/* Mobile menu */}
                <div
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                        "transition-all duration-300 md:hidden",
                        isMenuOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};