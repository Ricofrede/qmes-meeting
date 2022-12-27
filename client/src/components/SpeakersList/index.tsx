import { useQuery } from 'react-query'
import { Speaker, getSpeakers } from '../../firebase/functions'
import SpeakersListItem from './SpeakersListItem'
import './styles.scss'

interface SpeakersListProps {
	title?: string
}

export default function SpeakersList({ title }: SpeakersListProps) {
	const { data: speakers, isLoading, error } = useQuery<Speaker[], Error>('speakers', () => getSpeakers())

	function renderSpeakers() {
		if (isLoading) return <></>
		if (error) return <></>
		if (!speakers || !speakers.length) return <></>

		return speakers?.map((speaker, index) => {
			return (
				<SpeakersListItem key={`speakersList-card-${index}`} speaker={speaker} />
			)
		})
	}

	return (
		<div className="speakersList-wrapper container">
			{title ? <h2 className="speakersList-title">{title}</h2> : <></>}
			<div className="speakersList-cards">
				{renderSpeakers()}
			</div>
		</div>
	)
}
