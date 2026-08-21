  import { useState } from "react";
  import { isbnSchema } from "../../../../schemas/auth.schema";

  export function Isbn () {
    const [error, setError] = useState("");
    const [libro, setLibro] = useState();
    const [form, setForm] = useState({
      isbn: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleIsbn = async (e) => {
      e.preventDefault();
      setError("");
      setLibro(null);

      const result = isbnSchema.safeParse(form);

      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/libros/isbn/${form.isbn}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Error al ingresar ISBN.');
        }
        const data = await res.json();
        setLibro(data.libro);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return(
      <div>
        <form className="space-y-4" onSubmit={handleIsbn}>
          <div>
            <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
              <label htmlFor="isbn" className="mb-1.5 block text-sm font-semibold text-stone-900">SNI/ISBN</label>
              <input
                id="isbn"
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-stone-300 bg-white px-3.5 py-2.5 text-[0.95rem] text-stone-900 placeholder-stone-400 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                placeholder="978-84-376-0494-7"
              />
            </div>

            {error && (
              <p className="-mt-2 text-[0.85rem] text-[#c0392b]">{error}</p>
            )}
          </div>

          <button
              type="submit"
              className="w-full cursor-pointer rounded-[10px] border-none bg-[#14877a] py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0f5c53] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0f5c53]"
              disabled={loading}
          >
              {loading ? 'Buscando ISBN...' : 'Buscar ISBN'}
          </button>
        </form>
        {libro && (
          <div className="mt-6 flex gap-4 rounded-[10px] border border-stone-200 bg-white p-4">
            {libro.portada && (
              <img
                src={libro.portada}
                alt={`Portada de ${libro.titulo}`}
                className="h-32 w-22 rounded-md object-cover"
              />
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-stone-900">{libro.titulo}</h3>
              <p className="text-sm text-stone-600">{libro.autor}</p>
              <p className="text-sm text-stone-500">
                {libro.anio} · {libro.paginas} págs.
              </p>
              <p className="text-sm text-stone-700">{libro.descripcion}</p>
            </div>
          </div>
        )}
      </div>
    )
  }