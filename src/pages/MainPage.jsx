import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import PopQuiz from "../components/PopQuiz";
import Learning from "../components/Learning";
import Quiz from "../components/Quiz";
import Test from "../components/Test";
import Difficult from "../components/Difficult";
import IntelligentLearning from "../components/IntelligentLearning";
import { fetchCollections, fetchWords } from "../service/fetchFunctions"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
const MainPage = () => {
    const [mode, setMode] = useState("menu");
    const [currentWord, setCurrentWord] = useState(null);
    const [difficult, setDifficult] = useState([]);
    const [showIntelligent, setShowIntelligent] = useState(null);
    const [groupId, setGroupId] = useState(3);

    const location = useLocation()

    const { data: collections } = useQuery({
        queryKey: ["collections"],
        queryFn: fetchCollections,
        staleTime: 1000 * 60 * 5
    });

    const { data: words1 = [] } = useQuery({
        queryKey: ["words", groupId],
        queryFn: () => fetchWords(groupId),
        enabled: !!groupId,
        staleTime: 1000 * 60 * 5
    });

    function getId() {
        const res = new URLSearchParams(location.search);
        const id = res.get("set")
        id ? setGroupId(parseInt(id)) : ""
    }


    const words = words1.map(item => [item.pl, item.de])

    const randomWord = (list = words) => {
        if (!list.length) return null;
        const idx = Math.floor(Math.random() * list.length);
        setCurrentWord(list[idx]);
        return list[idx];
    };

    useEffect(() => {
        getId()
    }, [groupId])


    return (
        <>
            {mode === "menu" && <Menu setMode={setMode} randomWord={randomWord} collections={collections} setGroupId={setGroupId} />}
            {mode === "learning" && (
                <Learning
                    currentWord={currentWord}
                    setCurrentWord={setCurrentWord}
                    randomWord={randomWord}
                    setMode={setMode}
                    difficult={difficult}
                    setDifficult={setDifficult}
                />
            )}
            {mode === "quiz" && (
                <Quiz
                    currentWord={currentWord}
                    setCurrentWord={setCurrentWord}
                    randomWord={randomWord}
                    setMode={setMode}
                    showIntelligent={showIntelligent}
                    setShowIntelligent={setShowIntelligent}
                    words={words}
                />
            )}
            {mode === "test" && (
                <Test
                    setMode={setMode}
                    showIntelligent={showIntelligent}
                    setShowIntelligent={setShowIntelligent}
                    words={words}
                />
            )}
            {mode === "difficult" && (
                <Difficult
                    currentWord={currentWord}
                    setCurrentWord={setCurrentWord}
                    difficult={difficult}
                    setDifficult={setDifficult}
                    setMode={setMode}
                    randomWord={randomWord}
                />
            )}
            {mode === "intelligent" && <IntelligentLearning setMode={setMode} words={words} />}
            {mode === "popQuiz" && <PopQuiz setMode={setMode} words={words} />}


        </>
    )
}

export default MainPage;