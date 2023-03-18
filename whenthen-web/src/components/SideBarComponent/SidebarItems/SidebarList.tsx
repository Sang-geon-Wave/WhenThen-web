import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ListProps {
  expanded?: boolean;
}

const SidebarListType = styled.ul<ListProps>`
  display: ${(p) => (p.expanded ? 'block' : 'none')};
  margin: 0;
  padding: 0;
  padding-left: 20px;
  list-style: none;
`;

interface SidebarListProps {
  children: ReactNode;
  expanded?: boolean;
}

const SidebarList = ({ children, expanded = true }: SidebarListProps) => {
  return <SidebarListType expanded={expanded}>{children}</SidebarListType>;
};

export default SidebarList;
