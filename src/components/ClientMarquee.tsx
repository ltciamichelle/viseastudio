import Image from 'next/image';

const clientLogos = [
  { name: 'AOKLandz', src: '/assets/clients/aoklandz.webp', large: true },
  { name: 'Godoggie', src: '/assets/clients/godoggie.webp', large: true },
  { name: 'Cici Mandarin', src: '/assets/clients/cici-mandarin.webp', large: true },
  { name: 'Bali Resort', src: '/assets/clients/bali-resort.webp', large: false },
  { name: 'Abstract Logo', src: '/assets/clients/abstract-logo.webp', large: false },
  { name: 'Gear Logo', src: '/assets/clients/gear-logo.webp', large: false },
];

export default function ClientMarquee() {
  return (
    <section className="client-marquee bg-ink fade-up">
      <div className="marquee-track">
        {/* First sequence */}
        {clientLogos.map((client, index) => (
          <Image
            key={`marquee-1-${index}`}
            src={client.src}
            alt={client.name}
            width={client.large ? 180 : 120}
            height={client.large ? 130 : 80}
            className={`client-logo ${client.large ? 'client-logo-large' : ''}`}
            style={{ width: 'auto' }}
          />
        ))}

        {/* Duplicate sequence for infinite continuous loop */}
        {clientLogos.map((client, index) => (
          <Image
            key={`marquee-2-${index}`}
            src={client.src}
            alt={client.name}
            width={client.large ? 180 : 120}
            height={client.large ? 130 : 80}
            className={`client-logo ${client.large ? 'client-logo-large' : ''}`}
            style={{ width: 'auto' }}
          />
        ))}
      </div>
    </section>
  );
}
