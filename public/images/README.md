# Fotografías de ElvensForge

Para el rediseño de UAT, añade los derivados de fotografías originales en `home/`. La guía `home/README.md` enumera los archivos esperados, sus dimensiones y cómo prepararlos sin modificar las fotografías maestras.

`lib/home-content.ts` comprueba los archivos durante la compilación. Los espacios sin fotografías mantienen marcadores explícitos. Después de añadir archivos reales hay que reconstruir y desplegar UAT.

Las carpetas `hero/`, `products/` y `creations/` quedan reservadas para organizar otras imágenes en el futuro; no publican fotografías automáticamente en ninguna ficha. Los archivos `.gitkeep` conservan las carpetas vacías en Git.

Añade solo fotografías originales o autorizadas. Todo archivo en `public/` será accesible públicamente. Conserva los originales de cámara sin modificar fuera de esta carpeta y utiliza versiones comprimidas para la web.
