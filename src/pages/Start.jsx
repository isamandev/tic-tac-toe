import Logo from '../assets/Logo.svg'
import X from '../assets/X.svg'
import O from '../assets/O.svg'

import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Start = () => {
	const navigate = useNavigate()
	const [isNew, setIsNew] = useState(true)

	useEffect(() => {
		setIsNew(JSON.parse(localStorage.getItem('start') || 'true'))
	}, [])
	console.log(isNew)
	const handleStart = () => {
		navigate('/play')
		localStorage.setItem('start', JSON.stringify(false))
	}
	const handleContinue = () => {
		navigate('/play')
	}
	return (
		<div className='to-cover relative flex h-screen w-full items-center justify-center overflow-hidden bg-radial from-blue-300 from-5% to-95%'>
			<BlurredImages />
			<div className='z-10 flex flex-col items-center'>
				<img src={Logo} alt='logo' className='xl size-96 p-5 2xl:size-[750px]' />
				<Button onClick={isNew ? handleStart : handleContinue}>{isNew ? 'Start' : 'Continue'}</Button>
			</div>
		</div>
	)
}

const BlurredImages = () => {
	return (
		<div className='absolute top-1/2 left-1/2 h-screen w-full -translate-1/2 overflow-hidden'>
			<img src={O} alt='o' className='pointer-events-none absolute top-5 -left-6 size-32 rotate-[-20deg] blur-xs sm:top-10 sm:left-20 2xl:size-52' />
			<img src={X} alt='x' className='pointer-events-none absolute top-5 right-0 size-32 rotate-[-20deg] blur-xs sm:top-16 sm:right-20 2xl:size-52' />
			<img
				src={O}
				alt='o'
				className='pointer-events-none absolute bottom-5 -left-30 size-52 rotate-[20deg] blur-sm sm:bottom-16 sm:left-10 2xl:size-72'
			/>
			<img
				src={X}
				alt='x'
				className='pointer-events-none absolute -right-30 -bottom-30 size-80 rotate-[20deg] blur-md sm:right-5 sm:-bottom-10 2xl:size-96'
			/>
		</div>
	)
}

export default Start
