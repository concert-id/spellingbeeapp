import { createSelector, type PayloadAction } from "@reduxjs/toolkit"
import puzzlesInfo from "./puzzles_info"
import wordsetInfo from "./wordset_info"
import { createAppSlice } from "../../app/createAppSlice"

type WordQuery = keyof typeof wordsetInfo
type PangramLetters = keyof typeof puzzlesInfo
type Letters = {
  [key: string]: boolean
}
interface Words extends Letters {}
export enum GuessType {
  Valid,
  Bonus,
  Invalid,
}
type Attempts = {
  [key: string]: GuessType
}

export interface PangramSliceState {
  letters: Letters
  mandatory: string
  validWords: Words
  bonusWords: Words
  bonusPoints: number
  guess: string
  attempts: Attempts
}

const initialState: PangramSliceState = {
  letters: {},
  mandatory: "",
  validWords: {},
  bonusWords: {},
  bonusPoints: 0,
  guess: "",
  attempts: {},
}

export const pangramSlice = createAppSlice({
  name: "pangram",
  initialState,
  reducers: create => ({
    // expects a string in the form of "{pangram}_{letter}", where letter must be a substring of pangram
    // if the pangram is not valid, it breaks
    loadPangramAction: create.reducer((state, action: PayloadAction<string>) => {
      try {
        const p = action.payload.split("_")
        const letters = p[0] as PangramLetters
        const mandatory = p[1]
        for (const i in puzzlesInfo[letters]._queries) {
          const query = puzzlesInfo[letters]._queries[i] as WordQuery
          const words = wordsetInfo[query]
          if (query.includes(mandatory)) {
            for (const word of words) {
              state.validWords[word] = false
            }
          } else {
            for (const word of words) {
              state.bonusWords[word] = false
            }
          }
        }
        for (const i of letters.split("")) {
          if (i === mandatory) {
            state.letters[i] = true
          } else {
            state.letters[i] = false
          }
        }
      } catch (e) {
        console.log(e)
        console.log(action.payload, "is not a valid pangram")
      }
    }),
    // adds a letter to the current guess
    addLetterAction: create.reducer((state, action: PayloadAction<string>) => {
      state.guess += action.payload
    }),
    // sets the current guess to the given string
    setGuessAction: create.reducer((state, action: PayloadAction<string>) => {
      state.guess = action.payload
    }),
    // removes the last letter of the current guess
    backspaceAction: create.reducer((state, action: PayloadAction<undefined>) => {
      state.guess = state.guess.slice(0, -1)
    }),
    // submits the current guess and determines whether the word exists in the puzzle, 
    // then stores the guess and its associated outcome (valid, bonus, invalid)
    submitGuessAction: create.reducer((state, action: PayloadAction<undefined>) => {
      if (Object.hasOwn(state.validWords, state.guess)) {
        if (!state.validWords[state.guess]) {
          state.validWords[state.guess] = true
          state.attempts[state.guess] = GuessType.Valid
        }
      } else if (Object.hasOwn(state.bonusWords, state.guess)) {
        if (!state.bonusWords[state.guess]) {
          state.bonusWords[state.guess] = true
          state.attempts[state.guess] = GuessType.Bonus
        }
      } else {
        state.attempts[state.guess] = GuessType.Invalid
      }
    }),
  }),
  // these bad boys select specific fields of the state
  // their results are memoized! this makes them super efficient
  selectors: {
    selectGuess: pangramState => pangramState.guess,
    selectValidWords: pangramState => pangramState.validWords,
    selectBonusWords: pangramState => pangramState.bonusWords,
    selectLetters: pangramState => pangramState.letters,
    selectMandatoryLetter: pangramState => pangramState.mandatory,
    selectAttempts: pangramState => pangramState.attempts,
  },
})
export const { loadPangramAction, addLetterAction, setGuessAction, backspaceAction, submitGuessAction } =
  pangramSlice.actions
export const {
  selectGuess,
  selectValidWords,
  selectBonusWords,
  selectLetters,
  selectAttempts,
  selectMandatoryLetter,
} = pangramSlice.selectors

// these are more complicated selectors
// they take small selectors as input and then do more expensive logic or computation
// because they chain selectors, they're also memoized!

// returns all the words in the pangram
export const selectAllWords = createSelector(
  [selectValidWords, selectBonusWords],
  (valid, bonus) => {
    return { ...valid, ...bonus }
  },
)

// returns true if the current guess has been stored as an attempt
export const selectHasBeenGuessed = createSelector(
  [selectGuess, selectAttempts],
  (guess, attempts) => {
    return Object.hasOwn(attempts, guess)
  },
)

// returns a string representation of the guess's type
// technically, "guessed" should never be returned with the way i've set it up, 
// but it's there just in case
export const selectGuessType = createSelector(
  [selectGuess, selectValidWords, selectBonusWords, selectHasBeenGuessed],
  (guess, validWords, bonusWords, hasBeenGuessed) => {
    if (hasBeenGuessed) {
      return "guessed"
    }
    const valid = Object.hasOwn(validWords, guess)
    const bonus = Object.hasOwn(bonusWords, guess)
    if (valid) {
      return "valid"
    } else if (bonus) {
      return "bonus"
    } else {
      return "invalid"
    }
  },
)
