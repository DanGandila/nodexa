import Image from 'next/image';
import Reveal from './Reveal';

/** The client's own wordmark, taken from their site. */
type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

type Project = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  client: { name: string; href: string };
} &
  // Exactly one of the two: an image if we hold the asset, otherwise the name
  // set in type. Swapping a `wordmark` for a `logo` is a one-line change once
  // the file lands in /public/logos.
  ({ logo: Logo; wordmark?: never } | { wordmark: string; logo?: never });

/**
 * Delivered work only — every card names a real client and links to their
 * site. No screenshots: the internal tools aren't ours to show.
 */
const projects: Project[] = [
  {
    category: 'Produs la scară',
    title: 'Dezvoltare Rich Filters for Jira, la Appfire',
    client: { name: 'appfire.com', href: 'https://appfire.com' },
    logo: {
      src: '/logos/appfire.png',
      alt: 'Appfire',
      width: 256,
      height: 256,
      // The symbol alone, so it is square where the others are wordmarks —
      // held narrow, and a touch taller, to match their optical height.
      className: 'w-[14%]',
    },
    description:
      'Appfire este cel mai mare vendor din Atlassian Marketplace. Am contribuit la dezvoltarea Rich Filters, un plugin pentru Jira cu peste 10.000 de abonamente și peste 20 de milioane USD ARR.',
    tags: ['Atlassian Marketplace', 'Jira', 'Dezvoltare produs'],
  },
  {
    category: 'CRM & Agenți AI',
    title: 'CRM intern cu automatizare prin agenți AI',
    client: { name: 'rotbasan.com', href: 'https://rotbasan.com' },
    logo: {
      src: '/logos/rotbasan-co.png',
      alt: 'Rotbasan & Co.',
      width: 440,
      height: 47,
      className: 'w-full',
    },
    description:
      'Clienții, colaborările și livrările stau într-un singur sistem, iar agenții AI preiau pașii repetitivi dintre ele. Echipa intervine acolo unde e nevoie de o decizie, nu la fiecare pas intermediar.',
    tags: ['CRM', 'Agenți AI', 'Procese interne'],
  },
  {
    category: 'Tool intern',
    title: 'Tool-uri interne pentru TheWoman',
    client: { name: 'thewoman.ro', href: 'https://thewoman.ro' },
    logo: {
      src: '/logos/thewoman.png',
      alt: 'The Woman',
      width: 440,
      height: 78,
      // Shorter, heavier wordmark — held back so both marks read at the same weight.
      className: 'w-[68%]',
    },
    description:
      'Instrumente construite pe măsura fluxului lor de lucru: pașii manuali au fost scurtați, timpii de livrare au scăzut, iar alocarea resurselor costă mai puțin.',
    tags: ['Automatizare', 'Procese interne', 'Management resurse'],
  },
  {
    category: 'Tool intern',
    title: 'Tool-uri interne și automatizări pentru TSA Group',
    client: { name: 'tsagroup.ro', href: 'https://tsagroup.ro' },
    logo: {
      src: '/logos/tsa-group.png',
      alt: 'TSA Group',
      width: 864,
      height: 363,
      // Much squatter than the two wordmarks; width pulled back so all four
      // marks sit at the same height.
      className: 'w-[26%]',
    },
    description:
      'Automatizări care scurtează timpul de livrare a produselor, plus un sistem prin care munca agenților de vânzări este distribuită și urmărită într-un singur loc.',
    tags: ['Automatizare', 'Procese interne', 'Management vânzări'],
  },
];

export default function Portfolio() {
  return (
    <section id="portofoliu" className="py-bay-sm md:py-bay">
      <div className="mx-auto max-w-shell px-6">
        <Reveal className="flex max-w-[38rem] flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Portofoliu
          </p>
          <h2 className="text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-heading text-ink">
            Clienții noștri
          </h2>
          <p className="max-w-[34rem] text-lg text-graphite">
            Colaborări livrate. Proiectele noi apar aici pe măsură ce le lansăm.
          </p>
        </Reveal>

        {/*
          Fixed tracks rather than auto-fit: four cards against a 17rem
          minimum would wrap 3 + 1 and leave the last one stranded.
        */}
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.title} delay={120 + index * 70}>
              <div className="group flex h-full flex-col gap-3 rounded-[18px] border border-hairline bg-white p-[1.875rem] transition duration-200 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_18px_40px_-24px_rgba(16,20,28,0.35)]">
                <div className="mb-2 overflow-hidden rounded-[12px] bg-mist px-4 py-3.5">
                  <div className="flex h-[3.1rem] items-center justify-center">
                    {project.logo ? (
                      <Image
                        src={project.logo.src}
                        alt={project.logo.alt}
                        width={project.logo.width}
                        height={project.logo.height}
                        className={`h-auto max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] ${project.logo.className}`}
                      />
                    ) : (
                      <span className="text-center text-[1.3125rem] font-semibold tracking-lockup text-ink/45 transition-colors duration-500 ease-out group-hover:text-ink/60">
                        {project.wordmark}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-label text-signal">
                  {project.category}
                </span>
                <h3 className="text-[1.0625rem] font-semibold leading-[1.35] tracking-title text-ink">
                  {project.title}
                </h3>
                <a
                  href={project.client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mt-1 self-start font-mono text-xs text-graphite underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
                >
                  {project.client.name}
                </a>
                <p className="flex-1 text-[0.9375rem] leading-[1.58] text-graphite">
                  {project.description}
                </p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-graphite transition-colors duration-200 group-hover:border-hairline-strong"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
