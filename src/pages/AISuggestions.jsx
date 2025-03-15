import React from 'react';
import styled from 'styled-components';

const AISuggestions = () => {
  return (
    <PageContainer>
      <PageTitle>Sugestões de IA</PageTitle>
      
      <SectionCard>
        <SectionTitle>Recomendações Personalizadas</SectionTitle>
        
        <SuggestionsList>
          <SuggestionItem priority="high">
            <SuggestionHeader>
              <SuggestionTitle>Otimização da Margem Bruta</SuggestionTitle>
              <PriorityBadge priority="high">Prioridade Alta</PriorityBadge>
            </SuggestionHeader>
            <SuggestionContent>
              <p>Com base na análise dos seus dados financeiros, identificámos que a sua margem bruta está abaixo da média do setor (25% vs. 35% do setor).</p>
              <h4>Ações Recomendadas:</h4>
              <ul>
                <li>Renegociar contratos com fornecedores para reduzir o custo das mercadorias</li>
                <li>Considerar um aumento estratégico de preços em produtos de alta procura</li>
                <li>Analisar o mix de produtos para focar em itens com maior margem</li>
              </ul>
            </SuggestionContent>
            <SuggestionFooter>
              <SuggestionButton>Implementar Sugestão</SuggestionButton>
              <SuggestionButton secondary>Ignorar</SuggestionButton>
            </SuggestionFooter>
          </SuggestionItem>
          
          <SuggestionItem priority="medium">
            <SuggestionHeader>
              <SuggestionTitle>Estratégia de Marketing Digital</SuggestionTitle>
              <PriorityBadge priority="medium">Prioridade Média</PriorityBadge>
            </SuggestionHeader>
            <SuggestionContent>
              <p>Baseado no seu setor e dimensão, a nossa IA sugere investir em marketing digital para aumentar a visibilidade e atrair novos clientes.</p>
              <h4>Ações Recomendadas:</h4>
              <ul>
                <li>Criar uma presença forte nas redes sociais relevantes para o seu público-alvo</li>
                <li>Implementar uma estratégia de SEO para melhorar o posicionamento nos motores de busca</li>
                <li>Considerar campanhas de anúncios pagos com um orçamento inicial controlado</li>
              </ul>
            </SuggestionContent>
            <SuggestionFooter>
              <SuggestionButton>Implementar Sugestão</SuggestionButton>
              <SuggestionButton secondary>Ignorar</SuggestionButton>
            </SuggestionFooter>
          </SuggestionItem>
          
          <SuggestionItem priority="low">
            <SuggestionHeader>
              <SuggestionTitle>Programa de Fidelização de Clientes</SuggestionTitle>
              <PriorityBadge priority="low">Prioridade Baixa</PriorityBadge>
            </SuggestionHeader>
            <SuggestionContent>
              <p>Para aumentar a retenção de clientes e o valor médio por cliente, recomendamos implementar um programa de fidelização.</p>
              <h4>Ações Recomendadas:</h4>
              <ul>
                <li>Desenvolver um sistema de pontos ou recompensas para clientes frequentes</li>
                <li>Oferecer benefícios exclusivos para membros do programa</li>
                <li>Utilizar os dados do programa para personalizar ofertas e comunicações</li>
              </ul>
            </SuggestionContent>
            <SuggestionFooter>
              <SuggestionButton>Implementar Sugestão</SuggestionButton>
              <SuggestionButton secondary>Ignorar</SuggestionButton>
            </SuggestionFooter>
          </SuggestionItem>
        </SuggestionsList>
      </SectionCard>
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

const SectionCard = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ecf0f1;
`;

const SuggestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SuggestionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-left: 5px solid ${props => 
    props.priority === 'high' ? '#e74c3c' : 
    props.priority === 'medium' ? '#f39c12' : 
    '#3498db'};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const SuggestionHeader = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
`;

const SuggestionTitle = styled.h3`
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const PriorityBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => 
    props.priority === 'high' ? '#fde2e2' : 
    props.priority === 'medium' ? '#fef3e0' : 
    '#e1f0ff'};
  color: ${props => 
    props.priority === 'high' ? '#e74c3c' : 
    props.priority === 'medium' ? '#f39c12' : 
    '#3498db'};
`;

const SuggestionContent = styled.div`
  padding: 20px;
  
  p {
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.6;
    margin-top: 0;
  }
  
  h4 {
    color: #2c3e50;
    font-size: 18px;
    margin: 20px 0 10px;
  }
  
  ul {
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.6;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }
`;

const SuggestionFooter = styled.div`
  padding: 15px 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  border-top: 1px solid #e0e0e0;
`;

const SuggestionButton = styled.button`
  background-color: ${props => props.secondary ? 'transparent' : '#3498db'};
  color: ${props => props.secondary ? '#7f8c8d' : 'white'};
  border: ${props => props.secondary ? '1px solid #bdc3c7' : 'none'};
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.secondary ? '#ecf0f1' : '#2980b9'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default AISuggestions; 