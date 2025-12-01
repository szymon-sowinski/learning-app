export default function IntelligentBox({ word }) {
  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px",
      backgroundColor: "#ffd700",
      border: "2px solid #333",
      borderRadius: "8px",
      zIndex: 1000
    }}>
      <strong>Spróbuj jeszcze raz!</strong>
      <div>{word[1]} → {word[0]}</div>
    </div>
  );
}