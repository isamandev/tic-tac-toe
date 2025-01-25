import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Players from '../assets/Players.svg'
import X from '../assets/X.svg'
import O from '../assets/O.svg'
import Button from '../components/Button'

const Play = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const [board, setBoard] = useState(Array(9).fill(null))
	const [history, setHistory] = useState([])
	const [currentStep, setCurrentStep] = useState(0)
	const [currentPlayer, setCurrentPlayer] = useState('X')

	useEffect(() => {
		const boardParam = searchParams.get('board')
		const historyParam = searchParams.get('history')
		const stepParam = searchParams.get('step')

		const localState = JSON.parse(localStorage.getItem('ticTacToeState'))

		const boardLocal = localState?.board
		const historyLocal = localState?.history
		const stepLocal = localState?.step

		if (boardParam && historyParam && stepParam) {
			setBoard(JSON.parse(boardParam))
			setHistory(JSON.parse(historyParam))
			setCurrentStep(+stepParam)
		} else if (localState) {
			setBoard(JSON.parse(boardLocal))
			setHistory(JSON.parse(historyLocal))
			setCurrentStep(stepLocal)
		}
	}, [])

	const calculateWinner = board => {
		const winner = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let line of winner) {
			const [a, b, c] = line
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a]
			}
		}
		return null
	}

	const handleClick = index => {
		if (board[index] || calculateWinner(board)) return

		const row = Math.floor(index / 3) + 1
		const col = (index % 3) + 1

		const newBoard = [...board]
		newBoard[index] = currentPlayer
		const newHistory = history.slice(0, currentStep + 1)

		const newData = {
			board: JSON.stringify(newBoard),
			history: JSON.stringify([...newHistory, { board: newBoard, move: { player: currentPlayer, row, col } }]),
			step: newHistory.length,
			player: currentPlayer === 'X' ? 'O' : 'X',
		}

		setSearchParams(newData)

		localStorage.removeItem('ticTacToeState')
		localStorage.setItem('ticTacToeState', JSON.stringify(newData))

		setBoard(newBoard)
		setHistory([...newHistory, { board: newBoard, move: { player: currentPlayer, row, col } }])
		setCurrentStep(newHistory.length)
		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
	}

	const resetGame = () => {
		localStorage.removeItem('ticTacToeState')
		setSearchParams({})

		setBoard(Array(9).fill(null))
		setHistory([])
		setCurrentStep(0)
		setCurrentPlayer('X')
	}

	const undoMove = () => {
		if (currentStep >= 0) {
			setCurrentStep(currentStep - 1)
			setBoard(history[currentStep - 1].board)
			setCurrentPlayer(currentStep % 2 === 0 ? 'X' : 'O')
		}
	}

	const redoMove = () => {
		if (currentStep < history.length - 1) {
			setCurrentStep(currentStep + 1)
			setBoard(history[currentStep + 1].board)
			setCurrentPlayer(currentStep % 2 === 0 ? 'X' : 'O')
		}
	}

	const jumpToStep = step => {
		setCurrentStep(step)
		setBoard(history[step].board)
		setCurrentPlayer(step % 2 === 0 ? 'X' : 'O')
	}

	return (
		<>
			<div className='bg-light-gray flex min-h-screen w-full items-center justify-center gap-10'>
				<div className='flex flex-col items-center gap-5 py-5 lg:flex-row'>
					<div className='flex flex-col items-center justify-center gap-5'>
						<img src={Players} alt='player' className='h-20 w-auto 2xl:h-30' />
						<div className='shadow-solid-board flex max-w-max items-center justify-center rounded-xl border-4 p-2 md:p-10 lg:w-full'>
							<div className='grid grid-cols-3 gap-4'>
								{board.map((cell, index) => (
									<div key={index} className='z-30'>
										<Button type='board' className='size-20 lg:size-32' onClick={() => handleClick(index)}>
											{cell && <img src={cell == 'X' ? X : O} alt='player' className='size-14' />}
										</Button>
									</div>
								))}
							</div>
						</div>
						<div className='flex w-full gap-4'>
							<Button onClick={resetGame}>reset</Button>
							<Button onClick={undoMove}>undo</Button>
							<Button onClick={redoMove}>redo</Button>
						</div>
					</div>
					<div className='flex h-full w-full flex-col gap-5 lg:w-max'>
						<h3 className='py-7 text-center text-6xl font-black uppercase'>History</h3>
						{history.map((entry, step) => (
							<Button key={step + 1} onClick={() => jumpToStep(step)} className='px-5'>
								Step {step + 1}: {entry.move.player} - Row {entry.move.row}, Col {entry.move.col}
							</Button>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Play
