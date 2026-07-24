import React, { useState } from 'react';

import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // evita que la página se recargue

    setError('');

    if (!email || !password) {
      setError('Completá tu correo y contraseña.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email.endsWith('@anima.edu.uy')) {
            resolve();
          } else {
            reject(new Error('Usá tu correo institucional (@anima.edu.uy).'));
          }
        }, 900)
      );

      // Si llegamos acá, el login "funcionó"
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
        <span className="login__logo">Ánima</span>

        <h1 className="login__headline">
          La biblioteca del bachillerato, ordenada y a mano.
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
          <h2 className="login__title">Iniciá sesión</h2>
          <p className="login__form-subtext">
            Usá tu correo institucional de Ánima.
          </p>

          <form onSubmit={handleLogin} noValidate>
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
            />

            <label className="login__label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="login__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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