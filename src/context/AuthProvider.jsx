import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import api from '../services/api'
import { AuthContext } from './AuthContext'

function leerUsuarioInicial() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    const expirado = decoded.exp * 1000 < Date.now()
    if (expirado) {
      localStorage.removeItem('token')
      return null
    }
    return decoded
  } catch {
    localStorage.removeItem('token')
    return null
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioInicial)
  // eslint-disable-next-line no-unused-vars
  const [cargando, setCargando] = useState(false)

  function login(token) {
    localStorage.setItem('token', token)
    setUsuario(jwtDecode(token))
  }

  function logout() {
    localStorage.removeItem('token')
    setUsuario(null)
  }

  // El token sigue firmado con los datos viejos hasta el próximo login, así
  // que después de guardar el perfil hay que actualizar el usuario en
  // memoria "a mano" para que la sidebar y demás lugares que usan useAuth()
  // reflejen el cambio sin tener que recargar ni volver a loguearse.
  function actualizarUsuario(cambios) {
    setUsuario((actual) => (actual ? { ...actual, ...cambios } : actual))
  }

  // El JWT no lleva la foto (ni el resto de los datos de perfil que no hacen
  // falta para autorizar rutas), así que en un login o un reload de página
  // la sidebar no la conocía hasta que el usuario entraba a "Mi perfil" y
  // guardaba algo. Se completa acá, una vez, apenas hay sesión.
  useEffect(() => {
    if (!usuario?.id) return
    let cancelado = false

    api
      .get(`/usuarios/${usuario.id}`)
      .then(({ data }) => {
        if (!cancelado) actualizarUsuario({ foto: data.foto })
      })
      .catch(() => {})

    return () => {
      cancelado = true
    }
  }, [usuario?.id])

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, cargando, actualizarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  )
}
