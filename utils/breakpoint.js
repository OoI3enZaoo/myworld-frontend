
import { css } from 'styled-components'

const breakpoints = {
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  _400: '400px',
  _600: '600px',
  _650: '650px',
  _700: '700px',
  _500: '500px',
  _0: '0px'
}

export const minWidth = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export const maxWidth = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
