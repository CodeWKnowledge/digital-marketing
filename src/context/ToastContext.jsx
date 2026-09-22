import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

let _nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = _nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast stack — rendered here so it's always on top */}
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            style={{
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.1rem',
              background: toast.type === 'error' ? '#1f1f1f' : '#111827',
              color: '#f9fafb',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
              fontSize: '0.9rem',
              fontWeight: 500,
              minWidth: '220px',
              maxWidth: '360px',
              borderLeft: `4px solid ${
                toast.type === 'error' ? '#ef4444'
                : toast.type === 'wishlist' ? '#f97316'
                : '#1d4ed8'
              }`,
              animation: 'bk-toast-in 0.25s ease',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>
              {toast.type === 'error' ? '✕' : toast.type === 'wishlist' ? '♥' : '✓'}
            </span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0 2px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Keyframe injected inline once */}
      <style>{`
        @keyframes bk-toast-in {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
