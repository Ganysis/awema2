/**
 * Icon mapping utility for template blocks
 * Maps icon names to their SVG paths
 */
export const iconMap = {
    // Tools & Services
    wrench: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
    },
    tools: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
    },
    hammer: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>'
    },
    screwdriver: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
    },
    gear: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m20.12-6.12l-4.24 4.24m-9.76 9.76l-4.24 4.24m0-16.97l4.24 4.24m9.76 9.76l4.24 4.24"/>'
    },
    bolt: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    },
    // Safety & Security
    shield: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
    },
    'shield-check': {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>'
    },
    lock: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
    },
    key: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>'
    },
    alert: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
    },
    // General
    lightbulb: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M9 18h6m-6 0a4 4 0 0 1-2-3.5 6.5 6.5 0 1 1 13 0A4 4 0 0 1 18 18m-9 0v3h6v-3"/>'
    },
    clock: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
    },
    star: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
    },
    heart: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
    },
    check: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<polyline points="20 6 9 17 4 12"/>'
    },
    fire: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.25 2-1.25 1.5-1.25 2.5-1.25 4 0 2.5-1.5 3-2.5 3.5-1 .5-3 1.5-3 5 0 3.5 2.5 6.5 6.5 6.5s6.5-3 6.5-6.5c0-.75-.25-1.5-.5-2z"/>'
    },
    home: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
    },
    phone: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'
    },
    email: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
    },
    location: {
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        path: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
    }
};
/**
 * Renders an SVG icon based on the icon name
 * @param iconName The name of the icon from the iconMap
 * @param className Optional CSS class for the SVG element
 * @param size Optional size (width and height) for the icon
 * @returns HTML string for the SVG icon
 */
export function renderIcon(iconName, className = 'icon', size = 24) {
    const icon = iconMap[iconName];
    if (!icon) {
        // Return a placeholder if icon not found
        return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>`;
    }
    const fill = icon.fill || 'none';
    const stroke = icon.stroke || 'currentColor';
    const strokeWidth = icon.strokeWidth || 2;
    return `<svg class="${className}" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}">
    ${icon.path}
  </svg>`;
}
