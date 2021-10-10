import styled from 'styled-components';
import { background, border, layout, position, space, color } from 'styled-system';

const Box = styled('div')`
  box-sizing: border-box;
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  ${color}
`

export default Box
