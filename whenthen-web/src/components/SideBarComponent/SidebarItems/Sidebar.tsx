import styled from 'styled-components';

const SidebarBodyType = styled.nav`
  min-width: 200px;
  max-width: 400px;
  align: right;
  padding-right: 20px;
  background: #0f2b0f;
`;

interface PropsSidebar {
  children: React.ReactNode;
}

const Sidebar = ({ children }: PropsSidebar) => (
  <SidebarBodyType>{children}</SidebarBodyType>
);

export default Sidebar;
