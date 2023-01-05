import { useQuery } from 'react-query'

import { Social, getSocials } from '../../firebase/functions'
import './styles.scss'

export default function Footer() {

	const {
		data: socials, isLoading: socialsLoad, error: socialError
	} = useQuery<Social[], Error>('socials', () => getSocials())

	function renderSocials() {
		if (socialsLoad) return <></>
		if (socialError) return <></>
		if (!socials || !socials.length) return <></>

		return socials?.map((social, index) => {
			return (
				<a
					key={`social-footer-${index}`}
					className="btn btn-outline-light btn-floating m-1"
					href={social.url}
					role="button"
					target="_blank"
					rel="noreferrer"
				>
					<i className={`fab fa-1x ${social.iconClass}`}></i>
				</a>
			)
		})
	}

	return (
		<>
			<footer className="bg-light text-center text-dark">
				<div className="container p-4 pb-0">
					<section className="mb-4">
						{renderSocials()}
					</section>
				</div>

				<div className="text-center p-3" style={{
					backgroundColor: "rgba(0, 0, 0, 0.2)",
				}}>
					<p >First Iberoamerican Meeting on Quantum Materials and Electronic Structures: Theory and Experiments - 2023</p>
					<br></br>
					<p className="footer-dev">Website structure developed by <a href="https://github.com/Ricofrede" target="_blank">Julio Tassinari</a></p>
				</div>
			</footer>
		</>
	)
}
