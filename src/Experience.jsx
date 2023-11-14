import { OrbitControls, shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import portalVertexShader from "./shaders/portal/vertex.glsl"
import testFragmentShader from "./shaders/test/fragment.glsl"
import testVertexShader from "./shaders/test/vertex.glsl"
import { useRef } from "react"

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000")
  },
  portalVertexShader,
  portalFragmentShader
)

const TestMaterial = shaderMaterial(
  testVertexShader,
  testFragmentShader
)

console.log(TestMaterial)

extend({ PortalMaterial })
extend({ TestMaterial })

function Experience() {
  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta
  })

  return <>
    <color args={ [ "#030202" ] } attach="background" />
    <OrbitControls />
    <ambientLight intensity={ 0.75 }/>

    <mesh position={ new THREE.Vector3(-1.5, 0.0, 0.0) }>
      <circleGeometry radius={ 1 } segments={ 32 }/>
      <portalMaterial ref={ portalMaterial } />
    </mesh>

    <mesh position={  new THREE.Vector3(1.5, 0.0, 0.0)  }>
      <circleGeometry radius={ 1 } segments={ 32 } />
      <meshBasicMaterial />
    </mesh>

  </>
}

export default Experience
