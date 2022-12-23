import {
	BrowserRouter
} from 'react-router-dom'

import {
	QueryClient,
	QueryClientProvider,
} from 'react-query'

import MainLayout from './layouts/Main'
import Router from './Router'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<MainLayout>
					<Router />
				</MainLayout>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
