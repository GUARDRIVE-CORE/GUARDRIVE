import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiShield, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiExternalLink,
  FiArrowUp
} from 'react-icons/fi';
import { colors, breakpoints, Container, Button } from '../styles/GlobalStyles';

const FooterWrapper = styled.footer`
  background: ${colors.gray900};
  color: ${colors.white};
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CompanySection = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${colors.white};
    
    svg {
      color: ${colors.secondary};
      font-size: 2rem;
    }
  }
  
  p {
    color: ${colors.gray300};
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${colors.gray300};
  font-size: 0.875rem;
  
  svg {
    color: ${colors.secondary};
    font-size: 1.125rem;
    flex-shrink: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.secondary};
    }
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    color: ${colors.white};
    font-weight: 600;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.li`
  a {
    color: ${colors.gray300};
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      color: ${colors.secondary};
    }
    
    svg {
      font-size: 1rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: ${colors.gray300};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.secondary};
    color: ${colors.white};
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.125rem;
  }
`;

const Newsletter = styled.div`
  h4 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: ${colors.white};
    font-weight: 600;
  }
  
  p {
    color: ${colors.gray300};
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsletterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${colors.gray600};
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: ${colors.white};
  font-size: 0.875rem;
  
  &::placeholder {
    color: ${colors.gray400};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

const NewsletterButton = styled(Button)`
  align-self: flex-start;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${colors.gray700};
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: ${colors.gray400};
  font-size: 0.875rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    gap: 1rem;
  }
  
  a {
    color: ${colors.gray400};
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.secondary};
    }
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
  z-index: 1000;
  
  svg {
    font-size: 1.25rem;
  }
  
  &:hover {
    background: ${colors.secondary};
    transform: translateY(-2px);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de newsletter
    console.log('Newsletter subscription');
  };

  const productLinks = [
    { label: 'Recursos', href: '#benefits' },
    { label: 'Como Funciona', href: '#how-it-works' },
    { label: 'Casos de Uso', href: '#use-cases' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Demonstração', href: '#contact' }
  ];

  const companyLinks = [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Nossa Equipe', href: '/equipe' },
    { label: 'Carreiras', href: '/carreiras' },
    { label: 'Imprensa', href: '/imprensa' },
    { label: 'Blog', href: '/blog', external: true }
  ];

  const supportLinks = [
    { label: 'Central de Ajuda', href: '/ajuda' },
    { label: 'Documentação', href: '/docs', external: true },
    { label: 'API', href: '/api', external: true },
    { label: 'Status do Sistema', href: '/status', external: true },
    { label: 'Contato', href: '#contact' }
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://linkedin.com/company/guarddrive', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/guarddrive', label: 'Twitter' },
    { icon: FiGithub, href: 'https://github.com/guarddrive', label: 'GitHub' }
  ];

  return (
    <>
      <FooterWrapper>
        <Container>
          <FooterContent>
            <CompanySection>
              <h3>
                <FiShield />
                GuardDrive
              </h3>
              <p>
                Revolucionando a segurança veicular através de tecnologia blockchain, 
                inteligência artificial e certificação ESG. Transforme sua frota em 
                um ativo sustentável e verificável.
              </p>
              <ContactInfo>
                <ContactItem>
                  <FiMail />
                  <a href="mailto:contato@guarddrive.com">contato@guarddrive.com</a>
                </ContactItem>
                <ContactItem>
                  <FiPhone />
                  <a href="tel:+5511999999999">+55 (11) 9999-9999</a>
                </ContactItem>
                <ContactItem>
                  <FiMapPin />
                  <span>São Paulo, SP - Brasil</span>
                </ContactItem>
              </ContactInfo>
              <SocialLinks>
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </SocialLink>
                ))}
              </SocialLinks>
            </CompanySection>

            <FooterSection>
              <h4>Produto</h4>
              <FooterLinks>
                {productLinks.map((link, index) => (
                  <FooterLink key={index}>
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h4>Empresa</h4>
              <FooterLinks>
                {companyLinks.map((link, index) => (
                  <FooterLink key={index}>
                    <a 
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                    >
                      {link.label}
                      {link.external && <FiExternalLink />}
                    </a>
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h4>Suporte</h4>
              <FooterLinks>
                {supportLinks.map((link, index) => (
                  <FooterLink key={index}>
                    <a 
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }
                      }}
                    >
                      {link.label}
                      {link.external && <FiExternalLink />}
                    </a>
                  </FooterLink>
                ))}
              </FooterLinks>

              <Newsletter>
                <h4>Newsletter</h4>
                <p>
                  Receba atualizações sobre novos recursos e insights do setor.
                </p>
                <NewsletterForm onSubmit={handleNewsletterSubmit}>
                  <NewsletterInput
                    type="email"
                    placeholder="Seu email"
                    required
                  />
                  <NewsletterButton variant="secondary" type="submit">
                    Inscrever-se
                  </NewsletterButton>
                </NewsletterForm>
              </Newsletter>
            </FooterSection>
          </FooterContent>

          <FooterBottom>
            <Copyright>
              © 2024 GuardDrive. Todos os direitos reservados. Patente INPI em processo.
            </Copyright>
            <LegalLinks>
              <a href="/privacidade">Política de Privacidade</a>
              <a href="/termos">Termos de Uso</a>
              <a href="/cookies">Cookies</a>
            </LegalLinks>
          </FooterBottom>
        </Container>
      </FooterWrapper>

      <BackToTop
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <FiArrowUp />
      </BackToTop>
    </>
  );
};

export default Footer;

