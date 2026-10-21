# Imágenes de la portada UAT

Las imágenes suministradas y los logos ya están conectados al maquetado. Los originales entregados no se han modificado: la web usa derivados WebP/PNG/JPG optimizados. No se ha añadido ni modificado generativamente ninguna miniatura.

## JPG pendientes que puedes sustituir

| Archivo                       | Contenido pendiente                        | Tamaño recomendado |
| ----------------------------- | ------------------------------------------ | ------------------ |
| `led-base-lighting.jpg`       | Base con el sistema de iluminación visible | 1200 × 900         |
| `led-installation-wiring.jpg` | Cableado del montaje                       | 1000 × 750         |
| `led-installation-strip.jpg`  | Colocación de los LED                      | 1000 × 750         |

Estos JPG contienen únicamente un gráfico con el nombre del archivo y la etiqueta «Replaceable image placeholder». No representan productos ni montajes reales.

Para sustituirlos:

1. Reemplaza el JPG por tu fotografía usando el mismo nombre. Conserva la proporción o actualiza sus dimensiones en `assets.json`.
2. En la entrada correspondiente de `assets.json`, cambia `placeholder` a `false` y revisa el texto alternativo en `lib/home-content.ts`.
3. Reconstruye y despliega **UAT**. No hay que cambiar el maquetado.

También puedes añadir un WebP con el mismo nombre base; tiene prioridad sobre el JPG. Para generar un derivado conservando el original:

```sh
node scripts/prepare-home-image.mjs /ruta/a/tu-original.jpg led-base-lighting.webp 1200 900
```

`scripts/generate-home-placeholders.mjs` crea únicamente los JPG ausentes y nunca sobrescribe un archivo existente. La sección de transformación ya utiliza la nueva imagen de detalle suministrada (`transformation-detail.webp`). La galería utiliza las imágenes suministradas; la foto del resultado iluminado y la secuencia reutilizan una de ellas, sin presentarla como otra toma ni como una comparación antes/después.

El nombre histórico `gallery-psychomancer.webp` se conserva como ubicación del tercer espacio de galería, pero su leyenda visible es genérica: no se da por confirmado el modelo concreto de esa imagen.

## Recursos incorporados

- `hero-void-dragon.webp`: imagen suministrada para escritorio.
- `hero-nightbringer-mobile.webp`: imagen suministrada para móvil.
- `gallery-void-dragon.webp`, `gallery-nightbringer.webp`, `gallery-psychomancer.webp`: galería.
- `led-installation-result.webp`, `transformation-illuminated.webp`: reutilización del resultado suministrado.
- `../brand/`: logo blanco, logo a color e imagen de marca para compartir.

`assets.json` registra dimensiones, estado de sustitución y hashes SHA-256 de las imágenes fuente. Los tamaños son de los derivados usados por la web. Los archivos publicados son accesibles públicamente; conserva los originales de cámara fuera de `public/`.
