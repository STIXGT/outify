"use client";
import { useState } from "react";

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

// Para compatibilidad temporal, exportamos los tipos
export type { Partner, Outing, GenerateOutingsDto };

interface CreateOutingResponse {
  success: boolean;
  data?: Outing[];
  error?: string;
  isFromFallback?: boolean; // Add this to track if response came from fallback
}

export function useCreateOuting() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOuting = async (
    data: GenerateOutingsDto
  ): Promise<CreateOutingResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/outings/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Intentar leer la respuesta como JSON, si falla usar el status
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // Si no es JSON, usar el mensaje por defecto
          console.warn("Response is not JSON:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Convertir la respuesta del backend al formato esperado
      const formattedOutings: Outing[] = result.outings.map((outing: any) => ({
        ...outing,
        location: data.location, // Usar la ubicación del request
        valoration: Math.floor(Math.random() * 3) + 8, // Random entre 8-10
        amountSpent: data.amountSpent, // Usar el presupuesto del request
        partners: data.partners, // Usar los partners del request
      }));

      return {
        success: true,
        data: formattedOutings,
        isFromFallback: false, // Successful API call
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Función mock para desarrollo/testing
  const createOutingMock = async (
    data: GenerateOutingsDto
  ): Promise<CreateOutingResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response basado en el prompt
      const mockOuting: Outing = {
        title: `Salida en ${data.location}`,
        description: `Una experiencia única basada en tu solicitud: "${data.prompt}". La IA ha seleccionado esta actividad considerando tu presupuesto de $${data.amountSpent} y tus preferencias.`,
        location: data.location,
        valoration: Math.floor(Math.random() * 3) + 8, // Random entre 8-10
        amountSpent: data.amountSpent,
        partners: data.partners,
      };

      return {
        success: true,
        data: [mockOuting],
        isFromFallback: true, // Esta es una respuesta de fallback
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOuting,
    createOutingMock,
    isLoading,
    error,
  };
}
