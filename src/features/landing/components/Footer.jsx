export function Footer() {
  return (
    <footer className="px-30 py-8 border-t border-line bg-bg">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <img src="/Bookly-png.png" alt="" className="w-8" />
          <span className="font-extrabold text-ink">Bookly</span>
        </div>
        <p className="text-sm text-ink-3">© 2026 Bookly · Sistema de gestión de préstamos</p>
      </div>
    </footer>
  );
}
