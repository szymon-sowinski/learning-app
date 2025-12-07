const CollectionCard = ({ name, word_count, modified_at, onClick }) => {
    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div style={{
            width: 240,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            color: "#000"
        }} onClick={onClick}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {name}
            </div>

            <div style={{ fontSize: 14 }}>
                Fiszek: {word_count}
            </div>

            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                {formatDate(modified_at)}
            </div>
        </div>
    );
};

export default CollectionCard;
