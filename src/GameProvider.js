import {
  useCallback,
  useMemo,
  useState,
} from 'react'

import GameContext from './GameContext'

const initialPaddleRefs = []

const GameProvider = ({
  children,
}) => {
  const [
    paddleRefs,
    setPaddleRefs,
  ] = (
    useState(
      initialPaddleRefs
    )
  )

  const playerScored = (
    useCallback(
      () => {
      },
      [],
    )
  )

  const providerValue = (
    useMemo(
      () => ({
        playerScored
      }),
      [
        playerScored,
      ],
    )
  )
  
  return (
    <GameContext.Provider
      value={providerValue}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
