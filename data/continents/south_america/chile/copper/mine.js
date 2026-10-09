/**
 * Copper mine data for Chile.
 *
 * Add mine records to the "mines" array.
 * Geometry uses GeoJSON-style coordinates: [longitude, latitude].
 * Keep this file data-only; map behavior belongs in js/.
 *
 * Example record:
 * {
 *   id: "escondida",
 *   name: "Escondida",
 *   country: "Chile",
 *   region: "Antofagasta",
 *   mineType: "OP", // OP = open pit; UG = underground
 *   process: ["concentrator"], // e.g. "concentrator", "SX-EW"
 *   status: "operating",
 *   operator: "",
 *   owners: [],
 *   geometry: {
 *     type: "Polygon",
 *     coordinates: [[]]
 *   },
 *   sources: [],
 *   notes: ""
 * }
 */

export const mines = [];
