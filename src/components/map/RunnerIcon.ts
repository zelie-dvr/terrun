import L from 'leaflet';

// Simple SVG Runner Icon with a pulse effect
const runnerSvg = `
<div class="relative flex items-center justify-center w-8 h-8">
  <span class="absolute inline-flex h-full w-full rounded-full bg-[#D7FF00] opacity-75 animate-ping"></span>
  <div class="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-black border-2 border-[#D7FF00] shadow-lg">
    <div class="w-2 h-2 bg-[#D7FF00] rounded-full"></div>
  </div>
</div>
`;

export const runnerIcon = L.divIcon({
    html: runnerSvg,
    className: '', // Remove default leaflet styles
    iconSize: [32, 32],
    iconAnchor: [16, 16], // Center anchor
});
