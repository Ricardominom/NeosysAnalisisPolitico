import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { useStudies } from '@/hooks/useStudies';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { SkeletonCard } from '@/components/ui/Skeleton';

export function Dashboard() {
  const { studies, loading, deleteStudy } = useStudies();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredStudies = studies.filter((study) =>
    study.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este estudio?')) {
      deleteStudy(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Proyectos / Estudios</h1>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Input
              type="search"
              placeholder="Buscar estudios…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-96"
            />
            <Button onClick={() => navigate('/studies/new')}>
              Nuevo estudio
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredStudies.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery
                  ? 'No se encontraron estudios con ese criterio de búsqueda.'
                  : 'Aún no hay estudios. Crea tu primer estudio.'}
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={() => navigate('/studies/new')}>
                  Crear primer estudio
                </Button>
              )}
            </CardBody>
          </Card>
        ) : (
          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Título</TableHeader>
                  <TableHeader>Arquetipo</TableHeader>
                  <TableHeader>Actualizado</TableHeader>
                  <TableHeader>Acciones</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudies.map((study) => (
                  <TableRow key={study.id}>
                    <TableCell className="font-medium">{study.title}</TableCell>
                    <TableCell>{study.archetype || '—'}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">
                      {formatDate(study.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/studies/${study.id}/edit`)}
                        >
                          Ver
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/studies/${study.id}/edit`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(study.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
