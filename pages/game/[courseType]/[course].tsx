import React, { useState, useEffect, memo } from 'react'
import { GetServerSideProps } from 'next'
import memoize from 'memoize-one';
import { FixedSizeList as List, areEqual } from 'react-window';
import auth0 from '../../../utils/auth0'
import SubTitle from '../../../components/SubTitle'
import ButtonLink from '../../../components/ButtonLink'
import GameInput from '../../../components/GameInput'
import styles from '../../../styles/Game.module.css'
import gameCardStyles from '../../../styles/GameCard.module.css'
import buttonStyles from '../../../styles/Button.module.css'
import { makeTitle } from '../../../utils/helpers'
import { info } from 'console';

const GameCard = memo(({ data, index, style }) => {
 
  // Data passed to List as "itemData" is available as props.data
  const { saveGameState, handleParInput, handleScoreInput } = data;
  const hole = index + 1;

 
  return (
    <div
      className={gameCardStyles.ListCardContainer}
      style={style}
    >
      <div className={gameCardStyles.ListCard}>
        <div className={gameCardStyles.ListCardHeader}>
          <p><strong>Hole:</strong> {hole}</p>
        </div>
        <GameInput
          handleInput={handleParInput}
          placeHolder="Par"
          type="Par"
          hole={hole}
          source={hole}
          max="5"
          min="3"
        />
        <GameInput
          handleInput={handleScoreInput}
          placeHolder="Score"
          type="Score"
          hole={hole}
          source={hole}
          max={hole.length}
          min="1"
        />
        <div className={gameCardStyles.buttonContainer}>
          <button
            type="button"
            onClick={saveGameState}
            className={buttonStyles.button}
            width="300"
          >
            Save
          </button>
        </div>
      </div>      
    </div>
  );
}, areEqual);

const createGameData = memoize((saveGameState, handleParInput, handleScoreInput) => ({
  saveGameState,
  handleParInput,
  handleScoreInput
}));
 
 

type Props = {
  course: string
  courseType: string
}

export default function Course({ course, courseType }: Props): JSX.Element {
  const [holes, setHoles] = useState([])
  const [currentHole, setCurrentHole] = useState('')
  const [currentPar, setCurrentPar] = useState('')
  const [currentScore, setCurrentScore] = useState('')
  const [gameObj, setGameObj] = useState([])

  function handleParInput(game) {
    const { hole, input } = game
    setCurrentHole(hole)
    setCurrentPar(input)
  }

  function handleScoreInput(game) {
    const { input } = game

    setCurrentScore(input)
  }

  function storeGameData() {
    const newHole = {
      hole: currentHole,
      par: currentPar,
      score: currentScore,
    }

    // replace value if already exists
    const removeOldHole = gameObj.filter((obj) => {
      if (obj.hole !== currentHole) {
        return obj
      }
    })

    setGameObj([...removeOldHole, newHole])
  }

  function saveGameState() {
    console.log('we hittin dis?')
    localStorage.setItem('holes', JSON.stringify(gameObj))
  }

  // set up game
  useEffect(() => {
    const setGameLength = () => {
      let length

      if (courseType === 'eighteen') {
        length = 18
      }

      if (courseType === 'nine') {
        length = 9
      }

      setHoles(Array.from(Array(length)).map((_, i) => i + 1))
    }

    if (currentScore) {
      storeGameData()
    }

    // save course name
    localStorage.setItem('course', course)
    localStorage.setItem('courseType', courseType)
    setGameLength()
  }, [courseType, currentScore, course])

  const gameData = createGameData(saveGameState, handleParInput, handleScoreInput);


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <SubTitle title={`Course: ${course}`} />
        <SubTitle title={`Holes: ${courseType}`} />
      </div>
      {(holes.length > 0) && (
        <List
          className={gameCardStyles.List}
          height={600}
          itemCount={holes.length}
          itemSize={320}
          width={500}
          itemData={gameData}
        >
        {GameCard}
      </List>
      )}
      <div className={styles.buttonContainer}>
        <ButtonLink label="Finish Game" link="/finish-game" />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, params } = context
  const course = params.course

  if (typeof window === 'undefined') {
    const session = await auth0.getSession(req)
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: '/api/login',
      })
      res.end()

      return {
        props: {
          user: '',
          authed: false,
          course: makeTitle(course),
          courseType: params.courseType,
        },
      }
    }
    return {
      props: {
        user: session.user,
        authed: true,
        score: '',
        course: makeTitle(course),
        courseType: params.courseType,
      },
    }
  }

  return {
    props: {
      user: '',
      authed: false,
      score: '',
    },
  }
}
