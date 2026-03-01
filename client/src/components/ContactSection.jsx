import React, { useState } from 'react';

const INITIAL_FORM = { name: '', phone: '', occasion: '', eventDate: '', budget: '', color: '', preference: '' };

export default function ContactSection() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                setStatus('success');
                setForm(INITIAL_FORM);
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="section contact-section" id="contact">
            <div className="container">
                <div className="section-head text-center reveal" style={{ marginBottom: '2.5rem' }}>
                    <span className="section-label">Get In Touch</span>
                    <h2 className="section-title">Let's Plan Your Look</h2>
                    <p className="section-sub" style={{ marginTop: '0.75rem' }}>
                        Fill out the form and we'll get back to you within 2 hours.
                    </p>
                </div>

                <div className="contact-inner">
                    {/* Info */}
                    <div className="contact-info reveal-left">
                        {[
                            { icon: '📍', label: 'Visit Us', value: 'Hotify Studio, Bhopal', sub: 'Madhya Pradesh, India — 462001' },
                            { icon: '📞', label: 'Call / WhatsApp', value: '+91 98765 43210', sub: 'Mon – Sun, 10AM to 8PM' },
                            { icon: '✉️', label: 'Email', value: 'hello@hotify.in', sub: 'We reply within 2 hours' },
                            { icon: '🕐', label: 'Hours', value: '10:00 AM – 8:00 PM', sub: 'Open all 7 days' },
                        ].map(({ icon, label, value, sub }) => (
                            <div className="contact-detail" key={label}>
                                <div className="contact-icon">{icon}</div>
                                <div>
                                    <div className="contact-detail-label">{label}</div>
                                    <div className="contact-detail-value">{value}</div>
                                    <div className="contact-detail-sub">{sub}</div>
                                </div>
                            </div>
                        ))}

                        <div className="contact-social">
                            <a href="https://instagram.com/hotify.in" className="social-btn insta"
                                target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                @hotify.in
                            </a>
                            <a href="https://wa.me/916375091699" className="social-btn whatsapp"
                                target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="reveal-right">
                        <div className="booking-form">
                            <div className="form-title">Check Availability</div>
                            <div className="form-sub">Tell us about your event and we'll curate the perfect look.</div>

                            {status === 'success' && (
                                <div style={{
                                    background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '10px',
                                    padding: '1rem', marginBottom: '1.2rem', color: '#16a34a', fontWeight: 600, fontSize: '0.9rem'
                                }}>
                                    ✓ Inquiry sent! We'll reach out within 2 hours. 🌸
                                </div>
                            )}
                            {status === 'error' && (
                                <div style={{
                                    background: '#fff1f2', border: '1.5px solid #fda4af', borderRadius: '10px',
                                    padding: '1rem', marginBottom: '1.2rem', color: '#e11d48', fontWeight: 600, fontSize: '0.9rem'
                                }}>
                                    Something went wrong. Please WhatsApp us directly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="f-name">Your Name</label>
                                        <input id="f-name" name="name" type="text" placeholder="Priya Sharma"
                                            value={form.name} onChange={handleChange} required autoComplete="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="f-phone">Phone Number</label>
                                        <input id="f-phone" name="phone" type="tel" placeholder="+91 98765 43210"
                                            value={form.phone} onChange={handleChange} required autoComplete="tel" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="f-occasion">Occasion</label>
                                        <select id="f-occasion" name="occasion" value={form.occasion} onChange={handleChange} required>
                                            <option value="">Select Occasion</option>
                                            {['Wedding', 'Reception', 'Party / Club', 'Festive / Pooja', 'Engagement', 'Corporate Event', 'Other'].map((o) => (
                                                <option key={o}>{o}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="f-date">Event Date</label>
                                        <input id="f-date" name="eventDate" type="date"
                                            value={form.eventDate} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="f-budget">Your Budget</label>
                                        <select id="f-budget" name="budget" value={form.budget} onChange={handleChange}>
                                            <option value="">Select Budget</option>
                                            {['Under ₹2,000', '₹2,000 – ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000'].map((b) => (
                                                <option key={b}>{b}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="f-color">Preferred Color</label>
                                        <select id="f-color" name="color" value={form.color} onChange={handleChange}>
                                            <option value="">Any Color</option>
                                            {['Pink / Rose', 'Red / Crimson', 'Blue / Royal', 'Green / Emerald', 'Gold / Ivory', 'Black', 'Pastel Tones'].map((c) => (
                                                <option key={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group full">
                                        <label htmlFor="f-pref">Outfit Preference</label>
                                        <textarea id="f-pref" name="preference" rows="3"
                                            placeholder="e.g. 'Looking for a heavy pink lehenga for a wedding, size M…'"
                                            value={form.preference} onChange={handleChange} />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary form-submit"
                                    disabled={status === 'loading'}>
                                    {status === 'loading' ? (
                                        'Sending…'
                                    ) : (
                                        <>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                            </svg>
                                            Check Availability
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
