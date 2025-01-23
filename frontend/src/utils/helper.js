import { format } from 'date-fns';

export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = { year: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
}

export function formatToReadableDate(timestamp) {
  return format(new Date(timestamp), 'MMM dd yyyy');
}