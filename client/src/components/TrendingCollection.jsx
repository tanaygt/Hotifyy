import React from 'react';

const COLLECTIONS = [
    { label: 'Women', category: 'Women\'s Glam', img: '/assets/womens_glam.png', alt: 'Women\'s Glam Evening Wear' },
    { label: 'Men', category: 'Men\'s Royal', img: '/assets/mens_royal.png', alt: 'Men\'s Royal Sherwani' },
    { label: 'Bridal', category: 'Wedding Collection', img: '/assets/wedding_collection.png', alt: 'Wedding Lehenga' },
    { label: 'Party', category: 'Party Wear', img: '/assets/party_wear.png', alt: 'Party Wear Outfits' },
    { label: 'Festive', category: 'Festive Specials', img: '/assets/festive_special.png', alt: 'Festive Anarkali' },
];

export default function TrendingCollection() {
    const scrollToOutfits = () => {
        const el = document.getElementById('outfits');
        if (el) window.scrollTo({ top: el.offsetTop - 78, behavior: 'smooth' });
    };

    return (
        <section className="section trending" id="collection">
            <div className="container">
                <div className="section-head text-center reveal">
                    <span className="section-label">What's Hot Right Now</span>
                    <h2 className="section-title">This Week's Hot Picks</h2>
                    <p className="section-sub" style={{ marginTop: '0.75rem' }}>
                        From elegant bridal lehengas to dazzling party wear — find your perfect look.
                    </p>
                </div>

                <div className="collection-grid">
                    {COLLECTIONS.map(({ label, category, img, alt }) => (
                        <div className="col-card reveal" key={label} onClick={scrollToOutfits} style={{ cursor: 'pointer' }}>
                            <span className="col-label">{label}</span>
                            <img src={img} alt={alt} loading="lazy" />
                            <div className="col-card-overlay">
                                <div className="col-card-title">{category}</div>
                                <button
                                    className="btn btn-sm"
                                    style={{ background: 'white', color: 'var(--pink)', fontSize: '0.75rem', padding: '0.45rem 1rem' }}
                                    onClick={scrollToOutfits}
                                >
                                    View Collection
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
