import { X, Circle } from "lucide-react";
import type { FileNode } from "@/App";

interface EditorAreaProps {
  openTabs: string[];
  activeTab: string | null;
  fileMap: Record<string, FileNode>;
  contents: Record<string, string>;
  onActiveChange: (id: string) => void;
  onCloseTab: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
}

export function EditorArea({
  openTabs,
  activeTab,
  fileMap,
  contents,
  onActiveChange,
  onCloseTab,
  onContentChange,
}: EditorAreaProps) {
  const activeFile = activeTab ? fileMap[activeTab] : null;

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Tabs */}
      <div className="flex h-9 items-center border-b border-zinc-800 bg-zinc-900">
        {openTabs.map((id) => {
          const file = fileMap[id];
          if (!file) return null;
          const isActive = id === activeTab;
          const isDirty = contents[id] !== file.content;
          return (
            <div
              key={id}
              onClick={() => onActiveChange(id)}
              className={`group flex h-full cursor-pointer items-center gap-2 border-r border-zinc-800 px-3 text-sm transition-colors ${
                isActive ? "bg-zinc-950 text-white" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800/50"
              }`}
            >
              <span className="truncate">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(id);
                }}
                className="rounded p-0.5 opacity-0 transition-opacity hover:bg-zinc-700 group-hover:opacity-100"
              >
                {isDirty ? (
                  <Circle className="h-2.5 w-2.5 fill-current text-zinc-400 group-hover:hidden" />
                ) : null}
                <X className={`h-3.5 w-3.5 ${isDirty ? "hidden group-hover:block" : ""}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Editor Content */}
      <div className="flex min-h-0 flex-1">
        {activeFile ? (
          <textarea
            value={contents[activeFile.id] ?? ""}
            onChange={(e) => onContentChange(activeFile.id, e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-zinc-950 p-4 font-mono text-sm text-zinc-200 outline-none"
            style={{ tabSize: 2 }}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-zinc-700">
            <div className="text-center">
              <p className="text-lg">VS Code Web</p>
              <p className="mt-2 text-sm">Open a file to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}