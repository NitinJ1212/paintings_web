"use client";

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  if (!open) return null;

  const shortcuts = [
    { key: "→", action: "Next painting" },
    { key: "←", action: "Previous painting" },
    { key: "Space", action: "Skip to next" },
    { key: "Esc", action: "Close gallery" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-sm rounded-xl border border-white/10 bg-panel p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl text-cream">Keyboard Shortcuts</h3>
        <ul className="mt-4 space-y-3">
          {shortcuts.map((s) => (
            <li key={s.key} className="flex items-center justify-between">
              <span className="font-body text-sm text-cream/70">{s.action}</span>
              <kbd className="rounded border border-white/15 bg-white/5 px-2 py-1 font-body text-xs text-gold">
                {s.key}
              </kbd>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg border border-white/10 py-2 font-body text-xs text-cream/70 hover:text-cream"
        >
          Close
        </button>
      </div>
    </div>
  );
}
