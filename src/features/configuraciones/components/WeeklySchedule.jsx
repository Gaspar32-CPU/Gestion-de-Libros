import { useState } from "react";
import { dias as diasIniciales } from "../../prestamos/utils/horarios";
import ToggleComponent from "./ToggleComponente";

export default function WeeklySchedule() {
    const [dias, setDias] = useState(diasIniciales);
    const [horas, setHoras] = useState(
        diasIniciales.map(() => ({
            apertura: "08:00",
            cierre: "17:00",
        }))
    );

    const cambiarEstadoDia = (numero) => {
        setDias((diasActuales) =>
            diasActuales.map((dia) =>
                dia.numero === numero
                    ? { ...dia, abierto: !dia.abierto }
                    : dia
            )
        );
    };

    const cambiarHora = (index, tipo, valor) => {
        setHoras((horasActuales) =>
            horasActuales.map((hora, i) =>
                i === index ? { ...hora, [tipo]: valor } : hora
            )
        );
    };

    return (
        <div className="flex flex-col gap-3 w-full border-b border-gray-300 pb-3 mb-3">
            {dias.map((dia, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ToggleComponent 
                            onChange={() => cambiarEstadoDia(dia.numero)}
                            checked={dia.abierto}
                        />
                        <p className="font-semibold text-gray-700">{dia.nombre}</p>
                    </div>
                    {dia.abierto ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="time"
                                value={horas[index].apertura}
                                onChange={(e) =>
                                    cambiarHora(index, "apertura", e.target.value)
                                }
                                className="p-2 border border-gray-300 rounded-md"
                            />

                            <p className="text-ink-3 text-sm font-bold">a</p>

                            <input
                                type="time"
                                value={horas[index].cierre}
                                onChange={(e) =>
                                    cambiarHora(index, "cierre", e.target.value)
                                }
                                className="p-2 border border-gray-300 rounded-md"
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
