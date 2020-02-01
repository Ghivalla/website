import { createClient } from "contentful";
import getMapping from "./parser-mapping";


const getEntries = async (locale) => {
  const contentful = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const mapping = getMapping(locale);

  return contentful
    .getEntries({
      "sys.contentType.sys.id[in]": Object.keys(mapping).join(","),
      locale,
      include: 10,
      limit: 50
    })
    .then(entries =>
      entries.items.reduce((prev, curr) => {
        const contentType = curr.sys.contentType.sys.id;
        const parser = mapping[contentType];
        const value = parser.parse(curr);
        const id = parser.customId || contentType;
        if (parser.isCollection) {
          prev[id] ? prev[id].push(value) : (prev[id] = [value]);
        } else {
          prev[id] = value;
        }
        return prev;
      }, {})
    );
};

export default (locale = "en") => getEntries(locale);