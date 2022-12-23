import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getPages, Page, Social, getSocials } from '../../firebase/functions'
import './styles.scss'

export default function Footer() {

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
				<li key={`social-footer-${index}`}>
					<a
						href={social.url}
						target="_blank"
						rel="noreferrer"
					>{social.name} <i className={`fab fa-1x ${social.iconClass}`}></i></a>
				</li>
			)
		})
	}

	function renderMenu() {

		if (isLoading) {
			const links = [1, 2, 3]
			return links.map(link => {
				return (
					<p key={`load-footer-${link}`} className="placeholder-glow" style={{ borderRadius: '15%', minWidth: '70px', margin: '0 10px' }}>
						<span className="placeholder placeholder-lg col-12 rounded"></span>
					</p>
				)
			})
		}

		if (error) return <></>
		if (!data || !data.length) return <></>

		return data.map(page => {

			const link = page.id === 'home' ? '/' : `/${page.id}`

			return (
				<li key={`menu-footer-link-${page.id}`}>
					<Link to={link}>
						{page.shortName}
					</Link>
				</li>
			)
		})
	}

	return (
		<footer className="text-center text-lg-start">
			<div className="container p-4">
				<div className="row justify-content-center">

					<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
						<h5 className="text-uppercase">Páginas</h5>
						<ul className="list-unstyled mb-0">
							{renderMenu()}
						</ul>
					</div>

					<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
						<h5 className="text-uppercase mb-0">Mídias Sociais</h5>

						<ul className="list-unstyled">
							{renderSocials()}
						</ul>
					</div>

				</div>
			</div>

			<div className="footer-text-below text-center p-3">
				<h2>Projeto Natal Feliz - 2022</h2>
			</div>

		</footer>
	)
}
