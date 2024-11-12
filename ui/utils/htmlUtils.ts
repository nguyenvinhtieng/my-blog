import sanitizeHtml from "sanitize-html";

export const sanitizeInvalidHtmlAttribute = (html: string): string => {
  return sanitizeHtml(html, {
    allowedAttributes: {
      "*": ["id", "class", "style", "src", "href", "alt", "title"],
    },
  });
};
