# Crono Servicio Automotriz - Archivos adicionales para SEO

Estos archivos van **junto al `index.html`** en la raíz de tu hosting (Cloudflare Pages, Hostinger, etc.).

## 📁 Qué hace cada archivo

### `robots.txt`
Le dice a los bots (Google, Bing, ChatGPT, Claude, Gemini, Perplexity) qué pueden indexar.
Tiene **explícitamente permitidos** todos los bots de IA importantes para que tu negocio aparezca cuando alguien le pregunte a una IA por un taller mecánico.

### `sitemap.xml`
Mapa del sitio para Google. Le indica qué URLs existen y cuándo se actualizaron.
**Después de subir la web, hay que dárselo a Google manualmente:**
1. Entrar a https://search.google.com/search-console
2. Agregar tu propiedad (cronoautomotriz.com.uy)
3. Sección "Sitemaps" → pegar: `https://cronoautomotriz.com.uy/sitemap.xml`

### `llms.txt`
Estándar nuevo (2025) para que las IAs entiendan rápido de qué se trata tu sitio.
ChatGPT, Claude, Perplexity y Gemini lo leen para citar tu negocio en sus respuestas.

### `og-image.svg`
La imagen que aparece cuando alguien comparte el link de la web por WhatsApp/Facebook/Twitter.
Tamaño: 1200x630 px (estándar Open Graph).
**IMPORTANTE:** Algunas redes (Facebook viejo, WhatsApp en algunos casos) prefieren JPG/PNG. Si querés máxima compatibilidad, abrí el SVG en Photoshop/Figma y exportalo como `og-image.jpg`.

### `sw.js`
Service Worker. Hace que la web cargue más rápido en visitas repetidas y funcione offline básicamente.
**Para activarlo**, hay que agregar este script al final del `index.html` (antes de `</body>`):

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
</script>
```

## 🚀 Cómo subir todo a Cloudflare Pages

1. Entrá a https://dash.cloudflare.com
2. Workers & Pages → Create → Pages → Upload assets
3. Arrastrá la carpeta entera con todos los archivos
4. Listo, tu web queda online en una URL como `crono.pages.dev`
5. Después conectás tu dominio `cronoautomotriz.com.uy`

## ✅ Después de subir todo, hacé este checklist:

- [ ] Visitar `https://cronoautomotriz.com.uy/robots.txt` → debe abrirse
- [ ] Visitar `https://cronoautomotriz.com.uy/sitemap.xml` → debe abrirse
- [ ] Visitar `https://cronoautomotriz.com.uy/llms.txt` → debe abrirse
- [ ] Enviar el sitemap a Google Search Console
- [ ] Verificar que la web aparezca al buscar `site:cronoautomotriz.com.uy` en Google (puede tardar 1-2 semanas)
- [ ] Conectar la web al Google Business Profile
- [ ] Probar compartir el link por WhatsApp y verificar que aparezca la imagen
