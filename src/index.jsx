import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from "@react-three/fiber"
import Experience from './Experience.jsx'
import './style.css'

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  <Canvas>
    <Experience />
  </Canvas>
)
