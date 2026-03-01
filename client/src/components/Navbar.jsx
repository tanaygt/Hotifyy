import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
            // active nav
            const sections = ['collection', 'how-it-works', 'outfits', 'social', 'why'];
            let current = '';
            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el && window.scrollY >= el.offsetTop - 150) current = id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({ top: el.offsetTop - 78, behavior: 'smooth' });
        }
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        const next = !menuOpen;
        setMenuOpen(next);
        document.body.style.overflow = next ? 'hidden' : '';
    };

    const navLinks = [
        { id: 'collection', label: 'Collection' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'outfits', label: 'Outfits' },
        { id: 'social', label: 'Lookbook' },
        { id: 'why', label: 'Why Us' },
    ];

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar" role="navigation">
                <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <span className="logo-text">Hotify</span>
                    <span className="logo-tag">Bhopal · India</span>
                </a>

                <ul className="nav-links" role="list">
                    {navLinks.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="#contact" className="btn btn-primary btn-sm nav-cta"
                    onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                    Book Your Look
                </a>

                <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={toggleMenu}
                    aria-label="Toggle menu" aria-expanded={menuOpen}>
                    <span /><span /><span />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
                <button className="close-btn" onClick={toggleMenu} aria-label="Close menu">✕</button>
                {navLinks.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
                        {label}
                    </a>
                ))}
                <a href="#contact" className="btn btn-primary" style={{ marginTop: '1rem' }}
                    onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
                    Book Your Look
                </a>
            </div>
        </>
    );
}
