import styled from 'styled-components';

const Body = styled.nav`
  min-width: 200px;
  max-width: 400px;
  align: right;
  padding-right: 20px;
`;

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar({ children }: SidebarProps) {
  return <Body>{children}</Body>;
}

export default Sidebar;
