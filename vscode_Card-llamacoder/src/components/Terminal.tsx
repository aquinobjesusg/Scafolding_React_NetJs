import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown, Trash2, Terminal as TerminalIcon, X } from "lucide-react";
import type { FileNode } from "@/App";

interface TerminalProps {
  tree: FileNode[];
  fileMap: Record<string, FileNode>;
  contents: Record<string, string>;
}

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

function flattenAllFiles(nodes: FileNode[], prefix = ""): { path: string; node: FileNode }[] {
  const result: { path: string; node: FileNode }[] = [];
  for (const node of nodes) {
    const path = prefix ? `${prefix}/${node.name}` : node.name;
    if (node.type === "file") {
      result.push({ path, node });
    }
    if (node.children) {
      result.push(...flattenAllFiles(node.children, path));
    }
  }
  return result;
}

export function Terminal({ tree, fileMap, contents }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "VS Code Terminal — bash" },
    { type: "output", content: "Type 'help' to see available commands." },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allFiles = flattenAllFiles(tree);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const newLines: TerminalLine[] = [
      { type: "input", content: trimmed },
    ];

    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    if (trimmed === "") {
      // nothing
    } else if (command === "help") {
      newLines.push(
        { type: "output", content: "Available commands:" },
        { type: "output", content: "  help          Show this help message" },
        { type: "output", content: "  ls            List files in the workspace" },
        { type: "output", content: "  cat <file>    Display file contents" },
        { type: "output", content: "  echo <text>   Print text" },
        { type: "output", content: "  clear         Clear the terminal" },
        { type: "output", content: "  npm <cmd>     Simulate npm commands" },
        { type: "output", content: "  git <cmd>     Simulate git commands" },
        { type: "output", content: "  date          Show current date" },
        { type: "output", content: "  whoami        Show current user" },
        { type: "output", content: "  pwd           Print working directory" }
      );
    } else if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    } else if (command === "ls") {
      const top = tree.map((n) => {
        if (n.type === "folder") return `${n.name}/`;
        return n.name;
      });
      newLines.push({ type: "output", content: top.join("   ") });
    } else if (command === "pwd") {
      newLines.push({ type: "output", content: "/home/user/my-app" });
    } else if (command === "whoami") {
      newLines.push({ type: "output", content: "developer" });
    } else if (command === "date") {
      newLines.push({ type: "output", content: new Date().toString() });
    } else if (command === "echo") {
      newLines.push({ type: "output", content: args.join(" ") });
    } else if (command === "cat") {
      if (!args[0]) {
        newLines.push({ type: "error", content: "cat: missing file operand" });
      } else {
        const target = args[0].replace(/^\.\//, "");
        const found = allFiles.find(
          (f) => f.path === target || f.node.name === target
        );
        if (found) {
          const content = contents[found.node.id] ?? found.node.content ?? "";
          content.split("\n").forEach((l) =>
            newLines.push({ type: "output", content: l })
          );
        } else {
          newLines.push({ type: "error", content: `cat: ${args[0]}: No such file` });
        }
      }
    } else if (command === "npm") {
      const sub = args[0];
      if (sub === "install" || sub === "i") {
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "added 248 packages, audited 250 packages in 3s" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "42 packages are looking for funding" });
        newLines.push({ type: "output", content: "  run `npm fund` for details" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "found 0 vulnerabilities" });
      } else if (sub === "run" && args[1] === "dev") {
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "> my-app@1.0.0 dev" });
        newLines.push({ type: "output", content: "> vite" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "  VITE v5.2.0  ready in 412 ms" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "  ➜  Local:   http://localhost:5173/" });
        newLines.push({ type: "output", content: "  ➜  Network: use --host to expose" });
      } else if (sub === "run" && args[1] === "build") {
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "> my-app@1.0.0 build" });
        newLines.push({ type: "output", content: "> tsc && vite build" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "vite v5.2.0 building for production..." });
        newLines.push({ type: "output", content: "✓ 34 modules transformed." });
        newLines.push({ type: "output", content: "dist/index.html                  0.46 kB │ gzip:  0.30 kB" });
        newLines.push({ type: "output", content: "dist/assets/index-Bxk7pQ.css    4.21 kB │ gzip:  1.32 kB" });
        newLines.push({ type: "output", content: "dist/assets/index-Df3aW9.js   143.8 kB │ gzip: 46.1 kB" });
        newLines.push({ type: "output", content: "✓ built in 1.24s" });
      } else {
        newLines.push({ type: "output", content: `npm: unknown command '${sub ?? ""}'` });
      }
    } else if (command === "git") {
      const sub = args[0];
      if (sub === "status") {
        newLines.push({ type: "output", content: "On branch main" });
        newLines.push({ type: "output", content: "Your branch is up to date with 'origin/main'." });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "Changes not staged for commit:" });
        newLines.push({ type: "output", content: '  (use "git add <file>..." to update what will be committed)' });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "\tmodified:   src/App.tsx" });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: 'no changes added to commit (use "git add")' });
      } else if (sub === "log") {
        newLines.push({ type: "output", content: "commit a1b2c3d (HEAD -> main, origin/main)" });
        newLines.push({ type: "output", content: "Author: Developer <dev@example.com>" });
        newLines.push({ type: "output", content: "Date:   " + new Date().toDateString() });
        newLines.push({ type: "output", content: "" });
        newLines.push({ type: "output", content: "    Initial commit" });
      } else if (sub === "branch") {
        newLines.push({ type: "output", content: "* main" });
      } else {
        newLines.push({ type: "output", content: `git: '${sub ?? ""}' is not a git command. See 'git --help'.` });
      }
    } else {
      newLines.push({ type: "error", content: `command not found: ${command}. Type 'help' for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      if (input.trim()) {
        setHistory((prev) => [...prev, input]);
      }
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIdx = historyIndex + 1;
        if (newIdx >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIdx);
          setInput(history[newIdx]);
        }
      }
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-zinc-200";
      case "error":
        return "text-red-400";
      case "system":
        return "text-sky-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Terminal header */}
      <div className="flex h-8 items-center gap-1 border-b border-zinc-800 bg-zinc-900 px-2 text-xs">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 rounded px-2 py-1 text-zinc-300 hover:bg-zinc-800">
            <TerminalIcon className="h-3.5 w-3.5" />
            <span>Terminal</span>
          </button>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-zinc-500">
          <button className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-300" title="New Terminal">
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-300" title="Kill Terminal">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-300"
            title="Clear"
            onClick={() => setLines([])}
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 hover:bg-zinc-800 hover:text-zinc-300">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="min-h-0 flex-1 cursor-text overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
      >
        {lines.map((line, idx) => (
          <div key={idx} className={`whitespace-pre-wrap ${lineColor(line.type)}`}>
            {line.type === "input" ? (
              <span>
                <span className="text-emerald-400">user@vscode</span>
                <span className="text-zinc-600">:</span>
                <span className="text-sky-400">~/my-app</span>
                <span className="text-zinc-600">$ </span>
                <span>{line.content}</span>
              </span>
            ) : (
              line.content || "\u00A0"
            )}
          </div>
        ))}

        {/* Active input line */}
        <div className="flex items-center whitespace-pre-wrap text-zinc-200">
          <span className="text-emerald-400">user@vscode</span>
          <span className="text-zinc-600">:</span>
          <span className="text-sky-400">~/my-app</span>
          <span className="text-zinc-600">$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-zinc-200 caret-sky-400 outline-none"
          />
        </div>
      </div>
    </div>
  );
}