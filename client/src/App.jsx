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
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        const observeNewElements = () => {
            const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right:not(.visible)');
            revealEls.forEach((el) => observer.observe(el));
        };

        // Initial observation
        observeNewElements();

        // Watch for new elements being added to the DOM (e.g. after API fetch)
        const mutationObserver = new MutationObserver(observeNewElements);
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
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
