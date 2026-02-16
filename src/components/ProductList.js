import { config } from '../data'
import { useState } from 'react'

export function ProductList() {
    const { products, contact } = config

    const handleBuy = (productName, productSize) => {
        const message = `مرحبا، أود طلب عطر ${productName} (${productSize}).`
        window.open(`${contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <section style={{
            backgroundColor: 'var(--color-bg-product)',
            color: 'var(--color-text-light)',
            padding: '10vh 1rem 5vh',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: '"Tajawal", sans-serif',
            direction: 'rtl'
        }}>
            <div style={{ marginBottom: '4rem', textAlign: 'center', opacity: 0.9 }}>
                <h2 style={{
                    fontFamily: '"Tajawal", sans-serif',
                    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                    margin: 0,
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: '0',
                }}>
                    مجموعتنا الخاصة
                </h2>
                <div style={{
                    width: '60px',
                    height: '1px',
                    background: 'var(--color-text-gold)',
                    margin: '1.5rem auto 0',
                    opacity: 0.7
                }} />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem 2rem',
                width: '100%',
                maxWidth: '1400px'
            }}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onBuy={handleBuy} />
                ))}
            </div>
        </section>
    )
}

function ProductCard({ product, onBuy }) {
    const [hovered, setHovered] = useState(false)
    const [selectedSize, setSelectedSize] = useState(100)

    const basePrice = parseInt(product.price.replace(/[^\d]/g, ''))

    const getPrice = (size) => {
        let multiplier = 1
        if (size === 50) multiplier = 0.6
        if (size === 30) multiplier = 0.45

        return Math.floor(basePrice * multiplier) + ' جنية'
    }

    const sizes = [30, 50, 100]

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{
                width: '100%',
                aspectRatio: '4/5',
                backgroundColor: '#111',
                overflow: 'hidden',
                marginBottom: '2rem',
                position: 'relative',
                boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                transition: 'box-shadow 0.5s ease',
                borderRadius: '2px'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#000',
                    opacity: hovered ? 0.1 : 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 1
                }} />

                <img
                    src={product.image}
                    alt={`صورة عطر ${product.name}`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        transform: hovered ? 'scale(1.08)' : 'scale(1)'
                    }}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease'
            }}>
                <h3 style={{
                    fontFamily: '"Tajawal", sans-serif',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem',
                    color: '#fff'
                }}>
                    {product.name}
                </h3>

                <div 
                    role="group"
                    aria-label="اختيار حجم العبوة"
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    background: '#F5F5F7',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                }}>
                    {sizes.map(size => (
                        <button
                            key={size}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                            aria-pressed={selectedSize === size}
                            aria-label={`حجم ${size} مل`}
                            style={{
                                fontSize: '0.9rem',
                                color: selectedSize === size ? '#000' : '#666',
                                fontFamily: '"Tajawal", sans-serif',
                                fontWeight: selectedSize === size ? 700 : 500,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                borderBottom: selectedSize === size ? '2px solid var(--color-text-gold)' : '2px solid transparent',
                                paddingBottom: '2px',
                                background: 'none',
                                border: 'none',
                                padding: '4px 8px'
                            }}
                        >
                            {size} مل
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    flexDirection: 'row-reverse'
                }}>
                    <span style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-text-gold)',
                        fontWeight: 500,
                        fontFamily: '"Tajawal", sans-serif'
                    }}>
                        {getPrice(selectedSize)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onBuy(product.name, selectedSize + ' مل'); }}
                    aria-label={`شراء عطر ${product.name} بحجم ${selectedSize} مل`}
                    style={{
                        padding: '0.8rem 3rem',
                        border: '2px solid rgba(255,255,255,0.3)',
                        background: hovered ? '#fff' : 'transparent',
                        color: hovered ? '#000' : '#fff',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        fontFamily: '"Tajawal", sans-serif',
                        fontWeight: 500,
                        outline: 'none',
                        ':focus': {
                            outline: '2px solid var(--color-text-gold)',
                            outlineOffset: '2px'
                        }
                    }}
                >
                    إقتناء
                </button>
            </div>
        </div>
    )
}
