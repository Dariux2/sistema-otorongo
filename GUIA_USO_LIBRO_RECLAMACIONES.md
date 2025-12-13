# Guía de Uso - Libro de Reclamaciones
## Centro Oftalmológico El Otorongo

---

## 📖 Índice

1. [Introducción](#introducción)
2. [Acceso al Sistema](#acceso-al-sistema)
3. [Para Usuarios Públicos](#para-usuarios-públicos)
4. [Para Administradores](#para-administradores)
5. [Preguntas Frecuentes](#preguntas-frecuentes)
6. [Soporte Técnico](#soporte-técnico)

---

## 🎯 Introducción

El Libro de Reclamaciones es un sistema que permite a los usuarios registrar quejas, reclamos o sugerencias sobre los servicios del Centro Oftalmológico El Otorongo, cumpliendo con la normativa legal peruana.

### Tipos de Registro:
- **Queja:** Disconformidad no relacionada directamente con los productos o servicios
- **Reclamo:** Disconformidad relacionada con los productos o servicios
- **Sugerencia:** Propuesta de mejora para los servicios

---

## 🌐 Acceso al Sistema

### Formulario Público (Sin Login)
**URL:** `pages/public/reclamaciones.html`

**Acceso desde:**
1. Página principal → Menú superior → "Libro de Reclamaciones"
2. Página principal → Footer → "Libro de Reclamaciones"

### Panel Administrativo (Requiere Login)
**URL:** `pages/dashboard/gestion-reclamaciones.html`

**Acceso desde:**
1. Iniciar sesión como Administrador
2. Dashboard → Menú lateral → "Reclamaciones"

---

## 👥 Para Usuarios Públicos

### Paso 1: Acceder al Formulario

1. Abra su navegador web
2. Vaya a la página principal del Centro Oftalmológico
3. Haga clic en "Libro de Reclamaciones" (menú superior o footer)

### Paso 2: Completar el Formulario

#### Información Requerida:

**1. Tipo de Registro**
- Seleccione: Queja, Reclamo o Sugerencia

**2. Datos del Reclamante**
- Nombre Completo
- DNI (8 dígitos)
- Teléfono
- Email
- Dirección completa

**3. Detalles del Incidente**
- Fecha del incidente
- Servicio relacionado
- Descripción detallada
- Solución solicitada

### Paso 3: Enviar

1. Revise que todos los campos estén completos
2. Haga clic en "Enviar Reclamación"
3. Espere la confirmación

### Paso 4: Confirmación

Recibirá:
- ✅ Número de registro único (ejemplo: REC-1234567890-123)
- ✅ Confirmación en pantalla
- ✅ Opción para imprimir comprobante

**⚠️ IMPORTANTE:** Guarde su número de registro para dar seguimiento.

### Paso 5: Imprimir Comprobante (Opcional)

1. Haga clic en "Imprimir Comprobante"
2. Se abrirá una nueva ventana
3. Use Ctrl+P o el botón "Imprimir"
4. Guarde o imprima el documento

---

## 👨‍💼 Para Administradores

### Acceso al Panel

1. Inicie sesión en el sistema
2. Vaya al Dashboard
3. Haga clic en "Reclamaciones" en el menú lateral
   - Verá un badge "Nuevo" destacado

### Vista Principal

El panel muestra:

#### Estadísticas (Parte Superior)
- Total de reclamaciones
- Reclamaciones nuevas
- Reclamaciones en proceso
- Reclamaciones resueltas

#### Filtros
- **Por Tipo:** Queja, Reclamo, Sugerencia
- **Por Estado:** Nueva, En Proceso, Resuelta, Cerrada
- **Por Fecha:** Rango de fechas
- **Búsqueda:** Por número, nombre o DNI

#### Tabla de Reclamaciones
Columnas:
- Número de registro
- Tipo
- Fecha
- Nombre del reclamante
- DNI
- Servicio relacionado
- Estado
- Acciones (Ver, Editar, Imprimir)

### Ver Detalles de una Reclamación

1. Localice la reclamación en la tabla
2. Haga clic en el icono de ojo (👁️)
3. Se abrirá un modal con:
   - Datos completos del reclamante
   - Detalles del incidente
   - Información de registro
   - Estado actual

### Cambiar Estado de una Reclamación

1. Haga clic en el icono de editar (✏️)
2. Seleccione el nuevo estado:
   - **Nueva:** Recién registrada
   - **En Proceso:** Siendo atendida
   - **Resuelta:** Solución implementada
   - **Cerrada:** Caso finalizado
3. Agregue notas o comentarios (opcional)
4. Haga clic en "Guardar Cambios"

### Imprimir Comprobante

1. Haga clic en el icono de impresora (🖨️)
2. Se abrirá el comprobante en nueva ventana
3. Imprima o guarde como PDF

### Exportar Datos

1. Haga clic en "Exportar a Excel"
2. Se descargará un archivo CSV
3. Ábralo con Excel o Google Sheets

### Aplicar Filtros

**Filtro Simple:**
1. Use la barra de búsqueda
2. Escriba número, nombre o DNI
3. Los resultados se filtran automáticamente

**Filtros Avanzados:**
1. Seleccione tipo de reclamación
2. Seleccione estado
3. Defina rango de fechas
4. Haga clic en "Buscar"

**Limpiar Filtros:**
- Haga clic en "Limpiar" para resetear todos los filtros

---

## ❓ Preguntas Frecuentes

### Para Usuarios

**P: ¿Necesito crear una cuenta para registrar una reclamación?**  
R: No, el formulario es público y no requiere registro.

**P: ¿Cuánto tiempo demora la respuesta?**  
R: Nos comprometemos a responder en un plazo máximo de 48 horas hábiles.

**P: ¿Cómo hago seguimiento a mi reclamación?**  
R: Guarde su número de registro y contáctenos para consultar el estado.

**P: ¿Puedo registrar una reclamación anónima?**  
R: No, por normativa legal se requieren datos del reclamante.

**P: ¿Qué hago si no estoy satisfecho con la respuesta?**  
R: Puede acudir a INDECOPI para presentar su caso.

**P: ¿Mis datos están protegidos?**  
R: Sí, cumplimos con la Ley de Protección de Datos Personales (Ley N° 29733).

### Para Administradores

**P: ¿Quién puede acceder al panel administrativo?**  
R: Solo usuarios con rol de "Administrador".

**P: ¿Dónde se guardan las reclamaciones?**  
R: Actualmente en localStorage del navegador. Se recomienda exportar periódicamente.

**P: ¿Puedo eliminar una reclamación?**  
R: No, por normativa legal las reclamaciones deben conservarse.

**P: ¿Cómo exporto los datos?**  
R: Use el botón "Exportar a Excel" para descargar un archivo CSV.

**P: ¿Las reclamaciones se sincronizan entre dispositivos?**  
R: No, están en localStorage local. Para producción se recomienda usar base de datos.

---

## 🔧 Soporte Técnico

### Problemas Comunes

**Problema:** El formulario no se envía  
**Solución:** Verifique que todos los campos requeridos estén completos y válidos.

**Problema:** No puedo acceder al panel administrativo  
**Solución:** Verifique que haya iniciado sesión con una cuenta de administrador.

**Problema:** No veo las reclamaciones en el panel  
**Solución:** Verifique que haya reclamaciones registradas y que los filtros no estén activos.

**Problema:** El comprobante no se imprime  
**Solución:** Verifique que su navegador permita ventanas emergentes.

### Contacto de Soporte

**Email:** soporte@otorongo.com  
**Teléfono:** (01) 555-0123  
**Horario:** Lunes a Viernes, 8:00 AM - 6:00 PM

---

## 📱 Compatibilidad

### Navegadores Soportados:
- ✅ Google Chrome (recomendado)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ⚠️ Internet Explorer (no recomendado)

### Dispositivos:
- ✅ Computadoras de escritorio
- ✅ Laptops
- ✅ Tablets
- ✅ Smartphones

---

## 🔒 Seguridad y Privacidad

### Protección de Datos
- Sus datos personales están protegidos según la Ley N° 29733
- Solo se usan para dar respuesta a su reclamación
- No se comparten con terceros sin su consentimiento

### Recomendaciones
- Guarde su número de registro en lugar seguro
- No comparta información sensible en la descripción
- Use una dirección de email válida para recibir respuestas

---

## 📋 Checklist de Uso

### Para Registrar una Reclamación:
- [ ] Tengo mi DNI a mano
- [ ] Conozco la fecha del incidente
- [ ] Puedo describir claramente lo ocurrido
- [ ] Sé qué solución solicito
- [ ] Tengo email y teléfono válidos

### Después de Registrar:
- [ ] Guardé mi número de registro
- [ ] Imprimí o guardé el comprobante
- [ ] Anoté la fecha de registro
- [ ] Esperaré la respuesta en 48 horas

---

## 📞 Información de Contacto

**Centro Oftalmológico El Otorongo**  
Dirección: Faucett 326, Callao - Lima, Perú  
Teléfono: (01) 555-0123  
Email: info@otorongo.com  
Horario: Lun-Vie 8:00 AM - 6:00 PM, Sáb 8:00 AM - 2:00 PM

---

**Documento actualizado:** 2025-01-XX  
**Versión:** 1.0
