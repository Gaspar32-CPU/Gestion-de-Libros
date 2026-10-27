import { useState, useRef, useEffect } from "react";

export default function MultiSelect({
  id,
  options,          // [{ value, label }]
  value = [],       // array de values seleccionados
  onChange,         // (newArray) => void
  placeholder = "Seleccioná...",
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cerrar al hacer click afuera o con Escape
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggle = (v) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label);

  const summary =
    selectedLabels.length === 0
      ? null
      : selectedLabels.length === 1
      ? selectedLabels[0]
      : `${selectedLabels[0]} +${selectedLabels.length - 1}`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm focus:outline-none focus:border-[#1fa48a] focus:ring-1 focus:ring-[#1fa48a] ${
          open ? "border-[#1fa48a] ring-1 ring-[#1fa48a]" : "border-slate-200"
        }`}
      >
        <span className={`truncate ${summary ? "text-slate-700" : "text-slate-400"}`}>
          {summary ?? placeholder}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 z-20 mt-1 max-h-56 w-max min-w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {options.map(({ value: v, label }) => {
            const checked = value.includes(v);
            return (
              <li key={v} role="option" aria-selected={checked}>
                <label className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(v)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#1fa48a]"
                  />
                  {label}
                </label>
              </li>
            );
          })}
        </ul>
      )}

      {/* Para que `required` siga validando en el submit nativo */}
      {required && (
        <input
          tabIndex={-1}
          required
          value={value.join(",")}
          onChange={() => {}}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0 opacity-0"
        />
      )}
    </div>
  );
}