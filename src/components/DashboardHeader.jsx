import { useState } from "react";
import { Badge, IconButton } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";

export default function DashboardHeader({ onBuscar, notificaciones = 0, mostrarBusqueda = true, placeholder = "Buscar..." }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setTerminoBusqueda(valor);
    onBuscar?.(valor);
  };

  const handleBusquedaSubmit = (e) => {
    e.preventDefault();
    onBuscar?.(terminoBusqueda);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line px-4 md:px-8 py-3">
      <div className={`flex items-center gap-4 ${mostrarBusqueda ? "justify-between" : "justify-end"}`}>
        {mostrarBusqueda && (
          <form onSubmit={handleBusquedaSubmit} className="flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                value={terminoBusqueda}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full py-2 pl-10 pr-4 bg-gray-50 border border-line rounded-xl text-sm text-ink placeholder-gray-400 focus:outline-none focus:border-brand focus:bg-white transition-colors"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="12" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
            </div>
          </form>
        )}

        <IconButton aria-label="Notificaciones">
          <Badge badgeContent={notificaciones} color="error">
            <NotificationsNoneOutlined className="text-ink-2" />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
}
