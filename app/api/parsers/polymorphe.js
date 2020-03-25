import parseImage from "./image";
import parseLink from "./link";

function polymorpheParser(entry) {
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
  const polymorphe = entry.fields.polymorphe
    ? entry.fields.polymorphe.map(polymorpheParser)
    : null;
  return {
    title,
    description,
    fullDescription,
    tag,
    componentName,
    link,
    links,
    image,
    polymorphe
  };
}
export default polymorpheParser;
