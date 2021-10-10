import styled from 'styled-components'
import { space, typography } from 'styled-system'

const getFontSize = ({ fontSize, small }) => {
  return fontSize || '16px'
}

const Text = styled.div`
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  ${props => props.color &&`
    color: ${props.color};
  `};
  ${props => props.fontFamily &&`
    font-family: ${props.fontFamily};
  `};
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${space}
  ${typography}
`

export default Text
