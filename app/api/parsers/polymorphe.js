import parseImage from "./image";
import parseLink from "./link";

export default function(entry) {
  const {
    title,
    description,
    fullDescription,
    componentName,
    tag
  } = entry.fields;
  const image = parseImage(entry.fields.image);
  const link = parseLink(entry.fields.link);
  const links = entry.fields.links ? entry.fields.links.map(parseLink) : null;
  return {
    title,
    description,
    fullDescription,
    tag,
    componentName,
    link,
    links,
    image
  };
}
