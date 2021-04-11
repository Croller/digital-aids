import styled from 'styled-components';
import { InputForm } from 'client/ui/components/_ui/Input';
import {
  PALETTE,
  FONTS,
  Z_INDEX,
} from 'client/style/constants';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PALETTE.white};
  height: 97px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX.header};
  padding: 0 35px;
  border-bottom: 1px solid ${PALETTE.grey23};
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: auto;
  width: auto;
  cursor: pointer;

  svg {
    width: 182px;
    height: 36px;
  }
`;

export const LogoText = styled.span`
  position: absolute;
  bottom: -8px;
  right: 85px;
  font-family: ${FONTS.regular};
  font-size: 20px;
  color: ${PALETTE.green1};
  z-index: 1;
  width: 100%;
  text-align: right;
`;

export const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    &:not(:last-child) {
      margin-right: 22px;
    }
  }
`;

export const Hamburger = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 22px;
  }
`;

export const Loupe = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 31px;
    height: 31px;
  }
`;

export const Search = styled(InputForm)`
  position: absolute;
  right: 0;
  top: -12px;
  display: flex;
  width: 324px;
  height: 56px;
  background-color: ${PALETTE.grey11};
  border: 0;
  padding: 0 18px;
  z-index: 1;

  svg {
    width: 24px;
    height: 24px;
    transform: rotate(90deg);

    path {
      fill: ${PALETTE.grey12};
    }
  }

  .ant-input-suffix {
    cursor: pointer;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  input {
    padding: 0 10px;
    font-size: 16px;
    background-color: ${PALETTE.grey11};
  }
`;

export const User = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;

    path {
      fill: ${p => (p.active ? `${PALETTE.green1}` : `${PALETTE.black}`)};
    }
  }
`;

