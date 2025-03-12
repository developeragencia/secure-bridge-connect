
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Methodology from '@/components/Methodology';
import Technology from '@/components/Technology';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Features />
      <Methodology />
      <Technology />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
