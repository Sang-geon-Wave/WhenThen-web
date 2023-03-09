import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

function isCurrent(to: string): boolean {
  return window.location.pathname.startsWith(to);
}

interface LinkProps {
  active?: boolean;
}

const Link = styled.a<LinkProps>`
  display: block;
  margin: 0 calc(20px * -1);
  padding: 8px 20px;
  border-radius: 4px;
  color: #ffffff;
  text-decoration: none;

  ${(p) =>
    p.active &&
    css`
      color: #a6ff4d;
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

interface SidebarLinkProps {
  children: ReactNode;
  to: string;
  active?: boolean;
}

function SidebarLink({ children, to, active = false }: SidebarLinkProps) {
  return (
    <Link
      href={to}
      active={active}
      aria-current={isCurrent(to) ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export default SidebarLink;
