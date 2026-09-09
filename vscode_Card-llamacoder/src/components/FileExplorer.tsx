import { ChevronRight, ChevronDown, File, FileCode, FileJson, FileText, Folder, FolderOpen } from "lucide-react";
import type { FileNode } from "@/App";

interface FileExplorerProps {
  tree: FileNode[];
  openTabs: string[];
  activeTab: string | null;
  expandedFolders: Set<string>;
  onOpenFile: (id: string) => void;
  onToggleFolder: (id: string) => void;
  activeView: string;
}

function getFileIcon(node: FileNode) {
  const ext = node.name.split(".").pop();
  if (ext === "tsx" || ext === "ts") return <FileCode className="h-4 w-4 text-sky-400" />;
  if (ext === "json") return <FileJson className="h-4 w-4 text-amber-400" />;
  if (ext === "css") return <FileCode className="h-4 w-4 text-blue-400" />;
  if (ext === "md") return <FileText className="h-4 w-4 text-zinc-400" />;
  if (ext === "svg" || ext === "html") return <FileCode className="h-4 w-4 text-orange-400" />;
  return <File className="h-4 w-4 text-zinc-400" />;
}

function renderTree(
  nodes: FileNode[],
  level: number,
  activeTab: string | null,
  expandedFolders: Set<string>,
  onOpenFile: (id: string) => void,
  onToggleFolder: (id: string) => void
) {
  return nodes.map((node) => {
    const isExpanded = expandedFolders.has(node.id);
    const isActive = activeTab === node.id;

    return (
      <div key={node.id}>
        <button
          onClick={() => (node.type === "folder" ? onToggleFolder(node.id) : onOpenFile(node.id))}
          className={`flex w-full items-center gap-1.5 py-1 pr-2 text-sm transition-colors hover:bg-zinc-800/60 ${
            isActive ? "bg-sky-900/30 text-white" : "text-zinc-400"
          }`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
              )}
              {isExpanded ? (
                <FolderOpen className="h-4 w-4 shrink-0 text-zinc-400" />
              ) : (
                <Folder className="h-4 w-4 shrink-0 text-zinc-400" />
              )}
            </>
          ) : (
            <>
              <span className="w-3.5" />
              {getFileIcon(node)}
            </>
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {renderTree(node.children, level + 1, activeTab, expandedFolders, onOpenFile, onToggleFolder)}
          </div>
        )}
      </div>
    );
  });
}

export function FileExplorer({
  tree,
  activeTab,
  expandedFolders,
  onOpenFile,
  onToggleFolder,
  activeView,
}: FileExplorerProps) {
  const titles: Record<string, string> = {
    explorer: "Explorer",
    search: "Search",
    git: "Source Control",
    debug: "Run and Debug",
    extensions: "Extensions",
    settings: "Settings",
  };

  return (
    <div className="flex h-full flex-col bg-zinc-900/50">
      <div className="flex h-8 items-center justify-between px-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {titles[activeView] || "Explorer"}
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        {activeView === "explorer" && (
          <div>
            <div className="px-4 py-1 text-xs font-bold uppercase text-zinc-500">My Project</div>
            {renderTree(tree, 0, activeTab, expandedFolders, onOpenFile, onToggleFolder)}
          </div>
        )}
        {activeView === "search" && (
          <div className="p-4 text-sm text-zinc-500">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-sm text-zinc-200 outline-none focus:border-sky-500"
            />
            <p className="mt-4 text-center text-xs">Search functionality placeholder</p>
          </div>
        )}
        {activeView === "git" && (
          <div className="p-4 text-sm text-zinc-500">
            <p className="mb-2 font-semibold text-zinc-300">Changes (2)</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded p-1 hover:bg-zinc-800">
                <span className="text-orange-400">M</span>
                <span>src/App.tsx</span>
              </div>
              <div className="flex items-center gap-2 rounded p-1 hover:bg-zinc-800">
                <span className="text-green-400">U</span>
                <span>src/utils/helpers.ts</span>
              </div>
            </div>
          </div>
        )}
        {activeView === "debug" && (
          <div className="p-4 text-sm text-zinc-500">
            <button className="flex items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-white hover:bg-sky-700">
              Run and Debug
            </button>
            <p className="mt-4 text-xs">No configurations.</p>
          </div>
        )}
        {activeView === "extensions" && (
          <div className="p-4 text-sm text-zinc-500">
            <p className="text-xs">No extensions installed.</p>
          </div>
        )}
        {activeView === "settings" && (
          <div className="p-4 text-sm text-zinc-500">
            <p className="text-xs">Settings placeholder</p>
          </div>
        )}
      </div>
    </div>
  );
}