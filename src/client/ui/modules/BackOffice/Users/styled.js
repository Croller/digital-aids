import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';
import { IconText } from 'client/ui/components/_block/IconText';
import { Table, Tag } from 'antd';

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;
`;

export const Title = styled(IconText)`
  font-size: 22px;
  font-family: ${FONTS.semiBold};

  > span > svg {
    width: 33px;
    height: 33px;
    margin-right: 14px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TableStyled = styled(Table)`
  width: 100%;
`;

export const TagStyled = styled(Tag)`
  display: block;
`;
