
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import MethodologyCard from '@/components/MethodologyCard';
import Footer from '@/components/Footer';
import { useAnimationOnScroll } from '@/hooks/useAnimationOnScroll';
import { cn } from '@/lib/utils';

const Index: React.FC = () => {
  const { ref: methodologyTitleRef, classes: methodologyTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: techTitleRef, classes: techTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: contactTitleRef, classes: contactTitleClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    threshold: 0.1,
  });

  const { ref: contactFormRef, classes: contactFormClasses } = useAnimationOnScroll<HTMLDivElement>({
    transitionType: 'fade-in',
    delay: 1,
    threshold: 0.1,
  });

  const methodologies = [
    {
      title: "Backend Development",
      description: "FastAPI with SQLModel for a type-safe, high-performance API layer with automatic documentation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
          <line x1="8" x2="8" y1="16" y2="16"></line>
          <line x1="8" x2="8" y1="20" y2="20"></line>
          <line x1="12" x2="12" y1="18" y2="18"></line>
          <line x1="12" x2="12" y1="22" y2="22"></line>
          <line x1="16" x2="16" y1="16" y2="16"></line>
          <line x1="16" x2="16" y1="20" y2="20"></line>
        </svg>
      ),
    },
    {
      title: "Frontend Development",
      description: "React.js with Chakra UI for a responsive, accessible, and customizable user interface with a design system.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M7 7h10"></path>
          <path d="M7 12h10"></path>
          <path d="M7 17h10"></path>
        </svg>
      ),
    },
    {
      title: "Authentication System",
      description: "JWT with Two-Factor Authentication for enhanced security, especially for critical user profiles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <path d="M12 15v3"></path>
        </svg>
      ),
    },
    {
      title: "Infrastructure",
      description: "Docker with Redis and Celery for containerization and asynchronous processing, ensuring scalability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="8" x="3" y="14" rx="2"></rect>
          <path d="M17 2v4"></path>
          <path d="M7 2v4"></path>
          <path d="M12 14v3"></path>
          <path d="M8 22 12 17 16 22"></path>
        </svg>
      ),
    },
    {
      title: "Database Structure",
      description: "PostgreSQL with separate structures for clients, suppliers, and payments for better data management.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 12a9 3 0 0 0 18 0"></path>
          <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
        </svg>
      ),
    },
  ];
  
  const technologies = [
    { name: "FastAPI", percentage: 90 },
    { name: "SQLModel", percentage: 85 },
    { name: "PostgreSQL", percentage: 95 },
    { name: "React.js", percentage: 90 },
    { name: "Chakra UI", percentage: 85 },
    { name: "Docker", percentage: 80 },
    { name: "Redis", percentage: 75 },
    { name: "Celery", percentage: 70 },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      
      <Features />
      
      {/* Methodology Section */}
      <section id="methodology" className="py-24 px-6 md:px-10 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={methodologyTitleRef}
            className={cn(
              methodologyTitleClasses,
              "text-center mb-16"
            )}
          >
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Methodology & Technologies
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/70">
              We follow a comprehensive approach combining modern technologies and best practices
              to create secure, scalable, and maintainable applications.
            </p>
          </div>
          
          <div className="space-y-6">
            {methodologies.map((methodology, index) => (
              <MethodologyCard 
                key={index}
                title={methodology.title}
                description={methodology.description}
                icon={methodology.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Technology Stack Section */}
      <section id="technology" className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={techTitleRef}
            className={cn(
              techTitleClasses,
              "text-center mb-16"
            )}
          >
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Technology Proficiency
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/70">
              Our expertise across various technologies ensures a robust and efficient solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const { ref, classes } = useAnimationOnScroll<HTMLDivElement>({
                transitionType: 'fade-in',
                delay: ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
                threshold: 0.1,
              });
              
              return (
                <div 
                  key={index}
                  ref={ref}
                  className={cn(
                    classes,
                    "glass-card rounded-2xl p-6"
                  )}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{tech.name}</h3>
                    <span className="text-sm text-primary font-medium">{tech.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary/70 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${tech.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={contactTitleRef}
            className={cn(
              contactTitleClasses,
              "text-center mb-16"
            )}
          >
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Start Your Project Today
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/70">
              Ready to build your next project with our modern tech stack? Contact us to get started.
            </p>
          </div>
          
          <div 
            ref={contactFormRef}
            className={cn(
              contactFormClasses,
              "glass-card rounded-2xl p-8 max-w-2xl mx-auto"
            )}
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                  placeholder="Project subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
