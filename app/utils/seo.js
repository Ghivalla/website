/*
 * Generate SEO of <head> section
 */

export default (seo, store) => {
  const { title, description, image } = seo;
  const head = { title: title, meta: [], link: [], htmlAttrs: {} };
  head.meta = [
    { hid: "og:title", property: "og:title", content: title },
    { hid: "og:description", property: "og:description", content: description },
    { hid: "description", name: "description", content: description }
  ];
  if (image) {
    const imageUrl = image.src;
    head.meta.push({
      hid: "og:image",
      property: "og:image",
      content: "http:" + imageUrl
    });
    head.meta.push({
      hid: "og:image:secure_url",
      property: "og:image:secure_url",
      content: "https:" + imageUrl
    });
    head.meta.push({
      hid: "og:image:width",
      property: "og:image:width",
      content: image.size.width * 2
    });
    head.meta.push({
      hid: "og:image:height",
      property: "og:image:height",
      content: image.size.height * 2
    });
    head.meta.push({
      hid: "og:image:alt",
      property: "og:image:alt",
      content: image.alt
    });
  }
  const locale = store.state.i18n.locale;
  const index = "route" + locale[0].toUpperCase() + locale[1].toLowerCase();
  const path = seo[index];
  const currentPage = store.state.navbar.navigation.find(
    link => link.href === path
  ).title;
  store.commit("setCurrentPage", currentPage);
  return head;
};
