import type { Candidate } from '../../../types';

interface AdjetivacionDigitalSlideProps {
  municipio: string;
  estado: string;
  arquetipo: string;
  adjetivosPositivos: string[];
  adjetivosNegativos: string[];
  candidatos: Candidate[];
  fecha?: string;
}

export const AdjetivacionDigitalSlide: React.FC<AdjetivacionDigitalSlideProps> = ({
  municipio,
  estado,
  arquetipo,
  adjetivosPositivos,
  adjetivosNegativos,
  candidatos,
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
        <h1 className="text-[26px] font-bold text-black">g. Adjetivación digital y concordancia arquetípica</h1>
        <p className="text-[16px] text-black mt-[2px]">{municipio}, {estado}</p>
      </div>

      {/* Left Section */}
      <div className="absolute left-[60px] top-[150px]">
        <p className="text-[22px] text-gray-600">Perfil:</p>
        <h2 className="text-[34px] font-bold text-black mt-2">{arquetipo}</h2>

        {/* Adjectives Boxes */}
        <div className="flex gap-3 mt-[58px]">
          {/* Positive Box */}
          <div className="w-[170px] h-[190px] bg-white border-2 border-gray-300 rounded-lg p-3">
            <h3 className="text-[16px] font-bold text-black mb-4">Adjetivos</h3>
            <div className="space-y-2">
              {adjetivosPositivos.slice(0, 4).map((adj, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#0066CC] text-[13px] font-bold">•</span>
                  <span className="text-[#0066CC] text-[12px] font-bold">{adj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Negative Box */}
          <div className="w-[170px] h-[190px] bg-white border-2 border-gray-300 rounded-lg p-3">
            <h3 className="text-[16px] font-bold text-black">Contra</h3>
            <h3 className="text-[16px] font-bold text-black mb-2">Adjetivos</h3>
            <div className="space-y-2">
              {adjetivosNegativos.slice(0, 4).map((adj, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#CC0000] text-[13px] font-bold">•</span>
                  <span className="text-[#CC0000] text-[12px] font-bold">{adj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="absolute left-[480px] top-[150px] grid grid-cols-2 gap-[18px]">
        {candidatos.slice(0, 4).map((candidato, idx) => (
          <div
            key={idx}
            className="w-[270px] h-[220px] bg-white border-2 border-gray-300 rounded-lg p-3 relative"
          >
            {/* Photo Circle */}
            <div className="absolute right-3 top-3 w-[56px] h-[56px] rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center">
              <span className="text-[22px]">👤</span>
            </div>

            {/* Name */}
            <div className="pr-[65px]">
              <h3 className="text-[15px] font-bold text-black leading-tight">
                {candidato.name.split(' ').slice(0, 2).join(' ')}
              </h3>
              {candidato.name.split(' ').length > 2 && (
                <h3 className="text-[15px] font-bold text-black leading-tight">
                  {candidato.name.split(' ').slice(2).join(' ')}
                </h3>
              )}
            </div>

            {/* Party */}
            <p className="text-[12px] font-bold text-black mt-[10px]">{candidato.party}</p>

            {/* Adjectives */}
            <div className="mt-[10px] space-y-[4px]">
              {candidato.adjectives.slice(0, 4).map((adj, adjIdx) => (
                <div key={adjIdx} className="flex items-start gap-2">
                  <span className="text-black text-[11px]">•</span>
                  <span className="text-black text-[11px]">{adj}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
