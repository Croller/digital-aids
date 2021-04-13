import styled from 'styled-components';
import { HintsBlock } from 'client/ui/components/_block/HintsBlock';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HintsBlockStyled = styled(HintsBlock)`
  display: block;
`;

export const Text = styled.h1`
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
