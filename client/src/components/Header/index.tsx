import { useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'

import { getPages, Page, Social, getSocials } from '../../firebase/functions'
import './styles.scss'
import logo from '../../assets/imgs/android-chrome-192x192.png'

export default function Header() {
	const { pathname } = useLocation()
	const { data, isLoading, error } = useQuery<Page[], Error>('pages', () => getPages())
	const {
		data: socials, isLoading: socialsLoad, error: socialError
	} = useQuery<Social[], Error>('socials', () => getSocials())


	function renderSocials() {
		if (socialsLoad) return <></>
		if (socialError) return <></>
		if (!socials || !socials.length) return <></>

		return socials?.map((social, index) => {
			return (
				<li className="nav-item" key={`social-header-${index}`}>
					<a
						className="btn btn-link btn-floating btn-lg text-dark m-3"
						href={social.url}
						target="_blank"
						rel="noreferrer"
						role="button"
						data-mdb-ripple-color="dark"
					><i className={`fab fa-2x ${social.iconClass}`}></i></a>
				</li>
			)
		})
	}

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
				<ul className="navbar-nav" key={`menu-link-${page.id}`}>
					<li className="nav-item">
						<Link
							className={`nav-link ${activeClass}`}
							to={link}
						>
							{page.shortName}
						</Link>
					</li>
				</ul>
			)
		})
	}

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container container-fluid">
				<Link className="navbar-brand" to="/">
					<img src={logo} alt="Projeto Natal Feliz" />
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{renderMenu()}
					<ul className="navbar-nav nav-socials">
						{renderSocials()}
					</ul>
				</div>
			</div>
		</nav>
	)
}
