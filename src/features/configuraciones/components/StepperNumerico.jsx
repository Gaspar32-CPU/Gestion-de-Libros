import ToggleComponent from "./ToggleComponente";

export default function StepperNumerico({ opciones, valor, toggle = false, onChange }) {
    const handleIncrementar = () => {
        const nuevoValor = valor + 1;
        onChange(nuevoValor);
    };

    const handleDecrementar = () => {
        const nuevoValor = valor - 1;
        onChange(nuevoValor);
    };

    return (
        <div className="flex items-center justify-between py-4">
            <div>
                <p className="text-md font-semibold text-slate-800">{opciones.titulo}</p>
                <p className="text-sm text-gray-500">
                    {opciones.descripcion}
                </p>
            </div>
            <div>
                {toggle ? (
                    <ToggleComponent/>
                ) : (
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            type="button"
                            onClick={handleDecrementar}
                            className="flex items-center justify-center cursor-pointer size-8 rounded-md border border-gray-300 hover:bg-gray-200"
                        >
                            -
                        </button>
                        <span className="">{valor}</span>
                        <button
                            type="button"
                            onClick={handleIncrementar}
                            className="flex items-center justify-center cursor-pointer size-8 rounded-md border border-gray-300 hover:bg-gray-200"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
