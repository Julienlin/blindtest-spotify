import swal from "sweetalert"
import logo from "./logo.svg"
import loading from "./loading.svg"
import styles from "./App.module.css"
import Button from "./Button"
import AlbumCover from "./AlbumCover"
import { shuffleArray, getRandomNumber } from "./utils"
import { useState, useEffect } from "react"

// Get token from https://developer.spotify.com/console/get-current-user-saved-tracks/
const apiToken =
  "BQDpSAIOV1x0mY2XpY97C5dyj4XL9uw4tA6cGM0-Q-xbi5UjAf4BSmzzeHB6NzaGJX7MLHPRr3tjkhVoC7T1ibu84DThdRq82X2ur1qrwAXxcBOXc7RijJfmgFvTPoeconFAMNGIZODJ3oTBaFzyS-cjQRNfIdkNHb17rZAQK6eV9ymv"

const RenderList = props => {
  const { songsLoaded, tracks, checkAnswer } = props
  if (!songsLoaded) {
    return <img src={loading} alt="loading"></img>
  }
  return (
    <ul>
      {tracks.map((t, index) => (
        <li key={index}>
          <AlbumCover track={t}></AlbumCover>
          <Button onClick={() => checkAnswer(t.track.name)} children={t.track.name}></Button>
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  const [text, setText] = useState("")
  const [tracks, setTracks] = useState([])
  const [songsLoaded, setLoad] = useState(false)
  const [answer, setAnswer] = useState({})
  const checkAnswer = value => {
    if (value === answer.track.name) {
      swal("Bravo", "Tu es trop fort", "success").then(fetchTracks(setTracks, setAnswer, setLoad))
    } else swal("Nul", "T'es trop nul", "error").then(fetchTracks(setTracks, setAnswer, setLoad))
  }
  useEffect(() => {
    fetchTracks(setTracks, setAnswer, setLoad)
  }, [])

  if (!songsLoaded) {
    return <p>Loading ...</p>
  }

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1 className={styles.appTitle}>Bienvenue sur le Blindtest</h1>
        {songsLoaded ? <p>Il y a {tracks.length} chansons chargées.</p> : <p>Le text est modifié !</p>}
        <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Button onClick={() => setText("Cliqué !")}>Cliquez moi !</Button>
        <p>{text}</p>

        <audio controls src={answer.track.preview_url} />

        <RenderList songsLoaded={songsLoaded} tracks={tracks.slice(0, 3)} checkAnswer={checkAnswer}></RenderList>
      </header>
    </div>
  )
}

export default App
function fetchTracks(setTracks, setAnswer, setLoad) {
  fetch("https://api.spotify.com/v1/me/tracks", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + apiToken,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data)
      const shuffled = shuffleArray(data.items).slice(0, 3)
      setTracks(shuffled)
      console.log(shuffled)
      setAnswer(shuffled[getRandomNumber(shuffled.length)])
      setLoad(true)
    })
}
