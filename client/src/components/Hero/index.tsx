import { useQuery } from 'react-query'

import { Image, getImage, ContentReference } from '../../firebase/functions'
import './styles.scss'
import logo from '../../assets/imgs/logo-w.svg'

import { Meta } from '../'

interface HeroProps {
	id: string
	title?: string
	intro?: string
	imageRef?: ContentReference
}

export default function Hero({ id, title, intro, imageRef }: HeroProps) {
	const ref: ContentReference = imageRef || { id: '' }
	const { data, isLoading, error } = useQuery<Image, Error>(`hero-${id}`, () => getImage(ref))

	return (
		<>
			<Meta title={title} description={intro} image={data?.image} />
			{id === 'home' ? (
				<img
					src={logo}
					alt="Your SVG"
					style={{
						maxWidth: "calc(100 % - 40px)",
						margin: 'auto',
						maxHeight: '100vh',
						display: 'block'
					}}
				/>
			) : (
				<div
					className="hero p-5 text-center bg-image"
					style={{
						backgroundImage: data?.image ? `url('${data.image}')` : ''
					}}
				>
					{title || intro ? (
						<div className="hero-content mask">
							<div className="d-flex justify-content-center align-items-center h-100">
								<div className="hero-text-wrapper">
									{title ? (
										<h1 className={intro ? 'mb-3' : 'mb-0'}>{title}</h1>
									) : <></>}
									{intro ? (
										<h4 className="mb-0">{intro}</h4>
									) : <></>}
								</div>
							</div>
						</div>
					) : <></>}
				</div>
			)}
		</>
	)
}
