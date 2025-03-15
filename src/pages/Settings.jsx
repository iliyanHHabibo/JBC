import React from 'react';
import styled from 'styled-components';

const Settings = () => {
  return (
    <PageContainer>
      <MainContent>
        <PageTitle>Definições</PageTitle>
        
        <SectionCard>
          <SectionTitle>Preferências da Conta</SectionTitle>
          <SettingsForm>
            <FormGroup>
              <Label>Idioma</Label>
              <Select defaultValue="pt">
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Moeda</Label>
              <Select defaultValue="eur">
                <option value="eur">Euro (€)</option>
                <option value="usd">US Dollar ($)</option>
                <option value="gbp">British Pound (£)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Formato de Data</Label>
              <Select defaultValue="dd-mm-yyyy">
                <option value="dd-mm-yyyy">DD-MM-AAAA</option>
                <option value="mm-dd-yyyy">MM-DD-AAAA</option>
                <option value="yyyy-mm-dd">AAAA-MM-DD</option>
              </Select>
            </FormGroup>
          </SettingsForm>
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Notificações</SectionTitle>
          <SettingsForm>
            <FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" id="email-notifications" defaultChecked />
                <CheckboxLabel htmlFor="email-notifications">Receber notificações por email</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" id="report-notifications" defaultChecked />
                <CheckboxLabel htmlFor="report-notifications">Receber relatórios mensais</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" id="update-notifications" defaultChecked />
                <CheckboxLabel htmlFor="update-notifications">Receber atualizações sobre novas funcionalidades</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
          </SettingsForm>
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Privacidade e Segurança</SectionTitle>
          <SettingsForm>
            <FormGroup>
              <Label>Alterar Senha</Label>
              <Input type="password" placeholder="Senha atual" />
            </FormGroup>
            
            <FormGroup>
              <Input type="password" placeholder="Nova senha" />
            </FormGroup>
            
            <FormGroup>
              <Input type="password" placeholder="Confirmar nova senha" />
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" id="data-sharing" />
                <CheckboxLabel htmlFor="data-sharing">Permitir partilha de dados anónimos para melhorar o serviço</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
            
            <ButtonContainer>
              <SaveButton>Guardar Alterações</SaveButton>
            </ButtonContainer>
          </SettingsForm>
        </SectionCard>
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
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

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #34495e;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  color: #2c3e50;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  font-size: 16px;
  color: #2c3e50;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #3498db;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #2c3e50;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const SaveButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
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

export default Settings; 