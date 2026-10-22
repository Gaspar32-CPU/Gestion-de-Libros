import ToggleComponent from "./ToggleComponente";

export default function StepperNumerico({ opciones, valor, toggle = false, min = 0, max = Infinity, onChange }) {
    const handleIncrementar = () => {
        if (valor < max) onChange(valor + 1);
    };

    const handleDecrementar = () => {
        if (valor > min) onChange(valor - 1);
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
                    <ToggleComponent
                        checked={valor}
                        onChange={() => onChange(!valor)}
                    />
                ) : (
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            type="button"
                            onClick={handleDecrementar}
                            disabled={valor <= min}
                            className="flex items-center justify-center cursor-pointer size-8 rounded-md border border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            -
                        </button>
                        <span className="min-w-6 text-center">{valor}</span>
                        <button
                            type="button"
                            onClick={handleIncrementar}
                            disabled={valor >= max}
                            className="flex items-center justify-center cursor-pointer size-8 rounded-md border border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
