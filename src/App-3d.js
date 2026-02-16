import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Scroll, AdaptiveDpr } from '@react-three/drei'
import { easing } from 'maath'
import './util'
import { Overlay } from './components/Overlay'
import { config } from './data'
import { ProductList } from './components/ProductList'
import { Contact } from './components/Contact'

const Lights = () => (
  <>
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    <pointLight position={[-10, -10, -10]} intensity={0.5} />
  </>
)

export const App = () => {
  const [pages, setPages] = useState(0)
  const contentRef = useRef()

  useEffect(() => {
    const updatePages = () => {
      if (!contentRef.current) return
      const contentHeight = contentRef.current.getBoundingClientRect().height
      const viewportHeight = window.innerHeight
      const totalNeededHeight = contentHeight + (viewportHeight * 0.85)
      const precisePages = totalNeededHeight / viewportHeight
      setPages(Math.max(precisePages + 1, 4))
    }
    updatePages()
    const observer = new ResizeObserver(updatePages)
    if (contentRef.current) observer.observe(contentRef.current)
    window.addEventListener('resize', updatePages)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updatePages)
    }
  }, [])

  return (
    <Canvas
      dpr={1}
      gl={{ antialias: false, powerPreference: "high-performance", stencil: false, depth: false, alpha: false }}
      camera={{ position: [0, 0, 100], fov: 15 }}
      performance={{ min: 0.5 }}
      frameloop="demand"
    >
      <AdaptiveDpr pixelated />
      <color attach="background" args={['#F5F5F7']} />

      <ScrollControls
        pages={pages}
        damping={0.1}
        infinite={false}
      >
        <Rig rotation={[0, 0, 0]}>
          <Carousel />
        </Rig>
        <Banner position={[0, -0.15, 0]} />
        <Scroll html style={{ width: '100%', height: '100%' }}>
          <Overlay />
          <div ref={contentRef} style={{ position: 'absolute', top: '85vh', width: '100%' }}>
            <ProductList />
            <Contact />
          </div>
        </Scroll>
      </ScrollControls>

      <Lights />
    </Canvas >
  )
}

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    const isVisible = scroll.offset < 0.18 // Slightly tighter threshold
    ref.current.visible = isVisible

    const targetColor = isVisible ? '#F5F5F7' : '#080808'
    easing.dampC(state.scene.background, targetColor, 0.2, delta)
    if (state.scene.fog) {
      easing.dampC(state.scene.fog.color, targetColor, 0.2, delta)
    }

    if (!isVisible) return

    ref.current.rotation.y = (-scroll.offset * (Math.PI * 2)) + (state.clock.elapsedTime * 0.05)

    state.events.update()
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.25, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={ref} {...props} />
}

function Carousel({ count = 8 }) {
  const { width, height } = useThree((state) => state.viewport)

  const radius = Math.min(1.4, width / 2.5)

  const yOffset = width < 5 ? 0 : 0 // Keep centered for now

  const images = config.carousel || []
  const countToUse = images.length || count

  return images.map((imgUrl, i) => (
    <Card
      key={i}
      url={imgUrl}
      position={[
        Math.sin((i / countToUse) * Math.PI * 2) * radius,
        yOffset,
        Math.cos((i / countToUse) * Math.PI * 2) * radius
      ]}
      rotation={[0, Math.PI + (i / countToUse) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    if (!ref.current) return
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (
    <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      <bentPlaneGeometry args={[0.1, 1, 1, 8, 8]} />
    </Image>
  )
}

function Banner(props) {
  const ref = useRef()
  const scroll = useScroll()
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#D4AF37'
    ctx.font = 'bold 60px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('RAWNAQ', 256, 64)
    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.anisotropy = 4
    return tex
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    const isVisible = scroll.offset < 0.2
    ref.current.visible = isVisible
    if (!isVisible) return
    ref.current.material.time.value += Math.abs(scroll.delta) * 2
    ref.current.material.map.offset.x += delta / 2
  })

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 64, 8, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={4}
        map-repeat={[8, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
        transparent
      />
    </mesh>
  )
}
