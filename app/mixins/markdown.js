import * as marked from "marked";

const markdownMixin = {
  methods: {
    convertMarkdownToHTML(markdown) {
      return marked(markdown);
    }
  }
};

export default markdownMixin;
