
// @ts-check

import { months } from "./dataservice"

/**
 * @param {Date} date 
 * @returns {string} in the format of YYYY-MM-DD (ex: 2023-06-21)
 */
export function formatShortDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10?`0${month}`:month}-${day < 10?`0${day}`: day}`
}

/**
 * 
 * @param {Date} date 
 * @returns {string} in the format of day Mon YYYY (ex: 21 Jun 2023)
 */
export function formatLongDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${day} ${months[month - 1]} ${year}`
}
