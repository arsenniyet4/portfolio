'use strict';

/* ============================================================
   Project Data
   ============================================================ */
const PROJECTS = [
  {
    id: 6,
    name: 'Stock Alert System',
    bgImage: 'images/stock-alert-system-tile-bg.png',
    paddedBg: true,
    hideOverlay: true,
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
  let bgStyle = '';
  if (project.bgImage) {
    const size = project.paddedBg
      ? 'calc(100% - 14px) calc(100% - 14px)'
      : 'cover';
    const color = project.paddedBg ? '#323232' : 'transparent';
    bgStyle = ` style="background-image: url('${project.bgImage}'); background-size: ${size}; background-position: center; background-repeat: no-repeat; background-color: ${color};"`;
  }
  let extraClass = project.bgImage ? ' project-tile--has-bg' : '';
  if (project.darkerBg) extraClass += ' project-tile--darker-bg';
  if (!project.description) extraClass += ' project-tile--no-desc';
  if (project.noOverlay) extraClass += ' project-tile--no-overlay';
  if (project.hideOverlay) extraClass += ' project-tile--hide-overlay';
  const descHTML = project.description
    ? `<p class="project-tile__description">${project.description}</p>`
    : '';
  const tagsHTML = project.tags
    ? `<div class="project-tile__tags">${buildTagsHTML(project.tags)}</div>`
    : '';
  return `
    <article class="project-item" data-project-id="${project.id}">
      <h2 class="project-item__name">${project.name}</h2>
      <div class="project-tile${extraClass}"${bgStyle}>
        ${descHTML}
        ${tagsHTML}
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
