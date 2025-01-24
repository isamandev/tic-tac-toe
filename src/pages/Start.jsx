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
		<div className='relative h-screen w-full flex justify-center items-center bg-radial from-blue-300 from-5% to-cover to-95% overflow-hidden '>
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
		<div className='absolute w-full h-screen top-1/2 left-1/2 -translate-1/2  overflow-hidden'>
			<img src={O} alt='o' className='absolute top-16 md:right-40 right-20 rotate-[-20deg] size-32 pointer-events-none blur-xs' />
			<img src={X} alt='x' className='absolute top-16 md:left-40 left-20 rotate-[-20deg] size-32 pointer-events-none blur-xs' />
			<img src={O} alt='o' className='absolute bottom-16 md:left-20 left-10 rotate-[20deg] size-52 pointer-events-none blur-sm' />
			<img src={X} alt='x' className='absolute -bottom-10 md:right-10 right-5 rotate-[20deg] size-80 pointer-events-none blur-md' />
		</div>
	)
}

export default Start
