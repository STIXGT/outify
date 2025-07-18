import CardOuting from "./card-outing";

interface Outing {
  id: string;
  title: string;
  description: string;
  companions: string[];
  budget: number;
  location: string;
  date: Date;
  createdAt: Date;
  category:
    | "restaurant"
    | "bar"
    | "cafe"
    | "entertainment"
    | "outdoor"
    | "cultural"
    | "shopping"
    | "other";
  rating?: number;
}

// Datos de ejemplo
const sampleOutings: Outing[] = [
  {
    id: "1",
    title: "Cena en La Bistecca",
    description:
      "Una cena increíble con cortes de carne premium y vinos selectos. El ambiente era perfecto para una celebración especial.",
    companions: ["María", "Carlos"],
    budget: 15000,
    location: "Zona Rosa, CDMX",
    date: new Date("2024-12-15"),
    createdAt: new Date("2024-12-16"),
    category: "restaurant",
    rating: 5,
  },
  {
    id: "2",
    title: "Concierto de Jazz",
    description:
      "Noche de jazz en vivo con músicos locales. La acústica del lugar era excelente y el ambiente muy relajado.",
    companions: [],
    budget: 800,
    location: "Centro Cultural, Roma Norte",
    date: new Date("2024-12-10"),
    createdAt: new Date("2024-12-11"),
    category: "entertainment",
    rating: 4,
  },
  {
    id: "3",
    title: "Café y trabajo",
    description:
      "Sesión de trabajo productiva en un café acogedor. Perfecto para concentrarse y disfrutar un buen espresso.",
    companions: ["Ana"],
    budget: 320,
    location: "Starbucks, Polanco",
    date: new Date("2024-12-08"),
    createdAt: new Date("2024-12-08"),
    category: "cafe",
    rating: 3,
  },
  {
    id: "4",
    title: "Senderismo en el Ajusco",
    description:
      "Día completo de senderismo con vistas espectaculares de la ciudad. El clima fue perfecto para la actividad.",
    companions: ["Pedro", "Luis", "Sofia"],
    budget: 500,
    location: "Parque Nacional Ajusco",
    date: new Date("2024-12-05"),
    createdAt: new Date("2024-12-05"),
    category: "outdoor",
    rating: 5,
  },
];

export default function OutingsGrid() {
  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Outify
            </h1>
          </div>
          <p className="text-gray-400 ml-11 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Aqui tus salidas!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl shadow-lg border transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Salidas</p>
              <p className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                {sampleOutings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2930] p-6 rounded-xl shadow-lg border border-[#382B50] hover:border-green-500/50 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Gasto Total</p>
              <p className="text-2xl font-bold text-white group-hover:text-green-200 transition-colors">
                $
                {sampleOutings
                  .reduce((sum, outing) => sum + outing.budget, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2930] p-6 rounded-xl shadow-lg border border-[#382B50] hover:border-yellow-500/50 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Rating Promedio</p>
              <p className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors">
                {(
                  sampleOutings
                    .filter((o) => o.rating)
                    .reduce((sum, outing) => sum + (outing.rating || 0), 0) /
                  sampleOutings.filter((o) => o.rating).length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2930] p-6 rounded-xl shadow-lg border border-[#382B50] hover:border-pink-500/50 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">AI Favorita</p>
              <p className="text-xl font-bold text-white group-hover:text-pink-200 transition-colors">
                Restaurantes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Filters */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
          Filtros Inteligentes
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button className="bg-[#382B50]/50 hover:bg-[#382B50] text-gray-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-[#382B50] hover:border-purple-500/50 backdrop-blur-sm">
            🤖 Todas
          </button>
          <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-orange-500/30 hover:border-orange-500/60 backdrop-blur-sm">
            🍽️ Restaurantes
          </button>
          <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-purple-500/30 hover:border-purple-500/60 backdrop-blur-sm">
            🍺 Bares
          </button>
          <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-green-500/30 hover:border-green-500/60 backdrop-blur-sm">
            🌳 Outdoor
          </button>
          <button className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-pink-500/30 hover:border-pink-500/60 backdrop-blur-sm">
            🎬 Entretenimiento
          </button>
        </div>
      </div>

      {/* Outings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleOutings.map((outing) => (
          <CardOuting key={outing.id} outing={outing} />
        ))}
      </div>
    </div>
  );
}
