interface PerfilArquetipoSlideProps {
  arquetipo: string;
  municipio: string;
  estado: string;
  puntosPositivos: string[];
  puntosNegativos: string[];
  fecha?: string;
}

export const PerfilArquetipoSlide: React.FC<PerfilArquetipoSlideProps> = ({
  arquetipo,
  municipio,
  estado,
  puntosPositivos,
  puntosNegativos,
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
        <h1 className="text-[32px] font-bold text-black">f. Definición del perfil arquetípico</h1>
        <p className="text-[18px] text-black mt-[5px]">{municipio}, {estado}</p>
      </div>

      {/* Left Section */}
      <div className="absolute left-[80px] top-[180px] w-[300px] h-[350px] bg-gray-100 rounded-lg">
        {/* Color Wheel */}
        <div className="absolute left-1/2 top-[70px] -translate-x-1/2">
          <div className="relative w-[120px] h-[120px]">
            {/* Color circles around */}
            <div className="absolute left-[45px] top-0 w-[30px] h-[30px] rounded-full bg-[#FF6B6B]"></div>
            <div className="absolute right-[5px] top-[20px] w-[30px] h-[30px] rounded-full bg-[#FF8E53]"></div>
            <div className="absolute right-0 bottom-[25px] w-[30px] h-[30px] rounded-full bg-[#FFC107]"></div>
            <div className="absolute left-[45px] bottom-0 w-[30px] h-[30px] rounded-full bg-[#66BB6A]"></div>
            <div className="absolute left-0 bottom-[25px] w-[30px] h-[30px] rounded-full bg-[#42A5F5]"></div>
            <div className="absolute left-[5px] top-[20px] w-[30px] h-[30px] rounded-full bg-[#AB47BC]"></div>

            {/* Center circle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
              <span className="text-[40px] text-yellow-400">⬡</span>
            </div>
          </div>
        </div>

        {/* Descriptive text */}
        <div className="absolute left-[20px] bottom-[50px] text-[14px] text-gray-600 leading-relaxed">
          <p>La población digital de</p>
          <p>{municipio} busca en su</p>
          <p>próximo alcalde la figura</p>
          <p>arquetípica de un</p>
          <p className="text-[36px] font-bold text-purple-700 mt-2">{arquetipo}</p>
        </div>
      </div>

      {/* Positive Section */}
      <div className="absolute left-[450px] top-[170px] w-[330px]">
        <div className="w-full h-[50px] bg-[#2D5016] rounded-md flex items-center px-4 gap-2">
          <span className="text-white text-[28px]">✓</span>
          <span className="text-white text-[24px] font-bold">Positivo</span>
        </div>
        <div className="mt-6 space-y-6">
          {puntosPositivos.slice(0, 3).map((punto, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-black text-[14px] mt-1">▸</span>
              <p className="text-[12px] text-black flex-1 leading-relaxed">{punto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Negative Section */}
      <div className="absolute left-[820px] top-[170px] w-[330px]">
        <div className="w-full h-[50px] bg-[#4A1511] rounded-md flex items-center px-4 gap-2">
          <span className="text-white text-[28px]">✗</span>
          <span className="text-white text-[24px] font-bold">Negativo</span>
        </div>
        <div className="mt-6 space-y-6">
          {puntosNegativos.slice(0, 3).map((punto, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-black text-[14px] mt-1">▸</span>
              <p className="text-[12px] text-black flex-1 leading-relaxed">{punto}</p>
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
