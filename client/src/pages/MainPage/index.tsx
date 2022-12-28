import './styles.scss'

import { useParams } from 'react-router'
import { useQuery } from 'react-query'

import { ContentReference, getPage, Page } from '../../firebase/functions'
import {
	TextBlock,
	ImageBlock,
	Hero,
	HeroLoading,
	SpeakersList,
	EventRegister
} from '../../components'

export default function MainPage() {
	let { id } = useParams()

	if (!id) {
		id = 'home'
	}

	const { data, isLoading, error } = useQuery<Page, Error>(`page-"${id}`, () => getPage(String(id)))
	const imageRef: ContentReference | null = !isLoading && !error ? data?.image || { id: '' } : null

	function renderContentsLoading() {
		return (
			<div className="placeholder-glow justify-content-center align-items-center">
				{[...Array(10).keys()].map(item => {
					return (
						<p key={`main-page-load-${item}`} className="placeholder w-75 d-block mx-auto rounded"></p>
					)
				})}
			</div>
		)
	}


	function renderContents() {
		if (isLoading) return renderContentsLoading()
		if (error) return <></>
		if (!data?.content?.length) return <></>

		return data.content.map((content, index) => {
			switch (content.type) {
				case 'text':
					return <TextBlock key={`page-content-${index}`} text={String(content.value)} />
					break
				case 'image':
					const value: ContentReference = content.value
					return <ImageBlock key={`page-content-${index}`} value={value} />
					break
				case 'speakersList':
					const speakersTitle: string = content.value?.title
					return <SpeakersList key={`page-content-${index}`} title={speakersTitle} />
					break
				case 'eventRegister':
					const eventRegisterTitle: string = content.value?.title
					return <EventRegister key={`page-content-${index}`} title={eventRegisterTitle} />
					break
				default:
					return <></>
					break
			}
		})
	}

	return (
		<>
			{isLoading || !imageRef ? (
				<HeroLoading />
			) : <></>}
			{imageRef ?
				<Hero
					id={id}
					title={data?.title}
					intro={data?.intro}
					imageRef={imageRef}
				/> : <></>
			}
			<div className="container contents-wrapper">
				{renderContents()}
			</div>
		</>
	)
}
