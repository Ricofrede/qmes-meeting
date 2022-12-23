
import './styles.scss'
import SponsorListWrapper from './SponsorListWrapper'
import { useState } from 'react'

interface SponsorListProps {
	title?: string
}

export default function SponsorList({ title }: SponsorListProps) {
	const [search, setSearch] = useState<string>('')
	const [searchValue, setSearchValue] = useState<string>('')

	function submitSearch() {
		setSearch(searchValue)
	}

	return (
		<div className="sponsorList-wrapper p-2">
			{title ? <h2 className="sponsorList-title">{title}</h2> : <></>}
			<div className="sponsorList-search row mb-2 p-2">
				<div className="input-group">
					<div id="search-autocomplete" className="form-outline">
						<input
							type="search"
							id="form1"
							className="form-control"
							value={searchValue}
							onChange={(e) => setSearchValue(e?.target?.value || '')}
						/>
						<label className="form-label" htmlFor="form1">Seu e-mail ou telefone</label>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={submitSearch}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>
			{search ? (
				<div className="sponsorList row mb-2 p-2">
					<SponsorListWrapper searchStr={search} />
				</div>
			) : <></>}
		</div>
	)
}
