import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiShield, FiTrendingUp, FiZap, FiCheck, FiPlay } from "react-icons/fi";
import {
  colors,
  breakpoints,
  Button,
  Container,
  Flex,
} from "../styles/GlobalStyles";

const HeroWrapper = styled.section`
  min-height: 100vh;
  background: ${colors.heroGradient};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${colors.white};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.125rem;
  }
`;

const FeatureList = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;

  svg {
    color: ${colors.secondary};
    font-size: 1.25rem;
  }
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 4rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const VideoButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${colors.white};
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const StatsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.8;
  font-weight: 500;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 3rem;
`;

const HeroSection = () => {
  const features = [
    { icon: FiShield, text: "Monitoramento em Tempo Real" },
    { icon: FiTrendingUp, text: "Certificação ESG" },
    { icon: FiZap, text: "Tokenização Blockchain" },
  ];

  const stats = [
    { number: "99.9%", label: "Precisão dos Dados" },
    { number: "24/7", label: "Monitoramento" },
    { number: "50+", label: "Métricas ESG" },
    { number: "100%", label: "Rastreabilidade" },
  ];

  const floatingIcons = [
    { icon: FiShield, top: "20%", left: "10%", delay: 0 },
    { icon: FiTrendingUp, top: "60%", right: "15%", delay: 1 },
    { icon: FiZap, top: "30%", right: "25%", delay: 2 },
    { icon: FiCheck, bottom: "30%", left: "20%", delay: 3 },
  ];

  return (
    <HeroWrapper id="hero">
      <FloatingElements>
        {floatingIcons.map((item, index) => (
          <FloatingIcon
            key={index}
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <item.icon />
          </FloatingIcon>
        ))}
      </FloatingElements>

      <Container>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Revolucione a Segurança da Sua Frota
            <br />
            <span style={{ color: colors.secondary }}>
              com Tecnologia Blockchain e IA
            </span>
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Monitoramento em tempo real, certificação ESG e tokenização de
            créditos de carbono. Transforme sua frota em um ativo sustentável e
            verificável.
          </HeroSubtitle>

          <FeatureList
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <feature.icon />
                <span>{feature.text}</span>
              </FeatureItem>
            ))}
          </FeatureList>

          <CTAButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="success"
              size="large"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Solicitar Demonstração Gratuita
            </Button>

            <VideoButton
              size="large"
              onClick={() => {
                // Abrir modal de vídeo ou redirecionar para demo
                console.log("Abrir vídeo demo");
              }}
            >
              <FiPlay style={{ marginRight: "0.5rem" }} />
              Ver Demo
            </VideoButton>
          </CTAButtons>

          <StatsSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsSection>
        </HeroContent>
      </Container>
    </HeroWrapper>
  );
};

export default HeroSection;
