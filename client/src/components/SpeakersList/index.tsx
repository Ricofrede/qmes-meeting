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

		const speakersInChunks: Speaker[][] = []
		speakers.forEach((speaker, index) => {
			if (index % 2 !== 0) {
				speakersInChunks.push(
					speakers.slice(index - 1, index + 1)
				)
			}
		})

		return speakersInChunks?.map(speakersChunk => {
			return (
				<>
					<div className="speakersList-line row">
						{renderSpeakerLine(speakersChunk)}
					</div>
				</>
			)
		})

	}

	function renderSpeakerLine(speakers: Speaker[]) {
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
