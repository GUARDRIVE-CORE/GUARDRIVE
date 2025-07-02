import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiSettings,
  FiWifi,
  FiDatabase,
  FiShield,
  FiTrendingUp,
  FiDollarSign,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import {
  colors,
  breakpoints,
  Container,
  Section,
} from "../styles/GlobalStyles";

const HowItWorksWrapper = styled(Section)`
  background: ${colors.white};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const ProcessFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 5rem;
`;

const ProcessStep = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  ${(props) =>
    props.reverse &&
    `
    @media (min-width: ${breakpoints.tablet}) {
      direction: rtl;
      
      > * {
        direction: ltr;
      }
    }
  `}
`;

const StepContent = styled.div`
  ${(props) =>
    props.reverse &&
    `
    @media (min-width: ${breakpoints.tablet}) {
      text-align: right;
    }
  `}
`;

const StepNumber = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${colors.primaryGradient};
  color: ${colors.white};
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.3);
`;

const StepTitle = styled.h3`
  font-size: 2rem;
  color: ${colors.gray900};
  margin-bottom: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`;

const StepDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const StepFeatures = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StepFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${colors.gray700};

  svg {
    color: ${colors.secondary};
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;

const StepVisual = styled.div`
  background: ${colors.gray50};
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${(props) => props.gradient || colors.primaryGradient};
    opacity: 0.05;
  }
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 2;
`;

const IconItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 2.5rem;
    color: ${(props) => props.color || colors.primary};
  }

  span {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.gray700};
    text-align: center;
  }
`;

const FlowArrow = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  @media (max-width: ${breakpoints.tablet}) {
    transform: rotate(90deg);
  }

  svg {
    font-size: 2rem;
    color: ${colors.gray400};
  }
`;

const TechStack = styled.div`
  background: ${colors.gray900};
  border-radius: 16px;
  padding: 3rem;
  color: ${colors.white};
  text-align: center;
`;

const TechTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${colors.white};
`;

const TechDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray300};
  margin-bottom: 3rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const TechItem = styled(motion.div)`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h4 {
    color: ${colors.secondary};
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }

  p {
    color: ${colors.gray300};
    font-size: 0.875rem;
  }
`;

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      title: "Instalação e Configuração",
      description:
        "Instalação simples do dispositivo GuardDrive em qualquer veículo da frota. Configuração automática via aplicativo móvel.",
      features: [
        "Instalação plug-and-play em 5 minutos",
        "Configuração automática via QR Code",
        "Compatível com 99% dos veículos",
        "Suporte técnico especializado",
      ],
      icons: [
        { icon: FiSettings, label: "Configuração", color: colors.primary },
        { icon: FiWifi, label: "Conectividade", color: colors.secondary },
        { icon: FiShield, label: "Segurança", color: colors.accent },
        { icon: FiCheck, label: "Validação", color: colors.success },
      ],
    },
    {
      number: 2,
      title: "Coleta e Transmissão de Dados",
      description:
        "Monitoramento contínuo de métricas de segurança, comportamento e emissões. Transmissão segura via blockchain.",
      features: [
        "Sensores avançados de múltiplas variáveis",
        "Transmissão em tempo real via 4G/5G",
        "Criptografia de ponta a ponta",
        "Backup automático na blockchain",
      ],
      icons: [
        { icon: FiDatabase, label: "Coleta", color: colors.primary },
        { icon: FiWifi, label: "Transmissão", color: colors.secondary },
        { icon: FiShield, label: "Criptografia", color: colors.accent },
        { icon: FiCheck, label: "Validação", color: colors.success },
      ],
    },
    {
      number: 3,
      title: "Processamento e Certificação",
      description:
        "Análise inteligente dos dados coletados, geração de métricas ESG e certificação blockchain imutável.",
      features: [
        "IA avançada para análise de padrões",
        "Cálculo automático de métricas ESG",
        "Certificação blockchain imutável",
        "Conformidade com padrões internacionais",
      ],
      icons: [
        { icon: FiDatabase, label: "Processamento", color: colors.primary },
        { icon: FiTrendingUp, label: "Análise", color: colors.secondary },
        { icon: FiShield, label: "Certificação", color: colors.accent },
        { icon: FiCheck, label: "Conformidade", color: colors.success },
      ],
    },
    {
      number: 4,
      title: "Tokenização e Monetização",
      description:
        "Conversão automática de impacto ambiental em tokens negociáveis. Acesso a mercados de créditos de carbono.",
      features: [
        "Tokenização automática de créditos",
        "Marketplace integrado para negociação",
        "Liquidez garantida via DEX",
        "Relatórios financeiros automatizados",
      ],
      icons: [
        { icon: FiDollarSign, label: "Tokenização", color: colors.primary },
        { icon: FiTrendingUp, label: "Valorização", color: colors.secondary },
        { icon: FiDatabase, label: "Marketplace", color: colors.accent },
        { icon: FiCheck, label: "Liquidez", color: colors.success },
      ],
    },
  ];

  const technologies = [
    {
      title: "Blockchain",
      description: "Hyperledger Besu para máxima segurança e escalabilidade",
    },
    {
      title: "IoT Avançado",
      description: "Sensores de última geração com conectividade 5G",
    },
    {
      title: "Inteligência Artificial",
      description: "Machine Learning para análise preditiva e otimização",
    },
    {
      title: "ESG Framework",
      description: "Conformidade com GRI, SASB, TCFD e GHG Protocol",
    },
  ];

  return (
    <HowItWorksWrapper id="how-it-works" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Como Funciona o GuardDrive FleetShield
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Um processo simples e automatizado que transforma sua frota em um
            ativo sustentável e verificável em apenas 4 etapas.
          </SectionSubtitle>
        </SectionHeader>

        <ProcessFlow>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <ProcessStep
                reverse={index % 2 === 1}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <StepContent reverse={index % 2 === 1}>
                  <StepNumber>{step.number}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                  <StepFeatures>
                    {step.features.map((feature, featureIndex) => (
                      <StepFeature key={featureIndex}>
                        <FiCheck />
                        <span>{feature}</span>
                      </StepFeature>
                    ))}
                  </StepFeatures>
                </StepContent>

                <StepVisual>
                  <IconGrid>
                    {step.icons.map((iconItem, iconIndex) => (
                      <IconItem
                        key={iconIndex}
                        color={iconItem.color}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.2 + iconIndex * 0.1 + 0.4,
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <iconItem.icon />
                        <span>{iconItem.label}</span>
                      </IconItem>
                    ))}
                  </IconGrid>
                </StepVisual>
              </ProcessStep>

              {index < steps.length - 1 && (
                <FlowArrow
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                >
                  <FiArrowRight />
                </FlowArrow>
              )}
            </React.Fragment>
          ))}
        </ProcessFlow>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <TechStack>
            <TechTitle>Tecnologias de Ponta</TechTitle>
            <TechDescription>
              Construído com as mais avançadas tecnologias para garantir máxima
              segurança, escalabilidade e confiabilidade.
            </TechDescription>
            <TechGrid>
              {technologies.map((tech, index) => (
                <TechItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h4>{tech.title}</h4>
                  <p>{tech.description}</p>
                </TechItem>
              ))}
            </TechGrid>
          </TechStack>
        </motion.div>
      </Container>
    </HowItWorksWrapper>
  );
};

export default HowItWorksSection;
