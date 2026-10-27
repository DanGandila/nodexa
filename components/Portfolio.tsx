const projects = [
  {
    category: 'CRM',
    title: 'CRM pentru o agenție imobiliară',
    description:
      'Gestionarea clienților și a proprietăților, cu urmărire automată a lead-urilor și rapoarte de vânzări în timp real.',
    tags: ['Next.js', 'Automatizare', 'Rapoarte'],
  },
  {
    category: 'Agent AI',
    title: 'Agent AI pentru suport clienți',
    description:
      'Răspunde întrebărilor frecvente, escaladează cazurile complexe către echipă și reduce timpul mediu de răspuns.',
    tags: ['Agent AI', 'Chat', 'Integrare API'],
  },
  {
    category: 'Automatizare',
    title: 'Facturare automată pentru un magazin online',
    description:
      'Generează facturi, sincronizează stocurile și trimite notificări, eliminând complet pasul manual.',
    tags: ['Workflow', 'E-commerce', 'Integrare'],
  },
];

export default function Portfolio() {
  return (
    <section id="portofoliu" className="py-bay-sm md:py-bay">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex max-w-[38rem] flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Portofoliu
          </p>
          <h2 className="text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-heading text-ink">
            Exemple de proiecte
          </h2>
          <p className="max-w-[34rem] text-lg text-graphite">
            Tipurile de soluții pe care le construim. Proiectele reale apar aici
            pe măsură ce lansăm colaborări noi.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(17rem,1fr))] gap-4">
          {projects.map((project) => (
            <li
              key={project.title}
              className="flex flex-col gap-3 rounded-[18px] border border-hairline bg-white p-[1.875rem]"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-label text-signal">
                {project.category}
              </span>
              <h3 className="text-[1.0625rem] font-semibold leading-[1.35] tracking-title text-ink">
                {project.title}
              </h3>
              <p className="flex-1 text-[0.9375rem] leading-[1.58] text-graphite">
                {project.description}
              </p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-graphite"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
