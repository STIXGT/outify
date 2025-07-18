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

export default function CardOuting({ outing }: { outing: Outing }) {
  const getCategoryIcon = (category: string) => {
    const icons = {
      restaurant: "🍽️",
      bar: "🍺",
      cafe: "☕",
      entertainment: "🎬",
      outdoor: "🌳",
      cultural: "🎭",
      shopping: "🛍️",
      other: "📍",
    };
    return icons[category as keyof typeof icons] || "📍";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      restaurant: "bg-orange-100 text-orange-800",
      bar: "bg-purple-100 text-purple-800",
      cafe: "bg-amber-100 text-amber-800",
      entertainment: "bg-pink-100 text-pink-800",
      outdoor: "bg-green-100 text-green-800",
      cultural: "bg-indigo-100 text-indigo-800",
      shopping: "bg-blue-100 text-blue-800",
      other: "bg-gray-100 text-gray-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCategoryIcon(outing.category)}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {outing.title}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                  outing.category
                )}`}
              >
                {outing.category}
              </span>
            </div>
          </div>
          {outing.rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm font-semibold text-gray-700">
                {outing.rating}/5
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {outing.description}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-4 space-y-3">
        {/* Companions */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">👥</span>
          <span className="text-sm text-gray-600">
            {outing.companions.length === 0
              ? "Solo"
              : outing.companions.length === 1
              ? `Con ${outing.companions[0]}`
              : `Con ${outing.companions
                  .slice(0, -1)
                  .join(", ")} y ${outing.companions.slice(-1)}`}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📍</span>
          <span className="text-sm text-gray-600">{outing.location}</span>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">💰</span>
          <span className="text-sm text-gray-600">
            ${outing.budget.toLocaleString()}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">📅</span>
          <span className="text-sm text-gray-600">
            {outing.date.toLocaleDateString("es-ES", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Creado el {outing.createdAt.toLocaleDateString("es-ES")}
          </span>
          <div className="flex gap-2">
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Editar
            </button>
            <button className="text-xs text-red-600 hover:text-red-800 font-medium">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
