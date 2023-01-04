import { useQuery } from 'react-query'
import { getImage, Image, Speaker, ContentReference } from '../../firebase/functions'
import imgPlaceholder from '../../assets/imgs/people-icon.png'


interface SpeakersListItemProps {
	speaker: Speaker
}

export default function SpeakersListItem({ speaker }: SpeakersListItemProps) {
	const imageRef: ContentReference = speaker?.image || { id: '' }
	const { data: image, isLoading, error } = useQuery<Image, Error>(`image-speaker-list-item-${speaker.image?.id}`, () => getImage(imageRef))

	function renderImage() {
		if (isLoading) return <></>
		if (error) return <></>

		const imageSrc = image?.image || imgPlaceholder
		const imageAlt = image?.caption || 'Speaker Icon'
		return (
			<img
				src={imageSrc}
				alt={imageAlt}
				className="img-fluid rounded-start"
			/>
		)
	}

	return (
		<>
			<div
				className="card mb-3"
			>
				<div className="row g-0">
					<div className="col-md-4">
						{renderImage()}
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">{speaker.name}</h5>
							<p className="card-text" style={{ fontSize: '1rem' }}>{speaker.description}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
