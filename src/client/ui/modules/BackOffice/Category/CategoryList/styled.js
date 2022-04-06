import styled, { css } from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { CategoryForm } from './CategoryForm';

const listStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 18px;
  border-top: 1px solid ${PALETTE.green1};
`;

export const CategoryEdit = styled(Button)`
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-top: -4px;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusM};

  > svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const ListCategory = styled.div`
  ${listStyle}

  width: 100%;
  flex-wrap: wrap;
`;

export const Caterory = styled(Button)`
  width: auto;
  height: 38px;
  align-items: flex-start;
  padding: 0 12px;
  border-bottom: ${p => (p.active && `4px solid ${PALETTE.black1}`)};
  margin-right: 22px;
  margin-bottom: 14px;
  background-color: transparent;
  border-radius: unset;
  color: ${p => (p.active ? `${PALETTE.black1}` : `${PALETTE.grey12}`)};
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;
  word-wrap: normal;

  ${p => p.new && css`
    color: ${PALETTE.green1};

    > svg {
      width: 22px;
      height: 22px;
      margin-left: 10px;

      path {
        fill: ${PALETTE.green1};
      }
    }
  `}
`;

export const CategoryFormStyled = styled(CategoryForm)`
  margin-bottom: 30px;
`;