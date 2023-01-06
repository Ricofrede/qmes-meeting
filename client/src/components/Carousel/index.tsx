import { useQuery } from 'react-query'
import { Speaker, getSpeakers, ContentReference } from '../../firebase/functions'
import CarouselItem from './CarouselItem'
import './styles.scss'

interface CarouselProps {
	images?: ContentReference[]
}

export default function Carousel({ images }: CarouselProps) {

	function renderCarousel() {
		return images?.map((imageRef, index) => {
			return (
				<CarouselItem key={`carousel-image-${index}`} imageRef={imageRef} startActive={index === 0} />
			)
		})

	}

	return (
		<div id="carouselExample" className="carousel slide">
			<div className="carousel-inner">
				{renderCarousel()}
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>


	)
}