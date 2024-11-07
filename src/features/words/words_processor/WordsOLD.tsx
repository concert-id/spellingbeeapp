// // words source
// // https://digital.library.upenn.edu/webbin/gutbook/lookup?num=3201
// // special thanks to: Grady Ward (creator of wordlist) & Project Gutenberg

// // USING: acenrsy, with mandatory letter A

// import { useEffect, useState } from "react";
// import * as puzzlesData from "./scores.json"
// import * as wordsData from "./wordset.json"

// type Letter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h " | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"

// type WordsJSON = {
//   [key: string]: string[];
// }

// type PangramJSON = {
//   [key: string]: PangramInfo
// }

// type PangramInfo = {
//   "_total": number;
//   "_queries": string[];
//   [key: string]: any;
// }

// type LoadedPangram = {
//   [key: string]: boolean;
// }

// function RenderPangram() {
//   const puzzles = puzzlesData as PangramJSON
//   const words = wordsData as WordsJSON
//   const pangram: PangramInfo = puzzles.acenrsy
//   const mandatory = "a"
//   const valid: LoadedPangram = {}
//   for (let key of pangram._queries) {
//     const w = words[key]
//     for (let word of w) {
//       valid[word] = key.includes(mandatory) ? true : false
//     }
//   }
  
//   console.log(pangram._total)
//   console.log(valid)
//   return (
//     <>
//       <div>
//         <div>WORDS</div>
//       </div>
//     </>
//   )
// }

// function TEST() {
//   const [puzzles, setPuzzles] = useState(null)
//   const [words, setWords] = useState(null)
//   useEffect(() => {
//     async function getPuzzles() {
//       const p = await fetch("scores.json")
//     }
//   })
//   const pangram: PangramInfo = puzzles.acenrsy
//   const mandatory = "a"
//   const valid: LoadedPangram = {}
//   for (let key of pangram._queries) {
//     const w = words[key]
//     for (let word of w) {
//       valid[word] = key.includes(mandatory) ? true : false
//     }
//   }
  
//   console.log(pangram._total)
//   console.log(valid)
//   return (
//     <>
//       <div>
//         <div>WORDS</div>
//       </div>
//     </>
//   )
// }

// export default RenderPangram
