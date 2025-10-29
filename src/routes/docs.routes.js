
import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const openapiPath = path.join(__dirname, '../../docs/openapi.json')
const openapi = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'))

const customCss = `
/* ===== LIMPIEZA BÁSICA ===== */
.swagger-ui .parameter__type,
.swagger-ui .parameter__in { display: none !important; }

.swagger-ui .parameters .parameter__enum,
.swagger-ui .parameters .enum,
.swagger-ui .parameters .parameter__default { display: none !important; }

/* Ocultar selectores de Media type / Examples en REQUEST y RESPUESTAS */
.swagger-ui .responses-wrapper .response-controls,
.swagger-ui .responses-wrapper .content-type,
.swagger-ui .responses-wrapper .example-controls,
.swagger-ui .responses-wrapper .examples-select,
.swagger-ui .opblock .body-param .example-controls,
.swagger-ui .opblock .body-param .content-type { display: none !important; }

/* (Opcional) Oculta pestaña "Schema" en request y deja solo el ejemplo */
.swagger-ui .opblock .model-example .tab li:nth-child(2) { display: none !important; }

/* ===== BOTONES ===== */

/* Botón "Probar" — fondo azul, texto blanco */
.swagger-ui .opblock-control__btn.execute {
  color: transparent !important;
  position: relative;
  overflow: visible;
}
.swagger-ui .opblock-control__btn.execute::after {
  content: 'Probar';
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* Deshabilitado */
.swagger-ui .Probar__btn[disabled]::after,
.swagger-ui .opblock-control__btn.Probar__btn[disabled]::after,
.swagger-ui .btn.Probart__btn[disabled]::after {
  color: #9ca3af;
}

/* Botón "Ejecutar" — fondo azul, texto blanco */
.swagger-ui .opblock-control__btn.execute {
  color: transparent !important;
  position: relative;
  overflow: visible;
}
.swagger-ui .opblock-control__btn.execute::after {
  content: 'Ejecutar';
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* ===== RESPUESTAS ===== */
/* Título "Responses" -> "Respuestas" (dos variantes de DOM) */
.swagger-ui .responses-wrapper .opblock-section-header h4,
.swagger-ui .responses-wrapper > h4 {
  color: transparent !important; position: relative;
}
.swagger-ui .responses-wrapper .opblock-section-header h4::after,
.swagger-ui .responses-wrapper > h4::after {
  content: 'Respuestas'; color: #222; position: absolute; left: 0; top: 0;
}

/* Cabecera tabla: Code/Descripcion/Links -> Código/Descripción/Enlaces */
.swagger-ui table.responses-table thead th:nth-child(1) { color: transparent !important; position: relative; }
.swagger-ui table.responses-table thead th:nth-child(1)::after { content: 'Código'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%); }
.swagger-ui table.responses-table thead th:nth-child(2) { color: transparent !important; position: relative; }
.swagger-ui table.responses-table thead th:nth-child(2)::after { content: 'Descripción'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%); }
.swagger-ui table.responses-table thead th:nth-child(3) { color: transparent !important; position: relative; }
.swagger-ui table.responses-table thead th:nth-child(3)::after { content: 'Enlaces'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%); }
/* Variantes por clase (Swagger UI nuevas) */
.swagger-ui .responses-table thead th.response-col_status {
  color: transparent !important; position: relative;
}
.swagger-ui .responses-table thead th.response-col_status::after {
  content: 'Código'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%);
}
.swagger-ui .responses-table thead th.response-col_description {
  color: transparent !important; position: relative;
}
.swagger-ui .responses-table thead th.response-col_description::after {
  content: 'Descripción'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%);
}
.swagger-ui .responses-table thead th.response-col_links {
  color: transparent !important; position: relative;
}
.swagger-ui .responses-table thead th.response-col_links::after {
  content: 'Enlaces'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%);
}


/* "No links" -> "Sin enlaces" */
.swagger-ui .response-col_links { color: transparent !important; position: relative; }
.swagger-ui .response-col_links::after {
  content: 'Sin enlaces'; font-style: italic; color: #6b7280; position: absolute; left: 0; top: 0;
}

/* ===== PARÁMETROS ===== */
/* Variante 1: bloque clásico con contenedor .parameters */
.swagger-ui .opblock .parameters .opblock-section-header h4 {
  color: transparent !important; position: relative;
}
.swagger-ui .opblock .parameters .opblock-section-header h4::after {
  content: 'Parámetros'; color: #222; position: absolute; left: 0; top: 0;
}

/* Variante 2: Swagger reciente usa .parameters-container separado */
.swagger-ui .parameters-container .opblock-section-header h4 {
  color: transparent !important; position: relative;
}
.swagger-ui .parameters-container .opblock-section-header h4::after {
  content: 'Parámetros'; color: #222; position: absolute; left: 0; top: 0;
}

/* Variante 3: h4 anterior al contenedor de parámetros (usamos :has) */
.swagger-ui .opblock .opblock-section-header:has(+ .parameters-container) h4 {
  color: transparent !important; position: relative;
}
.swagger-ui .opblock .opblock-section-header:has(+ .parameters-container) h4::after {
  content: 'Parámetros'; color: #222; position: absolute; left: 0; top: 0;
}

/* "No parameters" -> "Sin parámetros" (varias variantes) */
.swagger-ui .opblock .parameters .no-params,
.swagger-ui .parameters-container .no-params,
.swagger-ui .parameters .no-params,
.swagger-ui .no-params,
.swagger-ui .no-parameters {
  color: transparent !important; position: relative;
}
.swagger-ui .opblock .parameters .no-params::after,
.swagger-ui .parameters-container .no-params::after,
.swagger-ui .parameters .no-params::after,
.swagger-ui .no-params::after,
.swagger-ui .no-parameters::after {
  content: 'Sin parámetros'; color: #222; position: absolute; left: 0; top: 0;
}

/* Encabezados de la tabla de parámetros -> Nombre / Descripción */
.swagger-ui .parameters thead tr th { color: transparent !important; position: relative; }
.swagger-ui .parameters thead tr th:nth-child(1)::after { content: 'Nombre'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%); }
.swagger-ui .parameters thead tr th:nth-child(2)::after { content: 'Descripción'; color:#222; position:absolute; left:8px; top:50%; transform:translateY(-50%); }

/* ==== Etiquetas de método en ESPAÑOL ==== */
.swagger-ui .opblock .opblock-summary-method {
  position: relative;
  color: transparent !important;           /* ocultar texto original */
}

/* GET -> OBTENER */
.swagger-ui .opblock-get .opblock-summary-method::after {
  content: 'OBTENER';
  color: #ffffff;
  font-weight: 700;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

/* POST -> CREAR */
.swagger-ui .opblock-post .opblock-summary-method::after {
  content: 'CREAR';
  color: #ffffff;
  font-weight: 700;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

/* PUT -> ACTUALIZAR */
.swagger-ui .opblock-put .opblock-summary-method::after {
  content: 'ACTUALIZAR';
  color: #ffffff;
  font-weight: 700;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

/* DELETE -> ELIMINAR */
.swagger-ui .opblock-delete .opblock-summary-method::after {
  content: 'ELIMINAR';
  color: #ffffff;
  font-weight: 700;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

`

const router = Router()

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(openapi, {
    
    customCss,
    
    customSiteTitle: 'Documentación API – Productos'
  })
)



export default router
