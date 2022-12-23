import './styles.scss'

import { useParams } from 'react-router'
import { useQuery } from 'react-query'

import { ContentReference, getPage, Page } from '../../firebase/functions'
import {
	TextBlock,
	ImageBlock,
	Hero,
	ChildrenList,
	SponsorList
} from '../../components'

export default function MainPage() {
	let { id } = useParams()

	if (!id) {
		id = 'home'
	}

	const { data, isLoading, error } = useQuery<Page, Error>(`page-"${id}`, () => getPage(String(id)))

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
				case 'childrenList':
					const childrenTitle: string = content.value?.title
					return <ChildrenList key={`page-content-${index}`} title={childrenTitle} />
					break
				case 'sponsorsList':
					const sponsortTitle: string = content.value?.title
					return <SponsorList key={`page-content-${index}`} title={sponsortTitle} />
					break
				default:
					return <></>
					break
			}
		})
	}

	return (
		<>
			<Hero
				id={id}
				title={data?.name}
				intro={data?.intro}
				imageRef={data?.image}
				textLoading={isLoading}
			/>
			<div className="container contents-wrapper">
				{renderContents()}
			</div>
		</>
	)
}
