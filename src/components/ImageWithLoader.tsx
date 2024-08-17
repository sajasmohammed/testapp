import React, { useState } from 'react'
import SkeletenLoader from './SkeletenLoader'
import Image from 'next/image'

interface props{
    src:string,
    alt:string,
    className?:string,
    width?:number,
    height?:number
}
export default function ImageWithLoader({ src, alt, className, width, height}:props) {
    const [loading, setloading] = useState(true)
    return (
        <>
            {
                loading && <SkeletenLoader />
            }
            <Image src={src} alt={alt} className={className} width={width??300} height={height??300}   loading='lazy' onLoad={() => setloading(false)}
                style={loading ? { display: 'none !importend' } : {}}
            />
        </>
    )
}
