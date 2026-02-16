import type { Study } from '@/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { TagInput } from '@/components/ui/TagInput';
import { Button } from '@/components/ui/Button';
import type { Candidate, BlockARow, BlockBRow, UncertaintyLevel } from '@/types';

interface EditorFormProps {
  study: Study;
  activeSection: string;
  updateField: <K extends keyof Study>(field: K, value: Study[K]) => void;
  setStudy: React.Dispatch<React.SetStateAction<Study>>;
}

const uncertaintyOptions = [
  { value: 'Baja', label: 'Baja' },
  { value: 'Media', label: 'Media' },
  { value: 'Alta', label: 'Alta' },
];

export function EditorForm({ study, activeSection, updateField}: EditorFormProps) {
  const updateCandidate = (index: number, field: keyof Candidate, value: string | string[]) => {
    const updated = [...study.candidates];
    updated[index] = { ...updated[index], [field]: value };
    updateField('candidates', updated);
  };

  const moveCandidateUp = (index: number) => {
    if (index === 0) return;
    const updated = [...study.candidates];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    updateField('candidates', updated);
  };

  const moveCandidateDown = (index: number) => {
    if (index === study.candidates.length - 1) return;
    const updated = [...study.candidates];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    updateField('candidates', updated);
  };

  const updatePositivePoint = (index: number, value: string) => {
    const updated = [...study.positivePoints];
    updated[index] = value;
    updateField('positivePoints', updated);
  };

  const updateNegativePoint = (index: number, value: string) => {
    const updated = [...study.negativePoints];
    updated[index] = value;
    updateField('negativePoints', updated);
  };

  const addBlockARow = () => {
    const newRow: BlockARow = {
      id: `ba_${Date.now()}`,
      party: '',
      duro: 0,
      enojado: 0,
      critico: 0,
      oportunista: 0,
    };
    updateField('blockA', [...study.blockA, newRow]);
  };

  const updateBlockARow = (index: number, field: keyof BlockARow, value: string | number) => {
    const updated = [...study.blockA];
    updated[index] = { ...updated[index], [field]: value };
    updateField('blockA', updated);
  };

  const removeBlockARow = (index: number) => {
    updateField('blockA', study.blockA.filter((_, i) => i !== index));
  };

  const addBlockBRow = () => {
    const newRow: BlockBRow = {
      id: `bb_${Date.now()}`,
      segment: '',
      description: '',
      size: 0,
    };
    updateField('blockB', [...study.blockB, newRow]);
  };

  const updateBlockBRow = (index: number, field: keyof BlockBRow, value: string | number) => {
    const updated = [...study.blockB];
    updated[index] = { ...updated[index], [field]: value };
    updateField('blockB', updated);
  };

  const removeBlockBRow = (index: number) => {
    updateField('blockB', study.blockB.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <Input
          label="Título del estudio"
          value={study.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="text-lg font-semibold"
        />
      </div>

      {/* Arquetipo */}
      {activeSection === 'arquetipo' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Arquetipo de liderazgo</h2>
          <Input
            label="Arquetipo de liderazgo (una palabra)"
            placeholder="Ej. Constructor / Guardián / Reformador"
            value={study.archetype}
            onChange={(e) => updateField('archetype', e.target.value)}
          />
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.archetypeUncertainty}
            onChange={(e) => updateField('archetypeUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Positive Points */}
      {activeSection === 'positivos' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1.1 Tres puntos positivos</h2>
          {study.positivePoints.map((point, index) => (
            <Textarea
              key={index}
              label={`Punto positivo ${index + 1}`}
              value={point}
              onChange={(e) => updatePositivePoint(index, e.target.value)}
              maxLength={180}
              showCounter
              rows={3}
            />
          ))}
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.positivePointsUncertainty}
            onChange={(e) => updateField('positivePointsUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Negative Points */}
      {activeSection === 'negativos' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1.2 Tres puntos negativos</h2>
          {study.negativePoints.map((point, index) => (
            <Textarea
              key={index}
              label={`Punto negativo ${index + 1}`}
              value={point}
              onChange={(e) => updateNegativePoint(index, e.target.value)}
              maxLength={140}
              showCounter
              rows={3}
            />
          ))}
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.negativePointsUncertainty}
            onChange={(e) => updateField('negativePointsUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Candidates */}
      {(activeSection === 'candidatos' || activeSection === 'adjetivacion') && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Candidatos</h2>
          {study.candidates.map((candidate, index) => (
            <div key={candidate.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">Candidato {index + 1}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveCandidateUp(index)}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveCandidateDown(index)}
                    disabled={index === study.candidates.length - 1}
                  >
                    ↓
                  </Button>
                </div>
              </div>

              <Input
                label="Nombre completo"
                value={candidate.name}
                onChange={(e) => updateCandidate(index, 'name', e.target.value)}
                disabled={candidate.name === 'Wblester Santiago Pineda'}
              />

              <Input
                label="Partido o plataforma"
                value={candidate.party}
                onChange={(e) => updateCandidate(index, 'party', e.target.value)}
              />

              {activeSection === 'adjetivacion' && (
                <>
                  <TagInput
                    label="Adjetivos (4)"
                    value={candidate.adjectives}
                    onChange={(tags) => updateCandidate(index, 'adjectives', tags)}
                    maxTags={4}
                  />

                  <Textarea
                    label="Señal digital predominante"
                    value={candidate.digitalSignal}
                    onChange={(e) => updateCandidate(index, 'digitalSignal', e.target.value)}
                    rows={3}
                  />
                </>
              )}
            </div>
          ))}
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.candidatesUncertainty}
            onChange={(e) => updateField('candidatesUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Digital Universe */}
      {activeSection === 'universo' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Universo digital electoral</h2>
          <Input
            label="Total del universo"
            type="number"
            value={study.digitalUniverse}
            onChange={(e) => updateField('digitalUniverse', Number(e.target.value))}
            suffix={`${(study.digitalUniverse / 1000).toFixed(0)}K`}
          />
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.digitalUniverseUncertainty}
            onChange={(e) => updateField('digitalUniverseUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Block A */}
      {activeSection === 'bloqueA' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bloque A</h2>
          <div className="space-y-4">
            {study.blockA.map((row, index) => (
              <div key={row.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Partido {index + 1}</h4>
                  <Button variant="danger" size="sm" onClick={() => removeBlockARow(index)}>
                    Eliminar
                  </Button>
                </div>
                <Input
                  label="Partido"
                  value={row.party}
                  onChange={(e) => updateBlockARow(index, 'party', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Duro (K)"
                    type="number"
                    value={row.duro}
                    onChange={(e) => updateBlockARow(index, 'duro', Number(e.target.value))}
                  />
                  <Input
                    label="Enojado (K)"
                    type="number"
                    value={row.enojado}
                    onChange={(e) => updateBlockARow(index, 'enojado', Number(e.target.value))}
                  />
                  <Input
                    label="Crítico (K)"
                    type="number"
                    value={row.critico}
                    onChange={(e) => updateBlockARow(index, 'critico', Number(e.target.value))}
                  />
                  <Input
                    label="Oportunista (K)"
                    type="number"
                    value={row.oportunista}
                    onChange={(e) => updateBlockARow(index, 'oportunista', Number(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" onClick={addBlockARow}>
            Agregar partido
          </Button>
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.blockAUncertainty}
            onChange={(e) => updateField('blockAUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}

      {/* Block B */}
      {activeSection === 'bloqueB' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bloque B</h2>
          <div className="space-y-4">
            {study.blockB.map((row, index) => (
              <div key={row.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Segmento {index + 1}</h4>
                  <Button variant="danger" size="sm" onClick={() => removeBlockBRow(index)}>
                    Eliminar
                  </Button>
                </div>
                <Input
                  label="Segmento"
                  value={row.segment}
                  onChange={(e) => updateBlockBRow(index, 'segment', e.target.value)}
                />
                <Textarea
                  label="Descripción breve"
                  value={row.description}
                  onChange={(e) => updateBlockBRow(index, 'description', e.target.value)}
                  rows={2}
                />
                <Input
                  label="Tamaño (K)"
                  type="number"
                  value={row.size}
                  onChange={(e) => updateBlockBRow(index, 'size', Number(e.target.value))}
                />
              </div>
            ))}
          </div>
          <Button variant="secondary" onClick={addBlockBRow}>
            Agregar segmento
          </Button>
          <Select
            label="Nivel de incertidumbre"
            options={uncertaintyOptions}
            value={study.blockBUncertainty}
            onChange={(e) => updateField('blockBUncertainty', e.target.value as UncertaintyLevel)}
          />
        </section>
      )}
    </div>
  );
}
