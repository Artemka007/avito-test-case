export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatPrice = (price: number): string =>
  price.toLocaleString('ru-RU') + '\u00a0₽';
