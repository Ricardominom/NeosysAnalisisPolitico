import { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { SLIDE_WIDTH, SLIDE_HEIGHT } from '../../utils/fabric/fabricHelpers';

interface PresentationSlideProps {
  onRender: (canvas: Canvas) => void;
  className?: string;
}

/**
 * Componente base para renderizar slides usando Fabric.js
 */
export const PresentationSlide: React.FC<PresentationSlideProps> = ({
  onRender,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inicializar canvas de Fabric.js
    const canvas = new Canvas(canvasRef.current, {
      width: SLIDE_WIDTH,
      height: SLIDE_HEIGHT,
      selection: false,
      renderOnAddRemove: true,
    });

    fabricCanvasRef.current = canvas;

    // Llamar a la función de renderizado personalizada
    onRender(canvas);

    // Renderizar canvas
    canvas.renderAll();

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, [onRender]);

  return (
    <div className={`presentation-slide ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full border border-gray-300 shadow-lg"
        />
      </div>
    </div>
  );
};
