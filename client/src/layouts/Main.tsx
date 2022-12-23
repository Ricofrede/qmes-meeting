import { Footer } from '../components'
import { Header } from '../components'



interface MainLayoutProps {
	children: JSX.Element | JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
