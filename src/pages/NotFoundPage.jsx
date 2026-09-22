import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main
      id="primary-content"
      className="ft-page-main"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fafafa 0%, #f0f4ff 100%)',
        padding: '4rem 1.5rem',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '560px', width: '100%' }}>

        {/* Big decorative 404 */}
        <div
          style={{
            fontSize: 'clamp(6rem, 20vw, 11rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #1d4ed8 0%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          404
        </div>

        {/* Illustration line */}
        <div
          style={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #1d4ed8, #f97316)',
            borderRadius: '2px',
            margin: '0 auto 2rem',
          }}
        />

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '0.75rem',
            lineHeight: 1.2,
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            color: '#6b7280',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          The page you're looking for doesn't exist or has been moved.
          <br />
          Let's get you back to something good.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '12px 26px',
              background: 'transparent',
              border: '2px solid #111827',
              borderRadius: '6px',
              color: '#111827',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#111827'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111827'; }}
          >
            ← Go back
          </button>

          <Link
            to="/"
            style={{
              padding: '12px 26px',
              background: '#111827',
              border: '2px solid #111827',
              borderRadius: '6px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Home
          </Link>

          <Link
            to="/shop"
            style={{
              padding: '12px 26px',
              background: 'linear-gradient(135deg, #1d4ed8, #f97316)',
              border: '2px solid transparent',
              borderRadius: '6px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'opacity 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Explore the Shop
          </Link>
        </div>

        {/* Popular links */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ color: '#9ca3af', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.9rem' }}>
            Popular pages
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { to: '/fashion', label: 'Fashion' },
              { to: '/deals', label: 'The Edit' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{ color: '#1d4ed8', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
