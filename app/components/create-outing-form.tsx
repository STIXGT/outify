"use client";
import { useState } from "react";
import {
  PlusIcon,
  XIcon,
  UsersIcon,
  MapPinIcon,
  DollarSignIcon,
  SparklesIcon,
} from "lucide-react";

interface Partner {
  name: string;
  historialOutings: Outing[];
}

interface Outing {
  title: string;
  description: string;
  location: string;
  valoration: number;
  amountSpent: number;
  partners: Partner[];
}

interface GenerateOutingsDto {
  location: string;
  amountSpent: number;
  partners: Partner[];
  historialOutings: Outing[];
  prompt: string;
}

interface CreateOutingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GenerateOutingsDto) => void;
  historialOutings?: Outing[];
}

export default function CreateOutingForm({
  isOpen,
  onClose,
  onSubmit,
  historialOutings = [],
}: CreateOutingFormProps) {
  const [formData, setFormData] = useState<GenerateOutingsDto>({
    location: "",
    amountSpent: 0,
    partners: [],
    historialOutings: historialOutings,
    prompt: "",
  });

  const [newPartnerName, setNewPartnerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addPartner = () => {
    if (newPartnerName.trim()) {
      setFormData((prev) => ({
        ...prev,
        partners: [
          ...prev.partners,
          { name: newPartnerName.trim(), historialOutings: [] },
        ],
      }));
      setNewPartnerName("");
    }
  };

  const removePartner = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      partners: prev.partners.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.prompt) return;

    setIsLoading(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        location: "",
        amountSpent: 0,
        partners: [],
        historialOutings: historialOutings,
        prompt: "",
      });
      onClose();
    } catch (error) {
      console.error("Error creating outing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#2A2930] rounded-2xl shadow-2xl border border-[#382B50] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#382B50] bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Crear Nueva Salida
                </h2>
                <p className="text-sm text-gray-400">
                  Déjale a la IA sugerir el plan perfecto
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-[#382B50] hover:bg-red-500/20 rounded-lg flex items-center justify-center transition-colors duration-200 group"
            >
              <XIcon className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-emerald-400" />
              Ubicación
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="ej. Norte de Quito, Centro Histórico..."
              className="w-full p-3 bg-[#382B50]/30 border border-[#382B50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSignIcon className="w-4 h-4 text-green-400" />
              Presupuesto (USD)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.amountSpent}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amountSpent: parseFloat(e.target.value) || 0,
                }))
              }
              placeholder="0.00"
              className="w-full p-3 bg-[#382B50]/30 border border-[#382B50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>

          {/* Partners */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-blue-400" />
              Compañeros
            </label>

            {/* Current Partners */}
            {formData.partners.length > 0 && (
              <div className="space-y-2">
                {formData.partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[#382B50]/30 rounded-lg border border-[#382B50]"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-300 text-sm font-medium">
                        {partner.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 flex-1">{partner.name}</span>
                    <button
                      type="button"
                      onClick={() => removePartner(index)}
                      className="w-6 h-6 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <XIcon className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Partner */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newPartnerName}
                onChange={(e) => setNewPartnerName(e.target.value)}
                placeholder="Nombre del compañero..."
                className="flex-1 p-3 bg-[#382B50]/30 border border-[#382B50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addPartner())
                }
              />
              <button
                type="button"
                onClick={addPartner}
                disabled={!newPartnerName.trim()}
                className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-gray-500/20 disabled:cursor-not-allowed border border-blue-500/30 disabled:border-gray-500/20 rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4 text-blue-300" />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Déjalo vacío si planeas ir solo
            </p>
          </div>

          {/* AI Prompt */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-purple-400" />
              ¿Qué tipo de experiencia buscas?
            </label>
            <textarea
              value={formData.prompt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, prompt: e.target.value }))
              }
              placeholder="ej. No tengo ganas de caminar, algo relajante y cómodo..."
              rows={4}
              className="w-full p-3 bg-[#382B50]/30 border border-[#382B50] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
              required
            />
            <p className="text-xs text-gray-500">
              Describe tu estado de ánimo, preferencias o restricciones para que
              la IA te dé la mejor recomendación
            </p>
          </div>

          {/* Summary */}
          {(formData.location ||
            formData.amountSpent > 0 ||
            formData.partners.length > 0) && (
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
              <h3 className="text-sm font-medium text-purple-300 mb-2">
                Resumen de tu solicitud:
              </h3>
              <div className="space-y-1 text-xs text-gray-400">
                {formData.location && <p>📍 {formData.location}</p>}
                {formData.amountSpent > 0 && (
                  <p>💰 ${formData.amountSpent} USD disponibles</p>
                )}
                {formData.partners.length > 0 && (
                  <p>
                    👥 Con {formData.partners.map((p) => p.name).join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#382B50]/50 hover:bg-[#382B50] border border-[#382B50] rounded-xl text-gray-300 font-medium transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.location || !formData.prompt || isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generando...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-4 h-4" />
                  Generar con IA
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
