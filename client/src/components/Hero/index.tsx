import { useQuery } from 'react-query'

import { Image, getImage, ContentReference } from '../../firebase/functions'
import './styles.scss'


import { Meta } from '../'

interface HeroProps {
	id: string
	title?: string
	intro?: string
	imageRef?: ContentReference
	textLoading: boolean
}

export default function Hero({ id, title, intro, imageRef, textLoading }: HeroProps) {
	const ref: ContentReference = imageRef || { id: '' }
	const { data, isLoading, error } = useQuery<Image, Error>(`hero-${id}`, () => getImage(ref))

	return (
		<>
			<Meta title={title} description={intro} image={data?.image} />
			<div
				className="hero p-5 text-center bg-image"
				style={!isLoading && !error && data?.image ? {
					backgroundImage: `url('${data.image}')`
				} : {}}
			>
				<div className="hero-content mask">
					<div className="d-flex justify-content-center align-items-center h-100">
						<div className="hero-text-wrapper">
							{title ? (
								<h1 className="mb-3">{title}</h1>
							) : textLoading ? (
								<span className="placeholder-glow justify-content-center align-items-center">
									<h1 className="mb-3 placeholder w-25 d-block mx-auto rounded"></h1>
								</span>
							) : <></>}
							{intro ? (
								<h4 className="mb-3">{intro}</h4>
							) : textLoading ? (
								<span className="placeholder-glow justify-content-center align-items-center">
									<h4 className="mb-3 placeholder w-75 d-block mx-auto rounded"></h4>
									<h4 className="mb-3 placeholder w-50 d-block mx-auto rounded"></h4>
								</span >
							) : <></>}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
