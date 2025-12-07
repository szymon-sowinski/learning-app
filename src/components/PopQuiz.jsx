import { useEffect, useState } from "react";

export default function Kartkowka({ setMode, words }) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [writeQuestions, setWriteQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [reviewStep, setReviewStep] = useState(0);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    const quizQ = shuffled.slice(0, 10);
    const writeQ = shuffled.slice(10, 20);

    const quizWithOptions = quizQ.map(([pl, de]) => {
      const options = [
        de,
        ...words
          .filter(w => w[0] !== pl)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w[1])
      ].sort(() => Math.random() - 0.5);

      return { pl, de, options };
    });

    setQuizQuestions(quizWithOptions);
    setWriteQuestions(writeQ);
  }, []);

  const totalSteps = 20;

  const handleQuizAnswer = (selected, correct) => {
    setUserAnswers(prev => [...prev, { type: 'quiz', question: quizQuestions[step].pl, user: selected, correct }]);
    if (selected === correct) {
      setScore(prev => prev + 1);
    }
    setStep(step + 1);
  };

  const handleWriteAnswer = (correct) => {
    const user = answer.trim();
    const full = correct;

    const hasArticle = full.includes(" ");

    let points = 0;
    if (user.toLowerCase() === full.toLowerCase()) points = 1;
    else if (hasArticle && user.toLowerCase() === full.split(" ").slice(1).join(" ").toLowerCase()) points = 0.5;
    setScore(prev => prev + points);

    setUserAnswers(prev => [...prev, { type: 'write', question: w[0], user, correct }]);

    setAnswer("");
    setStep(step + 1);
  };

  if (quizQuestions.length === 0 || writeQuestions.length === 0) {
    return <div id="app"><p>Ładowanie kartkówki...</p></div>;
  }

  if (step === totalSteps && !reviewMode) {
    const percent = Math.round((score / totalSteps) * 100);

    return (
      <div id="app" style={{ color: '#000' }}>
        <h2>📊 Wynik kartkówki</h2>
        <h3>{score} / {totalSteps} punktów ({percent}%)</h3>
        <button onClick={() => { setReviewMode(true); setReviewStep(0); }}>Pokaż wszystkie odpowiedzi</button>
        <button className="back" onClick={() => setMode("menu")}>⏪ Powrót do menu</button>
      </div>
    );
  }

  if (reviewMode) {
    const currentReview = userAnswers[reviewStep];
    const isCorrect = currentReview.user.toLowerCase() === currentReview.correct.toLowerCase() || 
                      (currentReview.type === 'write' && currentReview.correct.includes(" ") && currentReview.user.toLowerCase() === currentReview.correct.split(" ").slice(1).join(" ").toLowerCase());

    return (
      <div id="app" style={{ color: '#000' }}>
        <h2>📖 Przegląd odpowiedzi</h2>
        <h3>Pytanie {reviewStep + 1} / {userAnswers.length}</h3>
        <p><strong>Polskie słowo:</strong> {currentReview.question}</p>
        {currentReview.type === 'quiz' ? (
          <div>
            <p><strong>Odpowiedzi:</strong></p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {quizQuestions.find(q => q.pl === currentReview.question).options.map((opt, i) => {
                const isUser = opt === currentReview.user;
                const isCorrectOpt = opt === currentReview.correct;
                let style = { padding: '5px', borderRadius: '4px', border: '1px solid #ccc' };
                if (isUser && isCorrectOpt) {
                  style = { ...style, backgroundColor: '#c8e6c9', borderColor: '#388e3c', fontWeight: 'bold' };
                } else if (isUser && !isCorrectOpt) {
                  style = { ...style, backgroundColor: '#ffcdd2', borderColor: '#d32f2f', fontWeight: 'bold' };
                } else if (isCorrectOpt) {
                  style = { ...style, backgroundColor: '#e3f2fd', borderColor: '#1976d2' }; 
                }
                return (
                  <div key={i} style={style}>
                    {opt} {isUser ? "(Twoja odpowiedź)" : ""} {isCorrectOpt && !isUser ? "(Poprawna odpowiedź)" : ""}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <p><strong>Twoja odpowiedź:</strong> <span style={{ fontWeight: 'bold', color: isCorrect ? '#388e3c' : '#d32f2f' }}>{currentReview.user || "(brak odpowiedzi)"}</span></p>
            <p><strong>Poprawna odpowiedź:</strong> {currentReview.correct}</p>
          </div>
        )}
        <div style={{ marginTop: '15px' }}>
          {reviewStep + 1 < userAnswers.length ? (
            <button onClick={() => setReviewStep(reviewStep + 1)}>Dalej →</button>
          ) : (
            <button className="back" onClick={() => setMode("menu")}>⏪ Powrót do menu</button>
          )}
        </div>
      </div>
    );
  }

  if (step < 10) {
    const q = quizQuestions[step];
    return (
      <div id="app" style={{ color: '#000' }}>
        <h2>📘 Pytanie {step + 1} / 20</h2>
        <div className="word">{q.pl}</div>

        {q.options.map((opt, i) => {
          const userAnswerObj = userAnswers.find(ua => ua.question === q.pl && ua.type === 'quiz');
          const isUser = userAnswerObj && userAnswerObj.user === opt;
          const isCorrect = opt === q.de;
          let style = {};
          if (isUser && isCorrect) {
            style = { backgroundColor: '#c8e6c9', fontWeight: 'bold' };
          } else if (isUser && !isCorrect) {
            style = { backgroundColor: '#ffcdd2', fontWeight: 'bold' };
          } else if (isCorrect && reviewMode) {
            style = { backgroundColor: '#e3f2fd' }; 
          }
          return (
            <button key={i} onClick={() => handleQuizAnswer(opt, q.de)} style={style} disabled={!!userAnswerObj}>
              {opt} {isUser ? " (Twoja odpowiedź)" : ""}
            </button>
          );
        })}
      </div>
    );
  }

  const writeIndex = step - 10;
  const w = writeQuestions[writeIndex];
  const userAnswerObj = userAnswers.find(ua => ua.question === w[0] && ua.type === 'write');
  const isCorrectWrite = userAnswerObj && (userAnswerObj.user.toLowerCase() === userAnswerObj.correct.toLowerCase() || 
    (userAnswerObj.correct.includes(" ") && userAnswerObj.user.toLowerCase() === userAnswerObj.correct.split(" ").slice(1).join(" ").toLowerCase()));

  return (
    <div id="app" style={{ color: '#000' }}>
      <h2>✍ Pytanie {step + 1} / 20</h2>
      <div className="word">{w[0]}</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', gap: '5px' }}>
        <button onClick={() => setAnswer(prev => prev + "ä")} style={{ width: '40px', padding: '5px' }}>ä</button>
        <button onClick={() => setAnswer(prev => prev + "ö")} style={{ width: '40px', padding: '5px' }}>ö</button>
        <button onClick={() => setAnswer(prev => prev + "ü")} style={{ width: '40px', padding: '5px' }}>ü</button>
        <button onClick={() => setAnswer(prev => prev + "ß")} style={{ width: '40px', padding: '5px' }}>ß</button>
      </div>

      <input
        type="text"
        placeholder="Wpisz tłumaczenie"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={!!userAnswerObj}
        style={userAnswerObj ? { backgroundColor: isCorrectWrite ? '#c8e6c9' : '#ffcdd2' } : {}}
      />

      {userAnswerObj && (
        <p>
          Twoja odpowiedź: <span style={{ fontWeight: 'bold', color: isCorrectWrite ? '#388e3c' : '#d32f2f' }}>{userAnswerObj.user || "(brak odpowiedzi)"}</span><br />
          Poprawna odpowiedź: {userAnswerObj.correct}
        </p>
      )}

      <button onClick={() => handleWriteAnswer(w[1])} disabled={!!userAnswerObj}>Dalej →</button>
    </div>
  );
}