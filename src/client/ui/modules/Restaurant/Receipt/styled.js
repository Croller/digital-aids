import styled from 'styled-components';
import { Button } from 'client/ui/components/_ui/Button';
import { PALETTE, THEME, FONTS } from 'client/style/constants';

export const Wrapper = styled.div`
  padding: 40px 0 20px 0;
  height: auto;
`;

export const Header = styled.div`
  padding: 0 27px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

export const BackButton = styled(Button)`
  text-transform: uppercase;
  background-color: transparent;
  justify-content: flex-start;
  height: auto;
  padding: 0;

  > svg {
    width: 21px;
    height: 21px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.grey1};
    }
  }
`;

export const QRCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 120px;
  height: 40px;
  margin-bottom: 16px;
`;

export const AlertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: ${FONTS.bold};
  font-size: 14px;
  margin: 32px 27px 44px;
`;

export const AlertIcon = styled.div`
  > svg {
    width: 21px;
    height: 21px;
    margin-right: 8px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const ReceiptWrapper = styled.div`
  padding: 22px 27px;
  background-color: ${PALETTE.white};
  box-shadow: ${THEME.boxShadow1};
`;

export const DateTime = styled.h4`
  font-family: ${FONTS.regular};
  font-size: 16px;
  margin: 0;
  margin-bottom: 22px;
`;

export const CategoryWrapper = styled.div`
  margin-bottom: 22px;

  &:not(:last-child) {
    border-bottom: 1px solid ${PALETTE.grey10};
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 28px;
`;

export const Name = styled.span`
  font-family: ${FONTS.semiBold};
  font-size: 18px;
  text-transform: uppercase;
`;

export const NameCategory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Price = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
  text-transform: uppercase;
  margin-right: 0;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;

  /* &:not(:last-child) {
    margin-bottom: 32px;
  } */
`;

export const GroupTitle = styled.h3`
  font-family: ${FONTS.semiBold};
  font-size: 16px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 12px;
`;

export const GroupItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GroupName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DishNumber = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
  color: ${PALETTE.grey1};
  margin-right: 12px;
`;

export const DishName = styled.span`
  font-family: ${FONTS.medium};
  font-size: 16px;
  color: ${PALETTE.black};
  margin-right: auto;
`;

export const Total = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalText = styled.span`
  font-family: ${FONTS.bold};
  font-size: 16px;
  text-transform: uppercase;
`;

export const TotalSumm = styled.span`
  font-family: ${FONTS.bold};
  font-size: 18px;
`;
