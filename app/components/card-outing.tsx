interface Partner {
  name: string;
  historialOutings: Outing[];
}

interface Outing {
  title: string;
  description: string;
  location: string;
  valoration: number; // Rating del 1-10
  amountSpent: number;
  partners: Partner[];
}

export default function CardOuting({ outing }: { outing: Outing }) {
  // Función para determinar la categoría basada en keywords en título/descripción
  const inferCategory = (title: string, description: string) => {
    const text = `${title} ${description}`.toLowerCase();

    if (
      text.includes("restaurante") ||
      text.includes("cena") ||
      text.includes("almuerzo") ||
      text.includes("comida")
    )
      return "restaurant";
    if (
      text.includes("bar") ||
      text.includes("cerveza") ||
      text.includes("trago") ||
      text.includes("bebida")
    )
      return "bar";
    if (
      text.includes("café") ||
      text.includes("coffee") ||
      text.includes("espresso")
    )
      return "cafe";
    if (
      text.includes("concierto") ||
      text.includes("cine") ||
      text.includes("teatro") ||
      text.includes("show")
    )
      return "entertainment";
    if (
      text.includes("parque") ||
      text.includes("senderismo") ||
      text.includes("naturaleza") ||
      text.includes("caminar")
    )
      return "outdoor";
    if (
      text.includes("museo") ||
      text.includes("galería") ||
      text.includes("exposición") ||
      text.includes("cultural")
    )
      return "cultural";
    if (
      text.includes("shopping") ||
      text.includes("compras") ||
      text.includes("centro comercial")
    )
      return "shopping";

    return "other";
  };

  const category = inferCategory(outing.title, outing.description);

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
      restaurant:
        "bg-orange-500/20 text-orange-300 border border-orange-500/30",
      bar: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
      cafe: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      entertainment: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
      outdoor: "bg-green-500/20 text-green-300 border border-green-500/30",
      cultural: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
      shopping: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      other: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-500/20 text-gray-300 border border-gray-500/30"
    );
  };

  // Convertir valoration de 1-10 a 1-5 para mostrar estrellas
  const starRating = Math.round((outing.valoration / 10) * 5);

  return (
    <div className="bg-[#2A2930] rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden border border-[#382B50] hover:border-[#4A3B66] group">
      {/* Header */}
      <div className="p-6 pb-4 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl filter drop-shadow-lg">
                {getCategoryIcon(category)}
              </span>
              <div className="absolute inset-0 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                {outing.title}
              </h3>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getCategoryColor(
                  category
                )}`}
              >
                <span className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></span>
                {category}
              </span>
            </div>
          </div>
          {outing.valoration > 0 && (
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
              <span className="text-yellow-400 animate-pulse">⭐</span>
              <span className="text-sm font-semibold text-yellow-300">
                {starRating}/5
              </span>
              <span className="text-xs text-gray-400 ml-1">
                ({outing.valoration}/10)
              </span>
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
          {outing.description}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-4 space-y-3 relative">
        {/* Partners */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#382B50]/30 backdrop-blur-sm">
          <span className="text-blue-400 text-lg">👥</span>
          <span className="text-sm text-gray-300 font-medium">
            {outing.partners.length === 0
              ? "Solo Adventure"
              : outing.partners.length === 1
              ? `Con ${outing.partners[0].name}`
              : `Con ${outing.partners
                  .slice(0, -1)
                  .map((p) => p.name)
                  .join(", ")} y ${outing.partners.slice(-1)[0].name}`}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#382B50]/30 backdrop-blur-sm">
          <span className="text-emerald-400 text-lg">📍</span>
          <span className="text-sm text-gray-300 font-medium">
            {outing.location}
          </span>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-[#382B50]/30 backdrop-blur-sm">
          <span className="text-green-400 text-lg">💰</span>
          <span className="text-sm text-gray-300 font-medium">
            ${outing.amountSpent.toLocaleString()} USD
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-[#2A2930]/80 border-t border-[#382B50] backdrop-blur-sm relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">
              Powered by AI • {new Date().toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex gap-3">
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 flex items-center gap-1">
              <span className="w-3 h-3 border border-blue-400 rounded-sm"></span>
              Editar
            </button>
            <button className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors duration-200 flex items-center gap-1">
              <span className="w-3 h-3 bg-red-400 rounded-sm"></span>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
