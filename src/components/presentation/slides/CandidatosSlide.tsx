import { Canvas } from 'fabric';
import { PresentationSlide } from '../PresentationSlide';
import {
  createBackground,
  createText,
  createBox,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
} from '../../../utils/fabric/fabricHelpers';
import type { Candidate } from '../../../types';

interface CandidatosSlideProps {
  municipio: string;
  estado: string;
  candidatos: Candidate[];
  fecha?: string;
}

/**
 * Slide para mostrar los candidatos y su adjetivación digital
 */
export const CandidatosSlide: React.FC<CandidatosSlideProps> = ({
  municipio,
  estado,
  candidatos,
  fecha,
}) => {
  const renderSlide = (canvas: Canvas) => {
    // Fondo
    const background = createBackground('#ffffff');
    canvas.add(background);

    // Header
    const headerIcon = createText('👥', {
      left: 40,
      top: 30,
      fontSize: 50,
    });

    const titulo = createText('g. Candidatos y Adjetivación Digital', {
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

    // Grid de candidatos (2x2)
    const startY = 180;
    const startX = 80;
    const cardWidth = 550;
    const cardHeight = 220;
    const gap = 40;

    candidatos.slice(0, 4).forEach((candidato, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = startX + col * (cardWidth + gap);
      const y = startY + row * (cardHeight + gap);

      // Card del candidato
      const card = createBox({
        left: x,
        top: y,
        width: cardWidth,
        height: cardHeight,
        fill: '#f8f9fa',
        stroke: '#dee2e6',
        strokeWidth: 2,
        rx: 8,
        ry: 8,
      });

      // Nombre del candidato
      const nombre = createText(candidato.name, {
        left: x + 20,
        top: y + 20,
        fontSize: 22,
        fontWeight: 'bold',
        fill: '#212529',
      });

      // Partido
      const partido = createText(candidato.party, {
        left: x + 20,
        top: y + 55,
        fontSize: 16,
        fill: '#6c757d',
      });

      // Adjetivos
      const adjetivosText = candidato.adjectives.join(' • ');
      const adjetivos = createText(adjetivosText, {
        left: x + 20,
        top: y + 90,
        fontSize: 14,
        fill: '#0d6efd',
        fontWeight: 'bold',
      });

      // Señal digital (resumida)
      const senalText = candidato.digitalSignal.substring(0, 80) + '...';
      const senal = createText(senalText, {
        left: x + 20,
        top: y + 130,
        fontSize: 12,
        fill: '#495057',
      });

      canvas.add(card, nombre, partido, adjetivos, senal);
    });

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
