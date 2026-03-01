import React from 'react';

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 78, behavior: 'smooth' });
};

export default function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <div className="logo-text">Hotify</div>
                        <p>Premium fashion rental for every occasion. Based in Bhopal, India.</p>
                        <div style={{ fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                            RENT · SLAY · RETURN
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Collections</h4>
                        <ul>
                            {['Women\'s Glam', 'Men\'s Royal', 'Bridal Wear', 'Party Wear', 'Festive Specials'].map((item) => (
                                <li key={item}><a href="#outfits" onClick={(e) => { e.preventDefault(); scrollTo('outfits'); }}>{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            {[['Why Hotify', 'why'], ['How It Works', 'how-it-works'], ['Lookbook', 'social'], ['Contact Us', 'contact']].map(([label, id]) => (
                                <li key={label}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Book an Outfit</a></li>
                            <li><a href="https://wa.me/916375091699" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
                            <li><a href="mailto:ashishhotify@gmail.com">Email Support</a></li>
                            <li><a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollTo('how-it-works'); }}>Return Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 <span>Hotify</span>. All rights reserved. Made with ♥ in Bhopal, India.</p>
                    <p>Fashion Rental · Bhopal · MP · India</p>
                </div>
            </div>
        </footer>
    );
}
