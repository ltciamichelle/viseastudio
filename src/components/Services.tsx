const services = [
  {
    num: '01',
    title: 'Branding',
    description:
      'Identity systems, custom logo design, and comprehensive brand guidelines that position you as an industry leader.',
    delay: 'delay-100',
  },
  {
    num: '02',
    title: 'Visuals',
    description:
      'High-end content design, striking campaign visuals, and professional social assets tailored to your audience.',
    delay: 'delay-200',
  },
  {
    num: '03',
    title: 'Website & Landing Pages',
    description:
      'Conversion-focused design and flawless development for a seamless user experience across all devices.',
    delay: 'delay-300',
  },
];

export default function Services() {
  return (
    <section className="section bg-charcoal" id="services">
      <div className="container">
        <span className="text-eyebrow fade-up">Expertise</span>
        <h2 className="text-h2 fade-up delay-100" style={{ marginTop: '16px' }}>
          What we do
        </h2>

        <div className="grid services-grid">
          {services.map((service) => (
            <div
              key={service.num}
              className={`service-card fade-up ${service.delay}`}
            >
              <div className="service-num">{service.num}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
