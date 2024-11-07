import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  loadPangramAction,
  addLetterAction,
  backspaceAction,
  setGuessAction,
  submitGuessAction,
  selectGuess,
  selectMandatoryLetter,
  selectLetters,
  selectGuessType,
  selectHasBeenGuessed,
} from "./pangramSlice"

import "./pangram.css"

function LoadBee() {
  const dispatch = useAppDispatch()

  return (
    <>
      <button onClick={e => dispatch(loadPangramAction("acenrsy_a"))}>
        LOAD acenrsy_a
      </button>
      <div className="beeLoadDiv">
        this is to simulate picking the puzzle from a list
      </div>
    </>
  )
}

export function SpellingBee() {
  const dispatch = useAppDispatch()
  const mandatory = useAppSelector(selectMandatoryLetter)
  const letters = useAppSelector(selectLetters)
  const guess = useAppSelector(selectGuess)
  const guessType = useAppSelector(selectGuessType)
  const hasBeenGuessed = useAppSelector(selectHasBeenGuessed)

  const addNewLetter = (l: string) => {
    dispatch(addLetterAction(l))
  }

  const backspaceButton = () => {
    if (guess.length > 0) {
      dispatch(backspaceAction())
    }
  }

  const submitCurrentGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (guessType) {
      case "valid":
        dispatch(submitGuessAction())
        console.log(guess, "is a valid word!")
        break
      case "bonus":
        dispatch(submitGuessAction())
        console.log(guess, "is a bonus word!")
        break
      case "guessed":
        console.log(guess, "has already been guessed.")
        break
      case "invalid":
        dispatch(submitGuessAction())
        break
      default:
        console.log("How did you break this?")
        break
    }
  }

  const validateLetters = (newGuess: string) => {
    const newGuessSet = new Set(newGuess)
    for (const letter of newGuessSet) {
      if (!Object.hasOwn(letters, letter)) {
        return false
      }
    }
    return true
  }

  const setNewGuess = (newGuess: string) => {
    if (validateLetters(newGuess)) {
      dispatch(setGuessAction(newGuess))
    }
  }

  const forceFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    function setFocus() {
      e.target.focus()
      // console.log("Focus forced on textbox")
    }
    setTimeout(function () {
      setFocus()
    }, 20)
  }

  const guessNotLongEnough = () => {
    return guess.length < 4
  }

  const submitIsAllowed = () => {
    if (guessNotLongEnough() || hasBeenGuessed) {
      return false
    } else {
      return true
    }
  }

  function CreateButtons() {
    return (
      <div>
        {Object.keys(letters).map(l => (
          <button
            key={l}
            type="button"
            className={
              l === mandatory ? "mandatoryLetterButton" : "letterButton"
            }
            onClick={e => addNewLetter(l)}
          >
            {l}
          </button>
        ))}
        <button
          key={"backspace"}
          type="button"
          className="backspaceButton"
          onClick={e => backspaceButton()}
        >
          backspace
        </button>
      </div>
    )
  }

  function CreateTextField() {
    const disableSubmit = !submitIsAllowed()
    return (
      <>
        <div className="beeGuessDisplay">
          <form onSubmit={e => submitCurrentGuess(e)}>
            <input
              value={guess}
              type="text"
              className="beeGuessInput"
              onChange={e => setNewGuess(e.target.value)}
              onBlur={e => forceFocus(e)}
              autoFocus
            />
            <div className="beeGuessHelp">
              {hasBeenGuessed ? "already guessed" : null}
            </div>
            <input
              type="submit"
              className={
                disableSubmit ? "beeSubmitButtonDisabled" : "beeSubmitButton"
              }
              value="&#x2714;"
              disabled={disableSubmit}
            />
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <h2>Spelling Bee</h2>
      {Object.keys(letters).length === 7 ? (
        <>
          <CreateButtons />
          <CreateTextField />
        </>
      ) : (
        <LoadBee />
      )}
    </>
  )
}
