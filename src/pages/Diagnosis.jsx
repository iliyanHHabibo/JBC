import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Médias do setor (hardcoded para demonstração)
const sectorAverages = {
  retail: {
    sales: 500000,
    cogs: 325000,
    grossProfit: 175000,
    opCosts: 100000,
    operationalProfit: 75000,
    interest: 10000,
    taxes: 15000,
    netProfit: 50000,
    grossMargin: 35,
    operationalMargin: 18,
    netMargin: 8,
    rentEffortRatio: 5,
    operationalRentEffort: 15,
    interestCoverageRatio: 5,
    debtRatio: 40
  },
  manufacturing: {
    sales: 1200000,
    cogs: 720000,
    grossProfit: 480000,
    opCosts: 240000,
    operationalProfit: 240000,
    interest: 30000,
    taxes: 50000,
    netProfit: 160000,
    grossMargin: 40,
    operationalMargin: 20,
    netMargin: 10,
    rentEffortRatio: 3,
    operationalRentEffort: 10,
    interestCoverageRatio: 8,
    debtRatio: 45
  },
  services: {
    sales: 800000,
    cogs: 320000,
    grossProfit: 480000,
    opCosts: 280000,
    operationalProfit: 200000,
    interest: 20000,
    taxes: 40000,
    netProfit: 140000,
    grossMargin: 60,
    operationalMargin: 25,
    netMargin: 15,
    rentEffortRatio: 8,
    operationalRentEffort: 20,
    interestCoverageRatio: 10,
    debtRatio: 30
  },
  technology: {
    sales: 1500000,
    cogs: 450000,
    grossProfit: 1050000,
    opCosts: 600000,
    operationalProfit: 450000,
    interest: 40000,
    taxes: 100000,
    netProfit: 310000,
    grossMargin: 70,
    operationalMargin: 30,
    netMargin: 18,
    rentEffortRatio: 6,
    operationalRentEffort: 15,
    interestCoverageRatio: 12,
    debtRatio: 25
  },
  food: {
    sales: 600000,
    cogs: 330000,
    grossProfit: 270000,
    opCosts: 180000,
    operationalProfit: 90000,
    interest: 15000,
    taxes: 20000,
    netProfit: 55000,
    grossMargin: 45,
    operationalMargin: 15,
    netMargin: 7,
    rentEffortRatio: 7,
    operationalRentEffort: 18,
    interestCoverageRatio: 4,
    debtRatio: 50
  },
  construction: {
    sales: 2000000,
    cogs: 1400000,
    grossProfit: 600000,
    opCosts: 360000,
    operationalProfit: 240000,
    interest: 60000,
    taxes: 80000,
    netProfit: 100000,
    grossMargin: 30,
    operationalMargin: 12,
    netMargin: 6,
    rentEffortRatio: 4,
    operationalRentEffort: 12,
    interestCoverageRatio: 3,
    debtRatio: 60
  },
  // Valor padrão para setores não especificados
  default: {
    sales: 1000000,
    cogs: 600000,
    grossProfit: 400000,
    opCosts: 200000,
    operationalProfit: 200000,
    interest: 25000,
    taxes: 45000,
    netProfit: 130000,
    grossMargin: 40,
    operationalMargin: 20,
    netMargin: 10,
    rentEffortRatio: 5,
    operationalRentEffort: 15,
    interestCoverageRatio: 6,
    debtRatio: 40
  }
};

const Diagnosis = () => {
  const [yearData, setYearData] = useState({
    2023: null,
    2024: null,
    2025: null
  });
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState({
    2023: {},
    2024: {},
    2025: {}
  });
  const [sectorAvg, setSectorAvg] = useState(null);
  const [growthRates, setGrowthRates] = useState({
    2024: {}, // Crescimento de 2023 para 2024
    2025: {}  // Crescimento de 2024 para 2025
  });
  const [selectedYear, setSelectedYear] = useState(2025);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar dados do localStorage
    const data2023 = localStorage.getItem('data2023');
    const data2024 = localStorage.getItem('data2024');
    const data2025 = localStorage.getItem('registrationFormData');
    
    if (data2025) {
      const parsedData2025 = JSON.parse(data2025);
      const parsedData2024 = data2024 ? JSON.parse(data2024) : null;
      const parsedData2023 = data2023 ? JSON.parse(data2023) : null;
      
      setYearData({
        2023: parsedData2023,
        2024: parsedData2024,
        2025: parsedData2025
      });
      
      // Calcular KPIs para todos os anos
      if (parsedData2023) calculateKPIs(parsedData2023, 2023);
      if (parsedData2024) calculateKPIs(parsedData2024, 2024);
      calculateKPIs(parsedData2025, 2025);
      
      // Calcular taxas de crescimento
      if (parsedData2023 && parsedData2024) {
        calculateGrowthRates(parsedData2023, parsedData2024, 2024);
      }
      
      if (parsedData2024 && parsedData2025) {
        calculateGrowthRates(parsedData2024, parsedData2025, 2025);
      }
      
      // Definir médias do setor com base no setor do negócio
      const sectorKey = getSectorKey(parsedData2025.businessSector);
      setSectorAvg(sectorAverages[sectorKey] || sectorAverages.default);
    } else {
      // Redirecionar para o registro se não houver dados
      navigate('/');
    }
    
    setLoading(false);
  }, [navigate]);

  // Função para mapear o ID do setor para a chave no objeto sectorAverages
  const getSectorKey = (sectorId) => {
    const sectorMap = {
      'retail': 'retail',
      'manufacturing': 'manufacturing',
      'services': 'services',
      'technology': 'technology',
      'food': 'food',
      'construction': 'construction'
    };
    
    return sectorMap[sectorId] || 'default';
  };

  // Calcular taxas de crescimento
  const calculateGrowthRates = (prevYearData, currentYearData, year) => {
    const calculateGrowth = (current, previous) => {
      if (!previous || previous === 0) return 'N/A';
      return (((current - previous) / previous) * 100).toFixed(2);
    };
    
    // Converter strings para números
    const prevSales = parseFloat(prevYearData.sales) || 0;
    const currentSales = parseFloat(currentYearData.sales) || 0;
    
    const prevCogs = parseFloat(prevYearData.costOfGoodsSold) || 0;
    const currentCogs = parseFloat(currentYearData.costOfGoodsSold) || 0;
    
    const prevOpCosts = parseFloat(prevYearData.operationalCosts) || 0;
    const currentOpCosts = parseFloat(currentYearData.operationalCosts) || 0;
    
    const prevInterest = parseFloat(prevYearData.interest) || 0;
    const currentInterest = parseFloat(currentYearData.interest) || 0;
    
    const prevTaxes = parseFloat(prevYearData.taxes) || 0;
    const currentTaxes = parseFloat(currentYearData.taxes) || 0;
    
    // Calcular lucros para ambos os anos
    const prevGrossProfit = prevSales - prevCogs;
    const currentGrossProfit = currentSales - currentCogs;
    
    const prevOperationalProfit = prevGrossProfit - prevOpCosts;
    const currentOperationalProfit = currentGrossProfit - currentOpCosts;
    
    const prevNetProfit = prevOperationalProfit - prevInterest - prevTaxes;
    const currentNetProfit = currentOperationalProfit - currentInterest - currentTaxes;
    
    // Calcular taxas de crescimento
    setGrowthRates(prev => ({
      ...prev,
      [year]: {
        sales: calculateGrowth(currentSales, prevSales),
        grossProfit: calculateGrowth(currentGrossProfit, prevGrossProfit),
        operationalProfit: calculateGrowth(currentOperationalProfit, prevOperationalProfit),
        netProfit: calculateGrowth(currentNetProfit, prevNetProfit)
      }
    }));
  };

  const calculateKPIs = (data, year) => {
    // Converter strings para números para cálculos
    const sales = parseFloat(data.sales) || 0;
    const cogs = parseFloat(data.costOfGoodsSold) || 0;
    const opCosts = parseFloat(data.operationalCosts) || 0;
    const interest = parseFloat(data.interest) || 0;
    const taxes = parseFloat(data.taxes) || 0;
    const debt = parseFloat(data.debt) || 0;
    const assets = parseFloat(data.assets) || 0;
    const rentPrice = parseFloat(data.rentPrice) || 0;

    // Cálculos de KPIs
    const grossProfit = sales - cogs;
    const operationalProfit = grossProfit - opCosts;
    const netProfit = operationalProfit - interest - taxes;

    const calculatedKpis = {
      // Valores absolutos
      sales,
      cogs,
      grossProfit,
      opCosts,
      operationalProfit,
      interest,
      taxes,
      netProfit,
      
      // Margens
      grossMargin: sales > 0 ? (grossProfit / sales * 100).toFixed(2) : 0,
      operationalMargin: sales > 0 ? (operationalProfit / sales * 100).toFixed(2) : 0,
      netMargin: sales > 0 ? (netProfit / sales * 100).toFixed(2) : 0,
      
      // Indicadores
      rentEffortRatio: sales > 0 ? ((rentPrice * 12) / sales * 100).toFixed(2) : 0,
      operationalRentEffort: opCosts > 0 ? ((rentPrice * 12) / opCosts * 100).toFixed(2) : 0,
      interestCoverageRatio: interest > 0 ? (operationalProfit / interest).toFixed(2) : 'N/A',
      debtRatio: assets > 0 ? (debt / assets * 100).toFixed(2) : 0
    };
    
    setKpis(prev => ({
      ...prev,
      [year]: calculatedKpis
    }));
  };

  // Preparar dados para o gráfico de evolução financeira
  const prepareFinancialEvolutionData = () => {
    return {
      labels: ['Vendas', 'Lucro Bruto', 'Lucro Operacional', 'Lucro Líquido'],
      datasets: [
        {
          label: '2023',
          data: [
            kpis[2023]?.sales || 0,
            kpis[2023]?.grossProfit || 0,
            kpis[2023]?.operationalProfit || 0,
            kpis[2023]?.netProfit || 0
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: '2024',
          data: [
            kpis[2024]?.sales || 0,
            kpis[2024]?.grossProfit || 0,
            kpis[2024]?.operationalProfit || 0,
            kpis[2024]?.netProfit || 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '2025',
          data: [
            kpis[2025]?.sales || 0,
            kpis[2025]?.grossProfit || 0,
            kpis[2025]?.operationalProfit || 0,
            kpis[2025]?.netProfit || 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  // Preparar dados para o gráfico de indicadores vs. média do setor
  const prepareIndicatorsData = (year) => {
    return {
      labels: ['Margem Bruta', 'Margem Operacional', 'Margem Líquida', 'Taxa de Esforço'],
      datasets: [
        {
          label: 'Sua Empresa',
          data: [
            kpis[year]?.grossMargin || 0,
            kpis[year]?.operationalMargin || 0,
            kpis[year]?.netMargin || 0,
            kpis[year]?.rentEffortRatio || 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Média do Setor',
          data: [
            sectorAvg?.grossMargin || 0,
            sectorAvg?.operationalMargin || 0,
            sectorAvg?.netMargin || 0,
            sectorAvg?.rentEffortRatio || 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  // Opções para o gráfico de evolução financeira
  const evolutionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value)
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evolução Financeira'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
          }
        }
      }
    }
  };

  // Opções para o gráfico de indicadores
  const indicatorChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Indicadores vs. Média do Setor'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  if (loading) {
    return <LoadingContainer>A carregar a análise...</LoadingContainer>;
  }

  if (!yearData[2025]) {
    return <ErrorContainer>Não foram encontrados dados de registo. Por favor, complete o registo primeiro.</ErrorContainer>;
  }

  // Determinar o ano anterior para comparação
  const previousYear = selectedYear === 2023 ? null : selectedYear - 1;
  
  return (
    <PageContainer>
      <MainContent>
        <DiagnosisTitle>Análise da Sua Empresa</DiagnosisTitle>
        
        <YearTabs>
          <YearTab 
            active={selectedYear === 2023} 
            onClick={() => setSelectedYear(2023)}
            disabled={!yearData[2023]}
          >
            2023
          </YearTab>
          <YearTab 
            active={selectedYear === 2024} 
            onClick={() => setSelectedYear(2024)}
            disabled={!yearData[2024]}
          >
            2024
          </YearTab>
          <YearTab 
            active={selectedYear === 2025} 
            onClick={() => setSelectedYear(2025)}
          >
            2025
          </YearTab>
        </YearTabs>
        
        <SectionCard>
          <SectionTitle>Evolução Financeira</SectionTitle>
          <ChartContainer>
            <Bar data={prepareFinancialEvolutionData()} options={evolutionChartOptions} />
          </ChartContainer>
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Resumo Financeiro - {selectedYear}</SectionTitle>
          <FinancialSummary>
            <SummaryTable>
              <thead>
                <tr>
                  <th>Métrica</th>
                  <th>Valor</th>
                  <th>Média do Setor</th>
                  {previousYear && <th>Crescimento vs. {previousYear}</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vendas</td>
                  <td>{formatCurrency(kpis[selectedYear]?.sales || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.sales || 0)}</td>
                  {previousYear && (
                    <td className={getGrowthClass(growthRates[selectedYear]?.sales)}>
                      {growthRates[selectedYear]?.sales !== 'N/A' ? `${growthRates[selectedYear]?.sales}%` : 'N/A'}
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Custo da Mercadoria</td>
                  <td>{formatCurrency(kpis[selectedYear]?.cogs || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.cogs || 0)}</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr className="highlight">
                  <td>Lucro Bruto</td>
                  <td>{formatCurrency(kpis[selectedYear]?.grossProfit || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.grossProfit || 0)}</td>
                  {previousYear && (
                    <td className={getGrowthClass(growthRates[selectedYear]?.grossProfit)}>
                      {growthRates[selectedYear]?.grossProfit !== 'N/A' ? `${growthRates[selectedYear]?.grossProfit}%` : 'N/A'}
                    </td>
                  )}
                </tr>
                <tr className="ratio">
                  <td>Margem Bruta</td>
                  <td>{kpis[selectedYear]?.grossMargin || 0}%</td>
                  <td>{sectorAvg?.grossMargin || 0}%</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr>
                  <td>Custos Operacionais</td>
                  <td>{formatCurrency(kpis[selectedYear]?.opCosts || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.opCosts || 0)}</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr className="highlight">
                  <td>Lucro Operacional</td>
                  <td>{formatCurrency(kpis[selectedYear]?.operationalProfit || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.operationalProfit || 0)}</td>
                  {previousYear && (
                    <td className={getGrowthClass(growthRates[selectedYear]?.operationalProfit)}>
                      {growthRates[selectedYear]?.operationalProfit !== 'N/A' ? `${growthRates[selectedYear]?.operationalProfit}%` : 'N/A'}
                    </td>
                  )}
                </tr>
                <tr className="ratio">
                  <td>Margem Operacional</td>
                  <td>{kpis[selectedYear]?.operationalMargin || 0}%</td>
                  <td>{sectorAvg?.operationalMargin || 0}%</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr>
                  <td>Juros</td>
                  <td>{formatCurrency(kpis[selectedYear]?.interest || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.interest || 0)}</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr>
                  <td>Impostos</td>
                  <td>{formatCurrency(kpis[selectedYear]?.taxes || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.taxes || 0)}</td>
                  {previousYear && <td>-</td>}
                </tr>
                <tr className="highlight">
                  <td>Lucro Líquido</td>
                  <td>{formatCurrency(kpis[selectedYear]?.netProfit || 0)}</td>
                  <td>{formatCurrency(sectorAvg?.netProfit || 0)}</td>
                  {previousYear && (
                    <td className={getGrowthClass(growthRates[selectedYear]?.netProfit)}>
                      {growthRates[selectedYear]?.netProfit !== 'N/A' ? `${growthRates[selectedYear]?.netProfit}%` : 'N/A'}
                    </td>
                  )}
                </tr>
                <tr className="ratio">
                  <td>Margem Líquida</td>
                  <td>{kpis[selectedYear]?.netMargin || 0}%</td>
                  <td>{sectorAvg?.netMargin || 0}%</td>
                  {previousYear && <td>-</td>}
                </tr>
              </tbody>
            </SummaryTable>
            
            <SummaryTable>
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>Valor</th>
                  <th>Média do Setor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taxa de Esforço (Renda/Vendas)</td>
                  <td>{kpis[selectedYear]?.rentEffortRatio || 0}%</td>
                  <td>{sectorAvg?.rentEffortRatio || 0}%</td>
                </tr>
                <tr>
                  <td>Renda/Custos Operacionais</td>
                  <td>{kpis[selectedYear]?.operationalRentEffort || 0}%</td>
                  <td>{sectorAvg?.operationalRentEffort || 0}%</td>
                </tr>
                <tr>
                  <td>Índice de Cobertura de Juros</td>
                  <td>{kpis[selectedYear]?.interestCoverageRatio || 0}</td>
                  <td>{sectorAvg?.interestCoverageRatio || 0}</td>
                </tr>
                <tr>
                  <td>Dívida/Ativo</td>
                  <td>{kpis[selectedYear]?.debtRatio || 0}%</td>
                  <td>{sectorAvg?.debtRatio || 0}%</td>
                </tr>
              </tbody>
            </SummaryTable>
          </FinancialSummary>
        </SectionCard>
        
        <SectionCard>
          <SectionTitle>Indicadores Financeiros vs. Média do Setor - {selectedYear}</SectionTitle>
          <ChartContainer>
            <Bar data={prepareIndicatorsData(selectedYear)} options={indicatorChartOptions} />
          </ChartContainer>
        </SectionCard>
      </MainContent>
    </PageContainer>
  );
};

// Função auxiliar para formatar valores monetários
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Função para determinar a classe CSS com base na taxa de crescimento
const getGrowthClass = (growthRate) => {
  if (growthRate === 'N/A') return '';
  const rate = parseFloat(growthRate);
  if (rate > 0) return 'positive-growth';
  if (rate < 0) return 'negative-growth';
  return '';
};

// Styled Components
const PageContainer = styled.div`
  padding: 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const DiagnosisTitle = styled.h1`
  color: #2c3e50;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const YearTabs = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #dfe6e9;
`;

const YearTab = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#3498db' : 'transparent'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
    color: ${props => props.active ? 'white' : '#2c3e50'};
  }
  
  &:first-child {
    border-top-left-radius: 8px;
  }
  
  &:last-child {
    border-top-right-radius: 8px;
  }
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

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 20px;
`;

const FinancialSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }
  
  tr.highlight {
    font-weight: 600;
    background-color: #f1f8ff;
  }
  
  tr.ratio {
    font-style: italic;
    color: #7f8c8d;
  }
  
  td.positive-growth {
    color: #27ae60;
    font-weight: 600;
  }
  
  td.negative-growth {
    color: #e74c3c;
    font-weight: 600;
  }
  
  @media (min-width: 769px) {
    flex: 1;
  }
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

export default Diagnosis;