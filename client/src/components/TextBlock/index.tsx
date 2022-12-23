import Markdown from 'markdown-to-jsx'

import './styles.scss'

interface TextBlockProps {
	text: string
}

export default function TextBlock({ text }: TextBlockProps) {
	return (
		<Markdown className='text-block'>
			{text}
		</Markdown>
	)
}
