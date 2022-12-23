import {
	Routes,
	Route
} from 'react-router-dom'

import {
	MainPage,
	RedirectAdmin
} from './pages'

import ScrollToTop from './utils/ScrollToTop'

export default function Router() {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/admin" element={<RedirectAdmin />} />
				<Route path="/:id" element={<MainPage />} />
				<Route path="/" element={<MainPage />} />
			</Routes>
		</>
	)
}
