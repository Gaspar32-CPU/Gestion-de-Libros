import ToggleComponent from "./ToggleComponente";
import { nombreDia } from "../data/horarios";

export default function WeeklySchedule({ horarios, onChange }) {
    const cambiarDia = (dia, campos) => {
        onChange(
            horarios.map((h) => (h.dia === dia ? { ...h, ...campos } : h))
        );
    };

    return (
        <div className="flex flex-col gap-3 w-full border-b border-gray-300 pb-3 mb-3">
            {horarios.map((horario) => (
                <div key={horario.dia} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ToggleComponent
                            onChange={() => cambiarDia(horario.dia, { abierto: !horario.abierto })}
                            checked={horario.abierto}
                        />
                        <p className="font-semibold text-gray-700">{nombreDia(horario.dia)}</p>
                    </div>
                    {horario.abierto ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="time"
                                value={horario.apertura}
                                required
                                onChange={(e) =>
                                    cambiarDia(horario.dia, { apertura: e.target.value })
                                }
                                className="p-2 border border-gray-300 rounded-md"
                            />

                            <p className="text-ink-3 text-sm font-bold">a</p>

                            <input
                                type="time"
                                value={horario.cierre}
                                required
                                onChange={(e) =>
                                    cambiarDia(horario.dia, { cierre: e.target.value })
                                }
                                className={`p-2 border rounded-md ${
                                    horario.apertura >= horario.cierre ? "border-red-400" : "border-gray-300"
                                }`}
                            />
                        </div>
                    ) : (
                        <p className="text-ink-3 text-sm font-bold">Cerrado</p>
                    )}
                </div>
            ))}
        </div>
    );
}
