import Logo from '../assets/Logo.svg'
import X from '../assets/X.svg'
import O from '../assets/O.svg'

import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Start = () => {
	const navigate = useNavigate()
	const [isNew, setIsNew] = useState(false)

	useEffect(() => {
		setIsNew(localStorage.getItem('start') || false)
	}, [])
	const handleStart = () => {
		navigate('/play')
		localStorage.setItem('start', true)
	}
	const handleContinue = () => {
		navigate('/play')
	}
	return (
		<div className='to-cover relative flex h-screen w-full items-center justify-center overflow-hidden bg-radial from-blue-300 from-5% to-95%'>
			<BlurredImages />
			<div className='z-10 flex flex-col items-center'>
				<img src={Logo} alt='logo' className='size-96' />
				{isNew ? <Button onClick={handleContinue}>Continue</Button> : <Button onClick={handleStart}>start</Button>}
			</div>
		</div>
	)
}

const BlurredImages = () => {
	return (
		<div className='absolute top-1/2 left-1/2 h-screen w-full -translate-1/2 overflow-hidden'>
			<img src={O} alt='o' className='pointer-events-none absolute top-16 right-20 size-32 rotate-[-20deg] blur-xs md:right-40' />
			<img src={X} alt='x' className='pointer-events-none absolute top-16 left-20 size-32 rotate-[-20deg] blur-xs md:left-40' />
			<img src={O} alt='o' className='pointer-events-none absolute bottom-16 left-10 size-52 rotate-[20deg] blur-sm md:left-20' />
			<img src={X} alt='x' className='pointer-events-none absolute right-5 -bottom-10 size-80 rotate-[20deg] blur-md md:right-10' />
		</div>
	)
}

export default Start
