import { KeyboardArrowDown } from "@mui/icons-material";

export default function Select({ children, className = "", ...props }) {
    return (
        <div className="relative inline-flex">
            <select
                {...props}
                className={`appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 ${className}`}
            >
                {children}
            </select>
            <KeyboardArrowDown
                fontSize="small"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
            />
        </div>
    )
}
