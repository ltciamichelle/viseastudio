import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientMarquee from '@/components/ClientMarquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Process from '@/components/Process';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';

export default function Home() {
  return (
    <>
      <ScrollObserver />
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <About />
        <Services />
        <Work />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
