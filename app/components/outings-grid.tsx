"use client";
import CardOuting from "./card-outing";
import CreateOutingForm from "./create-outing-form";
import Sidebar from "./sidebar";
import { useUser } from "@clerk/nextjs";
import {
  useCreateOuting,
  type Outing,
  type Partner,
  type GenerateOutingsDto,
} from "../hooks/useCreateOuting";
import { useState } from "react";
import Toast from "./toast";

// Datos de ejemplo ampliados para el historial
const sampleOutings: Outing[] = [
  {
    title: "Cena en La Bistecca",
    description:
      "Una cena increíble con cortes de carne premium y vinos selectos. El ambiente era perfecto para una celebración especial.",
    location: "Zona Rosa, CDMX",
    valoration: 9,
    amountSpent: 150,
    partners: [
      { name: "María", historialOutings: [] },
      { name: "Carlos", historialOutings: [] },
    ],
  },
  {
    title: "Concierto de Jazz",
    description:
      "Noche de jazz en vivo con músicos locales. La acústica del lugar era excelente y el ambiente muy relajado.",
    location: "Centro Cultural, Roma Norte",
    valoration: 8,
    amountSpent: 25,
    partners: [],
  },
  {
    title: "Café y trabajo",
    description:
      "Sesión de trabajo productiva en un café acogedor. Perfecto para concentrarse y disfrutar un buen espresso.",
    location: "Starbucks, Polanco",
    valoration: 6,
    amountSpent: 12,
    partners: [{ name: "Ana", historialOutings: [] }],
  },
  {
    title: "Senderismo en el Ajusco",
    description:
      "Día completo de senderismo con vistas espectaculares de la ciudad. El clima fue perfecto para la actividad.",
    location: "Parque Nacional Ajusco",
    valoration: 10,
    amountSpent: 20,
    partners: [
      { name: "Pedro", historialOutings: [] },
      { name: "Luis", historialOutings: [] },
      { name: "Sofia", historialOutings: [] },
    ],
  },
  {
    title: "Brunch dominical",
    description:
      "Brunch relajado con amigos en terraza con vista panorámica. Excelente servicio y platillos creativos.",
    location: "Condesa, CDMX",
    valoration: 9,
    amountSpent: 35,
    partners: [
      { name: "Juan", historialOutings: [] },
      { name: "Isabella", historialOutings: [] },
    ],
  },
  {
    title: "Noche de karaoke",
    description:
      "Diversión garantizada cantando nuestras canciones favoritas. El lugar tenía una gran selección musical.",
    location: "Karaoke Box, Polanco",
    valoration: 7,
    amountSpent: 40,
    partners: [
      { name: "Miguel", historialOutings: [] },
      { name: "Carmen", historialOutings: [] },
    ],
  },
];

export default function OutingsGrid() {
  const { user } = useUser();
  const { createOuting, isLoading, error } = useCreateOuting(); // Usar createOuting en lugar de createOutingMock
  const [outings, setOutings] = useState<Outing[]>(sampleOutings);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleCreateOuting = async (data: GenerateOutingsDto) => {
    // Enriquecer los datos con el historial completo
    const enrichedData: GenerateOutingsDto = {
      ...data,
      historialOutings: outings, // Enviar todo el historial actual
    };

    const result = await createOuting(enrichedData); // Usar la función real del API

    if (result.success && result.data) {
      // Agregar las nuevas salidas al estado
      setOutings((prev) => [...result.data!, ...prev]);
      
      // Mensaje diferente si viene del fallback
      const message = result.isFromFallback 
        ? `¡${result.data.length} opciones generadas como respaldo! La IA está temporalmente no disponible, pero estas sugerencias están basadas en tu solicitud.`
        : `¡${result.data.length} ${result.data.length === 1 ? "opción generada" : "opciones generadas"} por la IA! Elige tu favorita.`;
      
      setToast({
        message,
        type: "success",
      });
      setIsCreateFormOpen(false); // Cerrar el form después del éxito
    } else {
      setToast({
        message: result.error || "Error al generar la salida",
        type: "error",
      });
      console.error("Error creating outing:", result.error);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Sidebar with create outing functionality */}
      <Sidebar onCreateOutingClick={() => setIsCreateFormOpen(true)} />

      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Bienvenido {user?.firstName || user?.fullName || "Usuario"}
            </h1>
          </div>
          <p className="text-gray-400 flex items-center gap-2">
            Aquí tus salidas!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#2A2930] p-6 rounded-xl shadow-lg border border-[#382B50] hover:border-purple-500/50 transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Salidas</p>
              <p className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                {outings.length}
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
                {outings
                  .reduce((sum, outing) => sum + outing.amountSpent, 0)
                  .toLocaleString()}{" "}
                USD
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
                  outings
                    .filter((o) => o.valoration > 0)
                    .reduce((sum, outing) => sum + outing.valoration, 0) /
                  outings.filter((o) => o.valoration > 0).length
                ).toFixed(1)}
                /10
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
        {outings.map((outing, index) => (
          <CardOuting key={`${outing.title}-${index}`} outing={outing} />
        ))}
      </div>

      {/* Create Outing Form Modal */}
      <CreateOutingForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSubmit={handleCreateOuting}
        historialOutings={outings}
      />

      {/* Loading/Error States */}
      {isLoading && (
        <div className="fixed bottom-8 right-8 bg-[#2A2930] border border-[#382B50] rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <span className="text-white font-medium">
              🤖 IA generando opciones personalizadas...
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-8 right-8 bg-red-500/10 border border-red-500/30 rounded-xl p-4 shadow-lg max-w-sm">
          <div className="flex items-center gap-3">
            <span className="text-red-400 text-lg">⚠️</span>
            <div>
              <p className="text-red-300 font-medium">Error</p>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toast
        message={toast?.message || ""}
        type={toast?.type || "success"}
        isVisible={!!toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
