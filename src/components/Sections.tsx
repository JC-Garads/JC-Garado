import type { ReactNode } from 'react'
import { profile, projectHighlights, skillSet, stats } from '../data/portfolio'
import { ArrowRight, ArrowUpRight } from './icons'

function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: ReactNode }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="status-pill" data-reveal>
          <span className="status-dot" />
          Available for opportunities
        </p>
        <p className="hero-role" data-reveal>
          {profile.role} <span>/</span> {profile.roleDetail}
        </p>
        <h1 data-reveal>{profile.name}</h1>
        <p className="lead" data-reveal>
          I support production systems, validate SQL operations, and resolve issues that affect uptime, accuracy, and
          business continuity.
        </p>
        <div className="hero-actions" data-reveal>
          <a className="button primary" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight className="button-icon" />
          </a>
          <a className="button ghost" href="#projects">
            View work
            <ArrowRight className="button-icon" />
          </a>
        </div>
      </div>

      <div className="hero-portrait" data-reveal>
        <div className="portrait-frame">
          <img src={profile.photo} alt={`${profile.name} profile`} />
        </div>
      </div>

      <dl className="stats" data-reveal>
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Operationally focused and <em>detail-driven.</em>
          </>
        }
      />
      <div className="about-grid">
        <p className="about-statement" data-reveal>
          Database Operations Analyst with 4+ years of experience in offshore production support, SQL validation, and
          incident triage.
        </p>
        <div className="about-body" data-reveal>
          <p>
            I work to keep systems stable, troubleshoot faults, and improve reporting and operational efficiency across
            teams.
          </p>
          <p>
            My background includes database monitoring, fault resolution, automation support, and cross-functional
            collaboration to ensure reliable system performance and business continuity.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        index="02"
        eyebrow="Selected Work"
        title={
          <>
            Focused on reliability and <em>process improvement.</em>
          </>
        }
      />
      <ol className="project-list">
        {projectHighlights.map((project, index) => (
          <li key={project.title} className="project-row" data-reveal>
            <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
            <div className="project-main">
              <span className="card-tag">Case study</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <ul className="project-tags" aria-label="Focus areas">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        index="03"
        eyebrow="Core strengths"
        title={
          <>
            Focused, relevant, and <em>practical.</em>
          </>
        }
      />
      <ul className="skill-grid" data-reveal>
        {skillSet.map((skill, index) => (
          <li key={skill} className="skill-item">
            <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
