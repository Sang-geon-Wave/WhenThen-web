import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ListProps {
  expanded?: boolean;
}

const List = styled.ul<ListProps>`
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

function SidebarList({ children, expanded = true }: SidebarListProps) {
  return <List expanded={expanded}>{children}</List>;
}

export default SidebarList;
