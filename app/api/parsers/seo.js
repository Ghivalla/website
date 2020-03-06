import parseImage from "./image";

export default function(entry) {
  if (!entry) return {};
  const { title, description, routeEn, routeFr } = entry.fields;
  const image = entry.fields.image ? parseImage(entry.fields.image) : null;

  return {
    title,
    description,
    routeEn,
    routeFr,
    image
  };
}
