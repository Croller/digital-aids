import styled from 'styled-components';
import { FONTS, PALETTE, THEME } from 'client/style/constants';
import { Upload } from 'antd';
import { Button } from '../Button';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Adder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Icon = styled.span`
  margin-bottom: 14px;

  > svg {
    width: 78px;
    height: 78px;

    path {
      fill: ${PALETTE.grey27};
    }
  }
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: ${FONTS.medium};
  color: ${PALETTE.grey27};
  margin: 0 !important;
`;

export const UploadStyled = styled(Upload)`
  .ant-upload-select-picture-card {
    background-color: ${PALETTE.white};
    border: 1px solid ${PALETTE.grey27};
    border-radius: ${THEME.borderRadiusL};
    margin: 0;
    margin-bottom: 22px;

    &:last-child {
      width: 100%;
      height: 180px;
    }

    &:hover {
      border-color: ${PALETTE.grey27};
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ImgBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 22px;

  &:not(:last-child) {
    margin-right: 22px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 180px;
  border-radius: ${THEME.borderRadiusL};

  /* background-image: url(${p => p.url && p.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; */
`;

export const Delete = styled(Button)`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  padding: 0;
  background-color: ${PALETTE.grey26};

  > svg {
    width: 19px;
    height: 19px;

    path {
      fill: ${PALETTE.black};
    }
  }
`;
