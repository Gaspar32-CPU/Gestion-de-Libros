import { usePageTitle } from '../../../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { Sidebar } from "../components/Sidebar";

export default function Login() {
  usePageTitle('Iniciar sesión');

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <Sidebar />

      <div className="flex flex-1 items-center justify-center px-6 py-8 text-left md:p-8">
        <div className="w-full max-w-90">
          <h2 className="mb-1 text-2xl font-bold text-[#10221f]">Iniciar sesión</h2>
          <p className="mb-7 text-sm text-[#6b7770]">Usá tu correo institucional.</p>

          <LoginForm/>

          <p className="mt-6 text-center text-[0.85rem] text-[#6b7770]">
            ¿No tenés cuenta?{' '}
            <Link to="/register" className="font-semibold text-[#14877a] no-underline hover:underline">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}