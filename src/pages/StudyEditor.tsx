import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { studiesService } from '@/services/studies.service';
import type { Study } from '@/types';
import { Button } from '@/components/ui/Button';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { EditorForm } from '@/components/editor/EditorForm';
import { PreviewPanel } from '@/components/editor/PreviewPanel';

export function StudyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = id !== 'new';

  const [activeSection, setActiveSection] = useState('arquetipo');
  const [study, setStudy] = useState<Study>({
    id: '',
    title: 'Estudio de Inteligencia Política Digital — Metepec, Estado de México',
    createdAt: '',
    updatedAt: '',
    archetype: '',
    archetypeUncertainty: 'Media',
    positivePoints: ['', '', ''],
    positivePointsUncertainty: 'Media',
    negativePoints: ['', '', ''],
    negativePointsUncertainty: 'Media',
    candidates: [
      { id: '1', name: '', party: '', adjectives: [], digitalSignal: '' },
      { id: '2', name: '', party: '', adjectives: [], digitalSignal: '' },
      { id: '3', name: '', party: '', adjectives: [], digitalSignal: '' },
      { id: '4', name: 'Wblester Santiago Pineda', party: '', adjectives: [], digitalSignal: '' },
    ],
    candidatesUncertainty: 'Media',
    digitalUniverse: 0,
    digitalUniverseUncertainty: 'Media',
    blockA: [],
    blockAUncertainty: 'Media',
    blockB: [],
    blockBUncertainty: 'Media',
  });

  useEffect(() => {
    if (isEditMode && id) {
      const existing = studiesService.getById(id);
      if (existing) {
        setStudy(existing);
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, isEditMode, navigate]);

  const updateField = <K extends keyof Study>(field: K, value: Study[K]) => {
    setStudy((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (isEditMode && id) {
      studiesService.update(id, study);
      alert('Estudio guardado correctamente');
    } else {
      const newStudy = studiesService.create(study);
      navigate(`/studies/${newStudy.id}/edit`);
      alert('Estudio creado correctamente');
    }
  };

  const handleDuplicate = () => {
    if (isEditMode && id) {
      const duplicate = studiesService.duplicate(id);
      if (duplicate) {
        navigate(`/studies/${duplicate.id}/edit`);
      }
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <EditorSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Middle: Editor Form */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Actions Toolbar */}
            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <Button onClick={handleSave}>Guardar borrador</Button>
              {isEditMode && (
                <Button variant="secondary" onClick={handleDuplicate}>
                  Duplicar
                </Button>
              )}
              <Button variant="secondary" onClick={handleExportPDF}>
                Exportar a PDF
              </Button>
            </div>

            <EditorForm
              study={study}
              activeSection={activeSection}
              updateField={updateField}
              setStudy={setStudy}
            />
          </div>
        </div>

        {/* Right: Preview Panel */}
        <PreviewPanel study={study} />
      </div>
    </MainLayout>
  );
}
