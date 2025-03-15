import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { businessSectors, businessAreas } from '../data/businessData';

// Corrigir o problema dos ícones do Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

// Ícones personalizados mais visíveis
const normalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const forSaleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Lista de freguesias de Lisboa
const lisboaParishes = [
  'Ajuda', 'Alcântara', 'Alvalade', 'Areeiro', 'Arroios', 'Avenidas Novas', 
  'Beato', 'Belém', 'Benfica', 'Campo de Ourique', 'Campolide', 'Carnide', 
  'Estrela', 'Lumiar', 'Marvila', 'Misericórdia', 'Olivais', 'Parque das Nações', 
  'Penha de França', 'Santa Clara', 'Santa Maria Maior', 'Santo António', 
  'São Domingos de Benfica', 'São Vicente'
];

// Dados mockados de estabelecimentos em Lisboa com mais informações
const mockBusinesses = [
  {
    id: 1,
    name: "Café Lisboa",
    position: { lat: 38.7173, lng: -9.1378 },
    sector: "food",
    area: "cafe",
    parish: "Santa Maria Maior",
    address: "Praça do Comércio 3, 1100-148 Lisboa",
    phone: "+351 213 456 789",
    rating: 4.2,
    forSale: false
  },
  {
    id: 2,
    name: "Restaurante Tejo",
    position: { lat: 38.7103, lng: -9.1448 },
    sector: "food",
    area: "restaurant",
    parish: "Misericórdia",
    address: "Rua do Alecrim 12, 1200-018 Lisboa",
    phone: "+351 213 789 456",
    rating: 4.5,
    forSale: true,
    saleType: "business"
  },
  {
    id: 3,
    name: "Loja de Roupas Chiado",
    position: { lat: 38.7113, lng: -9.1408 },
    sector: "retail",
    area: "clothing",
    parish: "Santa Maria Maior",
    address: "Rua Garrett 31, 1200-203 Lisboa",
    phone: "+351 213 123 456",
    rating: 4.0,
    forSale: false
  },
  {
    id: 4,
    name: "Padaria Tradicional",
    position: { lat: 38.7153, lng: -9.1428 },
    sector: "food",
    area: "bakery",
    parish: "Misericórdia",
    address: "Rua da Bica de Duarte Belo 45, 1200-059 Lisboa",
    phone: "+351 213 987 654",
    rating: 4.7,
    forSale: true,
    saleType: "property"
  },
  {
    id: 5,
    name: "Mercearia do Bairro",
    position: { lat: 38.7193, lng: -9.1398 },
    sector: "retail",
    area: "grocery",
    parish: "Santa Maria Maior",
    address: "Rua dos Bacalhoeiros 18, 1100-070 Lisboa",
    phone: "+351 213 654 321",
    rating: 4.3,
    forSale: false
  },
  {
    id: 6,
    name: "Farmácia Alfama",
    position: { lat: 38.7133, lng: -9.1308 },
    sector: "health",
    area: "pharmacy",
    parish: "Santa Maria Maior",
    address: "Rua de São Miguel 29, 1100-544 Lisboa",
    phone: "+351 218 862 025",
    rating: 4.6,
    forSale: false
  },
  {
    id: 7,
    name: "Livraria Bertrand",
    position: { lat: 38.7118, lng: -9.1422 },
    sector: "retail",
    area: "bookstore",
    parish: "Santa Maria Maior",
    address: "Rua Garrett 73-75, 1200-203 Lisboa",
    phone: "+351 213 476 122",
    rating: 4.8,
    forSale: false
  },
  {
    id: 8,
    name: "Bar Bairro Alto",
    position: { lat: 38.7143, lng: -9.1438 },
    sector: "food",
    area: "bar",
    parish: "Misericórdia",
    address: "Rua do Diário de Notícias 23, 1200-142 Lisboa",
    phone: "+351 213 430 989",
    rating: 4.4,
    forSale: true,
    saleType: "business"
  },
  {
    id: 9,
    name: "Hotel Baixa",
    position: { lat: 38.7163, lng: -9.1358 },
    sector: "hospitality",
    area: "hotel",
    parish: "Santa Maria Maior",
    address: "Rua da Prata 116, 1100-419 Lisboa",
    phone: "+351 213 461 381",
    rating: 4.5,
    forSale: false
  },
  {
    id: 10,
    name: "Pastelaria Belém",
    position: { lat: 38.6973, lng: -9.2033 },
    sector: "food",
    area: "bakery",
    parish: "Belém",
    address: "Rua de Belém 84-92, 1300-085 Lisboa",
    phone: "+351 213 637 423",
    rating: 4.9,
    forSale: false
  },
  {
    id: 11,
    name: "Loja de Souvenirs",
    position: { lat: 38.7123, lng: -9.1368 },
    sector: "retail",
    area: "gifts",
    parish: "Santa Maria Maior",
    address: "Rua Augusta 102, 1100-053 Lisboa",
    phone: "+351 213 421 876",
    rating: 3.8,
    forSale: true,
    saleType: "business"
  },
  {
    id: 12,
    name: "Clínica Dental",
    position: { lat: 38.7233, lng: -9.1488 },
    sector: "health",
    area: "dental",
    parish: "Santo António",
    address: "Avenida da Liberdade 129, 1250-140 Lisboa",
    phone: "+351 213 256 789",
    rating: 4.7,
    forSale: false
  },
  {
    id: 13,
    name: "Cervejaria Trindade",
    position: { lat: 38.7133, lng: -9.1428 },
    sector: "food",
    area: "restaurant",
    parish: "Misericórdia",
    address: "Rua Nova da Trindade 20, 1200-303 Lisboa",
    phone: "+351 213 423 506",
    rating: 4.3,
    forSale: false
  },
  {
    id: 14,
    name: "Cabeleireiro Estrela",
    position: { lat: 38.7153, lng: -9.1518 },
    sector: "services",
    area: "beauty",
    parish: "Estrela",
    address: "Rua Domingos Sequeira 27, 1350-119 Lisboa",
    phone: "+351 213 874 521",
    rating: 4.1,
    forSale: false
  },
  {
    id: 15,
    name: "Clínica Dental Avenidas",
    position: { lat: 38.7323, lng: -9.1478 },
    sector: "health",
    area: "dental",
    parish: "Avenidas Novas",
    address: "Av. 5 de Outubro 115, 1050-052 Lisboa",
    phone: "+351 217 978 654",
    rating: 4.7,
    forSale: true,
    saleType: "property"
  },
  {
    id: 16,
    name: "Ginásio Fitness",
    position: { lat: 38.7263, lng: -9.1398 },
    sector: "sports",
    area: "gym",
    parish: "Arroios",
    address: "Av. Almirante Reis 85, 1150-012 Lisboa",
    phone: "+351 218 123 456",
    rating: 4.2,
    forSale: false
  },
  {
    id: 17,
    name: "Papelaria Benfica",
    position: { lat: 38.7423, lng: -9.1998 },
    sector: "retail",
    area: "stationery",
    parish: "Benfica",
    address: "Estrada de Benfica 382, 1500-121 Lisboa",
    phone: "+351 217 654 321",
    rating: 4.0,
    forSale: false
  },
  {
    id: 18,
    name: "Restaurante Parque",
    position: { lat: 38.7653, lng: -9.0978 },
    sector: "food",
    area: "restaurant",
    parish: "Parque das Nações",
    address: "Alameda dos Oceanos 45, 1990-203 Lisboa",
    phone: "+351 218 956 743",
    rating: 4.6,
    forSale: true,
    saleType: "business"
  },
  {
    id: 19,
    name: "Loja de Informática",
    position: { lat: 38.7373, lng: -9.1328 },
    sector: "technology",
    area: "computers",
    parish: "Alvalade",
    address: "Av. de Roma 42, 1700-348 Lisboa",
    phone: "+351 218 456 789",
    rating: 4.3,
    forSale: false
  },
  {
    id: 20,
    name: "Florista Lumiar",
    position: { lat: 38.7723, lng: -9.1628 },
    sector: "retail",
    area: "flowers",
    parish: "Lumiar",
    address: "Alameda das Linhas de Torres 156, 1750-149 Lisboa",
    phone: "+351 217 589 632",
    rating: 4.5,
    forSale: false
  },
  {
    id: 21,
    name: "Oficina Auto Marvila",
    position: { lat: 38.7453, lng: -9.1128 },
    sector: "automotive",
    area: "repair",
    parish: "Marvila",
    address: "Rua do Açúcar 76, 1950-010 Lisboa",
    phone: "+351 218 741 236",
    rating: 4.2,
    forSale: true,
    saleType: "property"
  },
  {
    id: 22,
    name: "Supermercado Areeiro",
    position: { lat: 38.7423, lng: -9.1338 },
    sector: "retail",
    area: "supermarket",
    parish: "Areeiro",
    address: "Av. de Madrid 14, 1000-196 Lisboa",
    phone: "+351 218 435 762",
    rating: 4.1,
    forSale: false
  },
  {
    id: 23,
    name: "Escola de Línguas",
    position: { lat: 38.7283, lng: -9.1518 },
    sector: "education",
    area: "language",
    parish: "Avenidas Novas",
    address: "Av. Fontes Pereira de Melo 35, 1050-118 Lisboa",
    phone: "+351 213 876 543",
    rating: 4.4,
    forSale: false
  },
  {
    id: 24,
    name: "Agência Imobiliária",
    position: { lat: 38.7213, lng: -9.1468 },
    sector: "services",
    area: "realestate",
    parish: "Santo António",
    address: "Rua Alexandre Herculano 25, 1250-008 Lisboa",
    phone: "+351 213 456 987",
    rating: 4.0,
    forSale: true,
    saleType: "business"
  },
  {
    id: 25,
    name: "Banco Campolide",
    position: { lat: 38.7313, lng: -9.1618 },
    sector: "finance",
    area: "bank",
    parish: "Campolide",
    address: "Rua Marquês da Fronteira 8, 1070-295 Lisboa",
    phone: "+351 213 789 123",
    rating: 3.9,
    forSale: false
  }
];

const BusinessMap = () => {
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedParish, setSelectedParish] = useState("");
  const [radius, setRadius] = useState(2);
  const [showOnlyForSale, setShowOnlyForSale] = useState(false);

  // Filtrar estabelecimentos
  useEffect(() => {
    let filtered = businesses;
    
    if (selectedSector) {
      filtered = filtered.filter(business => business.sector === selectedSector);
    }
    
    if (selectedArea) {
      filtered = filtered.filter(business => business.area === selectedArea);
    }
    
    if (selectedParish) {
      filtered = filtered.filter(business => business.parish === selectedParish);
    }
    
    if (showOnlyForSale) {
      filtered = filtered.filter(business => business.forSale);
    }
    
    setFilteredBusinesses(filtered);
  }, [businesses, selectedSector, selectedArea, selectedParish, radius, showOnlyForSale]);

  return (
    <PageContainer>
      <FilterSidebar>
        <FilterTitle>Filtros</FilterTitle>
        
        <FilterGroup>
          <FilterLabel>Setor</FilterLabel>
          <Select 
            value={selectedSector}
            onChange={(e) => {
              setSelectedSector(e.target.value);
              setSelectedArea("");
            }}
          >
            <option value="">Todos os setores</option>
            {Object.entries(businessSectors).map(([key, sector]) => (
              <option key={key} value={key}>
                {sector.namePortuguese}
              </option>
            ))}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Área de Negócio</FilterLabel>
          <Select 
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            disabled={!selectedSector}
          >
            <option value="">Todas as áreas</option>
            {Object.entries(businessAreas)
              .filter(([key, area]) => !selectedSector || area.sector === selectedSector)
              .map(([key, area]) => (
                <option key={key} value={key}>
                  {area.namePortuguese}
                </option>
              ))
            }
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Freguesia</FilterLabel>
          <Select 
            value={selectedParish}
            onChange={(e) => setSelectedParish(e.target.value)}
          >
            <option value="">Todas as freguesias</option>
            {lisboaParishes.map(parish => (
              <option key={parish} value={parish}>
                {parish}
              </option>
            ))}
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>
            Raio de pesquisa: <RangeValue>{radius} km</RangeValue>
          </FilterLabel>
          <RangeInput 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.5" 
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
          />
        </FilterGroup>
        
        <FilterGroup>
          <CheckboxLabel>
            <Checkbox 
              type="checkbox" 
              checked={showOnlyForSale}
              onChange={(e) => setShowOnlyForSale(e.target.checked)}
            />
            Apenas à venda
          </CheckboxLabel>
        </FilterGroup>
        
        <LegendContainer>
          <LegendTitle>Legenda</LegendTitle>
          <LegendItem>
            <LegendIcon forSale={false} />
            <LegendText>Estabelecimento normal</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendIcon forSale={true} />
            <LegendText>Estabelecimento à venda</LegendText>
          </LegendItem>
        </LegendContainer>
      </FilterSidebar>
      
      <ContentContainer>
        <MapWrapper>
          <MapContainer 
            center={[38.7223, -9.1393]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredBusinesses.map(business => (
              <Marker 
                key={business.id}
                position={[business.position.lat, business.position.lng]}
                icon={business.forSale ? forSaleIcon : normalIcon}
              >
                <Popup>
                  <BusinessPopup>
                    <BusinessName>{business.name}</BusinessName>
                    
                    {business.forSale && (
                      <ForSaleTag>À Venda</ForSaleTag>
                    )}
                    
                    <BusinessInfo>
                      <InfoItem>
                        <InfoLabel>Morada:</InfoLabel>
                        <InfoValue>{business.address}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Telefone:</InfoLabel>
                        <InfoValue>{business.phone}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Setor:</InfoLabel>
                        <InfoValue>{businessSectors[business.sector]?.namePortuguese || "Restauração"}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Área:</InfoLabel>
                        <InfoValue>{businessAreas[business.area]?.namePortuguese || "Café"}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoLabel>Freguesia:</InfoLabel>
                        <InfoValue>{business.parish}</InfoValue>
                      </InfoItem>
                      
                      {business.forSale && (
                        <InfoItem>
                          <InfoLabel>Tipo:</InfoLabel>
                          <InfoValue>
                            {business.saleType === 'business' ? 'Negócio' : 'Imóvel'}
                          </InfoValue>
                        </InfoItem>
                      )}
                    </BusinessInfo>
                  </BusinessPopup>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </MapWrapper>
      </ContentContainer>
    </PageContainer>
  );
};

// Estilos
const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  background-color: #f5f7fa;
`;

const FilterSidebar = styled.div`
  width: 280px;
  padding: 20px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
`;

const FilterTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  margin-bottom: 15px;
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #2c3e50;
  background-color: white;
  
  &:disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #7f8c8d;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3498db;
  margin-right: 8px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MapWrapper = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

const LegendContainer = styled.div`
  margin-top: 15px;
`;

const LegendTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LegendIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.forSale ? '#EA4335' : '#4285F4'};
`;

const LegendText = styled.span`
  font-size: 13px;
  color: #2c3e50;
`;

const BusinessPopup = styled.div`
  padding: 5px;
  max-width: 250px;
`;

const BusinessName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
`;

const ForSaleTag = styled.div`
  display: inline-block;
  background-color: #EA4335;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const BusinessInfo = styled.div`
  margin-bottom: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #7f8c8d;
  width: 80px;
`;

const InfoValue = styled.span`
  font-size: 13px;
  color: #2c3e50;
`;

const RangeInput = styled.input`
  width: 100%;
`;

const RangeValue = styled.span`
  float: right;
`;

export default BusinessMap; 