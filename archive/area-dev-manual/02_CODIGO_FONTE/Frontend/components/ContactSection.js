import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiBuilding,
  FiMessageSquare,
  FiCheck,
  FiClock,
  FiShield,
} from "react-icons/fi";
import {
  colors,
  breakpoints,
  Container,
  Section,
  Button,
  Card,
} from "../styles/GlobalStyles";

const ContactWrapper = styled(Section)`
  background: ${colors.white};
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div``;

const InfoTitle = styled.h3`
  font-size: 2rem;
  color: ${colors.gray900};
  margin-bottom: 1.5rem;
`;

const InfoDescription = styled.p`
  font-size: 1.125rem;
  color: ${colors.gray600};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${colors.gray50};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.primary};
    color: ${colors.white};
    transform: translateY(-2px);

    svg {
      color: ${colors.white};
    }
  }

  svg {
    font-size: 1.5rem;
    color: ${colors.primary};
    transition: color 0.3s ease;
  }

  div {
    flex-grow: 1;
  }

  h4 {
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
    color: inherit;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.8;
    margin: 0;
    color: inherit;
  }
`;

const BusinessHours = styled(Card)`
  background: ${colors.gray900};
  color: ${colors.white};

  h4 {
    color: ${colors.white};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${colors.secondary};
    }
  }

  ul {
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ContactForm = styled(Card)`
  height: fit-content;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: ${colors.gray900};
  margin-bottom: 1rem;
`;

const FormDescription = styled.p`
  color: ${colors.gray600};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${colors.gray700};
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray400};
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  background: ${colors.white};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray400};
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${colors.secondary};
  color: ${colors.white};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  svg {
    font-size: 1.25rem;
  }
`;

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const TrustCard = styled(motion(Card))`
  text-align: center;

  svg {
    font-size: 2.5rem;
    color: ${colors.primary};
    margin-bottom: 1rem;
  }

  h4 {
    color: ${colors.gray900};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: ${colors.gray600};
    margin: 0;
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        interest: "",
        message: "",
      });
    }, 5000);
  };

  const contactMethods = [
    {
      icon: FiMail,
      title: "Email",
      description: "contato@guarddrive.com",
      action: "mailto:contato@guarddrive.com",
    },
    {
      icon: FiPhone,
      title: "Telefone",
      description: "+55 (11) 9999-9999",
      action: "tel:+5511999999999",
    },
    {
      icon: FiMapPin,
      title: "Endereço",
      description: "São Paulo, SP - Brasil",
      action: null,
    },
  ];

  const trustIndicators = [
    {
      icon: FiShield,
      title: "Segurança Garantida",
      description: "Dados protegidos por criptografia de ponta",
    },
    {
      icon: FiClock,
      title: "Resposta Rápida",
      description: "Retornamos em até 24 horas",
    },
    {
      icon: FiCheck,
      title: "Sem Compromisso",
      description: "Demonstração gratuita e sem obrigações",
    },
  ];

  return (
    <ContactWrapper id="contact" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Entre em Contato Conosco
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pronto para revolucionar sua frota? Agende uma demonstração gratuita
            e descubra como o GuardDrive pode transformar sua operação.
          </SectionSubtitle>
        </SectionHeader>

        <ContactGrid>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactInfo>
              <InfoTitle>Vamos Conversar</InfoTitle>
              <InfoDescription>
                Nossa equipe de especialistas está pronta para apresentar como o
                GuardDrive FleetShield pode revolucionar sua frota, reduzir
                custos e gerar novos fluxos de receita sustentáveis.
              </InfoDescription>

              <ContactMethods>
                {contactMethods.map((method, index) => (
                  <ContactMethod
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => method.action && window.open(method.action)}
                    style={{ cursor: method.action ? "pointer" : "default" }}
                  >
                    <method.icon />
                    <div>
                      <h4>{method.title}</h4>
                      <p>{method.description}</p>
                    </div>
                  </ContactMethod>
                ))}
              </ContactMethods>

              <BusinessHours>
                <h4>
                  <FiClock />
                  Horário de Atendimento
                </h4>
                <ul>
                  <li>
                    <span>Segunda - Sexta</span>
                    <span>8:00 - 18:00</span>
                  </li>
                  <li>
                    <span>Sábado</span>
                    <span>9:00 - 14:00</span>
                  </li>
                  <li>
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </li>
                </ul>
              </BusinessHours>
            </ContactInfo>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ContactForm>
              <FormTitle>Solicitar Demonstração</FormTitle>
              <FormDescription>
                Preencha o formulário abaixo e nossa equipe entrará em contato
                para agendar uma demonstração personalizada.
              </FormDescription>

              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheck />
                  <span>
                    Mensagem enviada com sucesso! Entraremos em contato em
                    breve.
                  </span>
                </SuccessMessage>
              )}

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nome da sua empresa"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="interest">Interesse Principal</Label>
                  <Select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="frota-corporativa">Frota Corporativa</option>
                    <option value="seguradora">Seguradora</option>
                    <option value="governo">Governo/Regulador</option>
                    <option value="parceria">Parceria Comercial</option>
                    <option value="investimento">Investimento</option>
                    <option value="outro">Outro</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Mensagem</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Conte-nos mais sobre suas necessidades e como podemos ajudar..."
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : isSubmitted ? (
                    <>
                      <FiCheck style={{ marginRight: "0.5rem" }} />
                      Enviado!
                    </>
                  ) : (
                    <>
                      <FiSend style={{ marginRight: "0.5rem" }} />
                      Solicitar Demonstração
                    </>
                  )}
                </SubmitButton>
              </Form>
            </ContactForm>
          </motion.div>
        </ContactGrid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <TrustIndicators>
            {trustIndicators.map((indicator, index) => (
              <TrustCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <indicator.icon />
                <h4>{indicator.title}</h4>
                <p>{indicator.description}</p>
              </TrustCard>
            ))}
          </TrustIndicators>
        </motion.div>
      </Container>
    </ContactWrapper>
  );
};

export default ContactSection;
