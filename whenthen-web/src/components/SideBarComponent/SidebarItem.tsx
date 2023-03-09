import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Item = styled.li`
  margin: 8px;
`;

interface SidebarItemProps {
  children: ReactNode;
  disabled?: boolean;
}

function SidebarItem({ children, disabled = false }: SidebarItemProps) {
  return <Item role={disabled ? 'presentation' : undefined}>{children}</Item>;
}

export default SidebarItem;
