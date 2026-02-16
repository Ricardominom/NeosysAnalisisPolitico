import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '../ui/Button';

interface PresentationViewerProps {
  slides: React.ReactNode[];
  title?: string;
}

/**
 * Visor de presentación con navegación entre slides
 */
export const PresentationViewer: React.FC<PresentationViewerProps> = ({
  slides,
  title = 'Presentación',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1280, 720],
      });

      for (let i = 0; i < slides.length; i++) {
        // Cambiar al slide actual
        setCurrentSlide(i);

        // Esperar un momento para que el DOM se actualice
        await new Promise((resolve) => setTimeout(resolve, 500));

        const slideElement = slideRefs.current[i];
        if (slideElement) {
          const canvas = await html2canvas(slideElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            width: 1280,
            height: 720,
          });

          const imgData = canvas.toDataURL('image/png');

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'PNG', 0, 0, 1280, 720);
        }
      }

      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
      setCurrentSlide(0);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Hubo un error al exportar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div
      className="presentation-viewer min-h-screen bg-gray-900 p-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={handleGoBack} variant="secondary">
              ← Volver al Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={exportToPDF}
              variant="primary"
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exportando...' : '📄 Exportar PDF'}
            </Button>
          </div>
        </div>

        {/* Slides Container - Renderizar todos pero mostrar solo el actual */}
        <div className="flex justify-center items-center mb-6">
          <div className="shadow-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(el) => (slideRefs.current[index] = el)}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-between items-center text-white">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="secondary"
          >
            ← Anterior
          </Button>

          <div className="flex gap-2 items-center">
            <span className="text-sm">
              Slide {currentSlide + 1} de {slides.length}
            </span>
            <div className="flex gap-1 ml-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? 'bg-blue-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  title={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="secondary"
          >
            Siguiente →
          </Button>
        </div>

        {/* Ayuda */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          Usa las flechas del teclado ← → para navegar
        </div>
      </div>
    </div>
  );
};
