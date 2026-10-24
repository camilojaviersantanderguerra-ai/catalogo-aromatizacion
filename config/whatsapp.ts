/**
 * CONFIGURACIÓN DE WHATSAPP — único lugar donde se define el número.
 * --------------------------------------------------------------
 * Escribe el número comercial en formato internacional de Chile,
 * por ejemplo "+56 9 1234 5678" (se aceptan espacios y guiones).
 * Mientras esté vacío, los botones muestran un aviso y no abren enlaces.
 *
 * También se puede definir con la variable de entorno
 * NEXT_PUBLIC_WHATSAPP_NUMBER (tiene prioridad sobre este archivo).
 */
export const whatsappConfig = {
  phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",

  pendingMessage:
    "El canal de WhatsApp está pendiente de configuración. Muy pronto podrás enviarnos tu consulta.",

  /** Mensaje para el botón "Consultar producto". */
  productMessage: {
    intro: "Hola, quisiera consultar por el siguiente producto:",
    outro: "Me gustaría conocer su precio, disponibilidad y detalles.",
  },

  /** Mensaje para "Solicitar atención por WhatsApp" (varios productos). */
  selectionMessage: {
    intro: "Hola, quisiera recibir información sobre los siguientes productos:",
    outro: "Me gustaría conocer los precios, la disponibilidad y las opciones de compra.",
    closing: "Quedo atento/a. Muchas gracias.",
  },

  /** Mensaje para los botones generales de contacto. */
  generalMessage: "Hola, quisiera recibir atención personalizada sobre sus productos de aromatización.",
} as const;
