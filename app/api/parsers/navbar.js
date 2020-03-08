import parseImage from "./image";
import parseLink from "./link";
import parsePolymorphe from "./polymorphe";

export default function(entry) {
  const langs = entry.fields.langs.map(img => parseImage(img));
  const navigation = entry.fields.navigation.map(link => parseLink(link));
  const title = entry.fields.title;
  const page404 = parsePolymorphe(entry.fields.page404);
  return { title, langs, navigation, page404 };
}
