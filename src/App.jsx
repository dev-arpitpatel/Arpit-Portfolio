import { useEffect } from 'react';

function Badge({ label }) {
  return <span className="badge">{label}</span>;
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}

function TimelineItem({ title, subtitle, dates, bullets }) {
  return (
    <article className="timeline-card">
      <div className="timeline-marker" />
      <div>
        <div className="timeline-header">
          <div>
            <h3>{title}</h3>
            <p className="subtitle">{subtitle}</p>
          </div>
          <p className="dates">{dates}</p>
        </div>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ProjectCard({ index, title, role, teamSize, duration, bullets, link }) {
  return (
    <article className="project-card">
      <div className="project-index">0{index}</div>
      <div className="project-meta-row">
        <h3>{title}</h3>
        <span className="project-duration">{duration}</span>
      </div>
      <p className="subtitle">
        {role} | Team Size: {teamSize}
      </p>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      {link ? (
        <a className="text-link" href={link} target="_blank" rel="noreferrer">
          Visit Project
        </a>
      ) : null}
    </article>
  );
}

function CapabilityCard({ title, description }) {
  return (
    <article className="capability-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Icon({ name }) {
  const icons = {
    phone: (
      <path d="M7.5 4.5h2.7l1.35 3.38-1.7 1.46a14.3 14.3 0 0 0 4.81 4.81l1.46-1.7 3.38 1.35v2.7A1.5 1.5 0 0 1 18 18a13.5 13.5 0 0 1-12-12A1.5 1.5 0 0 1 7.5 4.5Z" />
    ),
    email: (
      <path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 17.25V6.75Zm2.08-.38L12 10.3l5.42-3.93" />
    ),
    location: (
      <path d="M12 20.25s5.25-4.74 5.25-9a5.25 5.25 0 1 0-10.5 0c0 4.26 5.25 9 5.25 9Zm0-7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
    ),
    linkedin: (
      <path d="M7.13 8.25a1.13 1.13 0 1 0 0-2.25 1.13 1.13 0 0 0 0 2.25ZM6 9.75h2.25V18H6V9.75Zm3.75 0H12v1.13h.03c.31-.58 1.08-1.2 2.22-1.2 2.38 0 2.82 1.57 2.82 3.62V18h-2.25v-3.98c0-.95-.02-2.18-1.33-2.18-1.33 0-1.53 1.04-1.53 2.1V18H9.75V9.75Z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}

function ContactCard({ icon, title, value, href, external = false }) {
  return (
    <a className="contact-link-card" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <span className="contact-card-icon">
        <Icon name={icon} />
      </span>
      <div className="contact-card-copy">
        <p className="mini-label">{title}</p>
        <strong>{value}</strong>
      </div>
    </a>
  );
}

function InfoList({ items }) {
  return (
    <div className="info-list">
      {items.map((item) => (
        <div key={item.label} className="info-row">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const linkedInUrl = 'https://www.linkedin.com/in/arpit-patel-b725b1187';
  const email = 'arpitpatel0930@gmail.com';

  const proofStats = [
    { value: '2.7+', label: 'Years Experience' },
    { value: '2x', label: 'Salesforce Certifications' },
    { value: '4+', label: 'Key Projects Delivered' },
    { value: '50+', label: 'Reusable Style Variations Built' },
  ];

  const roleSnapshot = [
    { label: 'Current Role', value: 'Salesforce Developer' },
    { label: 'Company', value: 'Zehntech Technologies' },
    { label: 'Primary Focus', value: 'Apex, LWC, Flows, Integrations' },
    { label: 'Location', value: 'Indore, Madhya Pradesh' },
  ];

  const contactItems = [
    {
      icon: 'phone',
      title: 'Phone',
      value: '+91 8120930420',
      href: 'tel:+918120930420',
    },
    {
      icon: 'email',
      title: 'Email',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: 'location',
      title: 'Location',
      value: 'Indore, Madhya Pradesh',
      href: 'https://maps.google.com/?q=Indore,Madhya+Pradesh',
      external: true,
    },
    {
      icon: 'linkedin',
      title: 'LinkedIn',
      value: 'arpit-patel-b725b1187',
      href: linkedInUrl,
      external: true,
    },
  ];

  const capabilityCards = [
    {
      title: 'Salesforce Engineering',
      description:
        'Builds Apex classes, triggers, LWC components, Visualforce pages, and scalable custom solutions for real business flows.',
    },
    {
      title: 'Automation Design',
      description:
        'Turns manual operations into Salesforce-driven workflows using Flows, approval processes, and structured platform logic.',
    },
    {
      title: 'Integration Delivery',
      description:
        'Connects Salesforce with external systems like PostgreSQL, Zapier, Chatlio, and WhatsApp Business API.',
    },
  ];

  const skillGroups = [
    {
      title: 'Salesforce Platform',
      items: ['Sales Cloud', 'Service Cloud', 'Flows', 'Process Builder', 'Approval Processes'],
    },
    {
      title: 'Development',
      items: ['Apex', 'Triggers', 'LWC', 'Visualforce', 'SOQL', 'SOSL'],
    },
    {
      title: 'Integration',
      items: ['Zapier', 'PostgreSQL', 'Chatlio', 'WhatsApp Business API'],
    },
    {
      title: 'Web and Tools',
      items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'TailwindCSS', 'Git', 'VS Code', 'Postman'],
    },
  ];

  const experience = {
    title: 'Salesforce Developer',
    subtitle: 'Zehntech Technologies, Indore',
    dates: 'August 2023 - Present',
    bullets: [
      'Developed Apex classes, triggers, LWC components, and Visualforce pages for scalable internal and client solutions.',
      'Integrated Salesforce with third-party platforms including Zapier, PostgreSQL, and WhatsApp Business API.',
      'Automated business processes using Flows and custom approval workflows to reduce repetitive manual operations.',
      'Created custom objects, page layouts, and complex reports and dashboards for operational visibility.',
      'Collaborated with cross-functional teams to deliver customer-focused enhancements and platform improvements.',
    ],
  };

  const projects = [
    {
      title: 'SOC Project - Sales Cloud Implementation',
      role: 'Salesforce Developer/Admin',
      teamSize: '2',
      duration: '1 Year 2 Months',
      bullets: [
        'Delivered Sales Cloud customizations using Apex, Triggers, LWC, and Flows.',
        'Integrated PostgreSQL and Chatlio while handling client communication across EST timelines.',
      ],
    },
    {
      title: 'Resume Digital Project',
      role: 'Salesforce Developer/Admin',
      teamSize: '4',
      duration: '1 Year',
      bullets: [
        'Led sprint planning, requirement gathering, and data import and export operations.',
        'Participated in code reviews and ensured clean, reusable, deployment-ready code.',
      ],
    },
    {
      title: 'WhatsApp-Salesforce Integration',
      role: 'Salesforce Integration Specialist',
      teamSize: '2',
      duration: '2 Months',
      bullets: [
        'Built WhatsApp Business API integration for automated lead, case, and opportunity updates.',
        'Enabled real-time communication and created dashboards to measure adoption and impact.',
      ],
    },
    {
      title: 'Help Desk Website for Solved Consulting',
      role: 'Salesforce Developer',
      teamSize: '1',
      duration: '2 Months',
      bullets: [
        'Developed a responsive help desk portal using LWC and Apex for school dashboard tutorials.',
        'Enabled dynamic filtering, categorized layouts, and searchable content through Experience Cloud.',
      ],
      link: 'https://www.solvedconsulting.com/',
    },
  ];

  const components = [
    {
      name: 'Footer Component',
      detail:
        'Built dynamic no-code styling controls with newsletter signup flows and mail service notifications.',
    },
    {
      name: 'Image Carousel',
      detail: 'Created a customizable LWC carousel supporting images, text, themes, and adjustable speed.',
    },
    {
      name: 'Webinar Countdown Timer',
      detail: 'Implemented timezone-aware live countdown behavior with event-expired handling and responsive UI.',
    },
    {
      name: 'Counter Up Timer',
      detail: 'Designed a reusable animated counter with 50+ style variations, themes, icons, and live updates.',
    },
  ];

  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="grid-overlay" />

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">AP</span>
          <span>Arpit Patel</span>
        </a>

        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top" className="page">
        <section className="hero-panel is-visible" data-reveal>
          <div className="hero-copy">
            <p className="eyebrow">Salesforce Developer in Indore | 2x Certified | Apex, LWC, Integration Expert</p>
            <h1>Salesforce Developer in Indore delivering scalable CRM solutions for real business needs.</h1>
            <p className="hero-text">
              I am Arpit Patel, a Salesforce Developer based in Indore. I help teams across Indore and remote clients
              build polished Salesforce CRM experiences, smart workflow automation, and reliable integrations that
              teams actually want to use every day.
            </p>

            <div className="hero-actions">
              <a className="primary-action" href={linkedInUrl} target="_blank" rel="noreferrer">
                Explore LinkedIn
              </a>
              <a className="secondary-action" href={`mailto:${email}`}>
                Hire Me
              </a>
            </div>

            <div className="inline-contact">
              <span>Indore, M.P</span>
              <span>+91 8120930420</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <aside className="hero-visual">
            <div className="visual-panel visual-panel-primary is-visible" data-reveal style={{ '--reveal-delay': '120ms' }}>
              <p className="mini-label">Delivery Pulse</p>
              <div className="visual-stat-stack">
                {proofStats.map((stat) => (
                  <div key={stat.label} className="visual-stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="visual-panel visual-panel-float is-visible" data-reveal style={{ '--reveal-delay': '220ms' }}>
              <p className="mini-label">Current Focus</p>
              <h3>Salesforce customization, integration, and automation delivery</h3>
              <div className="focus-strip">
                <span>Apex</span>
                <span>LWC</span>
                <span>Flows</span>
                <span>Integration</span>
              </div>
            </div>

            <div className="visual-panel visual-panel-wide is-visible" data-reveal style={{ '--reveal-delay': '320ms' }}>
              <p className="mini-label">Trusted Stack</p>
              <div className="visual-mini-grid">
                <span>Sales Cloud</span>
                <span>Service Cloud</span>
                <span>Visualforce</span>
                <span>PostgreSQL</span>
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="content-card split-layout advanced-split" data-reveal>
          <div>
            <SectionTitle
              eyebrow="Profile"
              title="Professional Summary"
              description="A high-trust introduction for recruiters, clients, and hiring managers reviewing technical fit."
            />
            <p className="body-copy">
              Salesforce Developer and Administrator with over 2.7 years of hands-on experience and two Salesforce
              certifications. Adept in Apex, LWC, Visualforce, and Salesforce automation through Flows and workflow
              design. Skilled in integrating third-party tools and delivering scalable, business-focused Salesforce
              solutions. Strong collaborator and quick learner, ready to adapt to platforms like Certinia when needed.
            </p>
          </div>

          <div className="achievement-list">
            {capabilityCards.map((card, index) => (
              <div key={card.title} data-reveal style={{ '--reveal-delay': `${index * 100}ms` }}>
                <CapabilityCard {...card} />
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="content-card" data-reveal>
          <SectionTitle
            eyebrow="Core Stack"
            title="Technical Skills"
            description="Grouped to show both platform depth and cross-functional delivery strength at a glance."
          />

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article
                key={group.title}
                className="skill-card"
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <h3>{group.title}</h3>
                <div className="badge-cluster">
                  {group.items.map((item) => (
                    <Badge key={item} label={item} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-card experience-layout" data-reveal>
          <div>
            <SectionTitle
              eyebrow="Experience"
              title="Professional Experience"
              description="Delivery across customization, reporting, integrations, and workflow automation inside Salesforce ecosystems."
            />
            <div className="timeline">
              <TimelineItem {...experience} />
            </div>
          </div>

          <aside className="experience-side-card" data-reveal style={{ '--reveal-delay': '140ms' }}>
            <p className="mini-label">Role Snapshot</p>
            <InfoList items={roleSnapshot} />
          </aside>
        </section>

        <section className="content-card compact-card" data-reveal>
          <SectionTitle
            eyebrow="Credentials"
            title="Certifications"
            description="Verified credentials that support both administration and platform development responsibility." 
          />
          <div className="cert-grid">
            <article className="cert-card highlighted-card" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <p className="mini-label">Certification</p>
              <h3>Salesforce Certified Administrator</h3>
            </article>
            <article className="cert-card highlighted-card" data-reveal style={{ '--reveal-delay': '160ms' }}>
              <p className="mini-label">Certification</p>
              <h3>Salesforce Certified Platform Developer I</h3>
            </article>
          </div>
        </section>

        <section id="projects" className="content-card" data-reveal>
          <SectionTitle
            eyebrow="Selected Work"
            title="Key Projects"
            description="Project snapshots designed to show variety: implementation, process design, integration, and customer-facing delivery."
          />
          <div className="projects-grid projects-grid-advanced">
            {projects.map((project, index) => (
              <div key={project.title} data-reveal style={{ '--reveal-delay': `${index * 100}ms` }}>
                <ProjectCard index={index + 1} {...project} />
              </div>
            ))}
          </div>
        </section>

        <section className="content-card" data-reveal>
          <SectionTitle
            eyebrow="Component Craft"
            title="LWC Component Portfolio"
            description="Reusable Lightning Web Components created for internal products and polished end-user experiences."
          />
          <div className="component-grid">
            {components.map((component, index) => (
              <article
                key={component.name}
                className="component-card"
                data-reveal
                style={{ '--reveal-delay': `${index * 90}ms` }}
              >
                <h3>{component.name}</h3>
                <p>{component.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="content-card contact-card contact-card-advanced" data-reveal>
          <div className="contact-copy">
            <SectionTitle
              eyebrow="Contact"
              title="Let’s Build Better Salesforce Experiences"
              description="Available for Salesforce development, CRM customization, workflow automation, and integration-focused opportunities."
            />
          </div>

          <div className="contact-grid">
            {contactItems.map((item, index) => (
              <div key={item.title} data-reveal style={{ '--reveal-delay': `${80 + index * 80}ms` }}>
                <ContactCard {...item} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Arpit Patel. Salesforce Developer Portfolio.</p>
      </footer>
    </div>
  );
}
