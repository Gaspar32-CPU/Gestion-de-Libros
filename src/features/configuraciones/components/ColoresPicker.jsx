const conColorGuardado = (colores, guardado) =>
  guardado &&
  !colores.some((c) => c.value.toLowerCase() === guardado.toLowerCase())
    ? [{ value: guardado, label: `Actual (${guardado})` }, ...colores]
    : colores

export default function ColoresPicker({
  coloresPrimarios,
  coloresSecundarios,
  primario,
  secundario,
  primarioGuardado,
  secundarioGuardado,
  onChangePrimario,
  onChangeSecundario,
}) {
  const renderColor = (seleccionado, onChange) => (color) => (
    <div
      key={color.label}
      title={color.label}
      style={{ backgroundColor: color.value, width: 40, height: 40 }}
      className={`rounded-xl cursor-pointer transition ${
        seleccionado?.toLowerCase() === color.value.toLowerCase()
          ? 'ring-2 ring-gray-400 ring-offset-2'
          : ''
      }`}
      onClick={() => onChange(color.value)}
    />
  )

  return (
    <div className="flex gap-10">
      <div className="flex gap-2">
        {conColorGuardado(coloresPrimarios, primarioGuardado).map(
          renderColor(primario, onChangePrimario),
        )}
      </div>
      <div className="flex gap-2">
        {conColorGuardado(coloresSecundarios, secundarioGuardado).map(
          renderColor(secundario, onChangeSecundario),
        )}
      </div>
    </div>
  )
}
