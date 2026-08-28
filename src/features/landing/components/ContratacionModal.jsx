import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const PASOS = ["Cuenta", "Organización", "Pago", "Identidad", "Listo"];

const esquemaCuenta = z.object({
  nombre: z.string().trim().min(1, "Completá nombre y apellido."),
  apellido: z.string().trim().min(1, "Completá nombre y apellido."),
  correo: z.email("Ingresá un correo institucional válido."),
  contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const esquemaOrganizacion = z.object({
  organizacion: z.string().trim().min(1, "Ingresá el nombre de la organización."),
  dominio: z.string().trim().min(1, "Ingresá el dominio de correo de tu institución."),
});

const esquemaPago = z.object({
  nombreTarjeta: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  numeroTarjeta: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  vencimiento: z.string().trim().min(1, "Completá los datos de la tarjeta."),
  cvv: z.string().trim().min(1, "Completá los datos de la tarjeta."),
});

const ESQUEMAS_POR_PASO = { 1: esquemaCuenta, 2: esquemaOrganizacion, 3: esquemaPago };

const INICIAL = {
  nombre: "",
  apellido: "",
  cedula: "",
  telefono: "",
  correo: "",
  contrasena: "",
  organizacion: "",
  dominio: "",
  nombreTarjeta: "",
  numeroTarjeta: "",
  vencimiento: "",
  cvv: "",
  nombreApp: "",
};

function Campo({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-line px-4 py-2.5 text-ink outline-none focus:border-brand"
      />
    </label>
  );
}

export function ContratacionModal({ plan, ciclo, onClose }) {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState(INICIAL);
  const [error, setError] = useState("");

  const precio = ciclo === "anual" ? plan.precioAnual : plan.precioMensual;
  const periodo = ciclo === "anual" ? "año" : "mes";

  const set = (campo) => (e) => setDatos((d) => ({ ...d, [campo]: e.target.value }));

  function validarPaso() {
    const esquema = ESQUEMAS_POR_PASO[paso];
    if (!esquema) return "";
    const resultado = esquema.safeParse(datos);
    return resultado.success ? "" : resultado.error.issues[0].message;
  }

  function siguiente() {
    const mensaje = validarPaso();
    if (mensaje) {
      setError(mensaje);
      return;
    }
    setError("");
    if (paso === 4) {
      setDatos((d) => ({ ...d, nombreApp: d.nombreApp || datos.organizacion }));
    }
    setPaso((p) => p + 1);
  }

  function atras() {
    setError("");
    setPaso((p) => p - 1);
  }

  const inicialOrganizacion = datos.organizacion.trim().charAt(0).toUpperCase() || "B";
  const nombreApp = datos.nombreApp || datos.organizacion || "Tu biblioteca";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-8 pt-6 pb-4 border-b border-line">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-brand tracking-wide">
                {paso < 5 ? `PASO ${paso} DE 4` : "TODO PRONTO"}
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-ink">
                {paso === 1 && "Creá tu cuenta de administrador"}
                {paso === 2 && "Datos de tu organización"}
                {paso === 3 && "Confirmá el pago"}
                {paso === 4 && "Personalizá tu biblioteca"}
                {paso === 5 && "Bienvenido a Bookly"}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-ink-2 hover:bg-bg"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex gap-2">
            {PASOS.map((nombrePaso, i) => {
              const numero = i + 1;
              const completado = numero < paso;
              const activo = numero === paso;
              return (
                <div key={nombrePaso} className="flex-1">
                  <p
                    className={`text-xs mb-1 truncate ${
                      activo ? "font-bold text-ink" : "text-ink-3"
                    }`}
                  >
                    {nombrePaso}
                  </p>
                  <div
                    className={`h-1 rounded-full ${
                      completado ? "bg-brand-2" : activo ? "bg-brand" : "bg-line"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-8 py-6">
          {paso === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-ink-2">
                Esta cuenta va a ser la administradora de la biblioteca: carga el catálogo,
                gestiona préstamos y configura las reglas.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Nombre" placeholder="Tabaré" value={datos.nombre} onChange={set("nombre")} />
                <Campo label="Apellido" placeholder="Marmolejo" value={datos.apellido} onChange={set("apellido")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Cédula" placeholder="5.123.456-7" value={datos.cedula} onChange={set("cedula")} />
                <Campo label="Teléfono" placeholder="099 123 456" value={datos.telefono} onChange={set("telefono")} />
              </div>
              <Campo
                label="Correo institucional"
                type="email"
                placeholder="tabare@anima.edu.uy"
                value={datos.correo}
                onChange={set("correo")}
              />
              <Campo
                label="Contraseña"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={datos.contrasena}
                onChange={set("contrasena")}
              />
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-ink-2">
                Solo las personas con un correo de este dominio van a poder registrarse en tu biblioteca.
              </p>
              <Campo
                label="Nombre de la organización"
                placeholder="Bachillerato Tecnológico Ánima"
                value={datos.organizacion}
                onChange={set("organizacion")}
              />
              <Campo
                label="Dominio de correo"
                placeholder="@anima.edu.uy"
                value={datos.dominio}
                onChange={set("dominio")}
              />
              {datos.dominio.trim() && (
                <p className="text-sm text-brand-d">
                  ✓ Se aceptarán correos {datos.dominio.trim().startsWith("@") ? "" : "@"}
                  {datos.dominio.trim()}
                </p>
              )}
              <div className="rounded-xl bg-bg border border-line px-4 py-3 text-sm text-ink-2 flex gap-3">
                <span>🔒</span>
                <p>
                  Los datos de tu organización quedan aislados: ningún otro cliente de Bookly puede
                  ver tu catálogo, tus usuarios ni tus préstamos.
                </p>
              </div>
            </div>
          )}

          {paso === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
                <div>
                  <p className="text-xs font-bold text-ink-3 tracking-wide">PLAN SELECCIONADO</p>
                  <p className="font-extrabold text-ink">{plan.nombre}</p>
                  <p className="text-sm text-ink-3">
                    {plan.limites.usuarios.toLocaleString("es-UY")} usuarios · {plan.limites.admins} admins ·{" "}
                    {plan.limites.titulos.toLocaleString("es-UY")} títulos
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-ink">US$ {precio}</p>
                  <p className="text-xs text-ink-3">por {periodo}</p>
                </div>
              </div>
              <Campo
                label="Nombre en la tarjeta"
                placeholder="Tabaré Marmolejo"
                value={datos.nombreTarjeta}
                onChange={set("nombreTarjeta")}
              />
              <Campo
                label="Número de tarjeta"
                placeholder="4509 0000 0000 0000"
                value={datos.numeroTarjeta}
                onChange={set("numeroTarjeta")}
              />
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Vencimiento" placeholder="09/29" value={datos.vencimiento} onChange={set("vencimiento")} />
                <Campo label="CVV" placeholder="123" value={datos.cvv} onChange={set("cvv")} />
              </div>
              <p className="text-xs text-ink-3">
                Al confirmar creamos tu organización y tu cuenta de administrador. Facturación{" "}
                {ciclo === "anual" ? "anual" : "mensual"}, cancelable en cualquier momento.
              </p>
            </div>
          )}

          {paso === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-ink-2">
                Tu biblioteca va a usar la identidad de tu institución, no la nuestra. Podés cambiar esto
                cuando quieras.
              </p>

              <div className="rounded-xl border border-line overflow-hidden">
                <div className="flex items-center justify-between bg-ink px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand text-white text-sm font-extrabold flex items-center justify-center">
                      {inicialOrganizacion}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{nombreApp}</p>
                      <p className="text-xs text-ink-3">Biblioteca</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-brand text-white px-3 py-1 rounded-full">
                    Catálogo
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-bg">
                  <span className="text-xs font-bold bg-brand text-white px-3 py-1.5 rounded-full">
                    Solicitar préstamo
                  </span>
                  <span className="text-xs font-bold bg-brand-2/20 text-brand-d px-3 py-1.5 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>

              <Campo
                label="Nombre de la app"
                placeholder={datos.organizacion || "Biblioteca Ánima"}
                value={datos.nombreApp}
                onChange={set("nombreApp")}
              />

              <div>
                <span className="text-sm font-bold text-ink">Logo</span>
                <div className="mt-1 flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                  <span className="w-8 h-8 rounded-lg bg-brand text-white text-sm font-extrabold flex items-center justify-center">
                    {inicialOrganizacion}
                  </span>
                  <p className="text-sm text-ink-2">
                    Por ahora usamos la inicial de tu organización. Podés subir el logo desde Configuración.
                  </p>
                </div>
              </div>
            </div>
          )}

          {paso === 5 && (
            <div className="space-y-4">
              <div className="flex flex-col items-center text-center py-2">
                <div className="w-16 h-16 rounded-full bg-brand-2/20 text-brand-d text-3xl flex items-center justify-center">
                  ✓
                </div>
                <h3 className="mt-4 text-2xl font-extrabold text-ink">Tu biblioteca está lista</h3>
                <p className="mt-2 text-ink-2">
                  Creamos <span className="font-bold">{datos.organizacion || "tu organización"}</span> con el
                  plan {plan.nombre} y tu cuenta de administrador.
                </p>
              </div>

              {[
                {
                  titulo: "Organización creada",
                  detalle: `${datos.organizacion || "Tu organización"} · dominio ${
                    datos.dominio.trim().startsWith("@") ? datos.dominio.trim() : `@${datos.dominio.trim()}`
                  }`,
                },
                { titulo: "Cuenta de administrador", detalle: datos.correo },
                { titulo: `Plan ${plan.nombre} activo`, detalle: `US$ ${precio} por ${periodo}` },
                { titulo: "Identidad configurada", detalle: `${nombreApp} · colores aplicados` },
              ].map((item) => (
                <div key={item.titulo} className="flex items-start gap-3 rounded-xl bg-bg border border-line px-4 py-3">
                  <span className="text-brand font-bold">✓</span>
                  <div>
                    <p className="font-bold text-ink text-sm">{item.titulo}</p>
                    <p className="text-sm text-ink-3">{item.detalle}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-xl bg-brand-2/10 border border-brand-2/30 px-4 py-3 text-sm text-ink-2">
                Próximo paso: cargá tu catálogo. Si tenés la planilla de Excel, la importamos por vos —
                escribinos a hola@bookly.app.
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-line px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {paso > 1 && paso < 5 && (
              <button type="button" onClick={atras} className="text-sm font-bold text-ink-2 hover:text-ink">
                Atrás
              </button>
            )}
            {paso < 5 && (
              <span className="text-sm text-ink-3">{paso === 3 ? "Pago seguro" : "Podés cambiar todo después"}</span>
            )}
          </div>

          {paso < 5 ? (
            <button
              type="button"
              onClick={siguiente}
              className="bg-brand text-white font-bold px-6 py-2.5 rounded-xl hover:bg-brand-d transition-colors"
            >
              {paso === 3 ? "Pagar y crear mi biblioteca" : "Continuar"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-brand text-white font-bold px-6 py-2.5 rounded-xl hover:bg-brand-d transition-colors"
            >
              Entrar a Bookly
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
