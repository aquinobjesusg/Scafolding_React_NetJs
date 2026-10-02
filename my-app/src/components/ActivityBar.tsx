import { Files, Search, GitBranch, Bug, Settings, Package, User } from "lucide-react";

interface ActivityBarProps {
  activeView: string;
  onChange: (view: string) => void;
}

export function ActivityBar({ activeView, onChange }: ActivityBarProps) {
  const icons = [
    { id: "explorer", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
    { id: "debug", icon: Bug, label: "Run and Debug" },
    { id: "extensions", icon: Package, label: "Extensions" },
  ];

  return (
    <div className="flex w-12 flex-col items-center border-r border-zinc-800 bg-zinc-900 py-2">
      {icons.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          title={label}
          className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
            activeView === id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {activeView === id && (
            <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-sky-500" />
          )}
          <Icon className="h-5 w-5" />
        </button>
      ))}
      <div className="mt-auto">
        <button
          onClick={() => onChange("settings")}
          title="Settings"
          className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
            activeView === "settings" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          title="Account"
          className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}