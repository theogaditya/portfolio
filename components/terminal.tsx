"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { projects, technologies, personalInfo, education, contact, socials } from "@/lib/data";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
}

const ASCII_ART = `
   ___       ___ __              __  __     __       
  / _ | ____/ (_) /___ _____ _  / / / /__  / /_____ _
 / __ |/ __  / / __/ // / _ '/ / /_/ / _ \\/ __/ _ '/
/_/ |_/\\_,_/_/\\__/\\_, /\\_,_/  \\____/\\___/\\__/\\_,_/ 
                 /___/                              
`;

const HELP_TEXT = `
╭─────────────────────────────────────────────────────────────────╮
│                    AVAILABLE COMMANDS                           │
├─────────────────────────────────────────────────────────────────┤
│  help              Show this help message                       │
│  whoami            Display information about me                 │
│  skills            List my technical skills                     │
│  projects          Show my projects (with links)                │
│  education         Display education history                    │
│  contact           Get my contact information                   │
│  socials           Show social media links                      │
│  neofetch          Display system information                   │
│  ls                List available sections                      │
│  ls -la            List all files with details                  │
│  cat <file>        View file contents (readme, about, resume)   │
│  pwd               Print current directory                      │
│  cd <dir>          Change directory (simulated)                 │
│  date              Show current date and time                   │
│  uptime            Show system uptime                           │
│  echo <text>       Echo text back                               │
│  history           Show command history                         │
│  cowsay <text>     Make a cow say something                     │
│  fortune           Display a random fortune                     │
│  matrix            Toggle matrix rain effect                    │
│  clear / cls       Clear the terminal                           │
│  exit / quit       Exit terminal mode                           │
╰─────────────────────────────────────────────────────────────────╯
`;

// Removed hardcoded data - now using imports from @/lib/data

const FORTUNES = [
  "The best code is no code at all.",
  "First, solve the problem. Then, write the code.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "It's not a bug – it's an undocumented feature.",
  "In order to understand recursion, one must first understand recursion.",
  "There are only two hard things in Computer Science: cache invalidation and naming things.",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
];

// Generate neofetch dynamically using imported data
const generateNeofetch = (uptime: number) => {
  const allSkills = technologies.flatMap(t => t.skills);
  const langs = technologies.find(t => t.category === 'Languages')?.skills.join(', ') || 'TS, JS';
  
  return `
                   -\`                    aditya@portfolio
                  .o+\`                   ─────────────────
                 \`ooo/                   OS: Portfolio Linux x86_64
                \`+oooo:                  Host: Next.js 15 (App Router)
               \`+oooooo:                 Kernel: React 19
               -+oooooo+:                Uptime: ${uptime} mins
             \`/:-:++oooo+:               Packages: ${allSkills.length} (skills)
            \`/++++/+++++++:              Shell: zsh 5.9
           \`/++++++++++++++:             Resolution: Responsive
          \`/+++ooooooooooooo/\`           DE: Tailwind CSS
         ./ooosssso++osssssso+\`          WM: Framer Motion
        .oossssso-\`\`\`\`/ossssss+\`         Theme: Dark [GTK2/3]
       -osssssso.      :ssssssso.        Icons: Lucide
      :osssssss/        osssso+++.       Terminal: xterm-256color
     /ossssssss/        +ssssooo/-       CPU: TypeScript @ 100%
   \`/ossssso+/:-        -:/+osssso+-     GPU: WebGL 2.0
  \`+sso+:-\`                 \`.-/+oso:    Memory: 8GB / ∞
 \`++:.                           \`-/+/
 .\`                                 \`/   Languages: ${langs}
                                         Frameworks: React, Next.js, Node.js
                                         DevOps: Docker, K8s, ArgoCD
`;
};

export function Terminal() {
  const { theme, setTheme } = useTheme();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const [currentDir, setCurrentDir] = useState("~");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [bootTime] = useState(new Date());

  // Only show terminal in retro theme
  useEffect(() => {
    setIsVisible(theme === "retro");
    
    // Prevent body scroll when terminal is visible
    if (theme === "retro") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [theme]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click anywhere
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Initial boot message
  useEffect(() => {
    if (theme === "retro" && history.length === 0) {
      const bootSequence: CommandOutput[] = [
        {
          command: "",
          output: (
            <pre className="text-[#39d353] text-xs sm:text-sm whitespace-pre-wrap">
              {ASCII_ART}
            </pre>
          ),
          timestamp: new Date(),
        },
        {
          command: "",
          output: (
            <div className="text-[#8b949e]">
              <p>Welcome to Aditya&apos;s Portfolio Terminal v1.0.0</p>
              <p>Type <span className="text-[#58a6ff]">help</span> to see available commands.</p>
              <p>Type <span className="text-[#f85149]">exit</span> to return to normal mode.</p>
              <br />
            </div>
          ),
          timestamp: new Date(),
        },
      ];
      setHistory(bootSequence);
    }
  }, [theme, history.length]);

  const processCommand = useCallback((cmd: string): React.ReactNode => {
    const parts = cmd.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (command) {
      case "help":
      case "man":
      case "?":
        return <pre className="text-[#c9d1d9] text-[11px] sm:text-xs whitespace-pre-wrap font-mono">{HELP_TEXT}</pre>;

      case "whoami":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ About Me ─────────────────────────────────────────────────┐</p>
            <p className="ml-2"><span className="text-[#a371f7]">  User:</span>       <span className="text-[#c9d1d9]">{personalInfo.name}</span></p>
            <p className="ml-2"><span className="text-[#a371f7]">  Role:</span>       <span className="text-[#c9d1d9]">{personalInfo.role}</span></p>
            <p className="ml-2"><span className="text-[#a371f7]">  Location:</span>   <span className="text-[#c9d1d9]">{personalInfo.location}</span></p>
            <p className="ml-2"><span className="text-[#a371f7]">  University:</span> <span className="text-[#c9d1d9]">{personalInfo.university}</span></p>
            <p className="ml-2"><span className="text-[#a371f7]">  Status:</span>     <span className="text-[#39d353]">{personalInfo.status}</span></p>
            <p className="text-[#8b949e] mt-3 ml-2 max-w-xl">  {personalInfo.bio}</p>
            <p className="text-[#39d353] mt-3">└────────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "skills":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ Technical Skills ────────────────────────────────────────┐</p>
            {technologies.map((tech, i) => (
              <div key={i} className="mb-2">
                <p className="text-[#58a6ff]">  {tech.category}:</p>
                <p className="text-[#c9d1d9] ml-4">  └─ {tech.skills.join(" │ ")}</p>
              </div>
            ))}
            <p className="text-[#39d353]">└───────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "projects":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ Projects ─────────────────────────────────────────────────┐</p>
            {projects.map((project, i) => (
              <div key={i} className="mb-4 ml-2">
                <p className="text-[#58a6ff] font-bold">  [{project.year}] {project.title}</p>
                <p className="text-[#8b949e] ml-4">{project.description}</p>
                <p className="text-[#d29922] ml-4 text-[10px]">Tech: {project.tags.join(", ")}</p>
                <p className="ml-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline cursor-pointer">
                    Live: {project.liveUrl}
                  </a>
                </p>
                <p className="ml-4">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#a371f7] hover:underline cursor-pointer">
                    Code: {project.githubUrl}
                  </a>
                </p>
              </div>
            ))}
            <p className="text-[#39d353]">└────────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "education":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ Education ────────────────────────────────────────────────┐</p>
            <div className="ml-2 mb-3">
              <p className="text-[#58a6ff] font-bold">  🎓 {education.degree}</p>
              <p className="text-[#c9d1d9] ml-4">{education.institution}, {education.location}</p>
              <p className="text-[#8b949e] ml-4">{education.duration}</p>
              <p className="text-[#39d353] ml-4 font-bold">CGPA: {education.cgpa}</p>
            </div>
            <p className="text-[#39d353]">└────────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "contact":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ Contact Information ─────────────────────────────────────┐</p>
            <p className="ml-2"><span className="text-[#a371f7]">  📧 Email:</span>    <a href={`mailto:${contact.email}`} className="text-[#56d4dd] hover:underline">{contact.email}</a></p>
            <p className="ml-2"><span className="text-[#a371f7]">  🌐 Website:</span>  <a href={socials.website} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.website}</a></p>
            <p className="ml-2"><span className="text-[#a371f7]">  🐙 GitHub:</span>   <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.github}</a></p>
            <p className="ml-2"><span className="text-[#a371f7]">  💼 LinkedIn:</span> <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.linkedin}</a></p>
            <p className="text-[#39d353] mt-3">└────────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "socials":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#39d353] mb-3">┌─ Social Links ─────────────────────────────────────────────┐</p>
            <p className="ml-2">  <span className="text-[#c9d1d9]">🐙</span> GitHub:   <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.github}</a></p>
            <p className="ml-2">  <span className="text-[#c9d1d9]">💼</span> LinkedIn: <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.linkedin}</a></p>
            <p className="ml-2">  <span className="text-[#c9d1d9]">🐦</span> Twitter:  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-[#56d4dd] hover:underline">{socials.twitter}</a></p>
            <p className="text-[#39d353] mt-3">└────────────────────────────────────────────────────────────┘</p>
          </div>
        );

      case "neofetch": {
        const uptimeMins = Math.floor((Date.now() - bootTime.getTime()) / 1000 / 60);
        return <pre className="text-[#56d4dd] text-[9px] sm:text-[11px] whitespace-pre leading-tight font-mono">{generateNeofetch(uptimeMins)}</pre>;
      }

      case "clear":
      case "cls":
        setTimeout(() => setHistory([]), 0);
        return null;

      case "exit":
      case "quit":
      case "q":
        setTheme("dark");
        return <p className="text-[#f85149] text-xs font-mono">Logging out... Goodbye! 👋</p>;

      case "ls":
        if (args === "-la" || args === "-al" || args === "-l") {
          return (
            <div className="text-[11px] sm:text-xs font-mono">
              <p className="text-[#8b949e]">total 42</p>
              <p><span className="text-[#58a6ff]">drwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">4096</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#58a6ff]">about/</span></p>
              <p><span className="text-[#58a6ff]">drwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">4096</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#58a6ff]">skills/</span></p>
              <p><span className="text-[#58a6ff]">drwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">4096</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#58a6ff]">projects/</span></p>
              <p><span className="text-[#58a6ff]">drwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">4096</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#58a6ff]">education/</span></p>
              <p><span className="text-[#58a6ff]">drwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">4096</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#58a6ff]">contact/</span></p>
              <p><span className="text-[#39d353]">-rw-r--r--</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">1337</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#39d353]">README.md</span></p>
              <p><span className="text-[#39d353]">-rw-r--r--</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">2048</span>  <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#39d353]">resume.pdf</span></p>
              <p><span className="text-[#d29922]">-rwxr-xr-x</span>  <span className="text-[#8b949e]">aditya aditya</span>  <span className="text-[#c9d1d9]">512</span>   <span className="text-[#8b949e]">Dec 19</span>  <span className="text-[#d29922]">.bashrc</span></p>
            </div>
          );
        }
        return (
          <div className="text-[11px] sm:text-xs font-mono flex flex-wrap gap-4">
            <span className="text-[#58a6ff]">about/</span>
            <span className="text-[#58a6ff]">skills/</span>
            <span className="text-[#58a6ff]">projects/</span>
            <span className="text-[#58a6ff]">education/</span>
            <span className="text-[#58a6ff]">contact/</span>
            <span className="text-[#39d353]">README.md</span>
            <span className="text-[#39d353]">resume.pdf</span>
          </div>
        );

      case "pwd":
        return <p className="text-[#c9d1d9] text-xs font-mono">/home/aditya/portfolio{currentDir === "~" ? "" : "/" + currentDir}</p>;

      case "cd":
        const validDirs = ["~", "about", "skills", "projects", "education", "contact", "..", "-"];
        if (!args || args === "~" || args === "") {
          setCurrentDir("~");
          return null;
        }
        if (args === ".." || args === "-") {
          setCurrentDir("~");
          return null;
        }
        if (validDirs.includes(args)) {
          setCurrentDir(args);
          return null;
        }
        return <p className="text-[#f85149] text-xs font-mono">bash: cd: {args}: No such file or directory</p>;

      case "date":
        return <p className="text-[#c9d1d9] text-xs font-mono">{new Date().toString()}</p>;

      case "uptime": {
        const uptimeSecs = Math.floor((Date.now() - bootTime.getTime()) / 1000);
        const hours = Math.floor(uptimeSecs / 3600);
        const minutes = Math.floor((uptimeSecs % 3600) / 60);
        const seconds = uptimeSecs % 60;
        return (
          <p className="text-[#c9d1d9] text-xs font-mono">
            {new Date().toLocaleTimeString()} up {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}, 1 user, load average: 0.42, 0.37, 0.31
          </p>
        );
      }

      case "echo":
        if (args === "$USER" || args === "$user") return <p className="text-[#c9d1d9] text-xs font-mono">aditya</p>;
        if (args === "$HOME" || args === "$home") return <p className="text-[#c9d1d9] text-xs font-mono">/home/aditya</p>;
        if (args === "$SHELL" || args === "$shell") return <p className="text-[#c9d1d9] text-xs font-mono">/bin/zsh</p>;
        if (args === "$PATH" || args === "$path") return <p className="text-[#c9d1d9] text-xs font-mono">/usr/local/bin:/usr/bin:/bin:/home/aditya/.local/bin</p>;
        return <p className="text-[#c9d1d9] text-xs font-mono">{args || ""}</p>;

      case "history":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            {commandHistory.map((cmd, i) => (
              <p key={i} className="text-[#8b949e]">
                <span className="text-[#484f58] mr-3 inline-block w-6 text-right">{i + 1}</span>
                <span className="text-[#c9d1d9]">{cmd}</span>
              </p>
            ))}
          </div>
        );

      case "cat":
        if (args === "readme.md" || args === "readme" || args === "README.md") {
          return (
            <div className="text-[11px] sm:text-xs font-mono">
              <p className="text-[#58a6ff] font-bold"># 👋 Hi, I&apos;m Aditya Hota!</p>
              <br />
              <p className="text-[#c9d1d9]">Welcome to my terminal-based portfolio.</p>
              <p className="text-[#c9d1d9]">I&apos;m a Full Stack Developer & DevOps enthusiast from India.</p>
              <br />
              <p className="text-[#39d353]">## 🚀 Quick Start</p>
              <p className="text-[#8b949e]">  • Type `help` to see all available commands</p>
              <p className="text-[#8b949e]">  • Type `projects` to see my work</p>
              <p className="text-[#8b949e]">  • Type `skills` to see my tech stack</p>
              <p className="text-[#8b949e]">  • Type `exit` to return to the normal site</p>
              <br />
              <p className="text-[#39d353]">## 📫 Get in Touch</p>
              <p className="text-[#8b949e]">  • GitHub: github.com/theogaditya</p>
              <p className="text-[#8b949e]">  • Email: contact@adityahota.online</p>
            </div>
          );
        }
        if (args === "about" || args === "about/") {
          return processCommand("whoami");
        }
        if (args === "resume" || args === "resume.pdf") {
          return <p className="text-[#d29922] text-xs font-mono">📄 Opening resume... (This would download the resume in a real terminal)</p>;
        }
        if (!args) {
          return <p className="text-[#f85149] text-xs font-mono">cat: missing file operand</p>;
        }
        return <p className="text-[#f85149] text-xs font-mono">cat: {args}: No such file or directory</p>;

      case "cowsay":
        const cowText = args || "Moo! Type 'help' for commands!";
        const borderLen = Math.min(cowText.length + 2, 40);
        const displayText = cowText.length > 38 ? cowText.substring(0, 35) + "..." : cowText;
        return (
          <pre className="text-[#d29922] text-[10px] sm:text-xs whitespace-pre font-mono">
{` ${"_".repeat(borderLen)}
< ${displayText.padEnd(borderLen - 2)} >
 ${"-".repeat(borderLen)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
          </pre>
        );

      case "fortune":
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
        return (
          <p className="text-[#a371f7] text-xs font-mono italic">
            &quot;{randomFortune}&quot;
          </p>
        );

      case "matrix":
        setShowMatrix(!showMatrix);
        return <p className="text-[#39d353] text-xs font-mono">Matrix effect {showMatrix ? "disabled" : "enabled"}. {!showMatrix && "🔴🟢"}</p>;

      case "sudo":
        if (args.startsWith("rm")) {
          return <p className="text-[#f85149] text-xs font-mono">Nice try! This portfolio is protected 🛡️</p>;
        }
        return <p className="text-[#f85149] text-xs font-mono">[sudo] password for aditya: ▓▓▓▓▓▓▓▓ Access Denied! 🔒</p>;

      case "rm":
        return <p className="text-[#f85149] text-xs font-mono">rm: cannot remove &apos;{args || "*"}&apos;: Permission denied</p>;

      case "touch":
      case "mkdir":
      case "mv":
      case "cp":
        return <p className="text-[#d29922] text-xs font-mono">{command}: Read-only file system</p>;

      case "vim":
      case "nano":
      case "vi":
      case "nvim":
      case "emacs":
        return <p className="text-[#d29922] text-xs font-mono">Opening {command}... Error: This is a web-based terminal. Try VS Code instead! 😄</p>;

      case "git":
        if (args === "status") {
          return (
            <div className="text-[11px] sm:text-xs font-mono">
              <p className="text-[#c9d1d9]">On branch <span className="text-[#39d353]">main</span></p>
              <p className="text-[#c9d1d9]">Your branch is up to date with &apos;origin/main&apos;.</p>
              <p className="text-[#c9d1d9]">nothing to commit, working tree clean</p>
            </div>
          );
        }
        return <p className="text-[#8b949e] text-xs font-mono">git: &apos;{args}&apos; is not a git command. See &apos;git --help&apos;.</p>;

      case "ping":
        return (
          <div className="text-[11px] sm:text-xs font-mono">
            <p className="text-[#c9d1d9]">PING {args || "localhost"} (127.0.0.1): 56 data bytes</p>
            <p className="text-[#c9d1d9]">64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms</p>
            <p className="text-[#c9d1d9]">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms</p>
            <p className="text-[#39d353]">--- {args || "localhost"} ping statistics ---</p>
            <p className="text-[#c9d1d9]">2 packets transmitted, 2 received, 0% packet loss</p>
          </div>
        );

      case "whoops":
      case "oops":
        return <p className="text-[#d29922] text-xs font-mono">No worries! Try &apos;help&apos; to see available commands 😊</p>;

      case "hello":
      case "hi":
      case "hey":
        return <p className="text-[#39d353] text-xs font-mono">Hello! 👋 Welcome to my portfolio. Type &apos;help&apos; to get started!</p>;

      case "":
        return null;

      default:
        return (
          <p className="text-[#f85149] text-xs font-mono">
            bash: {command}: command not found. Type &apos;help&apos; for available commands.
          </p>
        );
    }
  }, [commandHistory, showMatrix, setTheme, currentDir, bootTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput.trim()) {
      setHistory(prev => [...prev, {
        command: "",
        output: null,
        timestamp: new Date(),
      }]);
      return;
    }

    const output = processCommand(currentInput);
    
    setHistory(prev => [...prev, {
      command: currentInput,
      output,
      timestamp: new Date(),
    }]);

    setCommandHistory(prev => [...prev, currentInput]);
    setHistoryIndex(-1);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete
      const commands = ["help", "whoami", "skills", "projects", "experience", "education", "contact", "socials", "clear", "exit", "neofetch", "ls", "cat", "pwd", "date", "echo", "history", "cowsay", "matrix"];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      setCurrentInput("");
      setHistory(prev => [...prev, {
        command: currentInput + "^C",
        output: null,
        timestamp: new Date(),
      }]);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-[#0d1117] overflow-hidden"
        onClick={handleTerminalClick}
      >
        {/* Matrix rain effect */}
        {showMatrix && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#39d353] text-xs font-mono"
                style={{ left: `${i * 2}%` }}
                initial={{ y: -100 }}
                animate={{ y: "100vh" }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {Array.from({ length: 20 }).map((_, j) => (
                  <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
                ))}
              </motion.div>
            ))}
          </div>
        )}

        {/* Scanlines */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
          }}
        />

        {/* Terminal window */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Terminal title bar */}
          <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#f85149]" />
              <div className="w-3 h-3 rounded-full bg-[#d29922]" />
              <div className="w-3 h-3 rounded-full bg-[#39d353]" />
            </div>
            <span className="text-[#8b949e] text-sm ml-2 font-mono">aditya@portfolio:~</span>
          </div>

          {/* Terminal content - this is the only scrollable area */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm scrollbar-thin scrollbar-track-[#0d1117] scrollbar-thumb-[#30363d]"
            style={{ 
              scrollBehavior: 'smooth',
              overscrollBehavior: 'contain'
            }}
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-2">
                {entry.command && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#39d353]">aditya@portfolio</span>
                    <span className="text-[#8b949e]">:</span>
                    <span className="text-[#58a6ff]">~</span>
                    <span className="text-[#8b949e]">$</span>
                    <span className="text-[#c9d1d9]">{entry.command}</span>
                  </div>
                )}
                {entry.output && <div className="mt-1 ml-0">{entry.output}</div>}
              </div>
            ))}

            {/* Current input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-wrap">
              <span className="text-[#39d353]">aditya@portfolio</span>
              <span className="text-[#8b949e]">:</span>
              <span className="text-[#58a6ff]">~</span>
              <span className="text-[#8b949e]">$</span>
              <div className="flex-1 min-w-[200px] relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-[#c9d1d9] font-mono text-sm caret-[#39d353] border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 focus:shadow-none"
                  style={{ boxShadow: 'none' }}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </form>
          </div>

          {/* Status bar */}
          <div className="flex-shrink-0 px-4 py-1 bg-[#161b22] border-t border-[#30363d] flex justify-between items-center text-xs text-[#8b949e] font-mono">
            <span>Type &apos;help&apos; for commands • &apos;exit&apos; to leave</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
