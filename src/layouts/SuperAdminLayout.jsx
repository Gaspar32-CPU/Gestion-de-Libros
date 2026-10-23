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
import { Outlet, useLocation } from 'react-router-dom'
import { useOrganizacion } from '../hooks/useOrganizacion'
import { usePendientesSoporte } from '../features/soporte/usePendientesSoporte'

const OPCIONES = [
  // { label: 'Plataforma', icon: DashboardOutlined, path: '/plataforma' },
  { label: 'Organizaciones', icon: PeopleAlt, path: '/organizaciones' },
  { label: 'Usuarios', icon: PersonOutlined, path: '/usuarios' },
  { label: 'Planes', icon: Assignment, path: '/planes' },
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
  const [busqueda, setBusqueda] = useState('')
  const location = useLocation()
  const placeholderBusqueda = PLACEHOLDERS_BUSQUEDA[location.pathname]
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
      />
      <main className="flex-1 min-w-0">
        <DashboardHeader
          onBuscar={setBusqueda}
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
