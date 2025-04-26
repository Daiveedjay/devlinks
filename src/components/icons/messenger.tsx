export default function Messenger() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-12 w-12"
      data-testid="ShareIcon-messenger"
      // shape="circle"
    >
      <circle cx="50%" cy="50%" r="50%" fill="#F1F1F1"></circle>
      <path
        d="M12 6.002c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305a.48.48 0 0 1 .162.342l.032 1.067a.48.48 0 0 0 .674.424l1.19-.525a.48.48 0 0 1 .321-.024c.547.15 1.13.23 1.737.23 3.38 0 6-2.475 6-5.82 0-3.343-2.62-5.82-6-5.82"
        fill="url(#paint0_radial_657_559)"></path>
      <path
        d="m8.397 13.524 1.762-2.796a.9.9 0 0 1 1.302-.24l1.402 1.05a.36.36 0 0 0 .433 0L15.19 10.1c.252-.192.582.11.413.379l-1.763 2.796a.9.9 0 0 1-1.301.24l-1.402-1.051a.36.36 0 0 0-.434.001L8.81 13.903c-.252.191-.582-.11-.413-.38"
        fill="#fff"></path>
      <defs>
        <radialGradient
          id="paint0_radial_657_559"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.3 17.9) scale(13 13)">
          <stop stop-color="#0099FF"></stop>
          <stop offset="0.6" stop-color="#A033FF"></stop>
          <stop offset="0.93" stop-color="#FF5280"></stop>
          <stop offset="1" stop-color="#FF7061"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}
