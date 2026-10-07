import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import WhatWeCover from './components/WhatWeCover.jsx';
import Services from './components/Services.jsx';
import GettingStarted from './components/GettingStarted.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatWeCover />
        <Services />
        <GettingStarted />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
