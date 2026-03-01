import React from 'react';

const FEATURES = [
    { icon: '♻️', title: 'Sustainable Fashion', desc: 'Every rental reduces fashion waste. Wear premium, stay guilt-free.' },
    { icon: '💎', title: 'Affordable Luxury', desc: 'Rent designer pieces starting at ₹999. Save 90% vs. buying.' },
    { icon: '🧼', title: 'Hygienic & Sanitized', desc: 'Every outfit is professionally cleaned and sanitized before delivery.' },
    { icon: '🌟', title: 'No Repetition Stress', desc: 'New outfit for every occasion. Never wear the same look twice.' },
    { icon: '🚚', title: 'Free Delivery in Bhopal', desc: 'Order by 5PM for next-day delivery. Free pickup included.' },
];

export default function WhyHotify() {
    return (
        <section className="section why-hotify" id="why">
            <div className="container">
                <div className="why-inner">
                    <div className="why-image reveal-left">
                        <img src="/assets/outfit1.png" alt="Hotify premium bridal collection" loading="lazy" />
                        <div className="why-image-badge">
                            <div className="badge-number">₹99</div>
                            <div className="badge-text">Slay from as low as</div>
                        </div>
                    </div>

                    <div className="reveal-right">
                        <span className="section-label">Our Promise</span>
                        <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
                            Luxury Without<br />the Heavy Price Tag
                        </h2>
                        <p style={{ color: 'var(--sub)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                            At Hotify, we believe every woman deserves to look extraordinary — every time, without compromise.
                        </p>

                        <div className="why-features">
                            {FEATURES.map(({ icon, title, desc }) => (
                                <div className="why-feature" key={title}>
                                    <div className="why-icon">{icon}</div>
                                    <div className="why-text">
                                        <div className="feat-title">{title}</div>
                                        <div className="feat-desc">{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
