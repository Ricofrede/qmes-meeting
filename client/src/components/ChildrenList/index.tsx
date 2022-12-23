import { useQuery } from 'react-query'
import { Child, getChildren } from '../../firebase/functions'
import ChildrenListItem from './ChildrenListItem'
import './styles.scss'

interface ChildrenListProps {
	title?: string
}

export default function ChildrenList({ title }: ChildrenListProps) {
	const { data: children, isLoading, error } = useQuery<Child[], Error>('children', () => getChildren())

	function renderChildren() {
		if (isLoading) return <></>
		if (error) return <></>
		if (!children || !children.length) return <></>

		return children?.map((child, index) => {
			return (
				<div
					key={`childrenList-card-${index}`}
					className="childrenList-card card mb-3 col-lg-6"
					style={{ maxWidth: 540 }}>
					<ChildrenListItem child={child} />
				</div>
			)
		})
	}

	return (
		<div className="childrenList-wrapper p-2">
			{title ? <h2 className="childrenList-title">{title}</h2> : <></>}
			<div className="childrenList row mb-2 p-2">
				{renderChildren()}
			</div>
		</div>
	)
}
