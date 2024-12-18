'use client'

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import CanvasLoader from './CanvasLoader';
import Cube from './models/Cube';
import ReactIcon from './models/ReactIcon';
import LikeIcon from './models/LikeIcon';
import Laptop from './models/Laptop';

const HomePageBackground = () => {

  return (
    <Canvas className="w-full h-full">
      <Suspense fallback={<CanvasLoader />}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
        <ambientLight intensity={2} />
        <directionalLight intensity={3} position={[5, 5, 5]} />

        <Cube position={[27, -7, 0]} scale={1.5} color="#bfd0f5" />
        <ReactIcon position={[-27, -7, 0]} />
        <LikeIcon position={[23, 7, 0]} />
        <Laptop position={[-23, 7, 0]} rotation={[0, 1.5, 1]} />

      </Suspense>
    </Canvas>
  );
};

export default HomePageBackground;