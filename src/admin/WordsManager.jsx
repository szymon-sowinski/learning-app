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
        selectedCollection && words ? <WordsEditor words={words} collection={selectedCollection} /> : ""
      }
    </div>
  );
}