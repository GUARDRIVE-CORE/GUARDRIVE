import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiTruck, 
  FiShield, 
  FiBuilding, 
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiCheck,
  FiArrowRight,
  FiBarChart3
} from 'react-icons/fi';
import { colors, breakpoints, Container, Section, Button } from '../styles/GlobalStyles';

const UseCasesWrapper = styled(Section)`
  background: ${colors.gray50};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  color: ${colors.gray900};
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${colors.gray600};
  max-width: 700px;
  margin: 0 auto;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Tab = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${props => props.active ? colors.primary : colors.white};
  color: ${props => props.active ? colors.white : colors.gray700};
  border: 2px solid ${props => props.active ? colors.primary : colors.gray200};
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 0.5rem;
  
  &:hover {
    border-color: ${colors.primary};
    color: ${props => props.active ? colors.white : colors.primary};
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
`;

const UseCaseContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContentSection = styled.div``;

const UseCaseTitle = styled.h3`
  font-size: 2.5rem;
  color: ${colors.gray900};
  margin-bottom: 1.5rem;
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const UseCaseDescription = styled.p`
  font-size: 1.25rem;
  color: ${colors.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  svg {
    color: ${colors.secondary};
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  div {
    flex-grow: 1;
  }
  
  h4 {
    font-size: 1.125rem;
    color: ${colors.gray900};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.875rem;
    color: ${colors.gray600};
    margin: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: ${colors.white};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.875rem;
    color: ${colors.gray600};
    font-weight: 500;
  }
`;

const VisualSection = styled.div`
  background: ${colors.white};
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.gradient || colors.primaryGradient};
    opacity: 0.05;
  }
`;

const IconShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
`;

const ShowcaseIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 3rem;
    color: ${props => props.color || colors.primary};
  }
  
  span {
    font-weight: 600;
    color: ${colors.gray700};
    text-align: center;
  }
`;

const CTASection = styled.div`
  background: ${colors.primary};
  border-radius: 20px;
  padding: 4rem;
  text-align: center;
  color: ${colors.white};
  
  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${colors.white};
  }
  
  p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const UseCasesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const useCases = [
    {
      id: 'frotas',
      title: 'Frotas Corporativas',
      description: 'Transforme sua frota em um ativo sustentável e verificável. Reduza custos operacionais, melhore a segurança e gere novos fluxos de receita através de créditos de carbono.',
      benefits: [
        {
          icon: FiShield,
          title: 'Segurança Aprimorada',
          description: 'Redução de 85% em acidentes através de monitoramento inteligente'
        },
        {
          icon: FiDollarSign,
          title: 'Economia de Custos',
          description: 'Até 40% de redução em custos de combustível e manutenção'
        },
        {
          icon: FiTrendingUp,
          title: 'Créditos de Carbono',
          description: 'Monetize práticas sustentáveis através de tokens verificáveis'
        },
        {
          icon: FiBarChart3,
          title: 'Relatórios ESG',
          description: 'Conformidade automática com padrões internacionais'
        }
      ],
      stats: [
        { number: '85%', label: 'Redução de Acidentes' },
        { number: '40%', label: 'Economia Combustível' },
        { number: '200%', label: 'ROI em 12 meses' },
        { number: '95%', label: 'Conformidade ESG' }
      ],
      icons: [
        { icon: FiTruck, label: 'Monitoramento', color: colors.primary },
        { icon: FiShield, label: 'Segurança', color: colors.secondary },
        { icon: FiTrendingUp, label: 'Otimização', color: colors.accent },
        { icon: FiDollarSign, label: 'Monetização', color: colors.success }
      ],
      gradient: colors.primaryGradient
    },
    {
      id: 'seguradoras',
      title: 'Seguradoras',
      description: 'Revolucione a precificação de seguros com dados verificáveis em tempo real. Reduza sinistros, melhore a avaliação de riscos e ofereça produtos mais competitivos.',
      benefits: [
        {
          icon: FiBarChart3,
          title: 'Dados Verificáveis',
          description: 'Informações certificadas por blockchain para avaliação precisa'
        },
        {
          icon: FiShield,
          title: 'Redução de Sinistros',
          description: 'Prevenção proativa através de alertas em tempo real'
        },
        {
          icon: FiDollarSign,
          title: 'Precificação Dinâmica',
          description: 'Ajuste de prêmios baseado em comportamento real'
        },
        {
          icon: FiUsers,
          title: 'Satisfação do Cliente',
          description: 'Produtos personalizados e mais justos'
        }
      ],
      stats: [
        { number: '60%', label: 'Redução Sinistros' },
        { number: '30%', label: 'Melhoria Margem' },
        { number: '90%', label: 'Precisão Dados' },
        { number: '45%', label: 'Satisfação Cliente' }
      ],
      icons: [
        { icon: FiBarChart3, label: 'Análise', color: colors.primary },
        { icon: FiShield, label: 'Proteção', color: colors.secondary },
        { icon: FiDollarSign, label: 'Precificação', color: colors.accent },
        { icon: FiUsers, label: 'Clientes', color: colors.success }
      ],
      gradient: colors.secondaryGradient
    },
    {
      id: 'governos',
      title: 'Governos e Reguladores',
      description: 'Implemente políticas públicas baseadas em dados verificáveis. Monitore emissões, fiscalize conformidade e promova sustentabilidade urbana com transparência total.',
      benefits: [
        {
          icon: FiGlobe,
          title: 'Monitoramento Urbano',
          description: 'Visibilidade completa das emissões e tráfego urbano'
        },
        {
          icon: FiCheck,
          title: 'Fiscalização Automática',
          description: 'Conformidade verificável com regulamentações ambientais'
        },
        {
          icon: FiTrendingUp,
          title: 'Políticas Baseadas em Dados',
          description: 'Decisões informadas por métricas verificáveis'
        },
        {
          icon: FiBuilding,
          title: 'Smart Cities',
          description: 'Integração com infraestrutura urbana inteligente'
        }
      ],
      stats: [
        { number: '70%', label: 'Redução Emissões' },
        { number: '100%', label: 'Transparência' },
        { number: '50%', label: 'Eficiência Fiscal' },
        { number: '80%', label: 'Conformidade' }
      ],
      icons: [
        { icon: FiGlobe, label: 'Monitoramento', color: colors.primary },
        { icon: FiCheck, label: 'Conformidade', color: colors.secondary },
        { icon: FiBuilding, label: 'Infraestrutura', color: colors.accent },
        { icon: FiTrendingUp, label: 'Políticas', color: colors.success }
      ],
      gradient: `linear-gradient(135deg, ${colors.accent} 0%, #FB923C 100%)`
    }
  ];

  const tabs = [
    { label: 'Frotas Corporativas', icon: FiTruck },
    { label: 'Seguradoras', icon: FiShield },
    { label: 'Governos', icon: FiBuilding }
  ];

  const currentUseCase = useCases[activeTab];

  return (
    <UseCasesWrapper id="use-cases" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Casos de Uso do GuardDrive FleetShield
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Uma solução versátil que atende diferentes setores e necessidades, 
            sempre com foco em segurança, sustentabilidade e transparência.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TabsContainer>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon style={{ marginRight: '0.5rem' }} />
                {tab.label}
              </Tab>
            ))}
          </TabsContainer>
        </motion.div>

        <AnimatePresence mode="wait">
          <UseCaseContent
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ContentSection>
              <UseCaseTitle>{currentUseCase.title}</UseCaseTitle>
              <UseCaseDescription>{currentUseCase.description}</UseCaseDescription>
              
              <BenefitsList>
                {currentUseCase.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <BenefitItem>
                      <benefit.icon />
                      <div>
                        <h4>{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </div>
                    </BenefitItem>
                  </motion.div>
                ))}
              </BenefitsList>

              <StatsGrid>
                {currentUseCase.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <StatCard>
                      <div className="number">{stat.number}</div>
                      <div className="label">{stat.label}</div>
                    </StatCard>
                  </motion.div>
                ))}
              </StatsGrid>
            </ContentSection>

            <VisualSection gradient={currentUseCase.gradient}>
              <IconShowcase>
                {currentUseCase.icons.map((iconItem, index) => (
                  <ShowcaseIcon
                    key={index}
                    color={iconItem.color}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <iconItem.icon />
                    <span>{iconItem.label}</span>
                  </ShowcaseIcon>
                ))}
              </IconShowcase>
            </VisualSection>
          </UseCaseContent>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <CTASection>
            <h3>Pronto para Transformar Sua Operação?</h3>
            <p>
              Descubra como o GuardDrive FleetShield pode revolucionar sua frota, 
              reduzir custos e gerar novos fluxos de receita sustentáveis.
            </p>
            <Button
              variant="success"
              size="large"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Agendar Demonstração Personalizada
              <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Button>
          </CTASection>
        </motion.div>
      </Container>
    </UseCasesWrapper>
  );
};

export default UseCasesSection;

