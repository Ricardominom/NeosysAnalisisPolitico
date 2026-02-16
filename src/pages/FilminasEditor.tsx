import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas, FabricImage } from 'fabric';
import { ArrowLeft, Download, FileText, LayoutGrid } from 'lucide-react';
import PerfilIdentificacionModal from '../components/filminas/PerfilIdentificacionModal';
import TableroMicrosegmentacionModal from '../components/filminas/TableroMicrosegmentacionModal';
import { studiesService } from '../services/studies.service';
import { Study } from '../types';

type FilminaType = 'perfil' | 'microsegmentacion';

interface Filmina {
  id: FilminaType;
  title: string;
  description: string;
  background: string;
}

const filminas: Filmina[] = [
  {
    id: 'perfil',
    title: 'Estudio de Identificación y definición del Perfil',
    description: 'Análisis de puntos positivos y negativos del perfil político',
    background: '/img/MNEFTA.jpg'
  },
  {
    id: 'microsegmentacion',
    title: 'Tablero de Microsegmentación Integrado',
    description: 'Visualización de segmentos políticos y demográficos',
    background: '/img/nuevo_membrete.jpeg'
  }
];

const FilminasEditor = () => {
  const { studyId } = useParams<{ studyId: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [study, setStudy] = useState<Study | null>(null);
  const [selectedFilmina, setSelectedFilmina] = useState<Filmina | null>(null);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [showMicrosegmentacionModal, setShowMicrosegmentacionModal] = useState(false);

  // Cargar estudio
  useEffect(() => {
    if (studyId) {
      const loadedStudy = studiesService.getById(studyId);
      if (loadedStudy) {
        setStudy(loadedStudy);
      }
    }
  }, [studyId]);

  // Inicializar canvas cuando hay una filmina seleccionada
  useEffect(() => {
    if (canvasRef.current && !canvas && selectedFilmina) {
      console.log('Initializing Fabric canvas...');
      const fabricCanvas = new Canvas(canvasRef.current, {
        width: 960,
        height: 540,
        backgroundColor: '#ffffff',
        selection: true,
      });

      setCanvas(fabricCanvas);
      console.log('Canvas initialized:', fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [selectedFilmina, canvas]);

  // Cargar fondo cuando se selecciona una filmina
  useEffect(() => {
    if (canvas && selectedFilmina) {
      // Limpiar canvas
      canvas.clear();
      canvas.backgroundColor = '#ffffff';

      // Cargar imagen de fondo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const fabricImg = new FabricImage(img, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });
        // Asignar nombre después de crear el objeto
        (fabricImg as any).name = 'background-image';

        // Escalar para llenar el canvas
        fabricImg.scaleX = 960 / img.width;
        fabricImg.scaleY = 540 / img.height;

        canvas.add(fabricImg);
        canvas.sendObjectToBack(fabricImg);
        canvas.renderAll();
      };
      img.src = selectedFilmina.background;
    }
  }, [canvas, selectedFilmina]);

  const handleSelectFilmina = (filmina: Filmina) => {
    setSelectedFilmina(filmina);
  };

  const handleOpenModal = () => {
    if (!selectedFilmina) return;

    console.log('Opening modal, canvas state:', canvas);

    if (selectedFilmina.id === 'perfil') {
      setShowPerfilModal(true);
    } else if (selectedFilmina.id === 'microsegmentacion') {
      setShowMicrosegmentacionModal(true);
    }
  };

  const handleExportPNG = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });

    const link = document.createElement('a');
    link.download = `${selectedFilmina?.title || 'filmina'}.png`;
    link.href = dataURL;
    link.click();
  };

  const handleExportPDF = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2
    });

    // Crear un documento HTML para imprimir
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${selectedFilmina?.title || 'Filmina'}</title>
          <style>
            @page { size: landscape; margin: 0; }
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            img { max-width: 100%; max-height: 100vh; }
          </style>
        </head>
        <body>
          <img src="${dataURL}" />
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Preparar datos iniciales desde el estudio
  const getPerfilInitialData = () => {
    if (!study) return undefined;

    return {
      arquetipo: study.archetype || '',
      positivos: study.positivePoints?.filter(Boolean) || [],
      negativos: study.negativePoints?.filter(Boolean) || []
    };
  };

  const getMicrosegmentacionInitialData = () => {
    if (!study) return undefined;

    // Mapear blockA a segments
    const segments = study.blockA?.map((row, index) => ({
      id: index + 1,
      partido: row.party,
      name: `${row.party} Duro`,
      cantidad: `${row.duro} K`,
      color: ['#8D241A', '#689568', '#1B4365', '#B5B5B5'][index % 4],
      section: 'partidos' as const
    })) || [];

    // Mapear blockB a sinOpinion
    const sinOpinion = study.blockB?.map((row, index) => ({
      id: 100 + index,
      name: row.segment,
      cantidad: `${row.size} K`,
      color: ['#88D588', '#78C578', '#68B568', '#A89FD5', '#988FD5', '#887FD5'][index % 6]
    })) || [];

    return {
      partidos: study.blockA?.map(r => r.party) || [],
      segments,
      sinOpinion
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(studyId ? `/study/${studyId}` : '/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Volver
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              Editor de Filminas
              {study && <span className="text-gray-500 font-normal ml-2">- {study.title}</span>}
            </h1>
          </div>

          {selectedFilmina && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText size={18} />
                Editar Contenido
              </button>
              <button
                onClick={handleExportPNG}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                Exportar PNG
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Download size={18} />
                Exportar PDF
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Selector de filminas */}
        <div className="w-80 bg-white border-r border-gray-200 p-4 min-h-[calc(100vh-73px)]">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <LayoutGrid size={20} />
            Filminas Disponibles
          </h2>

          <div className="space-y-3">
            {filminas.map((filmina) => (
              <button
                key={filmina.id}
                onClick={() => handleSelectFilmina(filmina)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedFilmina?.id === filmina.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <h3 className="font-medium text-gray-900 text-sm">{filmina.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{filmina.description}</p>
              </button>
            ))}
          </div>

          {selectedFilmina && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 text-sm mb-2">Instrucciones</h3>
              <ol className="text-xs text-blue-700 space-y-1">
                <li>1. Haz clic en "Editar Contenido"</li>
                <li>2. Completa los campos del formulario</li>
                <li>3. Haz clic en "Insertar Gráfico"</li>
                <li>4. Exporta como PNG o PDF</li>
              </ol>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6">
          {selectedFilmina ? (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{selectedFilmina.title}</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden inline-block">
                <canvas
                  ref={canvasRef}
                  style={{ display: 'block' }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Haz clic en "Editar Contenido" para agregar elementos a la filmina.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              <div className="text-center">
                <LayoutGrid size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Selecciona una filmina</h2>
                <p className="text-gray-500">Elige una filmina del panel izquierdo para comenzar a editarla</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <PerfilIdentificacionModal
        isOpen={showPerfilModal}
        onClose={() => setShowPerfilModal(false)}
        canvas={canvas}
        initialData={getPerfilInitialData()}
      />

      <TableroMicrosegmentacionModal
        isOpen={showMicrosegmentacionModal}
        onClose={() => setShowMicrosegmentacionModal(false)}
        canvas={canvas}
        initialData={getMicrosegmentacionInitialData()}
      />
    </div>
  );
};

export default FilminasEditor;
