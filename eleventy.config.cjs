/**
 * Configuracion de Eleventy.
 *
 * PATH_PREFIX existe por GitHub Pages: si el sitio vive en
 * https://usuario.github.io/portafolio/ todas las rutas necesitan ese prefijo.
 * Si vive en la raiz (repo usuario.github.io o dominio propio) se queda en "/".
 * El workflow de despliegue lo calcula solo; en local siempre es "/".
 */
const PATH_PREFIX = process.env.PATH_PREFIX || "/";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy("cv");

  // Fecha legible para "ultima actualizacion" y para el sitemap.
  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value || Date.now()).toISOString().slice(0, 10)
  );

  // Devuelve el texto del idioma pedido. Acepta strings simples
  // ("CostoPreciso") y objetos {es, en}. Asi los datos que no se traducen
  // (nombres propios, stacks) se escriben una sola vez.
  eleventyConfig.addFilter("t", (value, lang) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object" && !Array.isArray(value)) {
      return value[lang] !== undefined ? value[lang] : value.es;
    }
    return value;
  });

  // Rutas del sitio en un solo lugar. Devuelven string plano para poder
  // encadenarlas con el filtro `url` de Eleventy, que aplica el pathPrefix.
  eleventyConfig.addFilter("homeUrl", (lang) => (lang === "es" ? "/" : "/en/"));
  eleventyConfig.addFilter("projectUrl", (slug, lang) =>
    lang === "es" ? `/proyectos/${slug}/` : `/en/projects/${slug}/`
  );

  // URL absoluta, para Open Graph y JSON-LD.
  eleventyConfig.addFilter("absolute", (path, base) => {
    const clean = String(path || "/").replace(/^\/+/, "");
    return String(base).replace(/\/+$/, "") + "/" + clean;
  });

  return {
    pathPrefix: PATH_PREFIX,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "html", "md"]
  };
};
