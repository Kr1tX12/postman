import { Html, useProgress } from '@react-three/drei'
import React from 'react'

const CanvasLoader = () => {
    const { progress } = useProgress()
    return (
        <Html
            as='div'
            center
            className='flex justify-center items-center flex-col'
        >
            <span className='canvas-loader'></span>
        </Html>
    )
}

export default CanvasLoader