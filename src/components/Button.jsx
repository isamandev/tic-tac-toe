import { cn } from '../lib/utils'

function Button({ type = 'action', children, className, onClick }) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'font-inter flex items-center justify-center font-black uppercase',
				type == 'board'
					? 'shadow-solid-board rounded-xl border-4'
					: 'bg-button-bg-primary hover:bg-button-bg-secondary shadow-solid-action w-full rounded-lg border-4 py-2 duration-300 2xl:text-4xl',
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
