import { CallNotes } from "./features/callnotes/callNotes"
import "./index.css"

const App = () => {
  return (
    <div className="App">
      <header>Notes</header>
      <div className="callNotes"><CallNotes /></div>
    </div>
  )
}

export default App
