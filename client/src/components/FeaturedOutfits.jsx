import React, { useState, useEffect, useCallback } from 'react';

// Fallback static data if API unavailable
const FALLBACK_OUTFITS = [
    { _id: '1', name: 'Ivory Gold Bridal Lehenga', occasion: 'Wedding · Bridal', occasions: ['wedding', 'bridal'], sizes: ['S', 'M', 'L', 'XL'], price: 8500, pricePer: 'per 3 days', image: '/assets/outfit1.png', tag: 'New' },
    { _id: '2', name: 'Rose Petal Bridal Lehenga', occasion: 'Wedding', occasions: ['wedding'], sizes: ['XS', 'S', 'M', 'L'], price: 6500, pricePer: 'per 3 days', image: '/assets/wedding_collection.png', tag: 'Trending' },
    { _id: '3', name: 'Emerald Sequin Gown', occasion: 'Party · Club', occasions: ['party'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 3200, pricePer: 'per 2 days', image: '/assets/womens_glam.png', tag: 'Hot Pick' },
    { _id: '4', name: 'Golden Crop Lehenga Set', occasion: 'Party · Reception', occasions: ['party', 'reception'], sizes: ['M', 'L', 'XL'], price: 4800, pricePer: 'per 2 days', image: '/assets/party_wear.png', tag: 'Popular' },
    { _id: '5', name: 'Pink Festive Anarkali', occasion: 'Festive · Pooja', occasions: ['festive'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: 2800, pricePer: 'per 2 days', image: '/assets/festive_special.png', tag: 'Bestseller' },
    { _id: '6', name: 'Pearl White Bridal Ensemble', occasion: 'Wedding · Reception', occasions: ['wedding'], sizes: ['XS', 'S', 'M'], price: 12000, pricePer: 'per 3 days', image: '/assets/hero.png', tag: 'Premium' },
    { _id: '7', name: 'Royal Gold Sherwani', occasion: 'Wedding · Groom', occasions: ['wedding'], sizes: ['S', 'M', 'L'], price: 9500, pricePer: 'per 3 days', image: '/assets/mens_royal.png', tag: "Men's" },
    { _id: '8', name: 'Festive Multi-Colour Set', occasion: 'Party · Festive', occasions: ['party', 'festive'], sizes: ['S', 'M', 'L', 'XL'], price: 3800, pricePer: 'per 2 days', image: '/assets/customer_testimonial.png', tag: 'New' },
];

function OutfitCard({ outfit, onBook }) {
    const [wished, setWished] = useState(false);
    const [activeSize, setActiveSize] = useState(outfit.sizes?.[0] || '');

    return (
        <div className="outfit-card">
            <div className="outfit-img">
                <img src={outfit.image} alt={outfit.name} loading="lazy" />
                {outfit.tag && <span className="outfit-tag">{outfit.tag}</span>}
                <button
                    className={`outfit-wish${wished ? ' wished' : ''}`}
                    aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    onClick={() => setWished((w) => !w)}
                >
                    {wished ? '♥' : '♡'}
                </button>
            </div>
            <div className="outfit-info">
                <div className="outfit-name">{outfit.name}</div>
                <div className="outfit-occasion">{outfit.occasion}</div>
                <div className="outfit-sizes">
                    {outfit.sizes?.map((s) => (
                        <div
                            key={s}
                            className={`size-dot${activeSize === s ? ' active' : ''}`}
                            onClick={() => setActiveSize(s)}
                        >
                            {s}
                        </div>
                    ))}
                </div>
                <div className="outfit-footer">
                    <div className="outfit-price">
                        <span className="price-amount">₹{outfit.price?.toLocaleString('en-IN')}</span>
                        <span className="price-label">{outfit.pricePer}</span>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => onBook()}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function FeaturedOutfits() {
    const [outfits, setOutfits] = useState(FALLBACK_OUTFITS);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ occasion: '', size: '', budget: '' });

    const fetchOutfits = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.occasion) params.set('occasion', filters.occasion);
            if (filters.size) params.set('size', filters.size);
            if (filters.budget) params.set('budget', filters.budget);

            const res = await fetch(`/api/outfits?${params.toString()}`);
            if (!res.ok) throw new Error('API error');
            const json = await res.json();
            if (json.success) {
                // Use API data if available, else keep fallback
                setOutfits(json.data.length > 0 ? json.data : FALLBACK_OUTFITS);
            }
        } catch {
            // API unavailable — show static fallback data
            setOutfits(FALLBACK_OUTFITS);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => { fetchOutfits(); }, [fetchOutfits]);

    const handleFilter = (key, value) =>
        setFilters((f) => ({ ...f, [key]: value }));

    const scrollToContact = () => {
        const el = document.getElementById('contact');
        if (el) window.scrollTo({ top: el.offsetTop - 78, behavior: 'smooth' });
    };

    return (
        <section className="section featured-outfits" id="outfits">
            <div className="container">
                <div className="section-head text-center reveal">
                    <span className="section-label">Featured Pieces</span>
                    <h2 className="section-title">Curated For You</h2>
                    <p className="section-sub" style={{ marginTop: '0.75rem' }}>
                        Every outfit is sanitized, styled, and ready to slay.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="filter-bar reveal">
                    <span className="filter-label">Filter by:</span>

                    <select
                        className="filter-select"
                        id="filter-occasion"
                        value={filters.occasion}
                        onChange={(e) => handleFilter('occasion', e.target.value)}
                        aria-label="Filter by occasion"
                    >
                        <option value="">All Occasions</option>
                        <option value="wedding">Wedding</option>
                        <option value="party">Party</option>
                        <option value="festive">Festive</option>
                        <option value="reception">Reception</option>
                    </select>

                    <select
                        className="filter-select"
                        id="filter-size"
                        value={filters.size}
                        onChange={(e) => handleFilter('size', e.target.value)}
                        aria-label="Filter by size"
                    >
                        <option value="">All Sizes</option>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>

                    <select
                        className="filter-select"
                        id="filter-budget"
                        value={filters.budget}
                        onChange={(e) => handleFilter('budget', e.target.value)}
                        aria-label="Filter by budget"
                    >
                        <option value="">Any Budget</option>
                        <option value="0-2000">Under ₹2,000</option>
                        <option value="2000-5000">₹2,000 – ₹5,000</option>
                        <option value="5000-10000">₹5,000 – ₹10,000</option>
                        <option value="10000-999999">Above ₹10,000</option>
                    </select>
                </div>

                {/* Outfits Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sub)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌸</div>
                        Loading outfits…
                    </div>
                ) : outfits.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sub)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                        No outfits match your filters. Try changing the selection!
                    </div>
                ) : (
                    <div className="outfits-grid reveal">
                        {outfits.map((outfit) => (
                            <OutfitCard key={outfit._id} outfit={outfit} onBook={scrollToContact} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
