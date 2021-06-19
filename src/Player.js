import './Player.css'

const playerAlignments = {
  left: 'left',
  right: 'right',
}

const playerAlignmentClassNames = {
  [
    playerAlignments
    .left
  ]: (
    'Player_left'
  ),
  [
    playerAlignments
    .right
  ]: (
    'Player_right'
  ),
}

const Player = ({
  children,
  playerAlignment = '',
}) => (
  <div
    className={
      'Player'
      .concat(
        ' ',
        (
          playerAlignmentClassNames
          [playerAlignment]
        ),
      )
    }
  >
    {children}
  </div>
)

export default Player
