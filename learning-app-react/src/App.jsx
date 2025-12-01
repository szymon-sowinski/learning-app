import { useState } from "react";
import "./App.css";

const words = [
  ["das Abi","matura","",""],
  ["die Anzeige","ogłoszenie","",""],
  ["die Arbeitsstunde","godzina pracy","",""],
  ["die Aushilfe","pomoc, pomocnik","",""],
  ["außerdem","oprócz tego","",""],
  ["ohne Barrieren","bez barier","",""],
  ["der Bereich","zakres, obszar","",""],
  ["die Berufs- und Studienorientierung","orientacja dotycząca zawodu i kierunku studiów","",""],
  ["das Berufsinformationszentrum","centrum orientacji zawodowej","",""],
  ["die Bewerbung","podanie o pracę","",""],
  ["die Bezahlung","zapłata","",""],
  ["der Briefumschlag","koperta","",""],
  ["darum","dlatego","",""],
  ["der Diebstahl","kradzież","",""],
  ["die Eisdiele","lodziarnia","",""],
  ["der Fahrgast","pasażer","",""],
  ["die Ferienschwimmschule","letnia szkółka pływania","",""],
  ["sich Gedanken machen","zastanawiać się","",""],
  ["die Gerechtigkeit","sprawiedliwość","",""],
  ["das Gericht","sąd","",""],
  ["die Hektik","pośpiech","",""],
  ["der Held","bohater","",""],
  ["im In- und Ausland","w kraju i za granicą","",""],
  ["das Jura","prawo (kierunek studiów)","",""],
  ["das Klischee","stereotyp","",""],
  ["den Knopf drücken","naciskać guzik","",""],
  ["Kontakte aufnehmen","nawiązywać kontakty","",""],
  ["der Kopierer","kopiarka","",""],
  ["der Kriminalfall","sprawa kryminalna","",""],
  ["der Kunde","klient","",""],
  ["die Prüfung","egzamin","",""],
  ["im Rahmen","w ramach","",""],
  ["die Saisonstelle","posada sezonowa","",""],
  ["die Schichtarbeit","praca w systemie zmianowym","",""],
  ["schließlich","w końcu","",""],
  ["der Schulabschluss","ukończenie szkoły","",""],
  ["die Schwäche","słaba strona, słabość","",""],
  ["das Softwareprogramm entwickeln","opracowywać oprogramowanie","",""],
  ["die Sommersaison","sezon letni","",""],
  ["sonst","w przeciwnym razie","",""],
  ["die Sportakademie","Akademia Sportu","",""],
  ["das Sportmanagement","kierownictwo sportu","",""],
  ["die Stärke","mocna strona","",""],
  ["Stärken zeigen","pokazywać mocne strony","",""],
  ["die Stelle","posada","",""],
  ["mit Stress umgehen","obchodzić się ze stresem","",""],
  ["das Studienangebot","oferta studiów","",""],
  ["das Studium abschließen","ukończyć studia","",""],
  ["die Tourismusbranche","branża turystyczna","",""],
  ["die Touristikagentur","agencja turystyczna","",""],
  ["Unterkunft und Verpflegung","nocleg i wyżywienie","",""],
  ["die Versicherung","ubezpieczenie","",""],
  ["der Vorteil","zaleta","",""],
  ["der Wandel","zmiana, przemiana","",""],
  ["der Zukunftsplan","plan na przyszłość","",""]
];

export default function App() {
  const [mode, setMode] = useState("menu");
  const [currentWord, setCurrentWord] = useState(null);
  const [difficult, setDifficult] = useState([]);
  const [stats, setStats] = useState({ scores: {}, history: [] });
  const [quizCardWords, setQuizCardWords] = useState([]);
  const [quizCardIndex, setQuizCardIndex] = useState(0);
  const [quizCardScore, setQuizCardScore] = useState(0);
  const [showIntelligent, setShowIntelligent] = useState(null);

  const randomWord = (list = words) => {
    const idx = Math.floor(Math.random() * list.length);
    setCurrentWord(list[idx]);
    return list[idx];
  };

  const startLearning = () => {
    randomWord();
    setMode("learning");
  };

  const markDifficult = (word) => {
    if (!difficult.includes(word)) setDifficult([...difficult, word]);
    alert("Dodano do trudnych ✔");
  };

  const startQuiz = () => {
    const w = randomWord();
    const correct = w[0];
    let answers = [correct];
    while (answers.length < 4) {
      const r = words[Math.floor(Math.random() * words.length)][0];
      if (!answers.includes(r)) answers.push(r);
    }
    setCurrentWord({ ...w, answers: answers.sort(() => Math.random() - 0.5) });
    setMode("quiz");
  };

  const checkAnswer = (answer) => {
    if (!currentWord) return;
    if (answer === currentWord[0]) {
      setShowIntelligent(currentWord);
      setTimeout(() => {
        setShowIntelligent(null);
        startQuiz();
      }, 3500);
    } else {
      alert("❌ ŹLE!");
    }
  };

  const startTest = () => {
    randomWord();
    setMode("test");
  };

  const checkTestAnswer = (user) => {
    if (user.trim().toLowerCase() === currentWord[0].toLowerCase()) {
      setShowIntelligent(currentWord);
      setTimeout(() => {
        setShowIntelligent(null);
        startTest();
      }, 3500);
    } else {
      alert(`❌ ŹLE!\nPoprawna odpowiedź: ${currentWord[0]}`);
    }
  };

  const startDifficult = () => {
    if (difficult.length === 0) {
      alert("Nie masz trudnych słówek!");
      return setMode("menu");
    }
    const w = words.find(w => w[0] === difficult[Math.floor(Math.random() * difficult.length)]);
    setCurrentWord(w);
    setMode("difficult");
  };

  const removeDifficult = (word) => {
    setDifficult(difficult.filter(x => x !== word));
    alert("Usunięto ✔");
    startDifficult();
  };

  if (mode === "menu") {
    return (
      <div id="app">
        <h2>MENU GŁÓWNE</h2>
        <button onClick={startLearning}>📘 Nauka</button>
        <button onClick={startQuiz}>🧩 Quiz – 4 opcje</button>
        <button onClick={startTest}>✍ Test – wpisywanie</button>
        <button onClick={startDifficult}>⚠ Powtórka trudnych</button>
        {}
      </div>
    );
  }

  if (mode === "learning") {
    return (
      <div id="app">
        <h2>📘 Nauka</h2>
        <div className="word">{currentWord[1]}</div>
        <div className="small">Tłumaczenie:</div>
        <div className="translation">{currentWord[0]}</div>
        <button onClick={startLearning}>Następne słówko</button>
        <button onClick={() => markDifficult(currentWord[0])}>Dodaj do trudnych</button>
        <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
      </div>
    );
  }

  if (mode === "quiz") {
    return (
      <div id="app">
        <h2>🧩 Quiz – wybierz</h2>
        <div className="word">{currentWord[1]}</div>
        {currentWord.answers.map(a => (
          <button key={a} className="option" onClick={() => checkAnswer(a)}>{a}</button>
        ))}
        <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>

        {showIntelligent && (
          <div id="intelligentBoxOverlay">
            <div id="intelligentBox">
              <div className="word">{showIntelligent[1]}</div>
              <div className="translation">{showIntelligent[0]}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (mode === "test") {
    return (
      <div id="app">
        <h2>✍ Test</h2>
        <div className="word">{currentWord[1]}</div>
        <input type="text" id="inputTest" placeholder="Twoja odpowiedź" />
        <button onClick={() => {
          const user = document.getElementById("inputTest").value;
          checkTestAnswer(user);
        }}>Sprawdź</button>
        <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
      </div>
    );
  }

  if (mode === "difficult") {
    return (
      <div id="app">
        <h2>⚠ Trudne słowa</h2>
        <div className="word">{currentWord[1]}</div>
        <div className="translation">{currentWord[0]}</div>
        <button onClick={startDifficult}>Następne</button>
        <button onClick={() => removeDifficult(currentWord[0])}>Usuń z trudnych</button>
        <button className="back" onClick={() => setMode("menu")}>⏪ Menu</button>
      </div>
    );
  }

  return null;
}