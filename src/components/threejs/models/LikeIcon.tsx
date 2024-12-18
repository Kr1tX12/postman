import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


export default function LikeIcon(props) {
  const { nodes, materials } = useGLTF('/like_button.glb')

  const model = useRef(null);

  useGSAP(() => {
    if (model.current) {
        gsap
        .to(model.current.rotation, {
            x: 4,
            y: 4,

            duration: 2,
            repeatDelay: 2,
            repeat: -1,
            yoyo:  true,
            ease: 'expo.inOut'
        });
    }
  }, []);

  return (
    <Float intensity={1}>
        <group {...props} dispose={null} ref={model}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials['Material.001']}
                />
                <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_3.geometry}
                material={materials['Material.002']}
                />
            </group>
        </group>
    </Float>
  )
}

useGLTF.preload('/like_button.glb')
