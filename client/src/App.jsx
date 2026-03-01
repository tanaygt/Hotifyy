import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingCollection from './components/TrendingCollection';
import HowItWorks from './components/HowItWorks';
import FeaturedOutfits from './components/FeaturedOutfits';
import SocialProof from './components/SocialProof';
import WhyHotify from './components/WhyHotify';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

export default function App() {
    // Scroll reveal via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        revealEls.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <TrendingCollection />
                <HowItWorks />
                <FeaturedOutfits />
                <SocialProof />
                <WhyHotify />
                <ContactSection />
            </main>
            <Footer />
            <WhatsAppFloat />
        </>
    );
}
