import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section hero">
      <div className="container hero-content">
        <h1 className="text-display">404</h1>
        <p className="hero-subtext">Page not found</p>
        <div style={{ marginTop: '24px' }}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
