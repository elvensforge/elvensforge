# Fotografías de ElvensForge

Estas carpetas están preparadas para añadir las fotografías reales más adelante:

- `hero/`: fotografía principal de la portada.
- `products/`: bases LED, accesorios y creaciones del escaparate.
- `creations/`: proyectos para la galería.

Los archivos `.gitkeep` permiten conservar las carpetas vacías en Git. Pueden eliminarse cuando haya fotografías.

Usa nombres descriptivos en minúsculas y con guiones, por ejemplo `base-led-vista-frontal.webp`. Añade solo fotografías propias o autorizadas. Prepara versiones WebP o AVIF comprimidas para la web: aproximadamente 1200 px para portada y 800 px para tarjetas; conserva los originales de cámara fuera de `public/`. Todo archivo de esta carpeta será público al desplegar.

Después de añadir una foto, enlázala desde `lib/content.ts` usando su ruta pública, por ejemplo `/images/products/base-led-vista-frontal.webp`, su texto alternativo y las dimensiones reales. En la portada se configura `heroImage`; en productos y proyectos, el campo `image`. Marca `placeholder: false` solo cuando la fotografía y la información de la ficha sean reales y verificadas.

Añadir un archivo a estas carpetas no lo publica automáticamente en una ficha: hay que configurar su referencia y reconstruir/desplegar la web. Mientras no haya fotografías configuradas, se mantienen los marcadores actuales sin enlaces de imagen rotos.
