import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { InputDefault } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';

const configButton = css`
  height: 46px;
  background-color: ${PALETTE.green1};
  color: ${PALETTE.black1};
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  text-transform: uppercase;
  border-radius: ${THEME.borderRadiusL};

  > svg {
    width: 23px;
    height: 23px;
    margin-right: 12px;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

export const NavbarRestaurant = styled.div`
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    &:first-child {
      justify-content: flex-start;
    }

    &:last-child {
      justify-content: flex-end;
    }
  }
`;

export const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackBtn = styled(Button)`
  ${configButton}

  background-color: transparent;
  justify-content: flex-start;
  min-width: 100px;
  font-family: ${FONTS.medium};

  > svg {
    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const AddBtn = styled(Button)`
  ${configButton}

  min-width: 173px;
  flex-direction: row-reverse;
  color: ${PALETTE.white};
  font-size: 16px;

  > svg {
    width: 22px;
    height: 22px;
    margin-left: 22px;
    margin-right: unset;

    path {
      fill: ${PALETTE.white};
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  > span {
    font-size: 22px;
    font-family: ${FONTS.semiBold};

    > span > svg {
      width: 35px;
      height: 35px;
      margin-right: 12px;

      path {
        fill: ${p => (p.archive ? `${PALETTE.grey6}` : `${PALETTE.green1}`)};
      }
    }
  }
`;

export const Search = styled(InputDefault)`
  display: flex;
  width: 100%;
  height: 58px;
  background-color: ${PALETTE.grey25};
  border-radius: ${THEME.borderRadiusL};
  border: 0;
  padding: 20px 16px 20px 16px;
  margin: 0 32px;

  .ant-input-prefix {
    > svg {
      width: 26px;
      height: 26px;
      margin-right: 0;

      path {
        fill: ${PALETTE.grey12};
      }
    }
  }

  .ant-input-suffix {
    cursor: pointer;

    > svg {
      width: 21px;
      height: 21px;
      margin-right: 4px;

      path {
        fill: ${PALETTE.black1};
      }
    }
  }

  input {
    padding: 0 10px !important;
    font-size: 16px;
    font-family: ${FONTS.medium};
    background-color: ${PALETTE.grey25};

    &::placeholder {
      color: ${PALETTE.grey6};
    }
  }
`;

export const LoupeBtn = styled(Button)`
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 34px;

  > svg {
    width: 31px;
    height: 31px;

    path {
      fill: ${PALETTE.grey24};
    }
  }
`;

export const DeleteBtn = styled(Button)`
  background-color: transparent;
  padding: 0;

  > svg {
    width: 30px;
    height: 34px;

    path {
      fill: ${PALETTE.grey24};
    }

    &:hover {
      path {
        fill: ${PALETTE.red3};
      }
    }
  }

  ${p => p.disabled && css`
    background-color: transparent;
  `}
`;

export const ArchiveBtn = styled(Button)`
  ${configButton}

  min-width: 136px;
  background-color: ${PALETTE.grey26};
  font-size: 14px;
  font-family: ${FONTS.medium};

  > svg {
    width: 19px;
    height: 19px;
    margin-right: 7px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;
