import styled from 'styled-components';
import { InputDefault } from 'client/ui/components/_ui/Input';
import { Button } from 'client/ui/components/_ui/Button';
import { IconText } from 'client/ui/components/_block/IconText';
import { MapBox } from 'client/ui/components/_ui/MapBox';
import {
  FONTS,
  PALETTE,
  THEME,
  BREAKPOINTS,
  Z_INDEX,
} from 'client/style/constants';

export const RestaurantsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  position: relative;
  margin: 0 auto;
  height: auto;
  width: 100%;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: calc(100vh - 104px);
  }
`;

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  max-height: calc(100vh - 182px);
  flex-direction: column;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    position: absolute;
    top: 28px;
    left: 28px;
    width: 360px;
    height: auto;
    max-height: calc(100vh - 182px);
    z-index: ${Z_INDEX.header - 1};
    overflow-y: hidden;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  border-radius: ${THEME.borderRadiusM};

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    max-height: calc(100vh - 262px);
    overflow-y: auto;
  }
`;

export const Search = styled(InputDefault)`
  &.ant-input-affix-wrapper {
    display: flex;
    width: 100%;
    height: 52px;
    background-color: ${PALETTE.white};
    font-size: 18px;
    padding: 0 18px;
    margin: 8px 0;

    svg {
      width: 20px;
      height: 20px;
      transform: rotate(90deg);

      path {
        fill: ${PALETTE.grey12};
      }
    }

    .ant-input-prefix {
      margin-right: 10px;
    }

    .ant-input-suffix {
      cursor: pointer;
      margin-left: 5px;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    input {
      background-color: ${PALETTE.white};
    }

    @media screen and (min-width: ${BREAKPOINTS.medium}) {
      border: 0;
      margin: 0;
      width: 360px;
      height: 60px;
      display: flex;
      margin-bottom: 16px;

      input {
        font-size: 18px;
      }
    }
  }
`;

export const Restaurant = styled.div`
  width: 100%;
  background-color: ${PALETTE.white};
  border-radius: ${THEME.borderRadiusM};
  box-shadow: ${THEME.boxShadow2};
  padding: 16px 14px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 6px;
  }

  &:hover {
    background-color: ${PALETTE.grey29};
  }

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    height: auto;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled(IconText)`
  width: 340px;
  font-size: 16px;
  font-family: ${FONTS.semiBold};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  > span > svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;

    path: {
      fill: ${PALETTE.green1};
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

export const Control = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: ${PALETTE.grey26};
  border-radius: ${THEME.borderRadiusS};

  &:not(:last-child) {
    margin-right: 18px;
  }

  > svg {
    width: 18px;
    height: 100%;

    path {
      fill: ${PALETTE.black1};
    }
  }
`;

export const Hr = styled.hr`
  margin: 12px 0;
  border: 1px solid ${PALETTE.grey23};
`;

export const Contacts = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Address = styled(IconText)`
  font-size: 14px;
  font-family: ${FONTS.medium};
  text-transform: unset;

  > span > svg {
    margin-right: 8px;
  }
`;

export const MapBoxStyled = styled(MapBox)`
  display: none;

  @media screen and (min-width: ${BREAKPOINTS.medium}) {
    display: block;
  }
`;
