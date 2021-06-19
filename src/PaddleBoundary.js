import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import GameContext from './GameContext'
import './PaddleBoundary.css'

const paddleMovementStates = {
  down: 'down',
  stationary: 'stationary',
  up: 'up',
}

const positionYOffsets = {
  [
    paddleMovementStates
    .down
  ]: 1,
  [
    paddleMovementStates
    .up
  ]: -1,
  [
    paddleMovementStates
    .stationary
  ]: 0,
}

const moveY = ({
  element,
  y,
}) => {
  element
  .style
  .setProperty(
    'top',
    (
      String(
        y
      )
      .concat('px')
    ),
  )
}

const PaddleBoundary = ({
  children,
  downKeyName,
  upKeyName,
}) => {
  const {} = (
    useContext(
      GameContext
    )
  )

  const paddleRef = (
    useRef()
  )

  const [
    paddleMovementState,
    setPaddleMovementState,
  ] = (
    useState(
      paddleMovementStates
      .stationary
    )
  )

  const paddleYPositionRef = (
    useRef(0)
  )

  const keyNameMovementStates = (
    useMemo(
      () => ({
        [downKeyName]: (
          paddleMovementStates
          .down
        ),
        [upKeyName]: (
          paddleMovementStates
          .up
        ),
      }),
      [
        downKeyName,
        upKeyName,
      ],
    )
  )

  useEffect(
    () => {
      paddleYPositionRef
      .current = (
        (
          (
            window
            .innerHeight
          ) / 2
        )
        - (
          (
            paddleRef
            .current
            .offsetHeight
          ) / 2
        )
      )

      moveY({
        element: (
          paddleRef
          .current
        ),
        y: (
          paddleYPositionRef
          .current
        ),
      })
    },
    [],
  )

  useEffect(
    () => {
      const keyPressed = ({
        code: keyName,
      }) => {
        if (
          keyNameMovementStates
          [keyName]
        ) {
          setPaddleMovementState(
            keyNameMovementStates
            [keyName]
          )
        }
      }

      window
      .addEventListener(
        'keydown',
        keyPressed,
      )

      return () => {
        window
        .removeEventListener(
          'keydown',
          keyPressed,
        )
      }
    },
    [
      keyNameMovementStates,
    ],
  )

  useEffect(
    () => {
      const intervalId = (
        setInterval(
          () => {
            const positionYOffset = (
              positionYOffsets
              [paddleMovementState]
            )

            if (!positionYOffset) {
              return
            }

            paddleYPositionRef
            .current = (
              Math
              .max(
                0,
                (
                  Math
                  .min(
                    (
                      (
                        paddleYPositionRef
                        .current
                      )
                      + (
                        positionYOffset
                      )
                    ),
                    (
                      (
                         window
                         .innerHeight
                      )
                      - (
                         paddleRef
                         .current
                         .offsetHeight
                      )
                    ),
                  )
                ),
              )
            )


            moveY({
              element: (
                paddleRef
                .current
              ),
              y: (
                paddleYPositionRef
                .current
              ),
            })
          },
          2,
        )
      )

      return () => {
        clearInterval(
          intervalId
        )
      }
    },
    [
      paddleMovementState,
    ],
  )

  return (
   <div
      className="PaddleBoundary"
      ref={paddleRef}
   >
      {children}
   </div>
  )
}

export default PaddleBoundary
