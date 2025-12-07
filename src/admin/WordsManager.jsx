import { useState, useEffect } from 'react';
import './admin.css';
import CollectionCard from '../components/WordManager/CollectionCard';
import { fetchCollections, fetchWords } from '../service/fetchFunctions';
import { useQuery } from "@tanstack/react-query";
import WordsEditor from '../components/WordManager/WordsEditor';
export default function WordsManager() {

  const [selectedCollection, setSelectedCollection] = useState(null)


  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 5
  });

  const { data: words = [], refetch: words_refetch } = useQuery({
    queryKey: ["words", selectedCollection],
    queryFn: () => fetchWords(selectedCollection),
    enabled: !!selectedCollection,
    staleTime: 1000 * 60 * 5
  });



  return (
    <div className="admin-panel">
      <h2>📝 Zarządzanie fiszkami</h2>

      <h3>Kolekcje</h3>
      <div style={{
        display: "flex",
        gap: 10,
        margin: "1rem"
      }} >
        {
          collections?.map(item => <CollectionCard {...item} onClick={() => { setSelectedCollection(item.id) }} />)
        }

      </div>

      <h3 style={{ color: "black" }}>Wybrana kolekcja: {selectedCollection ? collections.find(collection => collection.id === selectedCollection).name : "Brak"}</h3>

      {
        selectedCollection && words ? <WordsEditor words={words} /> : ""
      }

      <div className="words-actions">
        <input
          type="text"
          placeholder="Niemieckie"
        />
        <input
          type="text"
          placeholder="Polskie"
        />
        <button className="admin-btn">Export JSON</button>
        <input type="file" />
      </div>

      <input
        type="text"
        placeholder="Szukaj słówek..."
        style={{ margin: '10px 0', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
      />

      <div className="words-list">
      </div>
    </div>
  );
}