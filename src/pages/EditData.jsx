import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { businessSectors, businessAreas } from '../data/businessData';

const EditData = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedYear, setSelectedYear] = useState(2025);
  const [yearData, setYearData] = useState({
    2023: null,
    2024: null,
    2025: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar dados do localStorage
    const savedData = localStorage.getItem('registrationFormData');
    
    if (savedData) {
      const data2025 = JSON.parse(savedData);
      
      // Criar dados para 2024 (25% piores que 2025)
      let data2024 = createHistoricalData(data2025, 0.75);
      
      // Criar dados para 2023 (40% piores que 2025)
      let data2023 = createHistoricalData(data2025, 0.60);
      
      // Salvar dados históricos no localStorage se ainda não existirem
      if (!localStorage.getItem('data2024')) {
        localStorage.setItem('data2024', JSON.stringify(data2024));
      } else {
        data2024 = JSON.parse(localStorage.getItem('data2024'));
      }
      
      if (!localStorage.getItem('data2023')) {
        localStorage.setItem('data2023', JSON.stringify(data2023));
      } else {
        data2023 = JSON.parse(localStorage.getItem('data2023'));
      }
      
      setYearData({
        2023: data2023,
        2024: data2024,
        2025: data2025
      });
      
      setFormData(data2025);
    } else {
      // Redirecionar para o registro se não houver dados
      navigate('/');
    }
    
    setLoading(false);
  }, [navigate]);

  // Função para criar dados históricos com performance reduzida
  const createHistoricalData = (currentData, factor) => {
    if (!currentData) return null;
    
    const historicalData = { ...currentData };
    
    // Ajustar apenas métricas financeiras
    const financialFields = [
      'sales', 'costOfGoodsSold', 'operationalCosts',
      'interest', 'taxes', 'rentPrice',
      'debt', 'assets', 'customerCount'
    ];
    
    financialFields.forEach(field => {
      if (historicalData[field] && !isNaN(parseFloat(historicalData[field]))) {
        // Reduzir valores positivos (vendas, lucros, etc.)
        if (field === 'debt') {
          // Para dívida, aumentamos em vez de diminuir (pior performance = mais dívida)
          historicalData[field] = Math.round(parseFloat(historicalData[field]) / factor).toString();
        } else {
          historicalData[field] = Math.round(parseFloat(historicalData[field]) * factor).toString();
        }
      }
    });
    
    return historicalData;
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setFormData(yearData[year]);
  };

  const handleChange = (e) => {
    // Só permitir edição para o ano 2025
    if (selectedYear !== 2025) return;
    
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(updatedFormData);
    
    // Atualizar também no objeto yearData
    setYearData({
      ...yearData,
      2025: updatedFormData
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Só permitir submissão para o ano 2025
    if (selectedYear !== 2025) return;
    
    // Salvar dados atualizados no localStorage
    localStorage.setItem('registrationFormData', JSON.stringify(formData));
    
    // Mostrar mensagem de sucesso
    setMessage({ 
      text: 'Dados atualizados com sucesso!', 
      type: 'success' 
    });
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return <LoadingContainer>A carregar os dados...</LoadingContainer>;
  }

  if (!formData) {
    return <ErrorContainer>Não foram encontrados dados de registo. Por favor, complete o registo primeiro.</ErrorContainer>;
  }

  // Filtrar áreas de negócio com base no setor selecionado
  const filteredAreas = businessAreas.filter(
    area => area.sectorId === formData.businessSector
  );

  return (
    <PageContainer>
      <PageTitle>Editar Dados</PageTitle>
      
      <YearNavigation>
        <YearButton 
          active={selectedYear === 2023} 
          onClick={() => handleYearChange(2023)}
        >
          2023
        </YearButton>
        <YearButton 
          active={selectedYear === 2024} 
          onClick={() => handleYearChange(2024)}
        >
          2024
        </YearButton>
        <YearButton 
          active={selectedYear === 2025} 
          onClick={() => handleYearChange(2025)}
        >
          2025 (Atual)
        </YearButton>
      </YearNavigation>
      
      {selectedYear !== 2025 && (
        <ReadOnlyNotice>
          <NoticeIcon>ℹ️</NoticeIcon>
          Os dados de anos anteriores são apenas para consulta e não podem ser editados.
        </ReadOnlyNotice>
      )}
      
      {message.text && (
        <MessageContainer type={message.type}>
          {message.text}
        </MessageContainer>
      )}
      
      <Form onSubmit={handleSubmit}>
        <SectionCard>
          <SectionTitle>Informações do Negócio</SectionTitle>
          
          <InputGroup>
            <InputContainer>
              <InputLabel>Setor de Atividade</InputLabel>
              <Select
                name="businessSector"
                value={formData.businessSector}
                onChange={handleChange}
                required
                disabled={selectedYear !== 2025}
              >
                <option value="">Selecione o setor</option>
                {businessSectors.map(sector => (
                  <option key={sector.id} value={sector.id}>
                    {sector.namePortuguese}
                  </option>
                ))}
              </Select>
            </InputContainer>
            
            <InputContainer>
              <InputLabel>Área de Negócio</InputLabel>
              <Select
                name="businessArea"
                value={formData.businessArea}
                onChange={handleChange}
                required
                disabled={selectedYear !== 2025 || !formData.businessSector}
              >
                <option value="">Selecione a área</option>
                {filteredAreas.map(area => (
                  <option key={area.id} value={area.id}>
                    {area.namePortuguese}
                  </option>
                ))}
              </Select>
            </InputContainer>
          </InputGroup>
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Métricas Estruturais</SectionTitle>
          
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
              />
            </InputContainer>
            
            <InputContainer>
              <InputLabel>Email</InputLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: empresa@exemplo.pt"
                required
                disabled={selectedYear !== 2025}
              />
            </InputContainer>
          </InputGroup>
          
          <InputGroup>
            <InputContainer>
              <InputLabel>Telefone</InputLabel>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 912345678"
                required
                disabled={selectedYear !== 2025}
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
                    disabled={selectedYear !== 2025}
                  />
                  <RadioLabel disabled={selectedYear !== 2025}>Própria</RadioLabel>
                </RadioOption>
                <RadioOption>
                  <RadioInput
                    type="radio"
                    name="propertyStatus"
                    value="rented"
                    checked={formData.propertyStatus === 'rented'}
                    onChange={handleChange}
                    disabled={selectedYear !== 2025}
                  />
                  <RadioLabel disabled={selectedYear !== 2025}>Arrendada</RadioLabel>
                </RadioOption>
              </RadioGroup>
            </InputContainer>
          </InputGroup>
          
          {formData.propertyStatus === 'rented' && (
            <InputGroup>
              <InputContainer>
                <InputLabel>Preço do Arrendamento (€/mês)</InputLabel>
                <Input
                  type="number"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleChange}
                  placeholder="Ex: 1000"
                  required={formData.propertyStatus === 'rented'}
                  min="0"
                  disabled={selectedYear !== 2025}
                />
              </InputContainer>
              <InputContainer>
                {/* Espaço vazio para manter o layout */}
              </InputContainer>
            </InputGroup>
          )}
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Métricas Financeiras</SectionTitle>
          
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                required
                min="0"
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
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
                disabled={selectedYear !== 2025}
              />
            </InputContainer>
          </InputGroup>
        </SectionCard>
        
        <ButtonContainer>
          <ActionButton 
            type="button" 
            onClick={() => navigate('/diagnosis')}
          >
            Cancelar
          </ActionButton>
          <ActionButton 
            type="submit" 
            primary 
            disabled={selectedYear !== 2025}
          >
            Guardar Alterações
          </ActionButton>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 40px;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const YearNavigation = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  border-radius: 12px;
  background-color: #ecf0f1;
  padding: 5px;
  width: fit-content;
`;

const YearButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#34495e'};
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : '#dfe6e9'};
  }
`;

const ReadOnlyNotice = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 25px;
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const NoticeIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ecf0f1;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  
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
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 16px;
  color: #2c3e50;
  background-color: ${props => props.disabled ? '#f5f7fa' : 'white'};
  transition: all 0.3s;
  
  &:focus:not(:disabled) {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &:hover:not(:disabled) {
    border-color: #b3c0c8;
  }
  
  &:disabled {
    color: #95a5a6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 16px;
  color: #2c3e50;
  background-color: ${props => props.disabled ? '#f5f7fa' : 'white'};
  transition: all 0.3s;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:focus:not(:disabled) {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &:hover:not(:disabled) {
    border-color: #b3c0c8;
  }
  
  &:disabled {
    color: #95a5a6;
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
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  accent-color: #3498db;
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #2c3e50;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#3498db' : '#ecf0f1'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  border: none;
  border-radius: 10px;
  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.primary ? '#2980b9' : '#dfe6e9'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const MessageContainer = styled.div`
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #3498db;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  color: #e74c3c;
  text-align: center;
  padding: 0 20px;
`;

export default EditData; 