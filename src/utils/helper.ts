import { format } from "date-fns";

export const apiUrl = import.meta.env.VITE_API_URL;

export const menuItems = [
  {label: 'MATCHES', link: '/matches'},
  {label: 'STANDINGS', link: '/standings'},
  {label: 'STATS', link: '/stats'},
  {label: 'TEAMS', link: '/teams'},
];

export const formatDate = (date: Date) => {
  return format(new Date(date), "yy-MM-dd (EEE) hh:mm:ss a");
}