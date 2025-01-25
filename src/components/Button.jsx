import { cn } from '../lib/utils'

function Button({ size = 100, type = 'action', children, className, onClick }) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'font-inter flex items-center justify-center font-black uppercase',
				type == 'board'
					? 'shadow-solid-board rounded-xl border-4'
					: 'bg-button-bg-primary hover:bg-button-bg-secondary shadow-solid-action rounded-lg border-4 px-5 py-2 duration-300',
				className
			)}
			style={type === 'board' ? { width: `${size}px`, height: `${size}px` } : {}}
		>
			{children}
		</button>
	)
}

export default Button
