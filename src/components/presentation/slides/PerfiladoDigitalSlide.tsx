import type { BlockARow } from '../../../types';

interface PerfiladoDigitalSlideProps {
  municipio: string;
  estado: string;
  universoDigital: number;
  bloqueA: BlockARow[];
  fecha?: string;
}

export const PerfiladoDigitalSlide: React.FC<PerfiladoDigitalSlideProps> = ({
  municipio,
  estado,
  universoDigital,
  bloqueA: _bloqueA,
  fecha,
}) => {
  return (
    <div className="w-[1280px] h-[720px] bg-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute left-[10px] top-[30px] w-[120px] h-[70px] bg-black flex items-center justify-center gap-1">
        <span className="text-[45px]">🧠</span>
        <span className="text-[45px]">📊</span>
      </div>

      <div className="absolute left-[145px] top-[38px]">
        <h1 className="text-[32px] font-bold text-black">h. Perfilado digital electoral</h1>
        <p className="text-[18px] text-black mt-[5px]">
          {municipio}, {estado}: {universoDigital.toLocaleString('es-MX')}
        </p>
      </div>

      {/* Labels */}
      <div className="absolute left-[70px] top-[130px] flex gap-[20px] text-[12px] font-bold">
        <div className="w-[180px] text-center">
          <div>Morena</div>
          <div>36 K</div>
        </div>
        <div className="w-[220px] text-center">
          <div>PAN</div>
          <div>45 K</div>
        </div>
        <div className="w-[140px] text-center">
          <div>PRI</div>
          <div>20 K</div>
        </div>
        <div className="w-[190px] text-center">
          <div>Otros</div>
          <div>29 K</div>
        </div>
        <div className="w-[210px] text-center">
          <div>Sin opinión</div>
          <div>50 K</div>
        </div>
      </div>

      {/* Treemap */}
      <div className="absolute left-[70px] top-[175px] flex gap-[5px] h-[430px]">
        {/* MORENA Section - 180px */}
        <div className="w-[180px] flex flex-col gap-[3px]">
          <div className="h-[110px] bg-[#E8A7A7] border-[3px] border-white flex items-center justify-center">
            <div className="text-[14px] font-bold text-black text-center leading-tight">
              <div>Morena</div>
              <div>Enojado</div>
              <div>10 K</div>
            </div>
          </div>
          <div className="flex gap-[4px] h-[55px]">
            <div className="flex-1 bg-[#D28B8B] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] text-black text-center leading-tight">
                <div>Morena</div>
                <div>Enojado</div>
                <div>2 K</div>
              </div>
            </div>
            <div className="flex-1 bg-[#B85C5C] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] text-white text-center leading-tight">
                <div>Morena</div>
                <div>Crítico</div>
                <div>4 K</div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#8B2F2F] border-[3px] border-white flex items-center justify-center">
            <div className="text-[16px] font-bold text-white text-center leading-tight">
              <div>Morena</div>
              <div>Duro</div>
              <div>20 K</div>
            </div>
          </div>
        </div>

        {/* PAN Section - 220px */}
        <div className="w-[220px] flex flex-col gap-[3px]">
          <div className="h-[75px] bg-[#6EADD4] border-[3px] border-white flex items-center justify-center">
            <div className="text-[13px] text-black">PAN Oportunista 5 K</div>
          </div>
          <div className="flex gap-[4px] h-[50px]">
            <div className="flex-1 bg-[#4A8CB8] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] text-white text-center leading-tight">
                <div>PAN</div>
                <div>Enojado</div>
                <div>2 K</div>
              </div>
            </div>
            <div className="flex-1 bg-[#2D6A99] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] text-white text-center leading-tight">
                <div>PAN</div>
                <div>Crítico</div>
                <div>3 K</div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#1E4A6B] border-[3px] border-white flex items-center justify-center">
            <div className="text-[18px] font-bold text-white text-center leading-tight">
              <div>PAN</div>
              <div>Duro</div>
              <div>35 K</div>
            </div>
          </div>
        </div>

        {/* PRI Section - 140px */}
        <div className="w-[140px] flex flex-col gap-[3px]">
          <div className="h-[48px] bg-[#F7A8A8] border-[3px] border-white flex items-center justify-center">
            <div className="text-[10px] text-black text-center leading-tight">
              <div>PRI Oport.</div>
              <div>2 K</div>
            </div>
          </div>
          <div className="h-[60px] bg-[#E87676] border-[3px] border-white flex items-center justify-center">
            <div className="text-[11px] text-black text-center leading-tight">
              <div>PRI</div>
              <div>Enojado</div>
              <div>3 K</div>
            </div>
          </div>
          <div className="h-[48px] bg-[#D44545] border-[3px] border-white flex items-center justify-center">
            <div className="text-[10px] text-white text-center leading-tight">
              <div>PRI Crítico</div>
              <div>1 K</div>
            </div>
          </div>
          <div className="flex-1 bg-[#B82020] border-[3px] border-white flex items-center justify-center">
            <div className="text-[16px] font-bold text-white text-center leading-tight">
              <div>PRI</div>
              <div>Duro</div>
              <div>14 K</div>
            </div>
          </div>
        </div>

        {/* OTROS Section - 190px */}
        <div className="w-[190px] flex flex-col gap-[3px]">
          <div className="h-[75px] bg-[#F5A623] border-[3px] border-white flex items-center justify-center">
            <div className="text-[14px] font-bold text-black">CI 4 K</div>
          </div>
          <div className="h-[130px] bg-[#FF6B35] border-[3px] border-white flex items-center justify-center">
            <div className="text-[16px] font-bold text-white">MC 10 K</div>
          </div>
          <div className="flex-1 flex gap-[2px]">
            <div className="flex-1 bg-[#FFD93D] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] font-bold text-black text-center leading-tight">
                <div>PRD</div>
                <div>3 K</div>
              </div>
            </div>
            <div className="flex-1 bg-[#81C784] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] font-bold text-black text-center leading-tight">
                <div>PVEM</div>
                <div>6 K</div>
              </div>
            </div>
            <div className="flex-1 bg-[#E53935] border-[3px] border-white flex items-center justify-center">
              <div className="text-[10px] font-bold text-white text-center leading-tight">
                <div>PT</div>
                <div>6 K</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIN OPINIÓN Section - 210px */}
        <div className="w-[210px] border-[3px] border-[#4CAF50] border-dashed rounded-lg p-[5px] flex flex-col gap-[2px]">
          {[
            { name: 'Tercera edad 6K', color: '#A5D6A7', h: '45px' },
            { name: 'Comerciantes 7K', color: '#66BB6A', h: '55px' },
            { name: 'Centennials 10K', color: '#4CAF50', h: '75px' },
            { name: 'Geeks 1.5K', color: '#9575CD', h: '30px' },
            { name: 'Religiosos 3.5K', color: '#BA68C8', h: '28px' },
            { name: 'Deportistas 4.5K', color: '#7E57C2', h: '35px' },
            { name: 'Amas de casa 5K', color: '#AB47BC', h: '38px' },
            { name: 'Animalistas 2.4K', color: '#FF9800', h: '25px' },
            { name: 'Madres solteras 2.8K', color: '#26C6DA', h: '25px' },
            { name: 'Profesores 2.2K', color: '#FFA726', h: '22px' },
            { name: 'Empresarios 0.6K', color: '#FFCC80', h: '18px' },
            { name: 'Estudiantes 3K', color: '#80DEEA', h: '24px' },
          ].map((seg, idx) => (
            <div
              key={idx}
              className="border-2 border-white flex items-center px-[7px]"
              style={{
                backgroundColor: seg.color,
                height: seg.h,
              }}
            >
              <span
                className="text-[8px] font-bold"
                style={{
                  color: seg.color.includes('F') || seg.color.includes('A') || seg.color.includes('8') ? '#000' : '#FFF',
                }}
              >
                {seg.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute right-[60px] bottom-[30px] flex items-center gap-2">
        <span className="text-[16px]">🧠</span>
        <span className="text-[16px] text-black font-medium">Rizoma</span>
        <div className="ml-2 w-[44px] h-[44px] rounded-full border-2 border-purple-700 bg-white flex items-center justify-center">
          <span className="text-[16px]">🧠</span>
        </div>
      </div>
      <p className="absolute right-[60px] bottom-[10px] text-[10px] text-gray-500">
        {fecha || 'Realizado el 13 de febrero de 2026'}
      </p>
    </div>
  );
};
