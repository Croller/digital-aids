import styled, { css } from 'styled-components';
import { PALETTE } from 'client/style/base';

const button = css`
  width: 32px;
  height: 32px;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.grey};
  color: ${PALETTE.white};
  border: unset;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;

  &:focus,
  &:active {
    outline: unset;
  }

  &:hover {
    background-color: ${PALETTE.grey};
  }


  svg {
    width: 18px;
    height: 18px;
    ${p => p.name === 'moveDown' && css`
      transform: rotate(180deg);
    `}

    path {
      fill: ${PALETTE.white}
    }
  }
`;

export const EditPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 60px  ;
  position: relative;
  width: 100%;
  border-bottom: 1px solid ${PALETTE.grey};
  background-color: ${p => p.bgcolor || `${PALETTE.white}`};
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 16px;
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const ControlsGroup = styled.div`
  width: auto;
  padding: 8px;
  display: flex;
  flex-direction: row;
  margin-right: 12px;
  background-color: ${PALETTE.white};
  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, .1);
  border-radius: 8px;
  
  > button {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Button = styled.button`
  ${button}

  background-color: ${p => (p.bgcolor || `${PALETTE.grey}`)};
`;

export const AddButton = styled.button`
  ${button}
  
  width: 28px;
  height: 28px;
  color: ${PALETTE.white};
  position: absolute;
  bottom: -14px;
  left: 50%;
  margin-left: -28px;
  border-radius: 20px;
  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, .1);
  z-index: 100;
`;

export const AddWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -181px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${PALETTE.white};
  box-shadow: 0 3px 10px 0 rgba(34, 41, 47, .1);
  z-index: 101;
  padding: 18px 0;

  > div {
    margin-right: 18px;

    &:not(:last-child) {
      margin-right: 0;
    }
  }
`;

export const AddCompBlock = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 10px 0 rgba(34, 41, 47, .1);
  }
`;
