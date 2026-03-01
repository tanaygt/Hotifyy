import React from 'react';

const INSTA_POSTS = [
    { img: '/assets/wedding_collection.png', likes: '2,481', alt: 'Customer in Hotify bridal lehenga' },
    { img: '/assets/customer_testimonial.png', likes: '3,114', alt: 'Happy customers in Hotify outfits' },
    { img: '/assets/hero.png', likes: '1,892', alt: 'Wedding guests in Hotify' },
    { img: '/assets/party_wear.png', likes: '4,207', alt: 'Party night in Hotify' },
    { img: '/assets/festive_special.png', likes: '2,633', alt: 'Festive look from Hotify' },
    { img: '/assets/outfit1.png', likes: '5,089', alt: 'Bride in Hotify bridal wear' },
];

const REVIEWS = [
    {
        initial: 'P', name: 'Priya Sharma', city: 'Bhopal, MP · Wedding Guest',
        text: '"I rented a pink lehenga for my sister\'s wedding and received SO many compliments. The quality was exactly like buying a brand new outfit. Would choose Hotify every single time."',
    },
    {
        initial: 'A', name: 'Anjali Mehta', city: 'Bhopal, MP · Bride',
        text: '"The bridal lehenga I rented from Hotify was absolutely stunning. I felt like a queen on my most special day — and saved over ₹80,000 compared to buying! Truly a luxury experience."',
    },
    {
        initial: 'R', name: 'Ritu Joshi', city: 'Bhopal, MP · Bride\'s Sister',
        text: '"Rented outfits for my whole bridal squad and everything was perfectly coordinated and hygienic. Pickup and return was so smooth. Hotify is a game-changer for Indian fashion."',
    },
];

export default function SocialProof() {
    return (
        <section className="section social-proof" id="social">
            <div className="container">
                <div className="section-head text-center reveal">
                    <span className="section-label">Real Hotify Moments</span>
                    <h2 className="section-title">Spotted in Hotify</h2>
                </div>

                <div className="insta-grid reveal">
                    {INSTA_POSTS.map(({ img, likes, alt }) => (
                        <div className="insta-post" key={img}>
                            <img src={img} alt={alt} loading="lazy" />
                            <div className="insta-post-overlay">
                                <div className="icon">♥</div>
                                <div className="likes">{likes} likes</div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="insta-tag reveal">
                    Tag us <span>@hotify.in</span> &amp; get featured here ✨
                </p>

                <div className="reviews-grid">
                    {REVIEWS.map(({ initial, name, city, text }) => (
                        <div className="review-card reveal" key={name}>
                            <div className="review-stars">★★★★★</div>
                            <p className="review-text">{text}</p>
                            <div className="reviewer">
                                <div className="reviewer-avatar">{initial}</div>
                                <div>
                                    <div className="reviewer-name">{name}</div>
                                    <div className="reviewer-city">{city}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
