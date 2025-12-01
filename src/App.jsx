import { useState } from "react";
import Menu from "./components/Menu";
import Learning from "./components/Learning";
import Quiz from "./components/Quiz";
import Test from "./components/Test";
import Difficult from "./components/Difficult";
import IntelligentBox from "./components/IntelligentBox";
import "./App.css";

export const words = [
  ["das Abi","matura"], ["die Anzeige","ogłoszenie"], ["die Arbeitsstunde","godzina pracy"],
  ["die Aushilfe","pomoc, pomocnik"], ["außerdem","oprócz tego"], ["ohne Barrieren","bez barier"],
  ["der Bereich","zakres, obszar"], ["die Berufs- und Studienorientierung","orientacja dotycząca zawodu i kierunku studiów"],
  ["das Berufsinformationszentrum","centrum orientacji zawodowej"], ["die Bewerbung","podanie o pracę"],
  ["die Bezahlung","zapłata"], ["der Briefumschlag","koperta"], ["darum","dlatego"], ["der Diebstahl","kradzież"],
  ["die Eisdiele","lodziarnia"], ["der Fahrgast","pasażer"], ["die Ferienschwimmschule","letnia szkółka pływania"],
  ["sich Gedanken machen","zastanawiać się"], ["die Gerechtigkeit","sprawiedliwość"], ["das Gericht","sąd"],
  ["die Hektik","pośpiech"], ["der Held","bohater"], ["im In- und Ausland","w kraju i za granicą"], ["das Jura","prawo (kierunek studiów)"],
  ["das Klischee","stereotyp"], ["den Knopf drücken","naciskać guzik"], ["Kontakte aufnehmen","nawiązywać kontakty"],
  ["der Kopierer","kopiarka"], ["der Kriminalfall","sprawa kryminalna"], ["der Kunde","klient"],
  ["die Prüfung","egzamin"], ["im Rahmen","w ramach"], ["die Saisonstelle","posada sezonowa"],
  ["die Schichtarbeit","praca w systemie zmianowym"], ["schließlich","w końcu"], ["der Schulabschluss","ukończenie szkoły"],
  ["die Schwäche","słaba strona, słabość"], ["das Softwareprogramm entwickeln","opracowywać oprogramowanie"],
  ["die Sommersaison","sezon letni"], ["sonst","w przeciwnym razie"], ["die Sportakademie","Akademia Sportu"],
  ["das Sportmanagement","kierownictwo sportu"], ["die Stärke","mocna strona"], ["Stärken zeigen","pokazywać mocne strony"],
  ["die Stelle","posada"], ["mit Stress umgehen","obchodzić się ze stresem"], ["das Studienangebot","oferta studiów"],
  ["das Studium abschließen","ukończyć studia"], ["die Tourismusbranche","branża turystyczna"], ["die Touristikagentur","agencja turystyczna"],
  ["Unterkunft und Verpflegung","nocleg i wyżywienie"], ["die Versicherung","ubezpieczenie"], ["der Vorteil","zaleta"],
  ["der Wandel","zmiana, przemiana"], ["der Zukunftsplan","plan na przyszłość"]
];

export default function App() {
  const [mode, setMode] = useState("menu");
  const [currentWord, setCurrentWord] = useState(null);
  const [difficult, setDifficult] = useState([]);
  const [showIntelligent, setShowIntelligent] = useState(null);

  const randomWord = (list = words) => {
    const idx = Math.floor(Math.random() * list.length);
    setCurrentWord(list[idx]);
    return list[idx];
  };

  return (
    <>
      {mode === "menu" && <Menu setMode={setMode} randomWord={randomWord} />}
      {mode === "learning" && <Learning currentWord={currentWord} setCurrentWord={setCurrentWord} randomWord={randomWord} setMode={setMode} difficult={difficult} setDifficult={setDifficult} />}
      {mode === "quiz" && <Quiz currentWord={currentWord} setCurrentWord={setCurrentWord} randomWord={randomWord} setMode={setMode} showIntelligent={showIntelligent} setShowIntelligent={setShowIntelligent} />}
      {mode === "test" && <Test currentWord={currentWord} setCurrentWord={setCurrentWord} randomWord={randomWord} setMode={setMode} showIntelligent={showIntelligent} setShowIntelligent={setShowIntelligent} />}
      {mode === "difficult" && <Difficult currentWord={currentWord} setCurrentWord={setCurrentWord} difficult={difficult} setDifficult={setDifficult} setMode={setMode} randomWord={randomWord} />}
      {showIntelligent && <IntelligentBox word={showIntelligent} />}
    </>
  );
}