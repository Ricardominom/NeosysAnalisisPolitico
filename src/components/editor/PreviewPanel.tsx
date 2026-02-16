import type { Study } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface PreviewPanelProps {
  study: Study;
}

export function PreviewPanel({ study }: PreviewPanelProps) {
  // Extract keywords from positive and negative points
  const extractKeywords = (text: string): string[] => {
    return text
      .toLowerCase()
      .split(/[\s,;.!?]+/)
      .filter((word) => word.length > 3);
  };

  const positiveKeywords = study.positivePoints.flatMap(extractKeywords);
  const negativeKeywords = study.negativePoints.flatMap(extractKeywords);

  const formatAdjective = (adjective: string): JSX.Element => {
    const lowerAdj = adjective.toLowerCase();
    const isPositive = positiveKeywords.some((kw) => lowerAdj.includes(kw) || kw.includes(lowerAdj));
    const isNegative = negativeKeywords.some((kw) => lowerAdj.includes(kw) || kw.includes(lowerAdj));

    if (isPositive) {
      return <strong>{adjective}</strong>;
    }
    if (isNegative) {
      return <s>{adjective}</s>;
    }
    return <>{adjective}</>;
  };

  const calculateBlockATotal = (field: 'duro' | 'enojado' | 'critico' | 'oportunista'): number => {
    return study.blockA.reduce((sum, row) => sum + row[field], 0);
  };

  return (
    <aside className="w-96 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto p-6 print:w-full print:bg-white transition-colors">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
            Vista previa
          </h2>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{study.title}</h1>
        </div>

        {/* Section 1: Arquetipo */}
        {study.archetype && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">1. Arquetipo de liderazgo</h3>
              <Badge variant="default">{study.archetypeUncertainty}</Badge>
            </div>
            <p className="text-gray-800 dark:text-gray-200">{study.archetype}</p>
          </section>
        )}

        {/* Section 1.1: Positive Points */}
        {study.positivePoints.some((p) => p) && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">1.1 Puntos positivos</h3>
              <Badge variant="success">{study.positivePointsUncertainty}</Badge>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {study.positivePoints.filter((p) => p).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 1.2: Negative Points */}
        {study.negativePoints.some((p) => p) && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">1.2 Puntos negativos</h3>
              <Badge variant="warning">{study.negativePointsUncertainty}</Badge>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {study.negativePoints.filter((p) => p).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Section 2: Candidates */}
        {study.candidates.some((c) => c.name) && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">2. Candidatos</h3>
              <Badge variant="default">{study.candidatesUncertainty}</Badge>
            </div>
            {study.candidates
              .filter((c) => c.name)
              .map((candidate, i) => (
                <div key={candidate.id} className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {i + 1}. {candidate.name}
                  </p>
                  {candidate.party && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.party}</p>
                  )}
                  {candidate.adjectives.length > 0 && (
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">2.1 Adjetivación: </span>
                      {candidate.adjectives.map((adj, idx) => (
                        <span key={idx}>
                          {formatAdjective(adj)}
                          {idx < candidate.adjectives.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                  {candidate.digitalSignal && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      Señal digital: {candidate.digitalSignal}
                    </p>
                  )}
                </div>
              ))}
          </section>
        )}

        {/* Section 3: Digital Universe */}
        {study.digitalUniverse > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">3. Universo digital electoral</h3>
              <Badge variant="default">{study.digitalUniverseUncertainty}</Badge>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              {study.digitalUniverse.toLocaleString()} ({(study.digitalUniverse / 1000).toFixed(0)}K)
            </p>
          </section>
        )}

        {/* Block A */}
        {study.blockA.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Bloque A</h3>
              <Badge variant="default">{study.blockAUncertainty}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-300 dark:border-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Partido</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">Duro</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">Enojado</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">Crítico</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">Oportunista</th>
                  </tr>
                </thead>
                <tbody>
                  {study.blockA.map((row) => (
                    <tr key={row.id}>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.party}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">{row.duro}K</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">{row.enojado}K</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">{row.critico}K</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">{row.oportunista}K</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">Total</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">
                      {calculateBlockATotal('duro')}K
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">
                      {calculateBlockATotal('enojado')}K
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">
                      {calculateBlockATotal('critico')}K
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">
                      {calculateBlockATotal('oportunista')}K
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Block B */}
        {study.blockB.length > 0 && (
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Bloque B</h3>
              <Badge variant="default">{study.blockBUncertainty}</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-gray-300 dark:border-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Segmento</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">Descripción</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">Tamaño</th>
                  </tr>
                </thead>
                <tbody>
                  {study.blockB.map((row) => (
                    <tr key={row.id}>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.segment}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">{row.description}</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-right">{row.size}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
