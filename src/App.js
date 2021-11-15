import swal from "sweetalert"
import logo from "./logo.svg"
import loading from "./loading.svg"
import styles from "./App.module.css"
import Button from "./Button"
import { shuffleArray, getRandomNumber } from "./utils"

// Get token from https://developer.spotify.com/console/get-current-user-saved-tracks/
const apiToken = "<<Copiez le token de Spotify ici>>"

const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1 className={styles.appTitle}>Bienvenue sur le Blindtest</h1>
        <p>Le text est modifié !</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
