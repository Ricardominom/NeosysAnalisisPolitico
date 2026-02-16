import type { BlockBRow } from '../../../types';

interface BloqueBSlideProps {
  municipio: string;
  estado: string;
  bloqueB: BlockBRow[];
  fecha?: string;
}

/**
 * Slide para mostrar el Bloque B (segmentos de población)
 */
export const BloqueBSlide: React.FC<BloqueBSlideProps> = ({
  municipio,
  estado,
  bloqueB,
  fecha,
}) => {
  const colors = ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545'];

  return (
    <div className="w-[1280px] h-[720px] bg-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute left-[40px] top-[30px] flex items-center gap-4">
        <span className="text-[50px]">👨‍👩‍👧‍👦</span>
        <div>
          <h1 className="text-[36px] font-bold text-black">j. Bloque B - Segmentos de Población</h1>
          <p className="text-[24px] text-gray-600 mt-1">{municipio}, {estado}</p>
        </div>
      </div>

      {/* Concentric Circles Visualization */}
      <div className="absolute left-[100px] top-[200px]">
        <div className="relative w-[400px] h-[400px] flex items-center justify-center">
          {bloqueB.map((segment, index) => {
            const radius = 240 - index * 30;
            return (
              <div
                key={index}
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  width: `${radius}px`,
                  height: `${radius}px`,
                  backgroundColor: colors[index % colors.length],
                  opacity: 0.7,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Legend - List of Segments */}
      <div className="absolute left-[500px] top-[250px] space-y-6">
        {bloqueB.map((segment, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Color Box */}
            <div
              className="w-[30px] h-[30px] rounded flex-shrink-0 mt-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            />

            {/* Segment Info */}
            <div className="flex-1">
              <h3 className="text-[20px] font-bold text-gray-900">{segment.segment}</h3>
              <p
                className="text-[16px] font-bold mt-1"
                style={{ color: colors[index % colors.length] }}
              >
                {segment.size}%
              </p>
              <p className="text-[12px] text-gray-600 mt-1">
                {segment.description.substring(0, 50)}
                {segment.description.length > 50 && '...'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute right-[60px] bottom-[30px] flex items-center gap-2">
        <span className="text-[16px]">🧠</span>
        <span className="text-[20px] text-purple-700 font-bold">Rizoma</span>
      </div>
      <p className="absolute right-[60px] bottom-[10px] text-[12px] text-gray-400">
        {fecha || 'Realizado el 3 de febrero, 2026'}
      </p>
    </div>
  );
};
