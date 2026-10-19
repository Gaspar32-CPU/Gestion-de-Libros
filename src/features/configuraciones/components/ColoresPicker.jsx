export default function ColoresPicker({
  coloresPrimarios,
  coloresSecundarios,
  primario,
  secundario,
  onChangePrimario,
  onChangeSecundario,
}) {
  const renderColor = (seleccionado, onChange) => (color) => (
    <div
      key={color.label}
      title={color.label}
      style={{ backgroundColor: color.value, width: 40, height: 40 }}
      className={`rounded-xl cursor-pointer transition ${
        seleccionado === color.value ? 'ring-2 ring-gray-400 ring-offset-2' : ''
      }`}
      onClick={() => onChange(color.value)}
    />
  )

  return (
    <div className="flex gap-10">
      <div className="flex gap-2">
        {coloresPrimarios.map(renderColor(primario, onChangePrimario))}
      </div>
      <div className="flex gap-2">
        {coloresSecundarios.map(renderColor(secundario, onChangeSecundario))}
      </div>
    </div>
  )
}
