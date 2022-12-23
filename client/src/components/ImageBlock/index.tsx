import { useState } from 'react'
import { useQuery } from 'react-query'

import { ContentReference, getImage, Image } from '../../firebase/functions'
import { CustomModal } from '../'

import './styles.scss'

interface ImageBlockProps {
	value: ContentReference
}

export default function ImageBlock({ value }: ImageBlockProps) {
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const { data, isLoading, error } = useQuery<Image, Error>(`image-${value.id}`, () => getImage(value))

	if (isLoading) return <></>
	if (error) return <></>
	if (!data) return <></>

	return (
		<>
			{modalOpen ? (
				<CustomModal close={() => setModalOpen(false)}>
					<figure className="d-flex justify-content-center">
						<img
							src={data?.image}
							title={data?.title}
							alt={data?.title}
							className="img-fluid shadow-2-strong"
						/>
					</figure>
				</CustomModal>
			) : <></>}
			<figure onClick={() => setModalOpen(true)} className="image-block d-flex justify-content-center w-25">
				<img
					src={data?.image}
					title={data?.title}
					alt={data?.title}
					className="img-fluid shadow-2-strong"
				/>
				<i className="fas fa-3x fa-search-plus"></i>
			</figure>
		</>
	)
}
