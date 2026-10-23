import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recuperarSchema } from '../../../../schemas/auth.schema'

export function RecuperarPassword() {
  const [correo, setCorreo] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  if (enviado) {
    return (
      <div>
        <p className="mb-4 text-[0.95rem] text-[#10221f]">
          Si <strong>{correo}</strong> tiene una cuenta en Bookly, te enviamos
          un email con un link para restablecer tu contraseña. El link vence en
          1 hora.
        </p>
        <Link
          to="/login"
          className="block w-full rounded-[10px] bg-[#14877a] py-3.5 text-center text-[0.95rem] font-semibold text-white no-underline transition-colors hover:bg-[#0f5c53]"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const result = recuperarSchema.safeParse({ correo })

    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/recuperar`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data),
        },
      )

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data.mensaje || data.error || 'No se pudo enviar el email.',
        )
      }

      setEnviado(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        className="mb-1.5 mt-4 block text-sm font-semibold text-[#10221f]"
        htmlFor="correo"
      >
        Correo
      </label>
      <input
        id="correo"
        type="email"
        className="mb-5 w-full rounded-[10px] border border-[#e3e0d8] bg-white px-3.5 py-2.5 text-[0.95rem] outline-none transition-colors focus:border-[#14877a] focus:shadow-[0_0_0_3px_rgba(20,135,122,0.15)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
        placeholder="nombre@institucion.edu.uy"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        autoComplete="email"
      />

      {error && (
        <p className="-mt-2 mb-4 text-[0.85rem] text-[#c0392b]">{error}</p>
      )}

      <button
        type="submit"
        className="w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar link'}
      </button>

      <p className="mt-6 text-center text-[0.85rem] text-[#6b7770]">
        <Link
          to="/login"
          className="font-semibold text-[#14877a] no-underline hover:underline"
        >
          Volver a iniciar sesión
        </Link>
      </p>
    </form>
  )
}
