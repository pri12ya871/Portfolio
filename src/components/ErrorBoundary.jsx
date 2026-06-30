import { Component } from 'react';

/**
 * React error boundary — catches render-time JS errors and shows
 * an elegant fallback rather than a blank screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#050816',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>⚠️</div>
        <h1 style={{ color: '#F1F5F9', fontSize: 28, fontWeight: 800, marginBottom: 12, fontFamily: 'Sora, sans-serif' }}>
          Something went wrong
        </h1>
        <p style={{ color: '#64748B', fontSize: 14, maxWidth: 400, lineHeight: 1.7, marginBottom: 28 }}>
          An unexpected error occurred. Please refresh the page or try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '12px 28px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
          }}
        >
          Refresh Page
        </button>
        {import.meta.env.DEV && this.state.error && (
          <pre style={{ marginTop: 24, color: '#EF4444', fontSize: 11, textAlign: 'left', maxWidth: 600, overflow: 'auto' }}>
            {this.state.error.toString()}
          </pre>
        )}
      </div>
    );
  }
}
