import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
}
`

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 10px 10px;
`;

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;


export const lightTheme = {
    body: '#E2E2E2'
}

export const darkTheme = {
    body: '#212121'
}

export const flex = styled.div`
  display: flex;
`;

export const FlexWrap = styled(flex)`
  flex-wrap: wrap;
`;

export const FlexWrapBetween = styled(FlexWrap)`
  justify-content: space-between;
  align-items: center;
`;