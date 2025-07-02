import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiShield, FiPhone, FiMail } from 'react-icons/fi';
import { colors, breakpoints, Button, Container, Flex } from '../styles/GlobalStyles';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.scrolled ? `1px solid ${colors.gray200}` : 'none'};
  transition: all 0.3s ease-in-out;
  padding: 1rem 0;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${colors.primary};
  cursor: pointer;
  
  svg {
    font-size: 2rem;
    color: ${colors.secondary};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  color: ${colors.gray700};
  transition: color 0.2s ease-in-out;
  position: relative;
  
  &:hover {
    color: ${colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${colors.secondary};
    transition: width 0.2s ease-in-out;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${colors.gray700};
  font-size: 1.5rem;
  padding: 0.5rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.gray700};
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${colors.gray600};
  
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    font-size: 1rem;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Início', href: '#hero' },
    { label: 'Benefícios', href: '#benefits' },
    { label: 'Como Funciona', href: '#how-it-works' },
    { label: 'Casos de Uso', href: '#use-cases' },
    { label: 'Contato', href: '#contact' }
  ];

  return (
    <>
      <HeaderWrapper scrolled={scrolled}>
        <Container>
          <Flex justify="space-between" align="center">
            <Logo
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => scrollToSection('hero')}
            >
              <FiShield />
              <span>GuardDrive</span>
            </Logo>

            <Nav>
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.replace('#', ''));
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </Nav>

            <Flex align="center" gap="1rem">
              <ContactInfo>
                <ContactItem>
                  <FiPhone />
                  <span>(11) 9999-9999</span>
                </ContactItem>
                <ContactItem>
                  <FiMail />
                  <span>contato@guarddrive.com</span>
                </ContactItem>
              </ContactInfo>

              <Button
                variant="primary"
                onClick={() => scrollToSection('contact')}
              >
                Demonstração
              </Button>

              <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
                <FiMenu />
              </MobileMenuButton>
            </Flex>
          </Flex>
        </Container>
      </HeaderWrapper>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: colors.gray700
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX />
          </button>

          {navItems.map((item, index) => (
            <MobileNavLink
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href.replace('#', ''));
              }}
            >
              {item.label}
            </MobileNavLink>
          ))}

          <div style={{ marginTop: '2rem' }}>
            <Button
              variant="primary"
              size="large"
              onClick={() => {
                scrollToSection('contact');
                setMobileMenuOpen(false);
              }}
            >
              Solicitar Demonstração
            </Button>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            textAlign: 'center',
            color: colors.gray600 
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <FiPhone style={{ marginRight: '0.5rem' }} />
              (11) 9999-9999
            </div>
            <div>
              <FiMail style={{ marginRight: '0.5rem' }} />
              contato@guarddrive.com
            </div>
          </div>
        </MobileMenu>
      )}
    </>
  );
};

export default Header;

