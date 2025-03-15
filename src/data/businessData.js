// Business sectors data
export const businessSectors = [
  { id: 'retail', name: 'Retail', namePortuguese: 'Retalho' },
  { id: 'manufacturing', name: 'Manufacturing', namePortuguese: 'Indústria' },
  { id: 'services', name: 'Services', namePortuguese: 'Serviços' },
  { id: 'technology', name: 'Technology', namePortuguese: 'Tecnologia' },
  { id: 'healthcare', name: 'Healthcare', namePortuguese: 'Saúde' },
  { id: 'finance', name: 'Finance & Banking', namePortuguese: 'Finanças e Banca' },
  { id: 'hospitality', name: 'Hospitality & Tourism', namePortuguese: 'Hotelaria e Turismo' },
  { id: 'restaurant', name: 'Restaurant & Food Service', namePortuguese: 'Restauração' },
  { id: 'construction', name: 'Construction & Real Estate', namePortuguese: 'Construção e Imobiliário' },
  { id: 'agriculture', name: 'Agriculture', namePortuguese: 'Agricultura' },
  { id: 'education', name: 'Education', namePortuguese: 'Educação' },
  { id: 'logistics', name: 'Logistics & Transportation', namePortuguese: 'Logística e Transportes' },
  { id: 'energy', name: 'Energy & Utilities', namePortuguese: 'Energia e Utilidades' },
  { id: 'media', name: 'Media & Entertainment', namePortuguese: 'Media e Entretenimento' },
  { id: 'other', name: 'Other', namePortuguese: 'Outro' },
];

// Business areas data
export const businessAreas = [
  // Retail
  { id: 'retail_clothing', name: 'Clothing & Apparel', namePortuguese: 'Vestuário e Acessórios', sectorId: 'retail' },
  { id: 'retail_electronics', name: 'Electronics', namePortuguese: 'Eletrónica', sectorId: 'retail' },
  { id: 'retail_grocery', name: 'Grocery & Supermarkets', namePortuguese: 'Mercearias e Supermercados', sectorId: 'retail' },
  { id: 'retail_furniture', name: 'Furniture & Home Goods', namePortuguese: 'Mobiliário e Artigos para Casa', sectorId: 'retail' },
  { id: 'retail_ecommerce', name: 'E-commerce', namePortuguese: 'Comércio Eletrónico', sectorId: 'retail' },
  { id: 'retail_other', name: 'Other Retail', namePortuguese: 'Outro Retalho', sectorId: 'retail' },
  
  // Manufacturing
  { id: 'manufacturing_automotive', name: 'Automotive', namePortuguese: 'Automóvel', sectorId: 'manufacturing' },
  { id: 'manufacturing_electronics', name: 'Electronics', namePortuguese: 'Eletrónica', sectorId: 'manufacturing' },
  { id: 'manufacturing_food', name: 'Food & Beverage', namePortuguese: 'Alimentação e Bebidas', sectorId: 'manufacturing' },
  { id: 'manufacturing_textile', name: 'Textile & Clothing', namePortuguese: 'Têxtil e Vestuário', sectorId: 'manufacturing' },
  { id: 'manufacturing_pharma', name: 'Pharmaceuticals', namePortuguese: 'Farmacêutica', sectorId: 'manufacturing' },
  { id: 'manufacturing_other', name: 'Other Manufacturing', namePortuguese: 'Outra Indústria', sectorId: 'manufacturing' },
  
  // Services
  { id: 'services_consulting', name: 'Consulting', namePortuguese: 'Consultoria', sectorId: 'services' },
  { id: 'services_marketing', name: 'Marketing & Advertising', namePortuguese: 'Marketing e Publicidade', sectorId: 'services' },
  { id: 'services_logistics', name: 'Logistics & Transportation', namePortuguese: 'Logística e Transportes', sectorId: 'services' },
  { id: 'services_cleaning', name: 'Cleaning & Maintenance', namePortuguese: 'Limpeza e Manutenção', sectorId: 'services' },
  { id: 'services_security', name: 'Security', namePortuguese: 'Segurança', sectorId: 'services' },
  { id: 'services_other', name: 'Other Services', namePortuguese: 'Outros Serviços', sectorId: 'services' },
  
  // Technology
  { id: 'tech_software', name: 'Software Development', namePortuguese: 'Desenvolvimento de Software', sectorId: 'technology' },
  { id: 'tech_hardware', name: 'Hardware', namePortuguese: 'Hardware', sectorId: 'technology' },
  { id: 'tech_it_services', name: 'IT Services', namePortuguese: 'Serviços de TI', sectorId: 'technology' },
  { id: 'tech_telecom', name: 'Telecommunications', namePortuguese: 'Telecomunicações', sectorId: 'technology' },
  { id: 'tech_ai_ml', name: 'AI & Machine Learning', namePortuguese: 'IA e Aprendizagem Automática', sectorId: 'technology' },
  { id: 'tech_other', name: 'Other Technology', namePortuguese: 'Outra Tecnologia', sectorId: 'technology' },
  
  // Healthcare
  { id: 'healthcare_hospital', name: 'Hospitals & Clinics', namePortuguese: 'Hospitais e Clínicas', sectorId: 'healthcare' },
  { id: 'healthcare_pharma', name: 'Pharmaceuticals', namePortuguese: 'Farmacêutica', sectorId: 'healthcare' },
  { id: 'healthcare_equipment', name: 'Medical Equipment', namePortuguese: 'Equipamento Médico', sectorId: 'healthcare' },
  { id: 'healthcare_biotech', name: 'Biotechnology', namePortuguese: 'Biotecnologia', sectorId: 'healthcare' },
  { id: 'healthcare_telemedicine', name: 'Telemedicine', namePortuguese: 'Telemedicina', sectorId: 'healthcare' },
  { id: 'healthcare_other', name: 'Other Healthcare', namePortuguese: 'Outra Saúde', sectorId: 'healthcare' },
  
  // Finance
  { id: 'finance_banking', name: 'Banking', namePortuguese: 'Banca', sectorId: 'finance' },
  { id: 'finance_insurance', name: 'Insurance', namePortuguese: 'Seguros', sectorId: 'finance' },
  { id: 'finance_investment', name: 'Investment & Asset Management', namePortuguese: 'Investimento e Gestão de Ativos', sectorId: 'finance' },
  { id: 'finance_accounting', name: 'Accounting & Bookkeeping', namePortuguese: 'Contabilidade', sectorId: 'finance' },
  { id: 'finance_fintech', name: 'Fintech', namePortuguese: 'Fintech', sectorId: 'finance' },
  { id: 'finance_other', name: 'Other Finance', namePortuguese: 'Outras Finanças', sectorId: 'finance' },
  
  // Hospitality
  { id: 'hospitality_hotels', name: 'Hotels & Resorts', namePortuguese: 'Hotéis e Resorts', sectorId: 'hospitality' },
  { id: 'hospitality_restaurants', name: 'Restaurants & Catering', namePortuguese: 'Restaurantes e Catering', sectorId: 'hospitality' },
  { id: 'hospitality_travel', name: 'Travel & Tourism', namePortuguese: 'Viagens e Turismo', sectorId: 'hospitality' },
  { id: 'hospitality_events', name: 'Event Management', namePortuguese: 'Gestão de Eventos', sectorId: 'hospitality' },
  { id: 'hospitality_entertainment', name: 'Entertainment', namePortuguese: 'Entretenimento', sectorId: 'hospitality' },
  { id: 'hospitality_other', name: 'Other Hospitality', namePortuguese: 'Outra Hotelaria', sectorId: 'hospitality' },
  
  // Restaurant
  { id: 'restaurant_fine_dining', name: 'Fine Dining', namePortuguese: 'Restaurante Gourmet', sectorId: 'restaurant' },
  { id: 'restaurant_casual', name: 'Casual Dining', namePortuguese: 'Restaurante Casual', sectorId: 'restaurant' },
  { id: 'restaurant_fast_food', name: 'Fast Food', namePortuguese: 'Fast Food', sectorId: 'restaurant' },
  { id: 'restaurant_cafe', name: 'Café & Bakery', namePortuguese: 'Café e Pastelaria', sectorId: 'restaurant' },
  { id: 'restaurant_bar', name: 'Bar & Pub', namePortuguese: 'Bar e Pub', sectorId: 'restaurant' },
  { id: 'restaurant_catering', name: 'Catering Service', namePortuguese: 'Serviço de Catering', sectorId: 'restaurant' },
  { id: 'restaurant_delivery', name: 'Food Delivery', namePortuguese: 'Entrega de Comida', sectorId: 'restaurant' },
  { id: 'restaurant_other', name: 'Other Restaurant', namePortuguese: 'Outra Restauração', sectorId: 'restaurant' },
  
  // Construction
  { id: 'construction_residential', name: 'Residential Construction', namePortuguese: 'Construção Residencial', sectorId: 'construction' },
  { id: 'construction_commercial', name: 'Commercial Construction', namePortuguese: 'Construção Comercial', sectorId: 'construction' },
  { id: 'construction_infrastructure', name: 'Infrastructure', namePortuguese: 'Infraestrutura', sectorId: 'construction' },
  { id: 'construction_architecture', name: 'Architecture & Design', namePortuguese: 'Arquitetura e Design', sectorId: 'construction' },
  { id: 'construction_realestate', name: 'Real Estate Development', namePortuguese: 'Desenvolvimento Imobiliário', sectorId: 'construction' },
  { id: 'construction_other', name: 'Other Construction', namePortuguese: 'Outra Construção', sectorId: 'construction' },
  
  // Agriculture
  { id: 'agriculture_crops', name: 'Crop Farming', namePortuguese: 'Cultivo de Culturas', sectorId: 'agriculture' },
  { id: 'agriculture_livestock', name: 'Livestock & Dairy', namePortuguese: 'Pecuária e Laticínios', sectorId: 'agriculture' },
  { id: 'agriculture_aquaculture', name: 'Aquaculture & Fisheries', namePortuguese: 'Aquacultura e Pescas', sectorId: 'agriculture' },
  { id: 'agriculture_forestry', name: 'Forestry', namePortuguese: 'Silvicultura', sectorId: 'agriculture' },
  { id: 'agriculture_agritech', name: 'Agricultural Technology', namePortuguese: 'Tecnologia Agrícola', sectorId: 'agriculture' },
  { id: 'agriculture_other', name: 'Other Agriculture', namePortuguese: 'Outra Agricultura', sectorId: 'agriculture' },
  
  // Education
  { id: 'education_k12', name: 'K-12 Education', namePortuguese: 'Ensino Básico e Secundário', sectorId: 'education' },
  { id: 'education_higher', name: 'Higher Education', namePortuguese: 'Ensino Superior', sectorId: 'education' },
  { id: 'education_vocational', name: 'Vocational Training', namePortuguese: 'Formação Profissional', sectorId: 'education' },
  { id: 'education_online', name: 'Online Learning', namePortuguese: 'Aprendizagem Online', sectorId: 'education' },
  { id: 'education_tutoring', name: 'Tutoring & Test Prep', namePortuguese: 'Explicações e Preparação para Exames', sectorId: 'education' },
  { id: 'education_other', name: 'Other Education', namePortuguese: 'Outra Educação', sectorId: 'education' },
  
  // Logistics
  { id: 'logistics_freight', name: 'Freight & Shipping', namePortuguese: 'Transporte de Mercadorias', sectorId: 'logistics' },
  { id: 'logistics_warehousing', name: 'Warehousing & Storage', namePortuguese: 'Armazenamento e Logística', sectorId: 'logistics' },
  { id: 'logistics_courier', name: 'Courier & Delivery', namePortuguese: 'Correio e Entregas', sectorId: 'logistics' },
  { id: 'logistics_supply_chain', name: 'Supply Chain Management', namePortuguese: 'Gestão de Cadeia de Abastecimento', sectorId: 'logistics' },
  { id: 'logistics_other', name: 'Other Logistics', namePortuguese: 'Outra Logística', sectorId: 'logistics' },
  
  // Energy
  { id: 'energy_renewable', name: 'Renewable Energy', namePortuguese: 'Energia Renovável', sectorId: 'energy' },
  { id: 'energy_oil_gas', name: 'Oil & Gas', namePortuguese: 'Petróleo e Gás', sectorId: 'energy' },
  { id: 'energy_utilities', name: 'Utilities', namePortuguese: 'Serviços Públicos', sectorId: 'energy' },
  { id: 'energy_power', name: 'Power Generation', namePortuguese: 'Geração de Energia', sectorId: 'energy' },
  { id: 'energy_other', name: 'Other Energy', namePortuguese: 'Outra Energia', sectorId: 'energy' },
  
  // Media
  { id: 'media_publishing', name: 'Publishing', namePortuguese: 'Publicação', sectorId: 'media' },
  { id: 'media_broadcasting', name: 'Broadcasting', namePortuguese: 'Radiodifusão', sectorId: 'media' },
  { id: 'media_digital', name: 'Digital Media', namePortuguese: 'Media Digital', sectorId: 'media' },
  { id: 'media_advertising', name: 'Advertising', namePortuguese: 'Publicidade', sectorId: 'media' },
  { id: 'media_entertainment', name: 'Entertainment', namePortuguese: 'Entretenimento', sectorId: 'media' },
  { id: 'media_other', name: 'Other Media', namePortuguese: 'Outra Media', sectorId: 'media' },
  
  // Other
  { id: 'other_business', name: 'Other Business Type', namePortuguese: 'Outro Tipo de Negócio', sectorId: 'other' },
]; 