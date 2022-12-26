import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'

import { getPages, Page } from '../../firebase/functions'
import './styles.scss'

export default function Header() {
	const { pathname } = useLocation()
	const { data, isLoading, error } = useQuery<Page[], Error>('pages', () => getPages())

	function renderMenu() {

		if (isLoading) {
			const links = [1, 2, 3]
			return links.map(link => {
				return (
					<p key={`load-header-${link}`} className="placeholder-glow" style={{ borderRadius: '15%', minWidth: '70px', margin: '0 10px' }}>
						<span className="placeholder placeholder-lg col-12 rounded"></span>
					</p>
				)
			})
		}

		if (error) return <></>
		if (!data || !data.length) return <></>

		return data.map(page => {

			const link = page.id === 'home' ? '/' : `/${page.id}`
			const activeClass = pathname === link ? 'active' : ''
			return (
				<li className="nav-item active" key={`menu-link-${page.id}`}>
					<Link
						className={`nav-link ${activeClass}`}
						to={link}
					>
						{page.shortName}
					</Link>
				</li>
			)
		})
	}

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
					<div className="container-fluid">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbar"
							aria-controls="navbar"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<i className="fas fa-bars"></i>
						</button>
						<div className="collapse navbar-collapse" id="navbar">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								{renderMenu()}
							</ul>
						</div>
					</div>
				</nav>
			</header>
		</>
	)
}
