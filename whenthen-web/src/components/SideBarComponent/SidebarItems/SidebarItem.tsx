import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Item = styled.li`
  margin: 8px;
`;

interface PropsSidebarItem {
  children: ReactNode;
  disabled?: boolean;
}

const SidebarItem = ({ children, disabled = false }: PropsSidebarItem) => (
  <Item role={disabled ? 'presentation' : undefined}>{children}</Item>
);

export default SidebarItem;
