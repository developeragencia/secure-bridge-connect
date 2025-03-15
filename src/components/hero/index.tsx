
import React from 'react';
import HeroHeading from './HeroHeading';
import HeroDescription from './HeroDescription';
import HeroCallToAction from './HeroCallToAction';
import DashboardCard from './DashboardCard';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20 px-6 md:px-10 bg-gradient-to-b from-primary/5 to-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <HeroHeading />
          <HeroDescription />
          <HeroCallToAction />
        </div>
        
        <DashboardCard />
      </div>
    </section>
  );
};

export default React.memo(Hero);
