import { Canvas } from 'fabric';
import { PresentationSlide } from '../PresentationSlide';
import {
  createBackground,
  createText,
  createBox,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
} from '../../../utils/fabric/fabricHelpers';

interface UniversoDigitalSlideProps {
  municipio: string;
  estado: string;
  universoDigital: number;
  fecha?: string;
}

/**
 * Slide para mostrar el universo digital electoral
 */
export const UniversoDigitalSlide: React.FC<UniversoDigitalSlideProps> = ({
  municipio,
  estado,
  universoDigital,
  fecha,
}) => {
  const renderSlide = (canvas: Canvas) => {
    // Fondo
    const background = createBackground('#ffffff');
    canvas.add(background);

    // Header
    const headerIcon = createText('🌐', {
      left: 40,
      top: 30,
      fontSize: 50,
    });

    const titulo = createText('h. Universo Digital Electoral', {
      left: 110,
      top: 40,
      fontSize: 36,
      fontWeight: 'bold',
      fill: '#000000',
    });

    const subtitulo = createText(`${municipio}, ${estado}`, {
      left: 110,
      top: 85,
      fontSize: 24,
      fill: '#666666',
    });

    canvas.add(headerIcon, titulo, subtitulo);

    // Contenedor central
    const centerX = SLIDE_WIDTH / 2;
    const centerY = SLIDE_HEIGHT / 2 + 20;

    // Círculo decorativo
    const circleBg = createBox({
      left: centerX - 200,
      top: centerY - 150,
      width: 400,
      height: 300,
      fill: '#e7f3ff',
      rx: 200,
      ry: 150,
    });

    canvas.add(circleBg);

    // Número grande del universo digital
    const universoText = createText(universoDigital.toLocaleString('es-MX'), {
      left: centerX - 120,
      top: centerY - 60,
      fontSize: 80,
      fontWeight: 'bold',
      fill: '#0d6efd',
    });

    // Etiqueta
    const etiqueta = createText('Usuarios digitales', {
      left: centerX - 110,
      top: centerY + 40,
      fontSize: 28,
      fill: '#495057',
    });

    // Descripción
    const descripcion = createText('Población digital activa en el municipio', {
      left: centerX - 200,
      top: centerY + 100,
      fontSize: 18,
      fill: '#6c757d',
    });

    canvas.add(universoText, etiqueta, descripcion);

    // Footer
    const logoText = createText('Rizoma', {
      left: SLIDE_WIDTH - 150,
      top: SLIDE_HEIGHT - 60,
      fontSize: 20,
      fontWeight: 'bold',
      fill: '#6B46C1',
    });

    const fechaText = createText(fecha || 'Realizado el 3 de febrero, 2026', {
      left: SLIDE_WIDTH - 300,
      top: SLIDE_HEIGHT - 30,
      fontSize: 12,
      fill: '#999999',
    });

    canvas.add(logoText, fechaText);
  };

  return <PresentationSlide onRender={renderSlide} />;
};
