import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu({ setMode, randomWord, collections }) {

  const [setNr, setSet] = useState(1)

  const location = useLocation()

  const navigate = useNavigate();
  const setGroupId = (id) => {
    navigate(`?set=${id}`)
    setLocalStorage(id)
  }

  function getId() {
    const res = new URLSearchParams(location.search);
    const id = res.get("set")
    console.log(id)
    return id ? parseInt(id) : getLocalStorage()
  }


  console.log(collections)
  const startLearning = () => {
    randomWord();
    setMode("learning");
  };

  const startQuiz = () => {
    randomWord();
    setMode("quiz");
  };

  const startTest = () => {
    randomWord();
    setMode("test");
  };

  const startDifficult = () => {
    setMode("difficult");
  };

  const startIntelligent = () => {
    setMode("intelligent");
  };

  const startPopQuiz = () => {
    setMode("popQuiz");
  }

  const setLocalStorage = (setNr) => {
    localStorage.setItem("set", setNr)
  }

  const getLocalStorage = () => {
    return localStorage.getItem("set")
  }

  return (
    <div id="app">
      <h2 class="appHeading">Wordfly</h2>
      <select onChange={(e) => setGroupId(e.target.value)} value={getId()}>
        {collections?.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <h3>Menu główne</h3>
      <button onClick={startLearning}>📘 Nauka</button>
      <button onClick={startQuiz}>🧩 Quiz – 4 opcje</button>
      <button onClick={startTest}>✍ Test – wpisywanie</button>
      <button onClick={startDifficult}>⚠ Powtórka trudnych</button>
      <button onClick={startIntelligent}>🤖 Tryb inteligentny</button>
      <button onClick={startPopQuiz}>🧪 Kartkówka</button>
      <button onClick={() => window.location.href = "/admin/login"}>
        🔧 Panel administracyjny
      </button>
    </div>
  );
}