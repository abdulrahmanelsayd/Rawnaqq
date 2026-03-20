import React, { useState } from 'react';
import './ProductCard.css';

export function ProductCard({ product, onBuy }) {
    const [selectedSize, setSelectedSize] = useState(100);

    const basePrice = parseInt(product.price.replace(/[^\d]/g, ''), 10);

    const getPrice = (size) => {
        let multiplier = 1;
        if (size === 50) multiplier = 0.6;
        if (size === 30) multiplier = 0.45;

        return Math.floor(basePrice * multiplier) + ' جنية';
    };

    const sizes = [30, 50, 100];

    return (
        <article className="product-card">
            <div className="product-image-container">
                <div className="product-image-overlay" />
                <img
                    className="product-image"
                    src={product.image}
                    alt={`صورة عطر ${product.name}`}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                />
            </div>

            <div className="product-details">
                <h3 className="product-title">{product.name}</h3>

                <div 
                    className="product-size-selector"
                    role="group"
                    aria-label="اختيار حجم العبوة"
                >
                    {sizes.map(size => (
                        <button
                            key={size}
                            type="button"
                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                            aria-pressed={selectedSize === size}
                            aria-label={`حجم ${size} مل`}
                        >
                            {size} مل
                        </button>
                    ))}
                </div>

                <div className="product-price-container">
                    <span className="product-price">
                        {getPrice(selectedSize)}
                    </span>
                </div>

                <button
                    type="button"
                    className="buy-btn"
                    onClick={(e) => { e.stopPropagation(); onBuy(product.name, selectedSize + ' مل'); }}
                    aria-label={`شراء عطر ${product.name} بحجم ${selectedSize} مل`}
                >
                    إقتناء
                </button>
            </div>
        </article>
    );
}
