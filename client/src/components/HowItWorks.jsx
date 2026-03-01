import React from 'react';

const STEPS = [
    { num: 1, icon: '👗', title: 'Choose Your Outfit', desc: 'Browse 500+ designer outfits. Filter by occasion, size, and budget.' },
    { num: 2, icon: '📅', title: 'Select Event Date', desc: 'Pick your delivery date. We ensure your outfit arrives fresh and pressed.' },
    { num: 3, icon: '💃', title: 'Wear & Shine', desc: 'Step out in absolute luxury. Own every room, every dance floor.' },
    { num: 4, icon: '📦', title: 'Return With Ease', desc: 'Drop off or schedule free pickup. No dry-cleaning needed — we handle it.' },
];

export default function HowItWorks() {
    return (
        <section className="section how-it-works" id="how-it-works">
            <div className="container">
                <div className="section-head text-center reveal">
                    <span className="section-label">Simple &amp; Effortless</span>
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-sub" style={{ marginTop: '0.75rem' }}>Four simple steps to your perfect look.</p>
                </div>

                <div className="steps-grid">
                    {STEPS.map(({ num, icon, title, desc }) => (
                        <div className="step-card reveal" key={num}>
                            <div className="step-icon">
                                <span>{icon}</span>
                                <div className="step-num">{num}</div>
                            </div>
                            <div className="step-title">{title}</div>
                            <p className="step-desc">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
