import React from 'react'
import Confetti from 'react-confetti'
import { useState, useEffect } from 'react'
import { shuffle } from 'lodash'
import Button from '@mui/material/Button'
import './App.css'
import Card from './Card'

const memes = [
  { src: '/img/01.png', matched: false },
  { src: '/img/02.png', matched: false },
  { src: '/img/03.png', matched: false },
  { src: '/img/04.png', matched: false },
  { src: '/img/05.png', matched: false },
  { src: '/img/06.png', matched: false },
]

const shuffledCards = () =>
  shuffle([...memes, ...memes]).map((meme) => ({ ...meme, id: Math.random() }))

function App() {
  const [cards, setCards] = useState(shuffledCards)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [isWinner, setIsWinner] = useState(false)

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true }
            } else return card
          })
        })
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    const unmatched = cards.findIndex((card) => card.matched === false)
    if (unmatched === -1) {
      setIsWinner(true)
    }
  }, [cards])

  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
  }

  const handleChoice = (choice) => {
    if (!firstChoice) {
      setFirstChoice(choice)
    } else if (!secondChoice) {
      setSecondChoice(choice)
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Michael Match</h1>
        <Button
          className="Button"
          variant="contained"
          color="error"
          onClick={() => window.location.reload()}
        >
          New Game
        </Button>
      </div>
      <div className="game-board">
        {isWinner && <Confetti />}
        {cards.map((meme, index) => (
          <Card
            key={index}
            meme={meme}
            handleChoice={handleChoice}
            flipped={
              meme === firstChoice || meme === secondChoice || meme.matched
            }
          />
        ))}
      </div>
    </div>
  )
}

export default App
