import React, { useState } from 'react';
import { ChevronSvg } from 'client/assets/images';
import {
  Wrapper,
  Header,
  Title,
  Icon,
  Content,
} from './styled';

export const Collapse = ({
  className,
  children,
  title,
  collapsed = false,
}) => {
  const [open, setOpen] = useState(collapsed);
  return (
    <Wrapper className={className}>
      <Header onClick={() => setOpen(!open)}>
        <Title>
          {title}
        </Title>
        <Icon open={open}>
          <ChevronSvg />
        </Icon>
      </Header>
      {open && (
        <Content>
          {children}
        </Content>
      )}
    </Wrapper>
  );
};
