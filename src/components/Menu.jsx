import { useNavigate, useLocation } from "react-router-dom";

export default function Menu({
  setMode,
  collections,
  subgroups = []
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const groupId = parseInt(params.get("set")) || 1;
  const subgroupId = Number(params.get("sub") ?? 0);

  const setGroup = (id) => {
    navigate(`?set=${id}&sub=0`);
  };

  const setSubgroup = (id) => {
    navigate(`?set=${groupId}&sub=${id}`);
  };

  const start = (mode) => {
    setMode(mode);
  };

  return (
    <div id="app">
      <h2 className="appHeading">Wordfly</h2>

      {/* GROUP */}
      <select value={groupId} onChange={(e) => setGroup(e.target.value)}>
        {collections?.map((el) => (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      {/* SUBGROUP */}
      <select value={subgroupId} onChange={(e) => setSubgroup(e.target.value)}>
        <option value={0}>Wszystkie w grupie</option>
        {subgroups
          .filter(s => s.id_group === groupId)
          .map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
      </select>

      <h3>Menu główne</h3>

      <button onClick={() => start("learning")}>📘 Nauka</button>
      <button onClick={() => start("quiz")}>🧩 Quiz – 4 opcje</button>
      <button onClick={() => start("test")}>✍ Test – wpisywanie</button>
      <button onClick={() => start("difficult")}>⚠ Powtórka trudnych</button>
      <button onClick={() => start("intelligent")}>🤖 Tryb inteligentny</button>
      <button onClick={() => start("popQuiz")}>🧪 Kartkówka</button>

      <button onClick={() => window.location.href = "/admin/login"}>
        🔧 Panel administracyjny
      </button>
    </div>
  );
}