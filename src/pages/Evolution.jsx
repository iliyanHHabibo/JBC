import React from 'react';
import styled from 'styled-components';

const Evolution = () => {
  return (
    <PageContainer>
      <PageTitle>Evolução do Negócio</PageTitle>
      <SectionCard>
        <SectionTitle>Análise de Tendências</SectionTitle>
        <EmptyState>
          <EmptyIcon>📈</EmptyIcon>
          <EmptyText>
            Ainda não temos dados suficientes para mostrar a evolução do seu negócio.
            <br />
            Continue a atualizar os seus dados mensalmente para ver as tendências ao longo do tempo.
          </EmptyText>
          <ActionButton>Adicionar Dados Mensais</ActionButton>
        </EmptyState>
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
  color: #bdc3c7;
`;

const EmptyText = styled.p`
  color: #7f8c8d;
  font-size: 18px;
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default Evolution; 