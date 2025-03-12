
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
