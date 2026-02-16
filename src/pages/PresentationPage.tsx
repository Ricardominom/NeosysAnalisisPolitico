import { useParams, useNavigate } from 'react-router-dom';
import { useStudies } from '../hooks/useStudies';
import { PresentationViewer } from '../components/presentation/PresentationViewer';
import { PerfilArquetipoSlide } from '../components/presentation/slides/PerfilArquetipoSlide';
import { AdjetivacionDigitalSlide } from '../components/presentation/slides/AdjetivacionDigitalSlide';
import { PerfiladoDigitalSlide } from '../components/presentation/slides/PerfiladoDigitalSlide';
import { Button } from '../components/ui/Button';

/**
 * Página de presentación de un estudio
 */
export const PresentationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { studies } = useStudies();

  const study = studies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Estudio no encontrado
          </h2>
          <Button onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const fecha = `Realizado el ${new Date(study.updatedAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;

  const municipio = study.municipio || 'Municipio';
  const estado = study.estado || 'Estado';

  // Extraer adjetivos de puntos positivos y negativos
  const adjetivosPositivos = ['Eficaz', 'Ordenado', 'Responsable', 'Accesible'];
  const adjetivosNegativos = ['Discrecional', 'Abusivo', 'Improvisado', 'Indolente'];

  // Crear slides basados en los datos del estudio
  const slides = [
    // Slide 1: Perfil Arquetípico
    <PerfilArquetipoSlide
      key="arquetipo"
      arquetipo={study.archetype}
      municipio={municipio}
      estado={estado}
      puntosPositivos={study.positivePoints}
      puntosNegativos={study.negativePoints}
      fecha={fecha}
    />,

    // Slide 2: Adjetivación Digital
    <AdjetivacionDigitalSlide
      key="adjetivacion"
      municipio={municipio}
      estado={estado}
      arquetipo={study.archetype}
      adjetivosPositivos={adjetivosPositivos}
      adjetivosNegativos={adjetivosNegativos}
      candidatos={study.candidates}
      fecha={fecha}
    />,

    // Slide 3: Perfilado Digital Electoral
    <PerfiladoDigitalSlide
      key="perfilado"
      municipio={municipio}
      estado={estado}
      universoDigital={study.digitalUniverse}
      bloqueA={study.blockA}
      fecha={fecha}
    />,
  ];

  return (
    <PresentationViewer
      slides={slides}
      title={study.municipio && study.estado ? `${study.municipio}, ${study.estado}` : study.title}
    />
  );
};
