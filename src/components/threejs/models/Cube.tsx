import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'

export default function Cube(props) {
  const { nodes } = useGLTF('/rounded_cube.glb')

  // Optionally override the material if needed
  const cubeMaterial = new MeshStandardMaterial({
    color: props.color || 'white', // Use the color from the original material
    metalness: 0.5, // Adjust metalness as needed
    roughness: 0.5, // Adjust roughness as needed
  })

  return (
    <Float intensity={2}>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={cubeMaterial} // Use the new material
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </Float>
  )
}