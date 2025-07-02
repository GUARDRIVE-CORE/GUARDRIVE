import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiShield, 
  FiTrendingUp, 
  FiZap, 
  FiEye, 
  FiLock, 
  FiDollarSign,
  FiBarChart3,
  FiGlobe,
  FiCpu
} from 'react-icons/fi';
import { colors, breakpoints, Container, Section, Grid, Card } from '../styles/GlobalStyles';

const BenefitsWrapper = styled(Section)`
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
  max-width: 600px;
  margin: 0 auto;
`;

const BenefitCard = styled(motion(Card))`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient || colors.primaryGradient};
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${props => props.gradient || colors.primaryGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 2rem;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.2);
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${colors.gray900};
`;

const BenefitDescription = styled.p`
  color: ${colors.gray600};
  line-height: 1.6;
  flex-grow: 1;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-top: 1.5rem;
  text-align: left;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: ${colors.gray700};
  
  &::before {
    content: '✓';
    color: ${colors.secondary};
    font-weight: bold;
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding: 3rem;
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${colors.gray600};
  font-weight: 500;
`;

const BenefitsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const benefits = [
    {
      icon: FiShield,
      title: 'Segurança Verificável',
      description: 'Monitoramento em tempo real com certificação blockchain imutável.',
      gradient: colors.primaryGradient,
      features: [
        'Detecção automática de violações',
        'Alertas em tempo real',
        'Histórico imutável de eventos',
        'Certificação digital verificável'
      ]
    },
    {
      icon: FiTrendingUp,
      title: 'Sustentabilidade ESG',
      description: 'Transforme práticas sustentáveis em valor mensurável e verificável.',
      gradient: colors.secondaryGradient,
      features: [
        'Métricas ESG automatizadas',
        'Relatórios de conformidade',
        'Créditos de carbono verificáveis',
        'Certificações internacionais'
      ]
    },
    {
      icon: FiZap,
      title: 'Tokenização Inteligente',
      description: 'Converta impacto ambiental em tokens negociáveis no mercado.',
      gradient: `linear-gradient(135deg, ${colors.accent} 0%, #FB923C 100%)`,
      features: [
        'Tokens ERC-20 compatíveis',
        'Marketplace integrado',
        'Liquidez garantida',
        'Valorização automática'
      ]
    },
    {
      icon: FiEye,
      title: 'Transparência Total',
      description: 'Visibilidade completa de todas as operações e métricas da frota.',
      gradient: `linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)`,
      features: [
        'Dashboard em tempo real',
        'Auditoria automática',
        'Relatórios personalizados',
        'APIs abertas'
      ]
    },
    {
      icon: FiLock,
      title: 'Segurança Blockchain',
      description: 'Dados protegidos por criptografia avançada e consenso distribuído.',
      gradient: `linear-gradient(135deg, #EF4444 0%, #F87171 100%)`,
      features: [
        'Criptografia de ponta',
        'Consenso distribuído',
        'Backup automático',
        'Recuperação garantida'
      ]
    },
    {
      icon: FiDollarSign,
      title: 'ROI Comprovado',
      description: 'Retorno sobre investimento através de eficiência e novos fluxos de receita.',
      gradient: `linear-gradient(135deg, #059669 0%, #10B981 100%)`,
      features: [
        'Redução de custos operacionais',
        'Novos fluxos de receita',
        'Incentivos governamentais',
        'Valorização de ativos'
      ]
    }
  ];

  const stats = [
    { number: '85%', label: 'Redução de Acidentes' },
    { number: '40%', label: 'Economia de Combustível' },
    { number: '95%', label: 'Conformidade ESG' },
    { number: '200%', label: 'ROI em 12 meses' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <BenefitsWrapper id="benefits" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Por que Escolher o GuardDrive FleetShield?
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Uma plataforma completa que revoluciona a gestão de frotas através de tecnologia 
            blockchain, inteligência artificial e certificação ESG.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Grid>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                variants={itemVariants}
                gradient={benefit.gradient}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <IconWrapper gradient={benefit.gradient}>
                  <benefit.icon />
                </IconWrapper>
                
                <BenefitTitle>{benefit.title}</BenefitTitle>
                
                <BenefitDescription>
                  {benefit.description}
                </BenefitDescription>
                
                <FeatureList>
                  {benefit.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeatureList>
              </BenefitCard>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </motion.div>
      </Container>
    </BenefitsWrapper>
  );
};

export default BenefitsSection;

