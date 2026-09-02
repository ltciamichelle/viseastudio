const steps = [
  {
    num: '1',
    title: 'Discover',
    description: 'We dive deep into your brand, audience, and goals to build a strategic foundation.',
    delay: 'delay-100',
  },
  {
    num: '2',
    title: 'Design',
    description: 'We craft visually stunning and purposeful designs aligned with your objectives.',
    delay: 'delay-200',
  },
  {
    num: '3',
    title: 'Build',
    description: 'We develop your digital presence with clean code and seamless performance.',
    delay: 'delay-300',
  },
  {
    num: '4',
    title: 'Launch',
    description: 'We finalize, test, and hand over a polished final product ready to impress.',
    delay: 'delay-400',
  },
];

export default function Process() {
  return (
    <section className="section bg-charcoal" id="process">
      <div className="container">
        <div className="fade-up">
          <span className="text-eyebrow">Our Methodology</span>
          <h2 className="text-h2" style={{ marginTop: '16px' }}>
            How we work
          </h2>
        </div>

        <div className="process-timeline">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`process-step fade-up ${step.delay}`}
            >
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
