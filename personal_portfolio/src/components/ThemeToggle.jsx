import { Moon, Sun } from "lucide-react";
import { useState, useEffect} from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            localStorage.setItem("theme", "light");             // Store the default theme preference in localStorage
            setIsDarkMode(false);                           
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light"); // Store the theme preference in localStorage
        } else {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark"); // Add the "dark" class to the root element
            localStorage.setItem("theme", "dark"); // Store the theme preference in localStorage
        }
    };

    return (
        <button 
            onClick={toggleTheme}
            className={cn(
            "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
            "focus:outline-none"
            )}
        >

            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
                <Moon className="h-6 w-6 text-blue-900" /> 
            )}
        </button>
    );  
};
