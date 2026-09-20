import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyContactBar from "./components/StickyBar";

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 pb-16">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <StickyContactBar />
    </div>
  );
}