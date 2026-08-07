import { Sidebar } from "../components/Sidebar";
import { RegisterForm } from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* Panel izquierdo */}
      <Sidebar/>

      {/* Panel derecho */}
      <div className="md:w-1/2 bg-stone-100 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Creá tu cuenta</h2>
          <p className="text-sm text-stone-500 mb-7">Todos los campos son obligatorios.</p>
          <RegisterForm/>
        </div>
      </div>
    </div>
  );
}