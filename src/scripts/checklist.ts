const STORAGE_KEY = 'presence-checklist-v1';

function readSaved(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, boolean>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function mountChecklist(root: HTMLElement) {
  const boxes = root.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-item]');
  const saved = readSaved();

  for (const box of boxes) {
    const id = box.dataset.item;
    if (!id) continue;
    if (saved[id]) box.checked = true;
    box.addEventListener('change', () => {
      const next = readSaved();
      next[id] = box.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    });
  }
}
