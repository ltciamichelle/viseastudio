export default function CTA() {
  return (
    <section className="section bg-paper cta-section" id="contact">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-display fade-up">Let&apos;s build something worth trusting.</h2>
        <div className="fade-up delay-100" style={{ marginTop: '40px' }}>
          <a
            href="https://wa.me/message/SSOJGJVNCQ72H1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '18px', padding: '18px 40px' }}
          >
            Start a Conversation
          </a>
        </div>
        <div className="fade-up delay-200" style={{ marginTop: '32px', opacity: 0.7 }}>
          <p>
            Or email us at{' '}
            <a href="mailto:theviseastudio@gmail.com" className="link-underline">
              theviseastudio@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
