import { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Canvas, Image as FabricImage, IText } from 'fabric';
import '../../styles/ChartModals.css';

interface PerfilIdentificacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: Canvas | null;
  // Datos del estudio para prellenar
  initialData?: {
    lugar?: string;
    candidatoA?: string;
    arquetipo?: string;
    positivos?: string[];
    negativos?: string[];
  };
}

const PerfilIdentificacionModal = ({
  isOpen,
  onClose,
  canvas,
  initialData
}: PerfilIdentificacionModalProps) => {
  const [title] = useState('Estudio de Identificación y definición del Perfil');
  const [positiveBullets, setPositiveBullets] = useState<string[]>(
    initialData?.positivos || [
      'La población digital busca en su próximo candidato la figura arquetípica de un Impulsor',
      'Quieren que posea un carácter fuerte para combatir inseguridad y criminalidad',
      'Buscan un enfoque renovado de la política que transforme la manera de abordar problemas'
    ]
  );
  const [negativeBullets, setNegativeBullets] = useState<string[]>(
    initialData?.negativos || [
      'Les enfadaría que haga mega obras sin dar cuentas claras sobre el gasto público',
      'No desean a alguien que se limite a aparecer en redes sociales mientras permanece ausente',
      'Les enojaría que sus promesas de campaña no llegaran a realizarse o fueran ineficientes'
    ]
  );
  const [fechaRealizacion, setFechaRealizacion] = useState('');
  const [lugar, setLugar] = useState(initialData?.lugar || 'Nuevo León');
  const [candidatoA, setCandidatoA] = useState(initialData?.candidatoA || 'Gobernador');
  const [arquetipo, setArquetipo] = useState(initialData?.arquetipo || 'Impulsor');
  const previewRef = useRef<HTMLCanvasElement>(null);

  // Funciones para manejar bullets positivos
  const addPositiveBullet = () => {
    setPositiveBullets([...positiveBullets, '']);
  };

  const removePositiveBullet = (index: number) => {
    setPositiveBullets(positiveBullets.filter((_, i) => i !== index));
  };

  const updatePositiveBullet = (index: number, value: string) => {
    const newBullets = [...positiveBullets];
    newBullets[index] = value;
    setPositiveBullets(newBullets);
  };

  // Funciones para manejar bullets negativos
  const addNegativeBullet = () => {
    setNegativeBullets([...negativeBullets, '']);
  };

  const removeNegativeBullet = (index: number) => {
    setNegativeBullets(negativeBullets.filter((_, i) => i !== index));
  };

  const updateNegativeBullet = (index: number, value: string) => {
    const newBullets = [...negativeBullets];
    newBullets[index] = value;
    setNegativeBullets(newBullets);
  };

  // Formatear fecha para el footnote
  const formatFootnote = (dateString: string) => {
    if (!dateString) return '*Perfil realizado el xx-xx-xx';
    const [year, month, day] = dateString.split('-');
    return `*Perfil realizado el ${day}-${month}-${year}`;
  };

  // Construir texto de lugar/candidato automáticamente
  const buildLugarCandidatoText = () => {
    return `La población digital de\n${lugar}\nbusca en su próximo\n${candidatoA}\nla figura arquetípica de un`;
  };

  // Helpers for wrapping text and bullets
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
  };

  const drawBulletText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    ctx.beginPath();
    ctx.fillStyle = '#111827';
    ctx.arc(x + 6, y - 6, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = 'left';
    wrapText(ctx, text, x + 18, y, maxWidth - 18, lineHeight);
  };

  const estimateLines = (text: string, maxWidth: number, ctx: CanvasRenderingContext2D) => {
    const words = text.split(' ');
    let line = '';
    let lines = 1;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth && n > 0) {
        line = words[n] + ' ';
        lines++;
      } else {
        line = testLine;
      }
    }
    return lines;
  };

  const drawRightColumns = async (positiveItems: string[], negativeItems: string[]): Promise<HTMLCanvasElement> => {
    return new Promise((resolve) => {
      const c = document.createElement('canvas');
      const width = 820;
      const height = 600;
      c.width = width;
      c.height = height;
      const ctx = c.getContext('2d')!;

      const col1X = 40;
      const col2X = col1X + 360 + 60;
      const colYStart = 50;

      // Positive header
      ctx.fillStyle = '#2a4e00';
      ctx.fillRect(col1X - 12, colYStart - 36, 360, 44);

      const iconSize = 24;
      const iconY = colYStart - 28;
      ctx.fillStyle = '#fff';
      ctx.fillRect(col1X, iconY, iconSize, iconSize);
      ctx.strokeStyle = '#2a4e00';
      ctx.lineWidth = 1;
      ctx.strokeRect(col1X, iconY, iconSize, iconSize);

      ctx.strokeStyle = '#2a4e00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(col1X + 6, iconY + 12);
      ctx.lineTo(col1X + 10, iconY + 17);
      ctx.lineTo(col1X + 18, iconY + 8);
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('|', col1X + iconSize + 8, colYStart - 8);
      ctx.fillText('Positivo', col1X + iconSize + 25, colYStart - 8);

      // Negative header
      ctx.fillStyle = '#520f00';
      ctx.fillRect(col2X - 12, colYStart - 36, 360, 44);

      ctx.fillStyle = '#fff';
      ctx.fillRect(col2X, iconY, iconSize, iconSize);
      ctx.strokeStyle = '#520f00';
      ctx.lineWidth = 1;
      ctx.strokeRect(col2X, iconY, iconSize, iconSize);

      ctx.strokeStyle = '#520f00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(col2X + 6, iconY + 6);
      ctx.lineTo(col2X + 18, iconY + 18);
      ctx.moveTo(col2X + 18, iconY + 6);
      ctx.lineTo(col2X + 6, iconY + 18);
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('|', col2X + iconSize + 8, colYStart - 8);
      ctx.fillText('Negativo', col2X + iconSize + 25, colYStart - 8);

      // Draw bullet lists
      ctx.fillStyle = '#111827';
      ctx.font = '14px Arial';
      const bulletLineHeight = 22;
      let y = colYStart + 94;

      positiveItems.forEach((txt) => {
        ctx.textAlign = 'left';
        drawBulletText(ctx, txt, col1X, y, 340, bulletLineHeight);
        y += estimateLines(txt, 340, ctx) * bulletLineHeight + 28;
      });

      y = colYStart + 94;
      negativeItems.forEach((txt) => {
        ctx.textAlign = 'left';
        drawBulletText(ctx, txt, col2X, y, 340, bulletLineHeight);
        y += estimateLines(txt, 340, ctx) * bulletLineHeight + 28;
      });

      // Footer
      ctx.fillStyle = '#111827';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(formatFootnote(fechaRealizacion), width - 40, height - 24);

      resolve(c);
    });
  };

  const drawPreview = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      const positiveItems = positiveBullets.filter(b => b.trim());
      const negativeItems = negativeBullets.filter(b => b.trim());

      const rightCanvas = await drawRightColumns(positiveItems, negativeItems);
      const ctx = previewRef.current.getContext('2d')!;

      ctx.clearRect(0, 0, previewRef.current.width, previewRef.current.height);

      const combinedWidth = rightCanvas.width;
      const combinedHeight = rightCanvas.height;

      const scale = Math.min(
        previewRef.current.width / combinedWidth,
        previewRef.current.height / combinedHeight
      );

      const scaledRightWidth = rightCanvas.width * scale;
      const scaledRightHeight = rightCanvas.height * scale;

      const offsetX = (previewRef.current.width - scaledRightWidth) / 2;
      const offsetY = (previewRef.current.height - scaledRightHeight) / 2;

      ctx.drawImage(rightCanvas, offsetX, offsetY, scaledRightWidth, scaledRightHeight);
    } catch (error) {
      console.error('Error al dibujar vista previa:', error);
    }
  }, [positiveBullets, negativeBullets, fechaRealizacion]);

  useEffect(() => {
    if (isOpen) {
      drawPreview();
    }
  }, [isOpen, drawPreview]);

  const handleInsert = async () => {
    console.log('handleInsert called');
    console.log('canvas:', canvas);
    if (!canvas) {
      console.log('No canvas available!');
      return;
    }

    try {
      console.log('Starting insert process...');
      const objects = canvas.getObjects();
      const existingRight = objects.find(obj => (obj as any).name === 'perfil-identificacion-right');
      if (existingRight) canvas.remove(existingRight);

      const positiveItems = positiveBullets.filter(b => b.trim());
      const negativeItems = negativeBullets.filter(b => b.trim());
      console.log('positiveItems:', positiveItems);
      console.log('negativeItems:', negativeItems);

      console.log('Calling drawRightColumns...');
      const rightCanvas = await drawRightColumns(positiveItems, negativeItems);
      console.log('rightCanvas created:', rightCanvas);
      const rightDataURL = rightCanvas.toDataURL('image/png');
      console.log('rightDataURL length:', rightDataURL.length);

      // Canvas es 960x540, el gráfico generado es 820x600
      // El diseño tiene texto a la izquierda, así que el gráfico va más a la derecha
      const graphWidth = 820;
      const graphHeight = 600;
      const canvasWidth = 960;
      const canvasHeight = 540;
      // Escalar para que ocupe aproximadamente 70% del ancho (dejando espacio para texto izquierdo)
      const targetWidth = canvasWidth * 0.70;
      const scale = Math.min(targetWidth / graphWidth, (canvasHeight - 60) / graphHeight);
      const scaledWidth = graphWidth * scale;
      const scaledHeight = graphHeight * scale;
      // Posicionar a la derecha del canvas
      const rightX = canvasWidth - scaledWidth - 20;
      const centerY = (canvasHeight - scaledHeight) / 2 + 10;

      const rightPos = existingRight
        ? { left: existingRight.left, top: existingRight.top, scaleX: existingRight.scaleX, scaleY: existingRight.scaleY }
        : { left: rightX, top: centerY, scaleX: scale, scaleY: scale };

      const positiveText = positiveBullets.map(b => `- ${b}`).join('\n\n');
      const negativeText = negativeBullets.map(b => `- ${b}`).join('\n\n');

      // Definir insertTexts antes de usarlo en el callback
      const insertTexts = () => {
        const existingTexts = canvas.getObjects().filter(obj =>
          (obj as any).name === 'perfil-lugar-candidato-text' ||
          (obj as any).name === 'perfil-arquetipo-text'
        );
        existingTexts.forEach(text => canvas.remove(text));

        // Los textos de lugar/candidato y arquetipo van a la izquierda del gráfico principal
        const lugarCandidatoText = buildLugarCandidatoText();
        const textLeftMargin = 30;
        const textTop = 280;

        const lugarCandidatoTextObj = new IText(lugarCandidatoText, {
          left: textLeftMargin,
          top: textTop,
          fontSize: 13,
          fontFamily: 'Arial',
          fill: '#6b7280',
          selectable: true,
          evented: true,
          hasControls: true,
          textAlign: 'center'
        });
        (lugarCandidatoTextObj as any).name = 'perfil-lugar-candidato-text';

        const arquetipoTextObj = new IText(arquetipo, {
          left: textLeftMargin + 45,
          top: textTop + 100,
          fontSize: 18,
          fontFamily: 'Arial',
          fill: '#7c3aed',
          selectable: true,
          evented: true,
          hasControls: true,
          textAlign: 'center'
        });
        (arquetipoTextObj as any).name = 'perfil-arquetipo-text';

        canvas.add(lugarCandidatoTextObj, arquetipoTextObj);
        canvas.requestRenderAll();
        onClose();
      };

      console.log('Creating Image object...');
      const rightImg = new Image();
      rightImg.crossOrigin = 'anonymous';
      rightImg.onerror = (err) => {
        console.error('Error loading image:', err);
      };
      rightImg.onload = () => {
        console.log('Image loaded successfully!');
        console.log('Creating FabricImage...');
        try {
          const fabricRightImg = new FabricImage(rightImg, {
            left: rightPos.left,
            top: rightPos.top,
            scaleX: rightPos.scaleX,
            scaleY: rightPos.scaleY,
            selectable: true,
            evented: true,
            hasControls: true,
            hasBorders: true,
            hoverCursor: 'move',
          });
          console.log('FabricImage created');
          (fabricRightImg as any).name = 'perfil-identificacion-right';
          (fabricRightImg as any).chartData = {
            positive: positiveBullets,
            negative: negativeBullets,
            positiveText,
            negativeText,
            footnote: formatFootnote(fechaRealizacion),
            title
          };

          console.log('Adding to canvas...');
          canvas.add(fabricRightImg);
          fabricRightImg.setCoords();
          canvas.requestRenderAll();
          console.log('Calling insertTexts...');
          insertTexts();
          console.log('Done!');
        } catch (innerErr) {
          console.error('Error in onload callback:', innerErr);
        }
      };
      rightImg.src = rightDataURL;
      console.log('Image src set, waiting for onload...');
    } catch (err) {
      console.error('Error inserting images:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chart-modal-overlay">
      <div className="chart-modal-container" style={{ maxWidth: '1400px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#333',
            lineHeight: '1',
            padding: '0',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            fontWeight: 'bold'
          }}
          title="Cerrar"
        >
          <X size={24} />
        </button>

        <h2 className="chart-modal-title">{title}</h2>

        <div className="demografia-two-column-layout">
          <div className="demografia-form-column">
            <div style={{ display: 'flex', gap: '12px', marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, color: '#334155', fontSize: 15 }}>Lugar</label>
                <input
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Ej: Nuevo León"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    marginTop: 4,
                    fontSize: 14,
                    outline: 'none',
                    background: '#f8fafc',
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, color: '#334155', fontSize: 15 }}>Candidato a</label>
                <input
                  value={candidatoA}
                  onChange={(e) => setCandidatoA(e.target.value)}
                  placeholder="Ej: Gobernador"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1.5px solid #cbd5e1',
                    marginTop: 4,
                    fontSize: 14,
                    outline: 'none',
                    background: '#f8fafc',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#334155', fontSize: 15 }}>Arquetipo</label>
              <input
                value={arquetipo}
                onChange={(e) => setArquetipo(e.target.value)}
                placeholder="Ej: Impulsor"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1.5px solid #cbd5e1',
                  marginTop: 4,
                  fontSize: 14,
                  outline: 'none',
                  background: '#f8fafc',
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, color: '#334155', fontSize: 15 }}>Fecha de realización</label>
              <input
                type="date"
                value={fechaRealizacion}
                onChange={(e) => setFechaRealizacion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: '1.5px solid #cbd5e1',
                  marginTop: 4,
                  fontSize: 14,
                  outline: 'none',
                  background: '#f8fafc',
                }}
              />
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                Pie de página: {formatFootnote(fechaRealizacion)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontWeight: 600, color: '#2a4e00', fontSize: 15 }}>Positivo</label>
                  <button
                    onClick={addPositiveBullet}
                    style={{
                      background: '#2a4e00',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    + Agregar
                  </button>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
                  {positiveBullets.map((bullet, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <textarea
                        value={bullet}
                        onChange={(e) => updatePositiveBullet(index, e.target.value)}
                        rows={3}
                        placeholder="Escribe el punto positivo..."
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 6,
                          border: '1.5px solid #cbd5e1',
                          fontSize: 13,
                          outline: 'none',
                          background: '#f8fafc',
                          resize: 'vertical',
                          fontFamily: 'Arial',
                        }}
                      />
                      <button
                        onClick={() => removePositiveBullet(index)}
                        style={{
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 12px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          minWidth: '32px',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontWeight: 600, color: '#520f00', fontSize: 15 }}>Negativo</label>
                  <button
                    onClick={addNegativeBullet}
                    style={{
                      background: '#520f00',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 12px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    + Agregar
                  </button>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
                  {negativeBullets.map((bullet, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <textarea
                        value={bullet}
                        onChange={(e) => updateNegativeBullet(index, e.target.value)}
                        rows={3}
                        placeholder="Escribe el punto negativo..."
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: 6,
                          border: '1.5px solid #cbd5e1',
                          fontSize: 13,
                          outline: 'none',
                          background: '#f8fafc',
                          resize: 'vertical',
                          fontFamily: 'Arial',
                        }}
                      />
                      <button
                        onClick={() => removeNegativeBullet(index)}
                        style={{
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 12px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          minWidth: '32px',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="demografia-preview-column">
            <div style={{ marginBottom: 20 }}>
              <canvas
                ref={previewRef}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  background: '#ffffff'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
              <button onClick={onClose} className="btn-secondary">Cancelar</button>
              <button onClick={handleInsert} className="btn-primary">Insertar Gráfico</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilIdentificacionModal;
