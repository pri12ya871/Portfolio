import { ArrowLeft } from './Icons';

export default function NotFound() {
  return (
    <div className="wrap min-h-screen flex flex-col justify-center py-24">
      <p className="eyebrow"><b>404</b><span>— Not found</span></p>
      <h1 className="mt-6" style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}>
        Nothing <em style={{ color: 'var(--accent)' }}>here</em>.
      </h1>
      <p className="mt-6 max-w-md" style={{ color: 'var(--ink-3)' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <p className="mt-10">
        <a href="/" className="btn btn-solid"><ArrowLeft size={17} /> Back to the portfolio</a>
      </p>
    </div>
  );
}
