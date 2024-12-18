import React, { useRef } from 'react';
import { Float, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ReactIcon(props) {
  const { nodes, materials } = useGLTF('/react_logo.glb')
  const model = useRef(null);

  useGSAP(() => {
    if (model.current) {
        gsap
        .to(model.current.rotation, {
            x: 7,
            y: 7,
            z: 7,

            duration: 2,
            repeatDelay: 1,
            repeat: -1,
            yoyo:  true,
            ease: 'power2.inOut'
        });
    }
  }, []);
  
  return (
    <Float intensity={2}>
        <group {...props} dispose={null} ref={model}>
            <group scale={0.01}>
                <mesh
                castShadow
                receiveShadow
                geometry={nodes['React-Logo_Material002_0'].geometry}
                material={materials['Material.002']}
                position={[0, 7.935, 18.102]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[39.166, 39.166, 52.734]}
                />
            </group>
        </group>
    </Float>
  )
}

useGLTF.preload('/react_logo.glb')
