interface EditorSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'arquetipo', label: '1. Arquetipo' },
  { id: 'positivos', label: '1.1 Puntos positivos' },
  { id: 'negativos', label: '1.2 Puntos negativos' },
  { id: 'candidatos', label: '2. Candidatos' },
  { id: 'adjetivacion', label: '2.1 Adjetivación digital' },
  { id: 'universo', label: '3. Universo digital' },
  { id: 'bloqueA', label: 'Bloque A' },
  { id: 'bloqueB', label: 'Bloque B' },
];

export function EditorSidebar({ activeSection, onSectionChange }: EditorSidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`
              w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
