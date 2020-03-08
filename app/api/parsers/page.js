import parseSEO from "./seo";
import parsePolymorphe from "./polymorphe";

export default function(entry) {
  const seo = parseSEO(entry.fields.seo);
  const sections = entry.fields.sections
    ? entry.fields.sections.map(section => parsePolymorphe(section))
    : null;
  const { id, title, description } = entry.fields;
  return { title, id, description, sections, seo };
}
