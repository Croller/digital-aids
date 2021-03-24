import styled from 'styled-components';
import {
  FONTS,
  PALETTE,
  THEME,
} from 'client/style/constants';

export const Wrapper = styled.div`
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
  border-radius: ${THEME.borderRadius};
`;

export const Header = styled.div`
  min-height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 20px 24px;
  cursor: pointer;
`;

export const Title = styled.div`
  margin-right: 20px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30px;
  height: 30px;

  > svg {
    width: 18px;
    height: 18px;
    transform: ${p => (p.open ? 'rotate(90deg)' : 'rotate(270deg)')};

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Content = styled.div`
  display: block;
  padding: 0 54px 30px 74px;
  font-family: ${FONTS.regular};
  font-size: 14px;
  color: ${PALETTE.grey20};
  white-space: pre-line;
`;
