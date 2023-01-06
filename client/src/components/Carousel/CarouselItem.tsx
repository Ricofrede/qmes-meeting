import { useState } from 'react'
import { useQuery } from 'react-query'

import { ContentReference, getImage, Image } from '../../firebase/functions'
import { CustomModal } from '../'

import './styles.scss'

interface CarouselItemProps {
    imageRef: ContentReference
    startActive?: boolean
}

export default function CarouselItem({ imageRef, startActive }: CarouselItemProps) {
    const { data, isLoading, error } = useQuery<Image, Error>(`carausel-image-${imageRef.id}`, () => getImage(imageRef))

    if (isLoading) return <></>
    if (error) return <></>
    if (!data) return <></>

    return (
        <>
            <div className={`carousel-item ${startActive ? 'active' : ''}`}>
                <img src={data?.image} className="d-block" alt={data?.title} />
                <div className="carousel-caption">
                    <p>{data?.caption}</p>
                </div>
            </div>
        </>
    )
}
