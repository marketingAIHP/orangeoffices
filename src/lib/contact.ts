export const contact = {
  primaryPhone: '+917861004918',
  displayPhone: '+91 78610 04918',
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
};

export const whatsappHref = (message: string) => contact.whatsappNumber
  ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
  : undefined;
