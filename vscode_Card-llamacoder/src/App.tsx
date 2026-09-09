import { useState, useMemo, useCallback } from "react";
import { ActivityBar } from "@/components/ActivityBar";
import { FileExplorer } from "@/components/FileExplorer";
import { EditorArea } from "@/components/EditorArea";
import { Terminal } from "@/components/Terminal";
import { GitBranch, Check, Bell, Zap, AlertCircle, Circle } from "lucide-react";

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  language?: string;
}

const initialTree: FileNode[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "src/components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "src/components/Button.tsx",
            name: "Button.tsx",
            type: "file",
            language: "typescript",
            content: `import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base = "rounded-lg font-medium transition-colors";
    const variants = {
      primary: "bg-sky-600 text-white hover:bg-sky-700",
      secondary: "bg-zinc-800 text-zinc-100",
      ghost: "hover:bg-zinc-800",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };
    return (
      <button
        ref={ref}
        className={\`\${base} \${variants[variant]} \${sizes[size]} \${className}\`}
        {...props}
      />
    );
  }
);
`,
          },
          {
            id: "src/components/Card.tsx",
            name: "Card.tsx",
            type: "file",
            language: "typescript",
            content: `interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, description, children, className }: CardProps) {
  return (
    <div className={\`rounded-xl border border-zinc-800 bg-zinc-900 p-6 \${className}\`}>
      <h3 className="text-lg font-semibold text-zinc-100">{title}</h3>
      {description && <p className="mt-1 text-sm text-zinc-400">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
`,
          },
        ],
      },
      {
        id: "src/utils",
        name: "utils",
        type: "folder",
        children: [
          {
            id: "src/utils/helpers.ts",
            name: "helpers.ts",
            type: "file",
            language: "typescript",
            content: `export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
`,
          },
        ],
      },
      {
        id: "src/App.tsx",
        name: "App.tsx",
        type: "file",
        language: "typescript",
        content: `import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { debounce } from "./utils/helpers";

export default function App() {
  const [count, setCount] = useState(0);

  const handleSearch = debounce((value: string) => {
    console.log("Searching for:", value);
  }, 300);

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <Card title="Counter App" description="A simple counter example">
        <p className="text-4xl font-bold text-sky-400">{count}</p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => setCount(count - 1)} variant="secondary">
            Decrement
          </Button>
          <Button onClick={() => setCount(count + 1)}>
            Increment
          </Button>
        </div>
      </Card>
    </div>
  );
}
`,
      },
      {
        id: "src/main.tsx",
        name: "main.tsx",
        type: "file",
        language: "typescript",
        content: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
      },
      {
        id: "src/index.css",
        name: "index.css",
        type: "file",
        language: "css",
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0ea5e9;
  --color-background: #09090b;
}

body {
  font-family: "Inter", system-ui, sans-serif;
  background-color: var(--color-background);
  color: #e4e4e7;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 4px;
}
`,
      },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder",
    children: [
      {
        id: "public/favicon.svg",
        name: "favicon.svg",
        type: "file",
        language: "html",
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0ea5e9"/>
  <text x="16" y="22" font-size="18" text-anchor="middle" fill="white" font-family="sans-serif">A</text>
</svg>
`,
      },
    ],
  },
  {
    id: "package.json",
    name: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0"
  }
}
`,
  },
  {
    id: "tsconfig.json",
    name: "tsconfig.json",
    type: "file",
    language: "json",
    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
`,
  },
  {
    id: "README.md",
    name: "README.md",
    type: "file",
    language: "markdown",
    content: `# My App

A modern React application built with TypeScript and Vite.

## Getting Started

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

## Features

- React 19
- TypeScript
- Tailwind CSS
- Component-based architecture

## License

MIT
`,
  },
];

function flattenFiles(nodes: FileNode[]): FileNode[] {
  const result: FileNode[] = [];
  for (const node of nodes) {
    if (node.type === "file") {
      result.push(node);
    }
    if (node.children) {
      result.push(...flattenFiles(node.children));
    }
  }
  return result;
}

export default function App() {
  const [tree] = useState<FileNode[]>(initialTree);
  const [activeView, setActiveView] = useState("explorer");
  const [openTabs, setOpenTabs] = useState<string[]>(["src/App.tsx"]);
  const [activeTab, setActiveTab] = useState<string | null>("src/App.tsx");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src", "src/components", "src/utils"])
  );

  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [terminalHeight, setTerminalHeight] = useState(220);

  const allFiles = useMemo(() => flattenFiles(tree), [tree]);
  const fileMap = useMemo(
    () => Object.fromEntries(allFiles.map((f) => [f.id, f])),
    [allFiles]
  );

  const [contents, setContents] = useState<Record<string, string>>(() =>
    Object.fromEntries(allFiles.map((f) => [f.id, f.content || ""]))
  );

  const startResize = (e: React.MouseEvent, direction: "horizontal" | "vertical") => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = sidebarWidth;
    const startHeight = terminalHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (direction === "horizontal") {
        const newWidth = Math.max(150, Math.min(500, startWidth + moveEvent.clientX - startX));
        setSidebarWidth(newWidth);
      } else {
        const newHeight = Math.max(100, Math.min(window.innerHeight - 200, startHeight - (moveEvent.clientY - startY)));
        setTerminalHeight(newHeight);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  };

  const openFile = useCallback((id: string) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveTab(id);
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => {
        const next = prev.filter((t) => t !== id);
        if (activeTab === id) {
          setActiveTab(next.length > 0 ? next[next.length - 1] : null);
        }
        return next;
      });
    },
    [activeTab]
  );

  const updateContent = useCallback((id: string, content: string) => {
    setContents((prev) => ({ ...prev, [id]: content }));
  }, []);

  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const activeFile = activeTab ? fileMap[activeTab] : null;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-950 text-zinc-200">
      {/* Title bar */}
      <div className="flex h-9 items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="ml-4 flex items-center gap-2">
          <span className="font-medium text-zinc-300">my-app</span>
          <span className="text-zinc-600">—</span>
          <span>{activeFile?.name ?? "Untitled"}</span>
          {activeTab && contents[activeTab] !== (fileMap[activeTab]?.content ?? "") && (
            <span className="text-zinc-500">●</span>
          )}
        </div>
        <div className="ml-auto flex items-center gap-3 text-zinc-500">
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex min-h-0 flex-1">
        <ActivityBar activeView={activeView} onChange={setActiveView} />

        <div className="flex min-w-0 flex-1">
          <div style={{ width: sidebarWidth }} className="h-full shrink-0">
            <FileExplorer
              tree={tree}
              openTabs={openTabs}
              activeTab={activeTab}
              expandedFolders={expandedFolders}
              onOpenFile={openFile}
              onToggleFolder={toggleFolder}
              activeView={activeView}
            />
          </div>

          <div
            onMouseDown={(e) => startResize(e, "horizontal")}
            className="w-1 cursor-col-resize bg-zinc-800 transition-colors hover:bg-sky-600"
          />

          <div className="flex h-full min-w-0 flex-1 flex-col">
            <div className="min-h-0 flex-1">
              <EditorArea
                openTabs={openTabs}
                activeTab={activeTab}
                fileMap={fileMap}
                contents={contents}
                onActiveChange={setActiveTab}
                onCloseTab={closeTab}
                onContentChange={updateContent}
              />
            </div>

            <div
              onMouseDown={(e) => startResize(e, "vertical")}
              className="h-1 cursor-row-resize bg-zinc-800 transition-colors hover:bg-sky-600"
            />

            <div style={{ height: terminalHeight }} className="min-h-0 shrink-0">
              <Terminal tree={tree} fileMap={fileMap} contents={contents} />
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex h-6 items-center gap-4 bg-sky-700 px-3 text-xs text-sky-50">
        <div className="flex items-center gap-1.5">
          <GitBranch className="h-3.5 w-3.5" />
          <span>main</span>
          <Check className="h-3.5 w-3.5" />
          <span>0</span>
          <Circle className="h-3 w-3 fill-current" />
          <span>2</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          <span>0 errors</span>
          <AlertCircle className="h-3.5 w-3.5" />
          <span>0 warnings</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span>Ln {activeFile ? (contents[activeFile.id] ?? "").split("\n").length : 1}, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>{activeFile?.language?.toUpperCase() ?? "PLAINTEXT"}</span>
          <Bell className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}