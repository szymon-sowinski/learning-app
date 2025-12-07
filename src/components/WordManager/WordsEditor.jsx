import { useEffect, useState } from "react";

import { putChanges } from "../../service/fetchFunctions";

export default function WordsEditor({ words, collection }) {
    const [localWords, setLocalWords] = useState([]);
    const [changes, setChanges] = useState({
        added: [],
        updated: [],
        deleted: []
    });

    useEffect(() => {
        setLocalWords(words);
    }, [words]);

    const handleEdit = (id, field, value) => {
        setLocalWords(prev =>
            prev.map(w => w.id === id ? { ...w, [field]: value } : w)
        );

        // jeśli to nowy rekord → aktualizuj tylko w added
        if (typeof id === "string" && id.startsWith("temp_")) {
            setChanges(prev => ({
                ...prev,
                added: prev.added.map(w =>
                    w.id === id ? { ...w, [field]: value } : w
                )
            }));
            return;
        }

        // tylko istniejące id lecą do updated
        setChanges(prev => {
            const existing = prev.updated.find(w => w.id === id);

            if (existing) {
                return {
                    ...prev,
                    updated: prev.updated.map(w =>
                        w.id === id ? { ...w, [field]: value } : w
                    )
                };
            }

            const original = words.find(w => w.id === id);
            return {
                ...prev,
                updated: [...prev.updated, { ...original, [field]: value }]
            };
        });
    };

    const handleDelete = (id) => {
        setLocalWords(prev => prev.filter(w => w.id !== id));

        // jeśli to NOWE słowo — tylko usuwamy z added
        if (typeof id === "string" && id.startsWith("temp_")) {
            setChanges(prev => ({
                ...prev,
                added: prev.added.filter(w => w.id !== id)
            }));
            return;
        }

        // jeśli istniejące → normalny delete
        setChanges(prev => ({
            ...prev,
            deleted: [...prev.deleted, id],
            updated: prev.updated.filter(w => w.id !== id)
        }));
    };


    const handleAdd = () => {
        const tempId = "temp_" + crypto.randomUUID();

        const newWord = {
            id: tempId,
            de: "",
            pl: ""
        };

        setLocalWords(prev => [...prev, newWord]);

        setChanges(prev => ({
            ...prev,
            added: [...prev.added, newWord]
        }));
    };

    const handleSave = async () => {
        console.log("DO ZAPISU:");
        console.log("DODANE:", changes.added);
        console.log("ZMODYFIKOWANE:", changes.updated);
        console.log("USUNIĘTE ID:", changes.deleted);


        await putChanges(collection, changes)

        // tutaj później podłączysz API
    };

    return (
        <div>

            <div style={{ marginTop: 10 }}>
                {localWords.map(word => (
                    <div
                        key={word.id}
                        style={{
                            display: "flex",
                            gap: 10,
                            marginBottom: 6,
                            alignItems: "center"
                        }}
                    >
                        <input
                            value={word.de}
                            onChange={(e) => handleEdit(word.id, "de", e.target.value)}
                            placeholder="DE"
                        />

                        <input
                            value={word.pl}
                            onChange={(e) => handleEdit(word.id, "pl", e.target.value)}
                            placeholder="PL"
                        />

                        <button onClick={() => handleDelete(word.id)}>🗑</button>
                    </div>
                ))}
            </div>

            <button onClick={handleAdd}>➕ Dodaj słowo</button>

            <button
                onClick={handleSave}
                style={{ marginTop: 20 }}
            >
                💾 ZAPISZ ZMIANY
            </button>

        </div>
    );
}
