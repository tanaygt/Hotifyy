import React, { useEffect, useRef } from 'react';

const STATS = [
    { number: 500, label: 'Outfits' },
    { number: 1200, label: 'Happy Clients' },
    { number: 98, label: '% Satisfaction' },
    { number: 50, label: 'Designers' },
];

function animateCounter(el, target) {
    let start = 0;
    const dur = 1500;
    const inc = target / (dur / 16);
    const timer = setInterval(() => {
        start += inc;
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

export default function Hero() {
    const statsRef = useRef(null);
    const counted = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !counted.current) {
                    counted.current = true;
                    const nums = statsRef.current?.querySelectorAll('.stat-number');
                    STATS.forEach(({ number }, i) => {
                        if (nums?.[i]) animateCounter(nums[i], number);
                    });
                }
            },
            { threshold: 0.5 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 78, behavior: 'smooth' });
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <div className="hero-badge reveal">
                    <span className="dot" />
                    Now available in Bhopal · MP
                </div>

                <h1 className="hero-title reveal">
                    Don't Buy It.<br />
                    <span className="highlight">Own The Moment.</span>
                </h1>

                <p className="hero-sub reveal">
                    Premium outfits for weddings, parties &amp; unforgettable nights.
                    Curated luxury, delivered to your door.
                </p>

                <div className="hero-buttons reveal">
                    <button className="btn btn-primary" onClick={() => scrollTo('outfits')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Explore Collection
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                        Book Your Look
                    </button>
                </div>

                <div className="hero-stats reveal" ref={statsRef}>
                    {STATS.map(({ number, label }) => (
                        <div className="stat-item" key={label}>
                            <span className="stat-number">{number}+</span>
                            <span className="stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-visual">
                <div className="hero-img-wrap">
                    <img src="/assets/hero.png" alt="Glamorous designer outfits for weddings and parties" loading="eager" />
                    <div className="hero-float-badge badge-1">
                        <span className="badge-icon">✨</span>
                        <div>
                            <div className="badge-text">New Arrivals</div>
                            <div className="badge-sub">50+ this week</div>
                        </div>
                    </div>
                    <div className="hero-float-badge badge-2">
                        <span className="badge-icon">🌸</span>
                        <div>
                            <div className="badge-text">Sanitized &amp; Fresh</div>
                            <div className="badge-sub">Every outfit, always</div>
                        </div>
                    </div>
                    <div className="rent-slay-tag">Rent · Slay · Return</div>
                </div>
            </div>
        </section>
    );
}
