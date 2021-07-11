import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { IconText } from 'client/ui/components/_block/IconText';
import { Button } from 'client/ui/components/_ui/Button';
import { Table } from 'antd';
import { Loader } from 'client/ui/components/_block/Loader';

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoaderStyled = styled(Loader)`
  height: 100%;
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
  border-radius: ${THEME.borderRadiusL};
  box-shadow: ${THEME.boxShadow2};
`;

export const TableStyled = styled(Table)`
  width: 100%;
  font-size: 16px;
  font-family: ${FONTS.regular};

  .ant-table {
    tr {
      th {
        font-size: 18px;
        font-family: ${FONTS.semiBold};
      }

      td {
        font-size: 16px;
        font-family: ${FONTS.medium};
      }
    }
  }

  .ant-pagination {
    display: flex;
    justify-content: center;

    .ant-pagination-item {
      border-radius: 50%;

      &.ant-pagination-item-active {
        border-color: ${PALETTE.green1};

        > a {
          color: ${PALETTE.green1};
        }
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      > button {
        border-radius: 50%;
        border-color: ${PALETTE.green1};
      }

      &.ant-pagination-disabled {
        > button {
          border-color: ${PALETTE.grey26};
        }
      }
    }
  }
`;

export const Confirmed = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > svg {
    width: 22px;

    path {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Item = styled.span`
  font-size: 16px;
  font-family: ${FONTS.regular};
  margin-bottom: 6px;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > button {
    &:not(:last-child) {
      margin-right: 18px;
    }
  }
`;

export const Control = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: ${THEME.borderRadiusM};
  background-color: ${PALETTE.grey26};

  > svg {
    width: 18px;
    height: 18px;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

