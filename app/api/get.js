import { createClient } from "contentful";
import getMapping from "./parser-mapping";

const getEntries = async (
  locale,
  { content_type, route = null, id = null, getAll = false, ...options }
) => {
  const contentful = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    timeout: 500000
  });

  const mapping = getMapping(locale);

  const query = Array.isArray(content_type)
    ? {
        "sys.contentType.sys.id[in]": content_type.join(","),
        ...options
      }
    : {
        content_type,
        ...options
      };
  if (route) {
    query["fields.seo.sys.contentType.sys.id"] = "seo";
    query[
      `fields.seo.fields.route${locale.charAt(0).toUpperCase() +
        locale.slice(1).toLowerCase()}`
    ] = route;
  }

  if (id) {
    query["fields.id.sys.contentType.sys.id"] = "id";
    query["fields.id"] = id;
  }

  return contentful
    .getEntries({
      ...query,
      locale: locale,
      include: 10,
      limit: 50
    })
    .then(entries => {
      return entries.items.reduce((prev, curr) => {
        const contentType = curr.sys.contentType.sys.id;
        const parser = mapping[contentType];
        const value = parser.parse(curr);
        const id = parser.customId || contentType;
        if (getAll) {
          prev[id] ? prev[id].push(value) : (prev[id] = [value]);
        } else {
          prev[id] = value;
        }
        return prev;
      }, {});
    });
};

export default (locale = "en", options) => getEntries(locale, options);
