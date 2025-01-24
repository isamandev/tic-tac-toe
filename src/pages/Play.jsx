import Players from '../assets/Players.svg'
const Play = () => {
	return (
		<div className='bg-light-gray h-screen w-full grid place-items-center relative -z-40'>
			<img src={Players} alt='x-player' className='h-20' />
			<div className='relative size-96 border-8 border-border bg-board-bg-secondary rounded-2xl'>
				<div className='absolute size-full border-16 border-blue-200 rounded-tl-4xl rounded-br-2xl w-[calc(100%+35px)] h-[calc(100%+25px)] -top-1 -left-5 -z-10'></div>
			</div>
		</div>
	)
}

export default Play
