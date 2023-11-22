import { OrbitControls, shaderMaterial, useGLTF } from "@react-three/drei"
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

extend({ PortalMaterial })
extend({ TestMaterial })

function Experience() {
  const portalMaterial = useRef();
  // const headMaterial = useRef();
  const eye1Material = useRef();
  const eye1001Material = useRef();
  // const tongueMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta
    // headMaterial.current.uTime += delta
    eye1Material.current.uTime += delta
    eye1001Material.current.uTime += delta
    // tongueMaterial.current.uTime += delta
  })

  const model = useGLTF("./crazyhead.glb");
  console.log(model)
  const { eye1, eye1001, head, tongue } = useGLTF("./crazyhead.glb").nodes

  return <>
    <color args={ [ "#150919" ] } attach="background" />
    <OrbitControls />
    <ambientLight intensity={ 0.75 }/>
    <directionalLight position={ [2, 2, 2] } intensity={ 2.5 }/>

    <mesh position={ new THREE.Vector3(-3, 0.0, 0.0) }>
      <circleGeometry radius={ 1 } segments={ 32 }/>
      <portalMaterial ref={ portalMaterial } />
    </mesh>

    <mesh position={  new THREE.Vector3(3, 0.0, 0.0)  }>
      <circleGeometry radius={ 1 } segments={ 32 } />
      <meshStandardMaterial color={ "red" } />
    </mesh>

    
    {/* <primitive object={ crazyHead.scene }>
      <meshStandardMaterial color={"red"} />
    </primitive> */}

    <mesh 
    geometry={ head.geometry }
    position={ head.position }
    rotation={ head.rotation }
    scale={ head.scale }
    material={ head.material } >
      {/* <portalMaterial ref={ headMaterial } /> */}
      {/* <testMaterial /> */}
    </mesh>

    <mesh 
    geometry={ eye1.geometry }
    position={ eye1.position }
    rotation={ eye1.rotation }
    scale={ eye1.scale } >
      <portalMaterial ref={ eye1Material } />
      {/* <meshStandardMaterial /> */}
    </mesh>

    <mesh 
    geometry={ eye1001.geometry }
    position={ eye1001.position }
    rotation={ eye1001.rotation }
    scale={ eye1001.scale } >
      <portalMaterial ref={ eye1001Material } />
    </mesh>

    <mesh 
    geometry={ tongue.geometry }
    position={ tongue.position }
    rotation={ tongue.rotation }
    scale={ tongue.scale } >
      <meshStandardMaterial color={"pink"}/>
      {/* <testMaterial /> */}
    </mesh>
  </>
}

export default Experience
