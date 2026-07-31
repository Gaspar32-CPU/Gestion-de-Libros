function AdminLayout({ children }) {
  return (
    <div>
      <Sidebar opciones={["Dashboard", "Libros", "Usuarios", "Reportes", "Configuración"]} />
      <main>{children}</main>
    </div>
  );
}