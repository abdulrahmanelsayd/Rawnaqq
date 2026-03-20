import React, { useState, useMemo } from 'react';
import { config } from '../data';
import { ProductCard } from './ProductCard';
import './ProductList.css';

export function ProductList() {
    const { products, contact } = config;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');

    const handleBuy = (productName, productSize) => {
        const message = `مرحبا، أود طلب عطر ${productName} (${productSize}).`;
        window.open(`${contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
            );
        }

        if (sortBy === 'priceDesc') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''), 10);
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''), 10);
                return priceB - priceA;
            });
        } else if (sortBy === 'priceAsc') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^\d]/g, ''), 10);
                const priceB = parseInt(b.price.replace(/[^\d]/g, ''), 10);
                return priceA - priceB;
            });
        }

        return result;
    }, [products, searchQuery, sortBy]);

    const sortOptions = [
        { id: 'default', label: 'الكل' },
        { id: 'priceDesc', label: 'الأعلى سعراً' },
        { id: 'priceAsc', label: 'الأقل سعراً' }
    ];

    return (
        <section className="products-section">
            <header className="products-header">
                <h2 className="products-title">مجموعتنا الخاصة</h2>
                <div className="products-divider" />
            </header>

            <div className="search-filter-container">
                <div className="search-input-wrapper">
                    <svg className="search-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="ابحث عن عطرك المفضل..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-pills-container">
                    {sortOptions.map((option) => (
                        <button
                            key={option.id}
                            className={`filter-pill ${sortBy === option.id ? 'active' : ''}`}
                            onClick={() => setSortBy(option.id)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid">
                {filteredAndSortedProducts.length > 0 ? (
                    filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onBuy={handleBuy} />
                    ))
                ) : (
                    <div className="no-results">
                        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1" fill="none" style={{ opacity: 0.3 }}>
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <span>لا توجد نتائج مطابقة لبحثك</span>
                    </div>
                )}
            </div>
        </section>
    );
}
