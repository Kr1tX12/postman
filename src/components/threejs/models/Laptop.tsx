import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Laptop(props) {
  const { nodes, materials } = useGLTF('/laptop.glb')
  const model = useRef();

  useFrame(() => {
    if (model.current) {
        model.current.rotation.y += 0.001;
        model.current.rotation.x += 0.001;
        model.current.rotation.z += 0.001;
    }
  });
  return (
    <Float intensity={1}>
        <group {...props} dispose={null} ref={model}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials.Buttons}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3.geometry}
                material={materials.screen}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.Material}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials.Metal}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.Keyboard}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_7.geometry}
                material={materials.Keyboard}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_8.geometry}
                material={materials.Keyboard}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_9.geometry}
                material={materials.LabTop_Base}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials.LabTop_Base}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_11.geometry}
                material={materials.Mouse_PAD}
                />
            </group>
        </group>
    </Float>
  )
}

useGLTF.preload('/laptop.glb')