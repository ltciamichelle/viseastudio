export default function About() {
  return (
    <section className="section bg-paper" id="about">
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div style={{ maxWidth: '800px' }}>
            <span className="text-eyebrow fade-up">Our Studio</span>
            <h2 className="text-h2 fade-up delay-100" style={{ marginTop: '16px' }}>
              We partner with ambitious leaders to build brands and digital experiences that inspire confidence.
            </h2>
          </div>
        </div>

        <div className="stats-row fade-up delay-200">
          <div className="stat-item">
            <h3>10+</h3>
            <p>Clients Worldwide</p>
          </div>
          <div className="stat-item">
            <h3>4</h3>
            <p>Years of Excellence</p>
          </div>
          <div className="stat-item">
            <h3>5+</h3>
            <p>Industries Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
