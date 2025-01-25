import './App.css'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Start from './pages/Start'
import Play from './pages/Play'
import { useEffect, useState, useRef } from 'react'
import Loading from './components/Loading'

const AppContent = () => {
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const previousPathname = useRef(location.pathname)

	useEffect(() => {
		if (previousPathname.current !== location.pathname) {
			setLoading(true)

			const timer = setTimeout(() => {
				setLoading(false)
			}, 1000)

			previousPathname.current = location.pathname

			return () => {
				clearTimeout(timer)
			}
		}
	}, [location])

	return (
		<>
			{loading && <Loading />}
			<Routes>
				<Route path='/' element={<Start />} />
				<Route path='/play' element={<Play />} />
			</Routes>
		</>
	)
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	)
}

export default App
