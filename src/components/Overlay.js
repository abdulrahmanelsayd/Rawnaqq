import { config } from '../data'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

export function Overlay() {
    const scroll = useScroll()
    const [opacity, setOpacity] = useState(1)

    useFrame(() => {
        setOpacity(1 - scroll.range(0, 1 / 4))
    })

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '85vh',
            pointerEvents: 'none',
            opacity: opacity,
            transition: 'opacity 0.1s ease-out',
            fontFamily: '"Cinzel", serif'
        }}>
            <div style={{
                position: 'absolute',
                top: '10vh',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 'clamp(2rem, 10vw, 4rem)',
                fontWeight: '400',
                letterSpacing: '0.2em',
                color: '#1d1d1f',
                textAlign: 'center',
                whiteSpace: 'nowrap'
            }}>
                {config.brand.name}
                <div style={{
                    fontSize: 'clamp(0.7rem, 3vw, 1rem)',
                    letterSpacing: '0.3em',
                    marginTop: '0.5rem',
                    color: '#86868b',
                    fontFamily: '"Inter", sans-serif',
                    textTransform: 'uppercase'
                }}>
                    {config.brand.heroSubtitle}
                </div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '5vh',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#86868b',
                fontFamily: '"Inter", sans-serif',
                opacity: 0.8
            }}>
                Scroll to Explore
            </div>
        </div>
    )
}
