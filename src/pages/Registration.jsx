import React, { useState } from 'react';
import styled from 'styled-components';
import { businessSectors, businessAreas } from '../data/businessData';
import { useNavigate } from 'react-router-dom';
import lisboaLogo from '../assets/lisboa-logo.png'; // Importar o logotipo

const InputGroup = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const InputContainer = styled.div`
  flex: 1;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #34495e;
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 12px;
  font-size: 20px;
  color: #2c3e50;
  background-color: white;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &:hover {
    border-color: #b3c0c8;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
`;

const RadioInput = styled.input`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  accent-color: #3498db;
`;

const RadioLabel = styled.label`
  font-size: 20px;
  color: #2c3e50;
  cursor: pointer;
`;

const Registration = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('registrationFormData');
    return savedData ? JSON.parse(savedData) : {
      businessSector: '',
      businessArea: '',
      location: '',
      employeeCount: '',
      businessAge: '',
      propertyStatus: '',
      email: '',
      phone: '',
      sales: '',
      costOfGoodsSold: '',
      operationalCosts: '',
      interest: '',
      taxes: '',
      rentPrice: '',
      debt: '',
      assets: '',
      customerCount: '',
    };
  });
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('registrationStep');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(updatedFormData);
    localStorage.setItem('registrationFormData', JSON.stringify(updatedFormData));
  };

  const updateStep = (newStep) => {
    setStep(newStep);
    localStorage.setItem('registrationStep', newStep.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1 && formData.businessSector) {
      updateStep(2);
    } else if (step === 2 && formData.businessArea) {
      updateStep(3);
    } else if (step === 3 && formData.location && formData.employeeCount && formData.businessAge && formData.propertyStatus) {
      updateStep(4);
    } else if (step === 4) {
      console.log('Form submitted with all metrics:', formData);
      navigate('/diagnosis');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      updateStep(step - 1);
    }
  };

  const clearStoredData = () => {
    localStorage.removeItem('registrationFormData');
    localStorage.removeItem('registrationStep');
    setFormData({
      businessSector: '',
      businessArea: '',
      location: '',
      employeeCount: '',
      businessAge: '',
      propertyStatus: '',
      email: '',
      phone: '',
      sales: '',
      costOfGoodsSold: '',
      operationalCosts: '',
      interest: '',
      taxes: '',
      rentPrice: '',
      debt: '',
      assets: '',
      customerCount: '',
    });
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <SelectContainer>
            <SelectLabel>Setor Empresarial</SelectLabel>
            <Select
              name="businessSector"
              value={formData.businessSector}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecione o Setor Empresarial --</option>
              {businessSectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.namePortuguese || sector.name}
                </option>
              ))}
            </Select>
          </SelectContainer>
        );
      case 2:
        return (
          <SelectContainer>
            <SelectLabel>Área de Negócio</SelectLabel>
            <Select
              name="businessArea"
              value={formData.businessArea}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecione a Área de Negócio --</option>
              {businessAreas
                .filter(
                  (area) => 
                    area.sectorId === formData.businessSector || 
                    area.sectorId === 'all'
                )
                .map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.namePortuguese || area.name}
                  </option>
                ))}
            </Select>
          </SelectContainer>
        );
      case 3:
        return (
          <>
            <InputGroup>
              <InputContainer>
                <InputLabel>Localização</InputLabel>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ex: Lisboa"
                  required
                />
              </InputContainer>
              
              <InputContainer>
                <InputLabel>Número de Funcionários</InputLabel>
                <Input
                  type="number"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  required
                  min="1"
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Email do Estabelecimento</InputLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: empresa@exemplo.pt"
                  required
                />
              </InputContainer>
              
              <InputContainer>
                <InputLabel>Número de Telefone</InputLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ex: 912345678"
                  required
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Idade do Negócio (anos)</InputLabel>
                <Input
                  type="number"
                  name="businessAge"
                  value={formData.businessAge}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  required
                  min="0"
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Tipo de Propriedade</InputLabel>
                <RadioGroup>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      name="propertyStatus"
                      value="owned"
                      checked={formData.propertyStatus === 'owned'}
                      onChange={handleChange}
                      required
                    />
                    <RadioLabel>Própria</RadioLabel>
                  </RadioOption>
                  <RadioOption>
                    <RadioInput
                      type="radio"
                      name="propertyStatus"
                      value="rented"
                      checked={formData.propertyStatus === 'rented'}
                      onChange={handleChange}
                      required
                    />
                    <RadioLabel>Arrendada</RadioLabel>
                  </RadioOption>
                </RadioGroup>
              </InputContainer>
            </InputGroup>
          </>
        );
      case 4:
        return (
          <>
            <InputGroup>
              <InputContainer>
                <InputLabel>Vendas (€/ano)</InputLabel>
                <Input
                  type="number"
                  name="sales"
                  value={formData.sales}
                  onChange={handleChange}
                  placeholder="Ex: 100000"
                  required
                  min="0"
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Custo da Mercadoria Vendida (€/ano)</InputLabel>
                <Input
                  type="number"
                  name="costOfGoodsSold"
                  value={formData.costOfGoodsSold}
                  onChange={handleChange}
                  placeholder="Ex: 60000"
                  required
                  min="0"
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Custos Operacionais (€/ano)</InputLabel>
                <Input
                  type="number"
                  name="operationalCosts"
                  value={formData.operationalCosts}
                  onChange={handleChange}
                  placeholder="Ex: 20000"
                  required
                  min="0"
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Juros (€/ano)</InputLabel>
                <Input
                  type="number"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  placeholder="Ex: 5000"
                  required
                  min="0"
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Impostos (€/ano)</InputLabel>
                <Input
                  type="number"
                  name="taxes"
                  value={formData.taxes}
                  onChange={handleChange}
                  placeholder="Ex: 7500"
                  required
                  min="0"
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Valor da Renda (€/mês)</InputLabel>
                <Input
                  type="number"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  placeholder="Ex: 1000"
                  required={formData.propertyStatus === 'rented'}
                  disabled={formData.propertyStatus !== 'rented'}
                  min="0"
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Dívida Total (€)</InputLabel>
                <Input
                  type="number"
                  name="debt"
                  value={formData.debt}
                  onChange={handleChange}
                  placeholder="Ex: 50000"
                  required
                  min="0"
                />
              </InputContainer>

              <InputContainer>
                <InputLabel>Ativo Total (€)</InputLabel>
                <Input
                  type="number"
                  name="assets"
                  value={formData.assets}
                  onChange={handleChange}
                  placeholder="Ex: 150000"
                  required
                  min="0"
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <InputLabel>Número de Clientes (anual)</InputLabel>
                <Input
                  type="number"
                  name="customerCount"
                  value={formData.customerCount}
                  onChange={handleChange}
                  placeholder="Ex: 5000"
                  required
                  min="0"
                />
              </InputContainer>
            </InputGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <LogoContainer>
            <LogoImage src={lisboaLogo} alt="Câmara Municipal de Lisboa" />
          </LogoContainer>
        </HeaderContent>
      </Header>
      
      <MainContent>
        <FormCard>
          <StepIndicator>
            <StepTitle>Registo</StepTitle>
            <ProgressContainer>
              <ProgressStep active={step >= 1}>
                <StepNumber>1</StepNumber>
                <StepLabel>Setor Empresarial</StepLabel>
              </ProgressStep>
              <ProgressLine active={step >= 2} />
              <ProgressStep active={step >= 2}>
                <StepNumber>2</StepNumber>
                <StepLabel>Área de Negócio</StepLabel>
              </ProgressStep>
              <ProgressLine active={step >= 3} />
              <ProgressStep active={step >= 3}>
                <StepNumber>3</StepNumber>
                <StepLabel>Métricas Estruturais</StepLabel>
              </ProgressStep>
              <ProgressLine active={step >= 4} />
              <ProgressStep active={step >= 4}>
                <StepNumber>4</StepNumber>
                <StepLabel>Métricas Financeiras</StepLabel>
              </ProgressStep>
            </ProgressContainer>
          </StepIndicator>
          
          <FormTitle>
            {step === 1 ? 'Selecione o Seu Setor Empresarial' : step === 2 ? 'Selecione a Sua Área de Negócio' : step === 3 ? 'Métricas Estruturais' : 'Métricas Financeiras'}
          </FormTitle>
          
          <FormDescription>
            {step === 1 
              ? 'Escolha o setor que melhor representa as atividades da sua empresa.' 
              : step === 2 
                ? 'Especifique a área dentro do setor selecionado em que a sua empresa opera.' 
                : step === 3 
                  ? 'Forneça informações sobre a estrutura da sua empresa para um diagnóstico mais preciso.' 
                  : 'Estas informações ajudar-nos-ão a calcular indicadores importantes como taxa de esforço e cobertura de juros.'}
          </FormDescription>
          
          <Form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <ButtonContainer>
              {step > 1 && (
                <BackButton type="button" onClick={handleBack}>
                  <BackIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </BackIcon>
                  Voltar
                </BackButton>
              )}
              <NextButton type="submit" fullWidth={step === 1}>
                {step === 4 ? 'Iniciar Diagnóstico' : 'Continuar'}
                {step < 4 && (
                  <NextIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </NextIcon>
                )}
              </NextButton>
            </ButtonContainer>
          </Form>
        </FormCard>
        
        <InfoCard>
          <InfoTitle>Porque isto é importante</InfoTitle>
          <InfoText>
            {step === 1 || step === 2 ? 
              'Identificar o seu setor e área de negócio ajuda-nos a adaptar o diagnóstico aos desafios e oportunidades específicos da sua indústria.' :
              step === 3 ? 
              'As métricas estruturais fornecem-nos informações essenciais sobre a dimensão e maturidade do seu negócio, permitindo uma análise mais precisa.' :
              'Os dados financeiros permitem-nos calcular indicadores cruciais como a taxa de esforço e rácio de cobertura de juros, fundamentais para avaliar a saúde financeira da sua empresa.'}
          </InfoText>
          
          <InfoList>
            {step === 1 || step === 2 ? (
              <>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Avaliação personalizada baseada em referências do setor</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Recomendações e melhores práticas específicas do setor</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Estratégias de crescimento relevantes para a sua área de negócio</InfoItemText>
                </InfoListItem>
              </>
            ) : step === 3 ? (
              <>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Análise comparativa com empresas de dimensão semelhante</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Recomendações adaptadas à fase de desenvolvimento do seu negócio</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Avaliação de riscos específicos da sua estrutura empresarial</InfoItemText>
                </InfoListItem>
              </>
            ) : (
              <>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Cálculo de rácios financeiros essenciais para a sua gestão</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Identificação de potenciais desequilíbrios na estrutura financeira</InfoItemText>
                </InfoListItem>
                <InfoListItem>
                  <InfoIcon>✓</InfoIcon>
                  <InfoItemText>Recomendações para otimizar a sua performance financeira</InfoItemText>
                </InfoListItem>
              </>
            )}
          </InfoList>
        </InfoCard>
      </MainContent>
      
      <Footer>
        <FooterContent>
          <FooterText>© 2025 Câmara Municipal de Lisboa. Todos os direitos reservados.</FooterText>
        </FooterContent>
      </Footer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 18px 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 20px;
  display: flex;
  gap: 35px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 45px;
  flex: 2;
  animation: fadeIn 0.5s ease-out forwards;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 45px;
  flex: 1;
  align-self: flex-start;
  position: sticky;
  top: 100px;
  
  @media (max-width: 1024px) {
    position: static;
  }
`;

const StepIndicator = styled.div`
  margin-bottom: 35px;
`;

const StepTitle = styled.h2`
  color: #3498db;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 22px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-family: 'Montserrat', sans-serif;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
`;

const StepLabel = styled.div`
  font-size: 16px;
  color: #7f8c8d;
  font-weight: 500;
`;

const ProgressLine = styled.div`
  height: 3px;
  width: 120px;
  background-color: ${props => props.active ? '#3498db' : '#e0e0e0'};
  margin: 0 18px 10px 18px;
  transition: background-color 0.3s ease;
`;

const FormTitle = styled.h2`
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  font-family: 'Playfair Display', serif;
`;

const FormDescription = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 35px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const SelectContainer = styled.div`
  margin-bottom: 35px;
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #34495e;
  font-size: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 18px;
  color: #2c3e50;
  background-color: white;
  transition: all 0.3s;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &:hover {
    border-color: #b3c0c8;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
`;

const NextButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: ${props => props.fullWidth ? '1' : '0.48'};
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NextIcon = styled.span`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background-color: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.48;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackIcon = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const InfoTitle = styled.h3`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
  font-family: 'Playfair Display', serif;
`;

const InfoText = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoListItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const InfoIcon = styled.span`
  color: #2ecc71;
  font-weight: bold;
  margin-right: 12px;
  font-size: 20px;
`;

const InfoItemText = styled.span`
  color: #34495e;
  font-size: 17px;
  line-height: 1.5;
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  padding: 22px 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;

const FooterText = styled.p`
  color: #ecf0f1;
  font-size: 16px;
  margin: 0;
`;

export default Registration; 