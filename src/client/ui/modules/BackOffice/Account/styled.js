import styled from 'styled-components';
import { FONTS, PALETTE } from 'client/style/constants';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';
import { Descriptions } from 'antd';

const DescriptionsItem = Descriptions.Item;

export const AccountWrapper = styled.div`
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

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Control = styled(Button)`
  background-color: transparent;
  border-width: 0;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  color: ${PALETTE.green1};

  &:disabled {
    cursor: not-allowed;
    color: ${PALETTE.grey24};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ViewStyled = styled(Descriptions)`
  display: flex;
  margin-bottom: 32px;

  .ant-descriptions-view {
    .ant-descriptions-row {
      > th {
        &.ant-descriptions-item {
          padding-bottom: 12px;

          .ant-descriptions-item-label {
            font-size: 16px;
            font-family: ${FONTS.bold};
            color: ${PALETTE.black};
            text-transform: uppercase;
          }
        }
      }

      .ant-descriptions-item-container {
        .ant-descriptions-item-content {
          display: flex;
          flex-wrap: wrap;
          font-size: 16px;
          font-family: ${FONTS.medium};
          color: ${PALETTE.black};

          > img {
            margin-bottom: 8px;
          }
        }
      }
    }
  }
`;

export const ViewItemStyled = styled(DescriptionsItem)`
  display: block;
`;
