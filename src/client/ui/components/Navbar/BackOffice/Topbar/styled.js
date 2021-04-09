import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Input } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';

const configButton = css`
  height: 55px;
  padding: 0;
  min-width: 170px;
  background-color: ${PALETTE.green1};

  > span > svg {
    width: 23px;
    height: 23px;
    margin-right: 12px;

    path {
      fill: ${PALETTE.white};
    }
  }

  > span {
    color: ${PALETTE.black1};
    text-transform: uppercase;
  }
`;

export const TopbarWrapper = styled.div`
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

  > span > svg {
    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const AddBtn = styled(Button)`
  ${configButton}

  width: 173px;

  svg {
    path {
      fill: ${PALETTE.white} !important;
    }
  }

  > span {
    color: ${PALETTE.white};
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58px;

  > span {
    > span > svg {
      width: 35px;
      height: 35px;
      margin-right: 12px;

      path {
        fill: ${p => (p.archive ? `${PALETTE.grey6}` : `${PALETTE.green1}`)};
      }
    }

    > span {
      font-size: 22px;
    }
  }
`;

export const Search = styled(Input)`
  display: flex;
  width: 100%;
  height: 58px;
  background-color: ${PALETTE.grey25};
  border-radius: ${THEME.borderRadiusL};
  border: 0;
  padding: 20px 16px 20px 16px;
  margin: 0 32px;

  svg {
    width: 26px;
    height: 26px;

    path {
      fill: ${PALETTE.grey12};
    }
  }

  .ant-input-suffix {
    cursor: pointer;

    > svg {
      width: 21px;
      height: 21px;

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
`;

export const ArchiveBtn = styled(Button)`
  ${configButton}

  height: 55px;
  padding: 0;
  background-color: ${PALETTE.grey26};

  svg {
    width: 23px;
    height: 23px;

    path {
      fill: ${PALETTE.black1} !important;
    }
  }

  > span {
    color: ${PALETTE.black1};
    text-transform: uppercase;
  }
`;
