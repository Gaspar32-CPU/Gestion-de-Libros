import React, { useState } from 'react';

import './login.css';
import { usePageTitle } from '../hooks/usePageTitle';

const ALLOWED_DOMAINS = ['@anima.edu.uy', '@estudiantes.anima.edu.uy'];

function isInstitutionalEmail(email) {
  return ALLOWED_DOMAINS.some((domain) => email.toLowerCase().endsWith(domain));
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  usePageTitle('Iniciar sesión');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!isInstitutionalEmail(email)) {
      setError('Usá tu correo institucional (ej: @anima.edu.uy).');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      alert(`¡Bienvenido/a, ${email}! (esto luego será una redirección real)`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    alert('Entrando como invitado (definir a dónde redirige)');
  };

  return (
    <div className="login">
      <div className="login__brand">
        <div className="login__brand-glow" />
        <span className="login__logo">Bookly</span>

        <h1 className="login__headline">
          Una biblioteca ordenada y a mano.
        </h1>

        <p className="login__subtext">
          Explorá el catálogo, pedí un libro en segundos y seguí tus préstamos
          sin planillas ni papeleo.
        </p>

        <div className="login__stats">
          <div className="login__stat">
            <span className="login__stat-number">1 clic</span>
            <span className="login__stat-label">préstamo automático</span>
          </div>
          <div className="login__stat">
            <span className="login__stat-number">0</span>
            <span className="login__stat-label">planillas de Excel</span>
          </div>
        </div>
      </div>

      <div className="login__form-side">
        <div className="login__form-wrapper">
          <h2 className="login__title">Iniciar sesión</h2>
          <p className="login__form-subtext">
            Usá tu correo institucional.
          </p>

          <form onSubmit={handleLogin}>
            <label className="login__label" htmlFor="email">
              Correo institucional
            </label>
            <input
              id="email"
              type="email"
              className="login__input"
              placeholder="nombre@anima.edu.uy"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label className="login__label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="login__input"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={6}
              maxLength={16}
              required
            />

            <a href="#" className="login__forgot">
              ¿Olvidaste tu contraseña?
            </a>

            {error && <p className="login__error">{error}</p>}

            <button
              type="submit"
              className="login__submit"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login__divider">
            <span>o</span>
          </div>

          <button className="login__guest" onClick={handleGuest}>
            Explorar como invitado
          </button>

          <p className="login__signup">
            ¿No tenés cuenta? <a href="#">Registrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}