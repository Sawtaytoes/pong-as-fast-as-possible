import Ball from './Ball'
import BallBoundary from './BallBoundary'
import GameProvider from './GameProvider'
import Paddle from './Paddle'
import PaddleBoundary from './PaddleBoundary'
import Player from './Player'

const App = () => (
  <GameProvider>
    <BallBoundary>
      <Ball />
    </BallBoundary>

    <Player playerAlignment="left">
      <PaddleBoundary
        downKeyName="KeyS"
        upKeyName="KeyW"
      >
        <Paddle />
      </PaddleBoundary>
    </Player>

    <Player playerAlignment="right">
      <PaddleBoundary
        downKeyName="ArrowDown"
        upKeyName="ArrowUp"
      >
        <Paddle />
      </PaddleBoundary>
    </Player>
  </GameProvider>
)

export default App
