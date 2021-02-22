import styled from 'styled-components';
import { Allergens } from 'client/ui/components/Allergens';
import { FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  padding-top: 22px;
`;

export const Header = styled.div`
  padding: 0 28px;
  margin-bottom: 42px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-family: ${FONTS.bold};
  margin-bottom: 12px;
`;

export const Description = styled.p`
  font-size: 16px;
  font-family: ${FONTS.bold};
`;

export const AllergensStyled = styled(Allergens)`
  padding: 0 28px;
  margin-bottom: 52px;
`;
