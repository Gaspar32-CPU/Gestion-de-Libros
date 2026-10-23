import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import {
  Assignment,
  DashboardOutlined,
  HistoryOutlined,
  PeopleAlt,
  PersonOutlined,
  ReportProblem,
} from '@mui/icons-material'
import { useAuth } from '../context/useAuth'
import { Outlet } from 'react-router-dom'
import { useOrganizacion } from '../hooks/useOrganizacion'
import { useBusquedaPorRuta } from '../hooks/useBusquedaPorRuta'
import { usePendientesSoporte } from '../features/soporte/usePendientesSoporte'

const OPCIONES = [
  // { label: 'Plataforma', icon: DashboardOutlined, path: '/plataforma' },
  { label: 'Organizaciones', icon: PeopleAlt, path: '/organizaciones' },
  { label: 'Usuarios', icon: PersonOutlined, path: '/usuarios' },
  // { label: 'Planes', icon: Assignment, path: '/planes' },
  { label: 'Soporte', icon: ReportProblem, path: '/soporte' },
  // { label: 'Auditoría', icon: HistoryOutlined, path: '/auditoria' },
]

const PLACEHOLDERS_BUSQUEDA = {
  '/organizaciones': 'Buscar por nombre de organización...',
  '/usuarios': 'Buscar por nombre o email...',
}

export default function SuperAdminLayout() {
  const { usuario } = useAuth()
  const datosOrganizacion = useOrganizacion(usuario?.organizacionId)
  const { busqueda, buscar, ruta } = useBusquedaPorRuta()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const placeholderBusqueda = PLACEHOLDERS_BUSQUEDA[ruta]
  const {
    pendientes: pendientesSoporte,
    reportes: reportesSoporte,
    cargado: soporteCargado,
    error: errorSoporte,
  } = usePendientesSoporte()
  const opciones = OPCIONES.map((opcion) =>
    opcion.path === '/soporte'
      ? { ...opcion, badge: pendientesSoporte }
      : opcion,
  )

  return (
    <div className="flex">
      <Sidebar
        opciones={opciones}
        usuario={usuario}
        organizacion={datosOrganizacion?.organizacion}
        configuracion={datosOrganizacion?.configuracion}
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
      />
      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}
      <main className="flex-1 min-w-0">
        <DashboardHeader
          key={ruta}
          onBuscar={buscar}
          onMenu={() => setMenuAbierto(true)}
          mostrarBusqueda={!!placeholderBusqueda}
          placeholder={placeholderBusqueda}
        />
        <Outlet
          context={{ busqueda, reportesSoporte, soporteCargado, errorSoporte }}
        />
      </main>
    </div>
  )
}
