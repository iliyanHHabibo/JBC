import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import lisboaLogo from '../assets/lisboa-logo.png';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src={lisboaLogo} alt="Câmara Municipal de Lisboa" />
      </LogoContainer>
      
      <NavMenu>
        <NavItem>
          <StyledNavLink to="/diagnosis" end>
            <NavIcon>📊</NavIcon>
            <NavText>Análise</NavText>
          </StyledNavLink>
        </NavItem>
        
        <NavItem>
          <StyledNavLink to="/evolution">
            <NavIcon>📈</NavIcon>
            <NavText>Evolução</NavText>
          </StyledNavLink>
        </NavItem>
        
        <NavItem>
          <StyledNavLink to="/ai-suggestions">
            <NavIcon>💡</NavIcon>
            <NavText>Sugestões IA</NavText>
          </StyledNavLink>
        </NavItem>
        
        <NavItem>
          <StyledNavLink to="/edit-data">
            <NavIcon>✏️</NavIcon>
            <NavText>Editar Dados</NavText>
          </StyledNavLink>
        </NavItem>
        
        <NavItem>
          <StyledNavLink to="/business-map">
            <NavIcon>🗺️</NavIcon>
            <NavText>Mapa de Comércio</NavText>
          </StyledNavLink>
        </NavItem>
      </NavMenu>
      
      <BottomSection>
        <NavItem>
          <StyledNavLink to="/settings">
            <NavIcon>⚙️</NavIcon>
            <NavText>Definições</NavText>
          </StyledNavLink>
        </NavItem>
        
        <NavItem>
          <StyledNavLink to="/">
            <NavIcon>🏠</NavIcon>
            <NavText>Início</NavText>
          </StyledNavLink>
        </NavItem>
      </BottomSection>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  flex: 1;
`;

const NavItem = styled.li`
  margin: 5px 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(52, 152, 219, 0.2);
    border-left-color: #3498db;
    color: white;
  }
`;

const NavIcon = styled.span`
  margin-right: 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

const NavText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const BottomSection = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
`;

export default Sidebar; 