import { Mail, MapPin, Plus } from "lucide-react";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useToast } from "../hooks/use-toast";
import { useEffect, useState } from "react";

// LocalStorage key used to save custom notes submitted by visitors.
const STORAGE_KEY = "community-postits";

// Default notes that always appear on the board even before any user adds their own.
const starterNotes = [
    "Learn more backends!",
    "Nice Projects!",
    "Buy this man a coffee.",
    "Have you tried learning Kubernets?",
];

    const getRandomNotes = (items, count) => {
        const rotations = [-6, -3, 2, 5, -2, 4];

        return [...items]
            // Shuffle the array so the selected notes are not always the same ones.
            .sort(() => Math.random() - 0.5)
            // Take only the number of notes we want to display.
            .slice(0, count)
            // Add random position and rotation for each displayed note.
            .map((note, index) => ({
                ...note,
                position: {
                    // Keep each note within a horizontal range of the board.
                    left: `${-10 + Math.random() * 100}%`,
                    // Keep each note within a vertical range of the board.
                    top: `${-15 + Math.random() * 100}%`,
                    // Use a base rotation plus a tiny random adjustment for realism.
                    rotate:
                        rotations[index % rotations.length] +
                        (Math.random() * 1 - 1),
                },
            }));
    };

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [notes, setNotes] = useState([]);
    const [displayedNotes, setDisplayedNotes] = useState([]);


/* Load saved notes*/
    useEffect(() => {
        const stored = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        setNotes(stored);

        const allNotes = [
            ...stored,
            ...starterNotes.map((text, index) => ({
                id: `starter-${index}`,
                text,
            })),
        ];

        setDisplayedNotes(getRandomNotes(allNotes, 20));
    }, []);

    /* Contact form submit */

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Message sent!",
                description:
                    "Thank you for taking the time to reach out to me.",
            });

            setIsSubmitting(false);
        }, 1500);
    };

    /* Post-it submit                   */
      const handlePostSubmit = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const newNote = {
            id: crypto.randomUUID(),
            text: message.trim(),
            createdAt: new Date().toISOString(),
        };

        const updatedNotes = [
            ...notes,
            newNote,
        ];

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedNotes)
        );

        setNotes(updatedNotes);

        setDisplayedNotes(
            getRandomNotes(
                [
                    ...updatedNotes,
                    ...starterNotes.map((text, index) => ({
                        id: `starter-${index}`,
                        text,
                    })),
                ],
                6
            )
        );

        setMessage("");

        toast({
            title: "Note posted!",
            description:
                "Your note has been added to the board.",
        });
    };

/* Shuffle notes                    */
    const shuffleNotes = () => {
        const allNotes = [
            ...notes,
            ...starterNotes.map((text, index) => ({
                id: `starter-${index}`,
                text,
            })),
        ];

        setDisplayedNotes(
            getRandomNotes(allNotes, 6)
        );
    };

    return (
        <section
            id="contact"
            className="py-24 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In{" "}
                    <span className="text-primary">
                        Touch
                    </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I am always open to feedback, new opportunities,
                    and casual networking. Please feel free to reach
                    out if you have any insights to share or would
                    like to connect.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-11">

                    <div className="space-y-8">

                        <h3 className="text-2xl font-semibold mb-6">
                            Contact Information
                        </h3>

                        <h1
                            className="text-sm font-medium text-primary"
                            align="left"
                        >
                            Quickest Way to Reach Me
                        </h1>

                        <div className="space-y-6 justify-center">

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4
                                        className="font-medium"
                                        align="left"
                                    >
                                        Email
                                    </h4>

                                    <a
                                        href="mailto:io.k232456@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Io.k232456@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4
                                        className="font-medium"
                                        align="left"
                                    >
                                        Location
                                    </h4>

                                    <a
                                        href="https://maps.app.goo.gl/W3BQtG7EWxEe6QmM9"
                                        target="_blank"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Watthana, Bangkok, Thailand
                                    </a>
                                </div>
                            </div>

                            {/* Discord */}

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <FaDiscord className="h-6 w-6 text-primary" />
                                </div>

                                <div>
                                    <h4
                                        className="font-medium"
                                        align="left"
                                    >
                                        Discord
                                    </h4>

                                    <a
                                        href=""
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        IoGamz
                                    </a>
                                </div>
                            </div>

                        </div>

                        <div className="pt-8">

                            <h4 className="font-medium mb-4">
                                Connect With Me
                            </h4>

                            <div className="flex space-x-4 justify-center">

                                <a
                                    href="https://www.linkedin.com/in/io-kongsubto-aa2609398/"
                                    target="_blank"
                                >
                                    <FaLinkedin />
                                </a>

                                <a
                                    href="https://www.instagram.com/_iogamz/"
                                    target="_blank"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href="https://discordapp.com/users/572200482026684418"
                                    target="_blank"
                                >
                                    <FaDiscord />
                                </a>

                                <a
                                    href="https://x.com/IoGamZ_"
                                    target="_blank"
                                >
                                    <FaXTwitter />
                                </a>

                            </div>
                        </div>

                    </div>

{/* Community comment post-it board */}

                    <div className="space-y-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-primary">
                                        Online Feeback Board
                                    </span>
                                </div>

                                <h3 className="text-2xl font-semibold mt-1">
                                    Leave a note for me!
                                </h3>

                            </div>

                            <button
                                type="button"
                                onClick={shuffleNotes}
                                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-semibold"
                            >
                                Shuffle Notes
                            </button>

                        </div>

                        <div
                            className="relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 min-h-[300px] overflow-hidden"
                        >

                            <div
                                className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none"
                            />

                            <div className="relative w-full min-h-[265px]">

                                {displayedNotes.map((note, index) => (
                                    <PostIt
                                        key={note.id}
                                        note={note.text}
                                        index={index}
                                        position={note.position}
                                    />
                                ))}

                            </div>

                        </div>

{/* Adding note */}

                        <form
                            onSubmit={handlePostSubmit}
                            className="flex gap-2 p-2 rounded-xl border border-border bg-card shadow-xs"
                        >

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                rows={2}
                                maxLength={240}
                                required
                                placeholder="Write something..."
                                className="flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
                            />

                            <button
                                type="submit"
                                className="cosmic-button self-end flex items-center justify-center gap-1.5 px-4"
                            >
                                <Plus size={15} />
                                Post
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
};


/* Post-it component */

const PostIt = ({ note, index, position }) => {
    const fallbackRotations = [-6, -3, 2, 5, -2, 4];

    const style = position
        ? {
              left: position.left,
              top: position.top,
              transform: `rotate(${position.rotate}deg)`,
          }
        : {
              left: `${3 + (index % 4) * 23}%`,
              top: `${5 + Math.floor(index / 4) * 45}%`,
              transform: `rotate(${
                  fallbackRotations[
                      index % fallbackRotations.length
                  ]
              }deg)`,
          };

    return (
        <div
            style={style}
            className={cn(
                "absolute",
                "w-[120px]",
                "min-h-[85px]",
                "p-2",
                "rounded-sm",
                "bg-background",
                "border",
                "border-border/60",
                "shadow-sm",
                "transition-all",
                "duration-200",
                "hover:-translate-y-1",
                "hover:shadow-md"
            )}
        >

            {/* Note */}

            <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                {note}
            </p>

        </div>
    );
};  