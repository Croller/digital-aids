import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - 346px);
`;

export const Icon = styled.span`
  margin-bottom: 60px;

  > svg {
    width: 80px;
    height: 80px;

    path {
      fill: ${PALETTE.grey24}
    }
  }
`;

export const Title = styled.h4`
  font-size: 22px;
  font-weight: ${FONTS.semiBold};
  color: ${PALETTE.green1};
  margin: 0;
  margin-bottom: 14px;
  text-transform: uppercase;
`;

export const Descriptions = styled.p`
  font-size: 22px;
  font-weight: ${FONTS.regular};
  color: ${PALETTE.black};
  margin: 0;
`;
