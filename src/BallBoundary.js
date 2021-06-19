import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import GameContext from './GameContext'
import './BallBoundary.css'

const moveBall = ({
  ballElement,
  x,
  y,
}) => {
  ballElement
  .style
  .setProperty(
    'left',
    (
      String(
        x
      )
      .concat('px')
    ),
  )

  ballElement
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

const initialBallMovementAmounts = {
  x: 0,
  y: 0,
}

const BallBoundary = ({
  children,
  downKeyName,
  upKeyName,
}) => {
  const {} = (
    useContext(
      GameContext
    )
  )

  const ballRef = (
    useRef()
  )

  const [
    ballMovementAmounts,
    setBallMovementAmounts,
  ] = (
    useState(
      initialBallMovementAmounts
    )
  )

  const moveBallToCenter = (
    useCallback(
      () => {
        const xCenter = (
          (
            (
              window
              .innerWidth
            ) / 2
          )
          - (
            (
              ballRef
              .current
              .offsetWidth
            ) / 2
          )
        )

        const yCenter = (
          (
            (
              window
              .innerHeight
            ) / 2
          )
          - (
            (
              ballRef
              .current
              .offsetHeight
            ) / 2
          )
        )

        moveBall({
          ballElement: (
            ballRef
            .current
          ),
          x: xCenter,
          y: yCenter,
        })

        setBallMovementAmounts({
          x: (
            // 0
            (
              Math
              .random()
            )
            * 0.5
          ),
          y: (
            // 0
            (
              Math
              .random()
            )
            * 0.5
          ),
        })
      },
      [],
    )
  )

  useEffect(
    () => {
      moveBallToCenter()
    },
    [
      moveBallToCenter,
    ],
  )

  useEffect(
    () => {
      const intersectionObserver = (
        new IntersectionObserver(
          ([
            intersectionObserverEntry
          ]) => {
            const {
              boundingClientRect,
              isIntersecting,
              isVisible,
              rootBounds,
            } = (
              intersectionObserverEntry
            )

            const {
              bottom,
              left,
              right,
              top,
            } = (
              boundingClientRect
            )

            if (
              (
                bottom
                > (
                  rootBounds
                  .bottom
                )
              )
              || (
                top
                < (
                  rootBounds
                  .top
                )
              )
            ) {
              setBallMovementAmounts((
                localBallMovementAmounts,
              ) => ({
                ...localBallMovementAmounts,
                y: (
                  (
                    localBallMovementAmounts
                    .y
                  )
                  * -1
                ),
              }))
            }

            if (
              isIntersecting
              && !isVisible
            ) {
              setBallMovementAmounts((
                localBallMovementAmounts,
              ) => ({
                x: (
                  (
                    localBallMovementAmounts
                    .x
                  )
                  * -1.1
                ),
                y: (
                  (
                    localBallMovementAmounts
                    .y
                  )
                  * (
                    Math
                    .round(
                      Math
                      .random()
                    )
                    ? 1.1
                    : -1.1
                  )
                ),
              }))
              console.log('collided with a paddle');
            }

            if (
              left
              < (
                rootBounds
                .left
              )
            ) {
              console.log('outta bounds left');
              moveBallToCenter()
            }

            if (
              right
              > (
                rootBounds
                .right
              )
            ) {
              console.log('outta bounds right');
              moveBallToCenter()
            }
          },
          {
            delay: 100,
            threshold: 1,
            trackVisibility: true,
          },
        )
      )

      intersectionObserver
      .observe(
        ballRef
        .current
      )

      // paddleRefs
      // .forEach((
      //   paddleRef,
      // ) => {
      //   intersectionObserver
      //   .observe(
      //     paddleRef
      //     .current
      //   )
      // })

      return () => {
        intersectionObserver
        .disconnect()
      }
    },
    [],
  )

  useEffect(
    () => {
      const intervalId = (
        setInterval(
          () => {
            const ballBoundingClientRect = (
              ballRef
              .current
              .getBoundingClientRect()
            )

            moveBall({
              ballElement: (
                ballRef
                .current
              ),
              x: (
                (
                  ballBoundingClientRect
                  .left
                )
                + (
                  ballMovementAmounts
                  .x
                )
              ),
              y: (
                (
                  ballBoundingClientRect
                  .top
                )
                + (
                  ballMovementAmounts
                  .y
                )
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
      ballMovementAmounts,
    ],
  )

  return (
   <div
      className="BallBoundary"
      ref={ballRef}
   >
      {children}
   </div>
  )
}

export default BallBoundary
