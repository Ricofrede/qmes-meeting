import { Helmet } from 'react-helmet'

interface MetaProps {
	title?: string
	description?: string
	image?: string
}

export default function Meta({ title, description, image }: MetaProps) {

	if (!title || !description) {
		return <></>
	}

	title = !['Home', 'home'].includes(title) ? title : 'Projeto Natal Feliz'
	description = description || 'Projeto Natal Feliz'
	image = image
	const keywords = title.replace(/\s/g, ', ')

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} data-react-helmet="true" />
			<meta name="keywords" content={keywords} data-react-helmet="true" />
			<meta property="og:title" content={title} data-react-helmet="true" />
			<meta property="og:description" content={description} data-react-helmet="true" />
			<meta property="og:image" content={image} data-react-helmet="true" />
			<meta property="og:type" content="store" data-react-helmet="true" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} data-react-helmet="true" />
			{window && window.location && window.location.href !== '' ? <link rel="canonical" href={window.location.href} /> : null}
		</Helmet>
	)
}
