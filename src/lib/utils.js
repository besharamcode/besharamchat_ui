import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const handleToggleSearchBox = (e) => {
  e.preventDefault();
  const searchBox = document.getElementById("search-box");
  if (searchBox.classList.contains("hidden")) {
    searchBox.classList.remove("hidden");
  } else {
    searchBox.classList.add("hidden");
  }
};

export const handleToggleNoticationBox = (e) => {
  e.preventDefault();
  const notificationBox = document.getElementById("notification-box");
  if (notificationBox.classList.contains("hidden")) {
    notificationBox.classList.remove("hidden");
  } else {
    notificationBox.classList.add("hidden");
  }
};