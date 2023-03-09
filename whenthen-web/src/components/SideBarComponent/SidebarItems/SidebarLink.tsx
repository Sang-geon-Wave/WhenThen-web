import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { isCurrent } from '../../../utils/sidebarUtils';

interface LinkProps {}

const Link = styled.a<LinkProps>`
  display: block;
  margin: 0 calc(20px * -1);
  padding: 8px 20px;
  border-radius: 4px;
  color: #cadbbd;
  text-decoration: none;

  ${(p) =>
    css`
      color: #a6ff4d;
      background: #4e524c;
      font-weight: bold;
    `}

  &:hover {
    background: #a6ff4d;
    color: #fffffe;
    transform: translateY(-2px);
    transition: 1s;
  }

  &:not([href]) {
    color: #889e6e;
    background: revert;
    transform: none;
  }
`;

interface PropsSidebarLink {
  children: ReactNode;
  to: string;
  active: boolean;
}

const SidebarLink = ({ children, to }: PropsSidebarLink): JSX.Element => {
  return (
    <Link href={to} aria-current={isCurrent(to) ? 'page' : undefined}>
      {children}
    </Link>
  );
};

export default SidebarLink;
