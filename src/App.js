// App.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------------------
   Small reusable: Stars
   --------------------------- */
const Stars = ({ value = 0 }) => (
  <span className="inline-flex items-center gap-0.5" aria-hidden>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < value ? "text-yellow-400" : "text-slate-500"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.37-2.455a1 1 0 00-1.176 0l-3.37 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.063 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
      </svg>
    ))}
  </span>
);

/* ---------------------------
   Card: Juego (glass)
   --------------------------- */
const CuadroJuego = ({ juego, onEdit, onDelete, onToggle }) => {
  return (
    <article className="group bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-4 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center">
      <div className="w-36 h-44 mb-3 rounded-xl overflow-hidden shadow-inner border border-white/8">
        <img
          src={juego.portada || "https://via.placeholder.com/300x400?text=Cover"}
          alt={juego.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full">
        <h4 className="text-lg font-semibold text-white truncate">{juego.titulo}</h4>
        <p className="text-xs text-slate-300">{juego.plataforma} · {juego.genero}</p>

        <div className="flex items-center justify-center gap-2 mt-2">
          <Stars value={Math.round(juego.puntuacion)} />
          <span className="text-sm text-slate-300 ml-2">{juego.horas} hrs</span>
        </div>

        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => onToggle(juego)}
            aria-pressed={juego.completado}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
              juego.completado
                ? "bg-emerald-500/90 hover:bg-emerald-500 text-white"
                : "bg-slate-700/60 hover:bg-slate-600 text-white"
            }`}
          >
            {juego.completado ? "Completado" : "Pendiente"}
          </button>

          <button
            onClick={() => onEdit(juego)}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-400/90 hover:bg-amber-400 text-slate-900"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(juego)}
            className="px-3 py-1 rounded-full text-sm font-semibold bg-rose-500/90 hover:bg-rose-500 text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

/* ---------------------------
   Formulario - modal (glass)
   --------------------------- */
const FormularioJuego = ({ initial = {}, onCancel, onSubmit }) => {
  const safeInitial = initial || {};

  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    portada: "",
    puntuacion: 0,
    horas: 0,
    ...safeInitial,
  });
  const [preview, setPreview] = useState(safeInitial.portada || "");

  useEffect(() => {
    setForm(prev => ({ ...prev, ...safeInitial }));
    setPreview(safeInitial.portada || "");
  }, [safeInitial._id]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm({ ...form, portada: url });
  };

  const labelCls = "text-sm font-medium text-slate-300 mb-1";
  const inputCls =
    "p-2 rounded-lg bg-slate-700/40 text-white placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500 transition";

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-lg bg-slate-800/75 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl text-white"
    >
      <h3 className="text-2xl font-bold mb-4 text-center">
        {safeInitial._id ? "Editar juego" : "Agregar juego"}
      </h3>

      <div className="flex justify-center mb-4">
        <div className="w-36 h-44 rounded-lg overflow-hidden border border-white/10 bg-white/5 shadow-inner">
          <img
            src={preview || "https://via.placeholder.com/300x400?text=Portada"}
            alt="Portada previa"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Título</label>
          <input
            className={inputCls}
            placeholder="Ej: Hollow Knight"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            required
          />
        </div>

        <div>
          <label className={labelCls}>Plataforma</label>
          <input
            className={inputCls}
            placeholder="PC, PS5, Switch..."
            value={form.plataforma}
            onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Género</label>
          <input
            className={inputCls}
            placeholder="RPG, Indie..."
            value={form.genero}
            onChange={(e) => setForm({ ...form, genero: e.target.value })}
          />
        </div>

        <div>
          <label className={labelCls}>Portada (URL)</label>
          <input
            className={inputCls}
            placeholder="https://..."
            value={form.portada}
            onChange={(e) => {
              setForm({ ...form, portada: e.target.value });
              setPreview(e.target.value);
            }}
          />
        </div>

        <div className="col-span-2">
          <label className={labelCls}>Subir imagen (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full text-sm text-slate-300 file:bg-indigo-600 file:text-white file:px-3 file:py-1 file:rounded-md"
          />
        </div>

        <div>
          <label className={labelCls}>Puntuación (0 a 5)</label>
          <input
            type="number"
            min={0}
            max={5}
            className={inputCls}
            value={form.puntuacion}
            onChange={(e) => setForm({ ...form, puntuacion: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className={labelCls}>Horas</label>
          <input
            type="number"
            min={0}
            className={inputCls}
            value={form.horas}
            onChange={(e) => setForm({ ...form, horas: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-full bg-slate-600/70 hover:bg-slate-600 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 transition font-semibold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

/* ---------------------------
   App principal (Glassmorphism theme + fondo gamer)
   --------------------------- */
export default function App() {
  const [juegos, setJuegos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setJuegos([
      {
        _id: "1",
        titulo: "Hollow Knight",
        plataforma: "PC",
        genero: "Metroidvania",
        puntuacion: 5,
        horas: 120,
        completado: false,
        portada: "/assets/hollow.png",
      },
      {
        _id: "2",
        titulo: "Celeste",
        plataforma: "Switch",
        genero: "Plataforma",
        puntuacion: 4,
        horas: 80,
        completado: true,
        portada: "/assets/celeste.png",
      },
      {
        _id: "3",
        titulo: "Stardew Valley",
        plataforma: "PC",
        genero: "Simulación",
        puntuacion: 5,
        horas: 200,
        completado: false,
        portada: "/assets/stardew.png",
      },
    ]);
  }, []);

  const addOrUpdateJuego = (j) => {
    if (j._id) {
      setJuegos((prev) => prev.map((x) => (x._id === j._id ? { ...x, ...j } : x)));
    } else {
      setJuegos((prev) => [{ ...j, _id: Math.random().toString(36).slice(2) }, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteJuego = (j) => setJuegos((prev) => prev.filter((x) => x._id !== j._id));
  const toggleCompletado = (j) =>
    setJuegos((prev) => prev.map((x) => (x._id === j._id ? { ...x, completado: !x.completado } : x)));

  const generoCounts = juegos.reduce((acc, j) => {
    if (j.genero) acc[j.genero] = (acc[j.genero] || 0) + 1;
    return acc;
  }, {});
  const horasData = juegos.map((j) => ({ titulo: j.titulo, horas: j.horas }));
  const dataGenero = Object.keys(generoCounts).map((g) => ({ genero: g, cantidad: generoCounts[g] }));
  const COLORS = ["#7C3AED", "#60A5FA", "#A78BFA", "#34D399", "#F59E0B"];

  return (
    <>
      {/* Fondo gamer */}
      <div
        className="min-h-screen text-white p-8 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/gamer-bg.jpg')" }}
      >
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 max-w-6xl mx-auto relative">
  {/* Título grande */}
  <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-indigo-400 to-cyan-400 drop-shadow-lg">
    Gametracker
  </h1>

  {/* Contenedor botón + ticker animado */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    {/* Botón principal */}
 
    {/* Texto animado tipo ticker */}
    <div className="mt-3 md:mt-0 overflow-hidden w-full md:w-80 h-10 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 relative">
      <span className="absolute whitespace-nowrap animate-scroll text-white font-semibold uppercase tracking-wider drop-shadow-md">
         🚀Tus juegos organizados🚀
      </span>
    </div>
  </div>
</header>


          {/* Main */}
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cards */}
            <section className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {juegos.map((j) => (
                  <CuadroJuego
                    key={j._id}
                    juego={j}
                    onEdit={(j) => {
                      setEditing(j);
                      setShowForm(true);
                    }}
                    onDelete={deleteJuego}
                    onToggle={toggleCompletado}
                  />
                ))}
              </div>
            </section>

            {/* Stats + botón */}
            <aside className="space-y-6">
              <div className="flex justify-center">
                <button
                  onClick={() => { setEditing(null); setShowForm(true); }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg text-white font-semibold transition-transform transform hover:-translate-y-0.5"
                >
                  + Añadir nuevo juego
                </button>
              </div>

              <div className="bg-white/6 backdrop-blur-md border border-white/8 p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold">Resumen</h3>
                <div className="mt-3 text-slate-300 text-sm">
                  <p>Total juegos: <span className="text-white font-semibold">{juegos.length}</span></p>
                  <p>Horas totales: <span className="text-white font-semibold">{juegos.reduce((s, x) => s + (x.horas || 0), 0)}</span></p>
                  <p>Completados: <span className="text-white font-semibold">{juegos.filter(x => x.completado).length}</span></p>
                </div>
              </div>

              <div className="bg-white/6 backdrop-blur-md border border-white/8 p-4 rounded-2xl shadow-md h-64">
                <h3 className="text-lg font-semibold mb-2">Juegos por Género</h3>
                <div className="w-full h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dataGenero} dataKey="cantidad" nameKey="genero" cx="50%" cy="50%" outerRadius={60} label>
                        {dataGenero.map((entry, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white/6 backdrop-blur-md border border-white/8 p-4 rounded-2xl shadow-md h-64">
                <h3 className="text-lg font-semibold mb-2">Horas Jugadas</h3>
                <div className="w-full h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={horasData}>
                      <XAxis dataKey="titulo" stroke="#cbd5e1" />
                      <YAxis stroke="#cbd5e1" />
                      <Tooltip wrapperClassName="text-slate-900" />
                      <Bar dataKey="horas" fill="#60A5FA" radius={[6, 6, 6, 6]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </aside>
          </main>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                aria-hidden
              ></div>

              <div className="relative z-10 w-full max-w-3xl">
                <FormularioJuego
                  initial={editing}
                  onCancel={() => { setShowForm(false); setEditing(null); }}
                  onSubmit={(payload) => addOrUpdate(payload)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <AddOrUpdateHelper setJuegos={setJuegos} juegos={juegos} />
    </>
  );

  function addOrUpdate(payload) {
    if (payload._id) {
      setJuegos((prev) => prev.map((x) => (x._id === payload._id ? { ...x, ...payload } : x)));
    } else {
      setJuegos((prev) => [{ ...payload, _id: Math.random().toString(36).slice(2) }, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  }
}

function AddOrUpdateHelper({ setJuegos, juegos }) {
  return null;
}
