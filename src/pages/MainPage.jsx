import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import Menu from "../components/Menu";
import PopQuiz from "../components/PopQuiz";
import Learning from "../components/Learning";
import Quiz from "../components/Quiz";
import Test from "../components/Test";
import Difficult from "../components/Difficult";
import IntelligentLearning from "../components/IntelligentLearning";

import { fetchCollections, fetchWords, fetchSubgroups } from "../service/fetchFunctions";

const MainPage = () => {
    const [mode, setMode] = useState("menu");
    const [currentWord, setCurrentWord] = useState(null);
    const [difficult, setDifficult] = useState([]);
    const [showIntelligent, setShowIntelligent] = useState(null);

    const location = useLocation();

    const params = useMemo(() => {
        const p = new URLSearchParams(location.search);
        return {
            groupId: parseInt(p.get("set")) || 1,
            subgroupId: Number(p.get("sub") ?? 0)
        };
    }, [location.search]);

    const { groupId, subgroupId } = params;

    const { data: collections = [] } = useQuery({
        queryKey: ["collections"],
        queryFn: fetchCollections,
        staleTime: 1000 * 60 * 5
    });

    const { data: subgroups = [] } = useQuery({
        queryKey: ["subgroups"],
        queryFn: fetchSubgroups,
        staleTime: 1000 * 60 * 5
    });

    const { data: words = [] } = useQuery({
        queryKey: ["words", groupId, subgroupId],
        queryFn: () => fetchWords(groupId, subgroupId),
        enabled: !!groupId,
        staleTime: 1000 * 60 * 5
    });

    const mappedWords = useMemo(
        () => words.map(w => [w.pl, w.de, w.id]),
        [words]
    );

    const randomWord = (list = mappedWords) => {
        if (!list.length) return null;
        const idx = Math.floor(Math.random() * list.length);
        const word = list[idx];
        setCurrentWord(word);
        return word;
    };

    return (
        <>
            {mode === "menu" && (
                <Menu
                    setMode={setMode}
                    randomWord={randomWord}
                    collections={collections}
                    subgroups={subgroups}
                />
            )}

            {mode === "learning" && (
                <Learning
                    setMode={setMode}
                    words={mappedWords}
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
                    words={mappedWords}
                />
            )}

            {mode === "test" && (
                <Test
                    setMode={setMode}
                    showIntelligent={showIntelligent}
                    setShowIntelligent={setShowIntelligent}
                    words={mappedWords}
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
            {mode === "intelligent" && <IntelligentLearning setMode={setMode} words={mappedWords} />}
            {mode === "popQuiz" && <PopQuiz setMode={setMode} words={mappedWords} />}
        </>
    );
};

export default MainPage;