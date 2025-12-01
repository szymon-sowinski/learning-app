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

  return (
    <div id="app">
      <h2>MENU GŁÓWNE</h2>
      <button onClick={startLearning}>📘 Nauka</button>
      <button onClick={startQuiz}>🧩 Quiz – 4 opcje</button>
      <button onClick={startTest}>✍ Test – wpisywanie</button>
      <button onClick={startDifficult}>⚠ Powtórka trudnych</button>
    </div>
  );
}