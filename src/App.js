import { useRef, useState, useEffect } from 'react'
import { config } from './data'
import { ProductList } from './components/ProductList'
import { Contact } from './components/Contact'
import './App.css'

export const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef()

  const images = config.carousel || []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      setIsVisible(scrollY < heroHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="app-container">
      {/* Hero Section */}
      <header className="hero" style={{ opacity: isVisible ? 1 : 0 }}>
        <div className="hero-content">
          <h1 className="brand-name">{config.brand.name}</h1>
          <p className="hero-subtitle">{config.brand.heroSubtitle}</p>
        </div>
        
        {/* Simple CSS Carousel */}
        <div 
          className="carousel-container" 
          role="region" 
          aria-label="معرض المنتجات"
          aria-roledescription="carousel"
        >
          <div className="carousel" aria-live="polite" aria-atomic="true">
            {images.map((img, index) => {
              const rotation = index * 45
              const isActive = index === currentSlide
              return (
                <div
                  key={index}
                  className={`carousel-slide ${isActive ? 'active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`الشريحة ${index + 1} من ${images.length}`}
                  aria-hidden={!isActive}
                  style={{
                    transform: isActive 
                      ? 'rotateY(0deg) translateZ(350px) scale(1.1)' 
                      : `rotateY(${rotation}deg) translateZ(350px)`,
                    opacity: isActive ? 1 : 0.4,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <img 
                    src={img} 
                    alt={`عطر ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll to Explore</span>
        </div>
      </header>

      {/* Product Section */}
      <main id="main-content" className="products-section">
        <ProductList />
        <Contact />
      </main>
    </div>
  )
}
