import { cn } from '../lib/utils'

function Button({ size = 233, type = 'action', children, className, onClick }) {
	return (
		<button onClick={onClick} className='relative font-inter font-black' style={type === 'board' ? { width: `${size}px`, height: `${size}px` } : {}}>
			<div
				className={cn(
					'relative border-8 top-0 left-3 border-border bg-button-bg-primary hover:bg-button-bg-secondary duration-300 flex items-center justify-center uppercase',
					type === 'board' ? 'rounded-2xl size-full' : 'px-5 py-2 border-4 rounded-xl',
					className
				)}
			>
				{children}
				<div
					className={cn(
						'absolute -z-10 border-border rounded-2xl',
						type === 'board'
							? '-top-2 -left-4 border-16 rounded-tl-4xl rounded-br-2xl w-[calc(100%+15px)] h-[calc(100%+25px)]'
							: '-top-0 -left-2 border-8 rounded-xl w-[calc(100%+10px)] h-[calc(100%+10px)]'
					)}
				></div>
			</div>
		</button>
	)
}

export default Button
