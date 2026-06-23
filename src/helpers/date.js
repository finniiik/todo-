import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDueDate = (value) => {
  if (!value) return '';
  const d = typeof value === 'string' ? parseISO(value) : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  if (isToday(d)) return 'Сегодня';
  if (isTomorrow(d)) return 'Завтра';
  return format(d, 'd MMMM yyyy', { locale: ru });
};

export const isOverdue = (value) => {
  if (!value) return false;
  const d = typeof value === 'string' ? parseISO(value) : new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  return isPast(d) && !isToday(d);
};

export const todayIso = () => format(new Date(), 'yyyy-MM-dd');
