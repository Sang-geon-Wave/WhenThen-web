import React, { ReactNode } from 'react';
import styled from 'styled-components';

const SidebarItemType = styled.li`
  margin: 8px;
`;

interface PropsSidebarItem {
  children: ReactNode;
  disabled?: boolean;
}

const SidebarItem = ({ children, disabled = false }: PropsSidebarItem) => (
  <SidebarItemType role={disabled ? 'presentation' : undefined}>
    {children}
  </SidebarItemType>
);

export default SidebarItem;
