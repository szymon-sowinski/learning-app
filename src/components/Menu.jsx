export default function Menu({ setMode, randomWord }) {
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

  return (
    <div id="app">
      <h2 class="appHeading">Wordfly</h2>
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