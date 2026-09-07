// Single source of truth for Bangalore branch contact details.
// Update here if the phone number, address, or hours ever change.

export const business = {
  name: "Orange International Spa",
  branchLabel: "Bengaluru",
  phoneDisplay: "+91 88847 55511",
  phoneDigits: "918884755511", // country code + number, digits only (used for tel: and wa.me)
  address: {
    line1: "No 1C, 301, UFG, 3rd Block, 3rd Main",
    line2: "Nehru Rd, near Udupi Hotel, Kammanahalli",
    city: "Bengaluru, Karnataka 560084",
    full: "No 1C, 301, UFG, 3rd Block, 3rd Main, Nehru Rd, near Udupi Hotel, Kammanahalli, Bengaluru, Karnataka 560084",
  },
  hours: {
    open: "10:30 AM",
    close: "11:00 PM",
  },
  mapsQuery:
    "No 1C, 301, UFG, 3rd Block, 3rd Main, Nehru Rd, near Udupi Hotel, Kammanahalli, Bengaluru, Karnataka 560084",
};

export const telHref = () => `tel:+${business.phoneDigits}`;

export const whatsappHref = (message) => {
  const base = `https://wa.me/${business.phoneDigits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const whatsappServiceMessage = (serviceName) =>
  `Hi, I'd like to know more about "${serviceName}" at Orange International Spa, Bengaluru.`;

export const mapsEmbedSrc = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export const mapsDirectionsHref = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`;
