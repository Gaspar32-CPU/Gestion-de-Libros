export default function ToggleComponent({ checked, onChange }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`relative w-11 cursor-pointer h-6 rounded-full transition-colors ${
                checked ? "bg-teal-500" : "bg-gray-300"
            }`}
        >
            <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    checked ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );
}