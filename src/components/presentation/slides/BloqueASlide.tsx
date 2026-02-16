import { Canvas } from 'fabric';
import { PresentationSlide } from '../PresentationSlide';
import {
  createBackground,
  createText,
  createBox,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
} from '../../../utils/fabric/fabricHelpers';
import type { BlockARow } from '../../../types';

interface BloqueASlideProps {
  municipio: string;
  estado: string;
  bloqueA: BlockARow[];
  fecha?: string;
}

/**
 * Slide para mostrar el Bloque A (partidos políticos)
 */
export const BloqueASlide: React.FC<BloqueASlideProps> = ({
  municipio,
  estado,
  bloqueA,
  fecha,
}) => {
  const renderSlide = (canvas: Canvas) => {
    // Fondo
    const background = createBackground('#ffffff');
    canvas.add(background);

    // Header
    const headerIcon = createText('📊', {
      left: 40,
      top: 30,
      fontSize: 50,
    });

    const titulo = createText('i. Bloque A - Partidos Políticos', {
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

    // Tabla
    const tableX = 80;
    const tableY = 180;
    const colWidth = 240;
    const rowHeight = 50;

    // Header de tabla
    const headers = ['Partido', 'Duro', 'Enojado', 'Crítico', 'Oportunista'];

    headers.forEach((header, index) => {
      const headerBg = createBox({
        left: tableX + index * colWidth,
        top: tableY,
        width: colWidth,
        height: rowHeight,
        fill: '#343a40',
        stroke: '#ffffff',
        strokeWidth: 2,
      });

      const headerText = createText(header, {
        left: tableX + index * colWidth + 20,
        top: tableY + 15,
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#ffffff',
      });

      canvas.add(headerBg, headerText);
    });

    // Filas de datos
    bloqueA.forEach((row, rowIndex) => {
      const y = tableY + (rowIndex + 1) * rowHeight;
      const rowColor = rowIndex % 2 === 0 ? '#f8f9fa' : '#ffffff';

      // Columna Partido
      const partidoBg = createBox({
        left: tableX,
        top: y,
        width: colWidth,
        height: rowHeight,
        fill: rowColor,
        stroke: '#dee2e6',
        strokeWidth: 1,
      });

      const partidoText = createText(row.party, {
        left: tableX + 20,
        top: y + 15,
        fontSize: 16,
        fill: '#212529',
      });

      canvas.add(partidoBg, partidoText);

      // Columnas de datos
      const values = [row.duro, row.enojado, row.critico, row.oportunista];

      values.forEach((value, colIndex) => {
        const cellBg = createBox({
          left: tableX + (colIndex + 1) * colWidth,
          top: y,
          width: colWidth,
          height: rowHeight,
          fill: rowColor,
          stroke: '#dee2e6',
          strokeWidth: 1,
        });

        const cellText = createText(`${value}%`, {
          left: tableX + (colIndex + 1) * colWidth + 20,
          top: y + 15,
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#0d6efd',
        });

        canvas.add(cellBg, cellText);
      });
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
