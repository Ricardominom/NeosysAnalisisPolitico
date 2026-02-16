import { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Image as FabricImage, Canvas } from 'fabric';
import '../../styles/ChartModals.css';

interface Segment {
  id: number;
  partido?: string;
  name: string;
  cantidad: string;
  color: string;
  section?: string;
}

interface TableroData {
  showHeaders: boolean;
  partidos: string[];
  segments: Segment[];
  sinOpinion: Segment[];
}

interface TableroMicrosegmentacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: Canvas | null;
  initialData?: {
    partidos?: string[];
    segments?: Segment[];
    sinOpinion?: Segment[];
  };
}

const TableroMicrosegmentacionModal = ({
  isOpen,
  onClose,
  canvas,
  initialData
}: TableroMicrosegmentacionModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showAddPartyInput, setShowAddPartyInput] = useState(false);
  const [newPartyName, setNewPartyName] = useState('');

  const [data, setData] = useState<TableroData>({
    showHeaders: true,
    partidos: initialData?.partidos || ['Morena', 'PVEM', 'PAN', 'Otros'],
    segments: initialData?.segments || [
      { id: 1, partido: 'Morena', name: 'Morena Oportunista', cantidad: '50 K', color: '#D1A8A6', section: 'partidos' },
      { id: 2, partido: 'Morena', name: 'Morena Enojado', cantidad: '30 K', color: '#B7746B', section: 'partidos' },
      { id: 3, partido: 'Morena', name: 'Morena Crítico', cantidad: '70 K', color: '#A0443C', section: 'partidos' },
      { id: 4, partido: 'Morena', name: 'Morena Duro', cantidad: '120 K', color: '#8D241A', section: 'partidos' },
      { id: 5, partido: 'PVEM', name: 'PVEM Oportunista', cantidad: '300 K', color: '#A8D5A8', section: 'partidos' },
      { id: 6, partido: 'PVEM', name: 'PVEM Crítico', cantidad: '30 K', color: '#88B588', section: 'partidos' },
      { id: 7, partido: 'PVEM', name: 'PVEM Duro', cantidad: '60 K', color: '#689568', section: 'partidos' },
      { id: 8, partido: 'PAN', name: 'PAN Oportunista', cantidad: '30 K', color: '#7BA3C9', section: 'partidos' },
      { id: 9, partido: 'PAN', name: 'PAN Enojado', cantidad: '15 K', color: '#6B93B9', section: 'partidos' },
      { id: 10, partido: 'PAN', name: 'PAN Crítico', cantidad: '20 K', color: '#5B83A9', section: 'partidos' },
      { id: 11, partido: 'PAN', name: 'PAN Duro', cantidad: '140 K', color: '#1B4365', section: 'partidos' },
      { id: 12, partido: 'Otros', name: 'CI', cantidad: '60 K', color: '#B5B5B5', section: 'partidos' },
      { id: 13, partido: 'Otros', name: 'MC', cantidad: '100 K', color: '#E89D5C', section: 'partidos' },
      { id: 14, partido: 'Otros', name: 'PNAL', cantidad: '10 K', color: '#5DBCD2', section: 'partidos' },
      { id: 15, partido: 'Otros', name: 'PRI', cantidad: '120 K', color: '#E85C5C', section: 'partidos' },
      { id: 16, partido: 'Otros', name: 'PT', cantidad: '40 K', color: '#D84C4C', section: 'partidos' },
    ],
    sinOpinion: initialData?.sinOpinion || [
      { id: 17, name: 'Religiosos', cantidad: '150 K', color: '#88D588' },
      { id: 18, name: 'Tercera edad', cantidad: '160 K', color: '#78C578' },
      { id: 19, name: 'Centennials', cantidad: '200 K', color: '#68B568' },
      { id: 20, name: 'Deportistas / Fitness', cantidad: '80 K', color: '#A89FD5' },
      { id: 21, name: 'Amas de casa', cantidad: '100 K', color: '#988FD5' },
      { id: 22, name: 'Comerciantes', cantidad: '120 K', color: '#887FD5' },
      { id: 23, name: 'Geeks / Techies / Gamers', cantidad: '30 K', color: '#E8A85C' },
      { id: 24, name: 'Animalistas / Ambientalistas', cantidad: '30 K', color: '#D8985C' },
      { id: 25, name: 'Madres solteras', cantidad: '40 K', color: '#5CBCD8' },
      { id: 26, name: 'Estudiantes', cantidad: '60 K', color: '#4CACC8' },
      { id: 27, name: 'Empresarios', cantidad: '10 K', color: '#D89C5C' },
      { id: 28, name: 'Profesores', cantidad: '20 K', color: '#C88C4C' }
    ]
  });

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      drawPreview();
    }
  }, [data, isOpen]);

  const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    if (text.includes(' / ')) {
      const parts = text.split(' / ');
      if (parts.length === 2) {
        const part1Width = ctx.measureText(parts[0]).width;
        const part2Width = ctx.measureText(parts[1]).width;
        if (part1Width <= maxWidth && part2Width <= maxWidth) {
          return parts;
        }
      }
    }

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.length > 0 ? lines : [text];
  };

  const generatePartidosLayout = (segments: Segment[], totalWidth: number, totalHeight: number, partidos: string[]) => {
    const layout: { segment: Segment; x: number; y: number; w: number; h: number }[] = [];
    const numPartidos = partidos.length;
    const columnWidth = numPartidos === 1 ? totalWidth : totalWidth / numPartidos;
    let currentX = 0;

    partidos.forEach((partido) => {
      const partidoSegments = segments.filter(s => s.partido === partido);
      if (partidoSegments.length === 0) return;

      const partidoTotal = partidoSegments.reduce((sum, seg) => {
        const cantidad = parseFloat(seg.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
        return sum + cantidad;
      }, 0);

      let currentY = 0;
      partidoSegments.forEach(segment => {
        const cantidad = parseFloat(segment.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
        const heightProportion = partidoTotal > 0 ? cantidad / partidoTotal : 1 / partidoSegments.length;

        layout.push({
          segment,
          x: currentX,
          y: currentY * totalHeight,
          w: columnWidth,
          h: heightProportion * totalHeight
        });

        currentY += heightProportion;
      });

      currentX += columnWidth;
    });

    return layout;
  };

  const generateSinOpinionLayout = (sinOpinionData: Segment[], totalWidth: number, totalHeight: number) => {
    const layout: { segment: Segment; x: number; y: number; w: number; h: number }[] = [];

    const row1Height = totalHeight * 0.45;
    const row2Height = totalHeight * 0.30;
    const row3Height = totalHeight * 0.25;

    const segmentMap: { [key: string]: Segment } = {};
    sinOpinionData.forEach(seg => {
      segmentMap[seg.name] = seg;
    });

    const row1Col1Width = totalWidth * 0.30;
    const row1Col2Width = totalWidth * 0.30;
    const row1Col3Width = totalWidth * 0.40;

    if (segmentMap['Religiosos']) {
      layout.push({ segment: segmentMap['Religiosos'], x: 0, y: 0, w: row1Col1Width, h: row1Height });
    }
    if (segmentMap['Tercera edad']) {
      layout.push({ segment: segmentMap['Tercera edad'], x: row1Col1Width, y: 0, w: row1Col2Width, h: row1Height });
    }
    if (segmentMap['Centennials']) {
      layout.push({ segment: segmentMap['Centennials'], x: row1Col1Width + row1Col2Width, y: 0, w: row1Col3Width, h: row1Height });
    }

    const row2Col1Width = totalWidth * 0.25;
    const row2Col2Width = totalWidth * 0.35;
    const row2Col3Width = totalWidth * 0.40;

    if (segmentMap['Deportistas / Fitness']) {
      layout.push({ segment: segmentMap['Deportistas / Fitness'], x: 0, y: row1Height, w: row2Col1Width, h: row2Height });
    }
    if (segmentMap['Amas de casa']) {
      layout.push({ segment: segmentMap['Amas de casa'], x: row2Col1Width, y: row1Height, w: row2Col2Width, h: row2Height });
    }
    if (segmentMap['Comerciantes']) {
      layout.push({ segment: segmentMap['Comerciantes'], x: row2Col1Width + row2Col3Width, y: row1Height, w: row2Col3Width, h: row2Height });
    }

    const row3Y = row1Height + row2Height;
    const subRowHeight = row3Height / 3;
    const col1Width = totalWidth * 0.5;
    const col2Width = totalWidth * 0.2;
    const col3Width = totalWidth * 0.3;

    if (segmentMap['Geeks / Techies / Gamers']) {
      layout.push({ segment: segmentMap['Geeks / Techies / Gamers'], x: 0, y: row3Y, w: col1Width, h: subRowHeight });
    }
    if (segmentMap['Animalistas / Ambientalistas']) {
      layout.push({ segment: segmentMap['Animalistas / Ambientalistas'], x: 0, y: row3Y + subRowHeight, w: col1Width, h: subRowHeight });
    }
    if (segmentMap['Empresarios'] && segmentMap['Profesores']) {
      const subSubWidth = col1Width / 2;
      layout.push({ segment: segmentMap['Empresarios'], x: 0, y: row3Y + subRowHeight * 2, w: subSubWidth, h: subRowHeight });
      layout.push({ segment: segmentMap['Profesores'], x: subSubWidth, y: row3Y + subRowHeight * 2, w: subSubWidth, h: subRowHeight });
    }
    if (segmentMap['Madres solteras']) {
      layout.push({ segment: segmentMap['Madres solteras'], x: col1Width, y: row3Y, w: col2Width, h: row3Height });
    }
    if (segmentMap['Estudiantes']) {
      layout.push({ segment: segmentMap['Estudiantes'], x: col1Width + col2Width, y: row3Y, w: col3Width, h: row3Height });
    }

    return layout;
  };

  const drawPreview = () => {
    if (!canvasRef.current) return;

    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext('2d')!;
    const width = canvasEl.width;
    const height = canvasEl.height;

    ctx.clearRect(0, 0, width, height);

    const headerHeight = data.showHeaders ? 35 : 0;
    const startX = 10;
    const startY = 10 + headerHeight;
    const availableWidth = width - 20;
    const availableHeight = height - 40 - headerHeight;

    const partidosWidth = availableWidth * 0.55;
    const sinOpinionWidth = availableWidth * 0.45;

    const partidosLayout = generatePartidosLayout(data.segments, partidosWidth, availableHeight, data.partidos);
    const sinOpinionLayout = generateSinOpinionLayout(data.sinOpinion, sinOpinionWidth, availableHeight);

    sinOpinionLayout.forEach(item => {
      item.x += partidosWidth;
    });

    // Draw headers
    if (data.showHeaders) {
      const groupPositions = new Map<string, { x: number; w: number }>();
      data.partidos.forEach((partido) => {
        const groupItems = partidosLayout.filter(item => item.segment && item.segment.partido === partido);
        if (groupItems.length > 0) {
          const firstItem = groupItems[0];
          groupPositions.set(partido, { x: firstItem.x, w: firstItem.w });
        }
      });

      data.partidos.forEach((partido) => {
        const position = groupPositions.get(partido);
        if (!position) return;

        const totalSegments = data.segments.filter(s => s.partido === partido);
        const totalSum = totalSegments.reduce((sum, seg) => {
          const cantidad = parseFloat(seg.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
          return sum + cantidad;
        }, 0);
        const total = totalSum >= 1000 ? `${(totalSum / 1000).toFixed(0)} M` : `${totalSum} K`;

        const centerX = startX + position.x + position.w / 2;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(partido, centerX, 38);
        ctx.font = '8px Arial';
        ctx.fillText(total, centerX, 50);
      });

      const sinOpinionTotal = data.sinOpinion.reduce((sum, seg) => {
        const cantidad = parseFloat(seg.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
        return sum + cantidad;
      }, 0);
      const sinOpinionTotalText = sinOpinionTotal >= 1000 ? `${(sinOpinionTotal / 1000).toFixed(0)} M` : `${sinOpinionTotal} K`;

      const sinOpinionCenterX = startX + partidosWidth + sinOpinionWidth / 2;
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Sin opinión', sinOpinionCenterX, 38);
      ctx.font = '8px Arial';
      ctx.fillText(sinOpinionTotalText, sinOpinionCenterX, 50);
    }

    // Draw segments
    [...partidosLayout, ...sinOpinionLayout].forEach(item => {
      if (!item.segment) return;

      const x = startX + item.x;
      const y = startY + item.y;
      const w = item.w;
      const h = item.h;

      ctx.fillStyle = item.segment.color;
      roundRect(ctx, x, y, w, h, 5);
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      roundRect(ctx, x, y, w, h, 5);
      ctx.stroke();

      if (w > 10 && h > 10) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let nameFontSize = Math.min(w / 7, h / 3.5, 8);
        let quantityFontSize = Math.min(w / 8, h / 4.5, 7);
        nameFontSize = Math.max(nameFontSize, 5);
        quantityFontSize = Math.max(quantityFontSize, 5);

        const fullName = item.segment.name;
        const partido = item.segment.partido || '';
        let partyName = partido || fullName;

        ctx.font = `bold ${nameFontSize}px Arial`;
        const maxWidth = w - 4;
        const lines = wrapText(ctx, partyName, maxWidth);

        const lineHeight = nameFontSize * 1.1;
        const totalTextHeight = (lines.length * lineHeight) + quantityFontSize + 4;
        let startTextY = y + h / 2 - totalTextHeight / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          ctx.fillText(line, x + w / 2, startTextY + (index * lineHeight));
        });

        ctx.font = `bold ${quantityFontSize}px Arial`;
        const quantityY = startTextY + (lines.length * lineHeight) + 4;
        ctx.fillText(item.segment.cantidad, x + w / 2, quantityY);
      }
    });

    // Divider line
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(startX + partidosWidth, startY);
    ctx.lineTo(startX + partidosWidth, startY + availableHeight);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const updateSegment = (id: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      segments: prev.segments.map(segment =>
        segment.id === id ? { ...segment, [field]: value } : segment
      )
    }));
  };

  const updateSinOpinion = (id: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      sinOpinion: prev.sinOpinion.map(segment =>
        segment.id === id ? { ...segment, [field]: value } : segment
      )
    }));
  };

  const addSegmentToPartido = (partido: string) => {
    const newId = Math.max(...data.segments.map(s => s.id), ...data.sinOpinion.map(s => s.id), 0) + 1;
    setData(prev => ({
      ...prev,
      segments: [...prev.segments, {
        id: newId,
        partido,
        name: 'Nuevo Segmento',
        cantidad: '10 K',
        color: '#888888',
        section: 'partidos'
      }]
    }));
  };

  const removeSegment = (id: number) => {
    setData(prev => ({
      ...prev,
      segments: prev.segments.filter(s => s.id !== id)
    }));
  };

  const handleAddParty = () => {
    if (!newPartyName.trim()) return;
    const newPartido = newPartyName.trim();
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    setData({
      ...data,
      partidos: [...data.partidos, newPartido],
      segments: [
        ...data.segments,
        {
          id: Math.max(...data.segments.map(s => s.id), ...data.sinOpinion.map(s => s.id), 0) + 1,
          partido: newPartido,
          name: `${newPartido} Segmento`,
          cantidad: '100 K',
          color: newColor,
          section: 'partidos'
        }
      ]
    });

    setNewPartyName('');
    setShowAddPartyInput(false);
  };

  const handleDeleteParty = (partyName: string) => {
    setData({
      ...data,
      partidos: data.partidos.filter(p => p !== partyName),
      segments: data.segments.filter(s => s.partido !== partyName)
    });
  };

  const insertChartToCanvas = async () => {
    if (!canvas) return;

    const objects = canvas.getObjects();
    const existingChart = objects.find(obj => (obj as any).name === 'tablero-microsegmentacion-chart');
    if (existingChart) {
      canvas.remove(existingChart);
    }

    const tempCanvas = document.createElement('canvas');
    const width = 1600;
    const height = 750;
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d')!;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const headerHeight = data.showHeaders ? 60 : 0;
    const startX = 40;
    const startY = 20 + headerHeight;
    const availableWidth = width - 80;
    const availableHeight = height - 60 - headerHeight;

    const partidosWidth = availableWidth * 0.55;
    const sinOpinionWidth = availableWidth * 0.45;

    const partidosLayout = generatePartidosLayout(data.segments, partidosWidth, availableHeight, data.partidos);
    const sinOpinionLayout = generateSinOpinionLayout(data.sinOpinion, sinOpinionWidth, availableHeight);
    sinOpinionLayout.forEach(item => {
      item.x += partidosWidth;
    });

    // Headers
    if (data.showHeaders) {
      const groupPositions = new Map<string, { x: number; w: number }>();
      data.partidos.forEach((partido) => {
        const groupItems = partidosLayout.filter(item => item.segment && item.segment.partido === partido);
        if (groupItems.length > 0) {
          groupPositions.set(partido, { x: groupItems[0].x, w: groupItems[0].w });
        }
      });

      data.partidos.forEach((partido) => {
        const position = groupPositions.get(partido);
        if (!position) return;

        const totalSegments = data.segments.filter(s => s.partido === partido);
        const totalSum = totalSegments.reduce((sum, seg) => {
          const cantidad = parseFloat(seg.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
          return sum + cantidad;
        }, 0);
        const total = totalSum >= 1000 ? `${(totalSum / 1000).toFixed(0)} M` : `${totalSum} K`;

        const centerX = startX + position.x + position.w / 2;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(partido, centerX, 38);
        ctx.font = 'bold 16px Arial';
        ctx.fillText(total, centerX, 56);
      });

      const sinOpinionTotal = data.sinOpinion.reduce((sum, seg) => {
        const cantidad = parseFloat(seg.cantidad.replace(/[KkMm\s,]/g, '')) || 0;
        return sum + cantidad;
      }, 0);
      const sinOpinionTotalText = sinOpinionTotal >= 1000 ? `${(sinOpinionTotal / 1000).toFixed(0)} M` : `${sinOpinionTotal} K`;

      const sinOpinionCenterX = startX + partidosWidth + sinOpinionWidth / 2;
      ctx.fillStyle = '#000';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Sin opinión', sinOpinionCenterX, 38);
      ctx.font = 'bold 16px Arial';
      ctx.fillText(sinOpinionTotalText, sinOpinionCenterX, 56);
    }

    // Draw all segments
    [...partidosLayout, ...sinOpinionLayout].forEach(item => {
      if (!item.segment) return;

      const x = startX + item.x;
      const y = startY + item.y;
      const w = item.w;
      const h = item.h;

      ctx.fillStyle = item.segment.color;
      roundRect(ctx, x, y, w, h, 8);
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      roundRect(ctx, x, y, w, h, 8);
      ctx.stroke();

      if (w > 30 && h > 20) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let nameFontSize = Math.min(w / 8, h / 4, 24);
        let quantityFontSize = Math.min(w / 10, h / 5, 16);
        nameFontSize = Math.max(nameFontSize, 8);
        quantityFontSize = Math.max(quantityFontSize, 7);

        const fullName = item.segment.name;
        const partido = item.segment.partido || '';
        let partyName = partido || fullName;

        ctx.font = `bold ${nameFontSize}px Arial`;
        const maxWidth = w - 10;
        const lines = wrapText(ctx, partyName, maxWidth);

        const lineHeight = nameFontSize * 1.1;
        const totalTextHeight = (lines.length * lineHeight) + quantityFontSize + 4;
        let startTextY = y + h / 2 - totalTextHeight / 2 + lineHeight / 2;

        lines.forEach((line, index) => {
          ctx.fillText(line, x + w / 2, startTextY + (index * lineHeight));
        });

        ctx.font = `bold ${quantityFontSize}px Arial`;
        const quantityY = startTextY + (lines.length * lineHeight) + 4;
        ctx.fillText(item.segment.cantidad, x + w / 2, quantityY);
      }
    });

    // Border around sin opinion
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(startX + partidosWidth, startY);
    ctx.lineTo(startX + partidosWidth, startY + availableHeight);
    ctx.stroke();
    ctx.setLineDash([]);

    const dataURL = tempCanvas.toDataURL('image/png');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Canvas es 960x540, el gráfico generado es 1600x750
      // Escalar para ocupar la mayor parte y centrar
      const graphWidth = 1600;
      const graphHeight = 750;
      const canvasWidth = 960;
      const canvasHeight = 540;
      const scale = Math.min((canvasWidth - 40) / graphWidth, (canvasHeight - 80) / graphHeight);
      const scaledWidth = graphWidth * scale;
      const scaledHeight = graphHeight * scale;
      const centerX = (canvasWidth - scaledWidth) / 2;
      const centerY = (canvasHeight - scaledHeight) / 2 + 20;

      const fabricImg = new FabricImage(img, {
        left: centerX,
        top: centerY,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
        hasControls: true,
      });
      // Asignar propiedades personalizadas después de crear el objeto
      (fabricImg as any).name = 'tablero-microsegmentacion-chart';
      (fabricImg as any).chartData = data;
      canvas.add(fabricImg);
      canvas.renderAll();
      onClose();
    };
    img.src = dataURL;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" style={{ maxWidth: '1200px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Tablero de Microsegmentación Integrado</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', gap: '30px', height: 'calc(90vh - 120px)', overflow: 'hidden' }}>
          {/* Vista previa */}
          <div style={{ flex: '0 0 400px' }}>
            <h4 style={{ marginBottom: '10px' }}>Vista Previa</h4>
            <canvas
              ref={canvasRef}
              width={400}
              height={280}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '100%',
                height: 'auto'
              }}
            />

            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={data.showHeaders}
                  onChange={(e) => setData(prev => ({ ...prev, showHeaders: e.target.checked }))}
                />
                <span>Mostrar encabezados con totales por grupo</span>
              </label>
            </div>
          </div>

          {/* Configuración */}
          <div style={{ flex: 1, overflow: 'auto', paddingRight: '10px' }}>
            {/* Sección Partidos */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 className="property-label">Partidos Políticos</h4>
                <button
                  className="btn-primary"
                  onClick={() => setShowAddPartyInput(!showAddPartyInput)}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px', fontSize: '14px' }}
                >
                  <Plus size={16} />
                  Agregar Partido
                </button>
              </div>

              {showAddPartyInput && (
                <div style={{
                  backgroundColor: '#f0f8ff',
                  border: '2px solid #0066cc',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#0066cc' }}>Agregar Nuevo Partido</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                      type="text"
                      value={newPartyName}
                      onChange={(e) => setNewPartyName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddParty()}
                      placeholder="Ej: MORENA, PAN, PRI, etc."
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #0066cc',
                        borderRadius: '5px',
                        fontSize: '14px'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                      <button onClick={() => setShowAddPartyInput(false)} className="btn-secondary">Cancelar</button>
                      <button onClick={handleAddParty} className="btn-primary">Agregar</button>
                    </div>
                  </div>
                </div>
              )}

              {data.partidos.map((partido) => {
                const segments = data.segments.filter(s => s.partido === partido);
                return (
                  <div key={partido} style={{ marginBottom: '30px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '6px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#0066cc' }}>{partido}</span>
                        <span style={{ fontSize: '13px', color: '#666' }}>({segments.length} segmentos)</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => addSegmentToPartido(partido)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                          <Plus size={14} /> Agregar Segmento
                        </button>
                        <button onClick={() => handleDeleteParty(partido)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                      {segments.map((segment) => (
                        <div key={segment.id} style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0' }}>
                            <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Segmento #{segment.id}</h5>
                            <button onClick={() => removeSegment(segment.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Nombre del Segmento</label>
                            <input
                              type="text"
                              value={segment.name}
                              onChange={(e) => updateSegment(segment.id, 'name', e.target.value)}
                              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                            />
                          </div>

                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Cantidad</label>
                            <input
                              type="text"
                              value={segment.cantidad}
                              onChange={(e) => updateSegment(segment.id, 'cantidad', e.target.value)}
                              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Color</label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input
                                type="color"
                                value={segment.color}
                                onChange={(e) => updateSegment(segment.id, 'color', e.target.value)}
                                style={{ width: '50px', height: '35px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                              />
                              <input
                                type="text"
                                value={segment.color}
                                onChange={(e) => updateSegment(segment.id, 'color', e.target.value)}
                                style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sección Sin Opinión */}
            <div style={{ marginBottom: '20px' }}>
              <h4 className="property-label" style={{ marginBottom: '15px' }}>Sin Opinión</h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                {data.sinOpinion.map((segment) => (
                  <div key={segment.id} style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Nombre del Segmento</label>
                      <input
                        type="text"
                        value={segment.name}
                        onChange={(e) => updateSinOpinion(segment.id, 'name', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Cantidad</label>
                      <input
                        type="text"
                        value={segment.cantidad}
                        onChange={(e) => updateSinOpinion(segment.id, 'cantidad', e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500', color: '#555' }}>Color</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={segment.color}
                          onChange={(e) => updateSinOpinion(segment.id, 'color', e.target.value)}
                          style={{ width: '50px', height: '35px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                        />
                        <input
                          type="text"
                          value={segment.color}
                          onChange={(e) => updateSinOpinion(segment.id, 'color', e.target.value)}
                          style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={insertChartToCanvas}>Generar Gráfico</button>
        </div>
      </div>
    </div>
  );
};

export default TableroMicrosegmentacionModal;
