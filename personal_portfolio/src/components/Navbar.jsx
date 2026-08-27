import { useEffect, useState } from "react"; // React hooks: useState stores state, useEffect handles side effects
import { cn } from "@/lib/utils"; // Utility function for conditionally combining Tailwind CSS classes
import { Menu, X } from "lucide-react";

// Navigation items: name = text displayed in the navbar, href = section the link points to
const navItems = [
    { name: "Home", href: "#hero" },         // Links to the Hero section
    { name: "About", href: "#about" },       // Links to the About section
    { name: "Skills", href: "#skills" },     // Links to the Skills section
    { name: "Projects", href: "#projects" }, // Links to the Projects section
    { name: "Contact", href: "#contact" },   // Links to the Contact section
];

export const Navbar = () => {
    // Stores whether the user has scrolled down the page
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, SetIsMenuOpen] = useState(false);


    useEffect(() => {
        // Function that checks how far the user has scrolled vertically
        const handleScroll = () => {
            setIsScrolled(window.screenY > 10); // Set true once the page is scrolled more than 10px
        };

        // Listen for scrolling events on the browser window
        window.addEventListener("scroll", handleScroll);

        // Cleanup: remove the scroll listener when the component is removed
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty dependency array = run this effect only when the component mounts

    return (
        <nav 
            className={cn(
                // Navbar is fixed to the top and stretches across the entire screen
                "fixed w-full z-40 transition-all duration-300",

                // Change navbar styling after the user scrolls
                isScrolled 
                    ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" // Scrolled: smaller padding + translucent background + blur + shadow
                    : "py-5" // Not scrolled: larger vertical padding
            )}
        >

            {/* Main navbar container; flex places items horizontally */}
            <div className="container flex items-center justify-between">

                {/* Portfolio name */}
                <a 
                    className="text-xl font-bold text-primary flex items-center" // Flex aligns the name and icon horizontally
                    href="#hero"    // Clicking the name scrolls to the Hero section
                >   
                    <span className="relative z-10">        
                        <span className="text-glow text-foreground"> IoGamZ </span> Portfolio
                    </span>
                </a>

                {/*desktop nav*/}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item, key) => (
                        <a 
                            key={key}
                            href={item.href}
                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/*mobile nav*/}

                <button 
                    onClick={() => SetIsMenuOpen((prev) => !prev)} 
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} /> }{" "}
                </button>
                <div 
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                        "transition-all duration-300 md:hidden",
                        isMenuOpen 
                            ?"opacity-100 pointer-events-auto"
                            :"opacity-0 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item, key) => (
                            <a 
                                key={key}
                                href={item.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                onClick={() => SetIsMenuOpen(true)}
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
