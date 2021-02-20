import styled from 'styled-components';

export const Wrapper = styled.div`
  transform: ${(p) => (p.show ? 'translateY(0)' : (`translatey(${p.direction !== 'down' ? '-' : ''}100%) `))};
  transition: all 0.28s;
`;
