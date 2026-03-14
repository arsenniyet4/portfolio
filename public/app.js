'use strict';

/* ============================================================
   Project Data
   ============================================================ */
const PROJECTS = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description:
      'A full-stack online shopping platform featuring product listings, a shopping cart, user authentication, and Stripe payment integration.',
    tags: ['Node.js', 'React', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    name: 'Real-Time Chat App',
    description:
      'A WebSocket-powered messaging application supporting private rooms, file sharing, and live typing indicators.',
    tags: ['Socket.io', 'Express', 'Vue.js', 'Redis'],
  },
  {
    id: 3,
    name: 'AI Task Manager',
    description:
      'A productivity app that uses OpenAI to auto-prioritize and categorize tasks, with calendar sync and smart reminders.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'PostgreSQL'],
  },
  {
    id: 4,
    name: 'Weather Dashboard',
    description:
      'An interactive weather visualization dashboard with historical trend charts, location search, and severe weather alerts.',
    tags: ['React', 'D3.js', 'REST API', 'Tailwind'],
  },
  {
    id: 5,
    name: 'DevOps Pipeline Tool',
    description:
      'A CI/CD automation tool that orchestrates build, test, and deployment workflows across multi-cloud environments.',
    tags: ['Go', 'Docker', 'Kubernetes', 'AWS'],
  },
  {
    id: 6,
    name: 'Fitness Tracker',
    description:
      'A cross-platform mobile app for logging workouts, tracking personal records, and visualizing progress over time.',
    tags: ['React Native', 'GraphQL', 'Firebase', 'TypeScript'],
  },
];

/* ============================================================
   DOM Selectors
   ============================================================ */
const SELECTORS = Object.freeze({
  PROJECTS_GRID: '#projects-grid',
});

/* ============================================================
   Rendering
   ============================================================ */

/**
 * Builds the tag badge elements for a project.
 * @param {string[]} tags
 * @returns {string} HTML string of tag spans
 */
function buildTagsHTML(tags) {
  return tags
    .map((tag) => `<span class="project-tile__tag">${tag}</span>`)
    .join('');
}

/**
 * Builds the full HTML block for a single project item.
 * @param {{ id: number, name: string, description: string, tags: string[] }} project
 * @returns {string} HTML string for the project item
 */
function buildProjectItemHTML(project) {
  return `
    <article class="project-item" data-project-id="${project.id}">
      <h2 class="project-item__name">${project.name}</h2>
      <div class="project-tile">
        <p class="project-tile__description">${project.description}</p>
        <div class="project-tile__tags">${buildTagsHTML(project.tags)}</div>
      </div>
    </article>
  `;
}

/**
 * Renders all projects into the grid container.
 * @param {typeof PROJECTS} projects
 */
function renderProjects(projects) {
  const grid = document.querySelector(SELECTORS.PROJECTS_GRID);
  if (!grid) return;

  grid.innerHTML = projects.map(buildProjectItemHTML).join('');
}

/* ============================================================
   Entry Point
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects(PROJECTS);
});
