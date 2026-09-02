import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-ink">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="#" className="logo fade-up">
              <Image
                src="/assets/logo/logo-wide.webp"
                alt="Visea Studio Logo"
                width={120}
                height={32}
                style={{ width: 'auto', height: '32px' }}
              />
            </Link>
            <p
              className="fade-up delay-100"
              style={{ marginTop: '16px', opacity: 0.7, maxWidth: '300px' }}
            >
              A digital agency building brands and digital experiences that inspire confidence.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col fade-up delay-200">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link href="#about">About</Link>
                </li>
                <li>
                  <Link href="#services">Services</Link>
                </li>
                <li>
                  <Link href="#work">Work</Link>
                </li>
                <li>
                  <Link href="#process">Process</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col fade-up delay-300">
              <h4>Socials</h4>
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/visea.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/message/SSOJGJVNCQ72H1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom fade-up delay-400">
          <p>&copy; {currentYear} Visea Studio. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
