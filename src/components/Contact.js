import { config } from '../data'

export function Contact() {
    const { contact } = config

    const linkStyle = {
        color: '#bbb',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.3s',
        margin: '0 1rem',
        outline: 'none'
    }

    return (
        <footer style={{
            backgroundColor: 'var(--color-bg-product)',
            color: '#fff',
            padding: '1rem 0',
            textAlign: 'center',
            borderTop: '1px solid #222'
        }}>
            <div style={{ marginBottom: '0.5rem' }}>
                <h4 style={{
                    color: 'var(--color-text-gold)',
                    fontFamily: '"Tajawal", sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '0',
                    letterSpacing: '0'
                }}>
                    تواصل معنا
                </h4>
            </div>

            <nav aria-label="روابط التواصل الاجتماعي" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                {contact.whatsapp && <a href={contact.whatsapp} aria-label="تواصل معنا عبر واتساب" style={linkStyle} className="hover-gold">WhatsApp</a>}
                {contact.instagram && <a href={contact.instagram} aria-label="تابعنا على انستغرام" style={linkStyle} className="hover-gold">Instagram</a>}
                {contact.facebook && <a href={contact.facebook} aria-label="تابعنا على فيسبوك" style={linkStyle} className="hover-gold">Facebook</a>}
            </nav>

            <div style={{ marginTop: '1rem', color: '#888', fontSize: '0.75rem' }}>
                © {new Date().getFullYear()} Rawnaq. All rights reserved.
            </div>

            <style>{`
        .hover-gold:hover { color: var(--color-text-gold) !important; }
      `}</style>
        </footer>
    )
}
