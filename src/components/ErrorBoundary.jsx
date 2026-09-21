import { Component } from 'react';

/** Catches render-time errors and shows a plain fallback instead of a blank screen. */
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
      <div className="wrap min-h-screen flex flex-col justify-center py-24">
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}>Something went wrong.</h1>
        <p className="mt-5 max-w-md" style={{ color: 'var(--ink-3)' }}>
          An unexpected error stopped the page from loading. A refresh usually fixes it.
        </p>
        <p className="mt-8">
          <button type="button" className="btn btn-solid" onClick={() => window.location.reload()}>
            Refresh the page
          </button>
        </p>
        {import.meta.env.DEV && this.state.error && (
          <pre className="mt-8 mono" style={{ color: 'var(--err)', whiteSpace: 'pre-wrap' }}>
            {this.state.error.toString()}
          </pre>
        )}
      </div>
    );
  }
}
