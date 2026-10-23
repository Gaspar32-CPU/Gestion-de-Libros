import { Outlet } from 'react-router-dom'
import { Inventory2, MenuBook, ReportProblem } from '@mui/icons-material'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { useAuth } from '../context/useAuth'
import { useOrganizacion } from '../hooks/useOrganizacion'
import { useBusquedaPorRuta } from '../hooks/useBusquedaPorRuta'

const OPCIONES = [
  { label: 'Catálogo', icon: MenuBook, path: '/catalogo' },
  { label: 'Mis Préstamos', icon: Inventory2, path: '/prestamos' },
  { label: 'Reportar problema', icon: ReportProblem, path: '/reportar' },
]

const PLACEHOLDERS_BUSQUEDA = {
  '/catalogo': 'Buscar por título, autor o ISBN...',
  '/prestamos': 'Buscar por título del libro...',
}

export default function UsuarioLayout() {
  const { usuario } = useAuth()
  const datosOrganizacion = useOrganizacion(usuario?.organizacionId)
  const { busqueda, buscar, ruta } = useBusquedaPorRuta()
  const placeholderBusqueda = PLACEHOLDERS_BUSQUEDA[ruta]

  return (
    <div className="flex">
      <Sidebar
        opciones={OPCIONES}
        usuario={usuario}
        organizacion={datosOrganizacion?.organizacion}
        configuracion={datosOrganizacion?.configuracion}
      />
      <main className="flex-1 min-w-0">
        <DashboardHeader
          key={ruta}
          onBuscar={buscar}
          mostrarBusqueda={!!placeholderBusqueda}
          placeholder={placeholderBusqueda}
        />
        <Outlet context={{ busqueda }} />
      </main>
    </div>
  )
}
