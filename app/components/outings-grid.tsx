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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tus Salidas!</h1>
          <p className="text-gray-300 mt-1">
            Historial de todas tus aventuras y encuentros
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <div>
              <p className="text-sm text-gray-600">Total Salidas</p>
              <p className="text-xl font-bold text-gray-900">
                {sampleOutings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm text-gray-600">Gasto Total</p>
              <p className="text-xl font-bold text-gray-900">
                $
                {sampleOutings
                  .reduce((sum, outing) => sum + outing.budget, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-sm text-gray-600">Rating Promedio</p>
              <p className="text-xl font-bold text-gray-900">
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

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-sm text-gray-600">Favorita</p>
              <p className="text-xl font-bold text-gray-900">Restaurantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Todas
        </button>
        <button className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          🍽️ Restaurantes
        </button>
        <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          🍺 Bares
        </button>
        <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          🌳 Outdoor
        </button>
        <button className="bg-pink-100 hover:bg-pink-200 text-pink-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          🎬 Entretenimiento
        </button>
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
