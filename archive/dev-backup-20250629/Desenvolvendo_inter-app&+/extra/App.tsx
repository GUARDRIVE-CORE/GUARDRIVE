import React, { useState } from 'react';
import './App.css';
import { 
  Home,
  Car,
  Leaf,
  Coins,
  User,
  Bell,
  Settings,
  Shield,
  BarChart3,
  MapPin,
  Plus,
  QrCode,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  Calendar,
  ArrowRight,
  ChevronRight,
  Wallet,
  Award,
  Eye,
  RefreshCw
} from 'lucide-react';

// Bottom Navigation Component
const BottomNavigation = ({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void; 
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'fleet', icon: Car, label: 'Frota' },
    { id: 'esg', icon: Leaf, label: 'ESG' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Mobile Header Component
const MobileHeader = ({ title, showNotifications = true }: { 
  title: string; 
  showNotifications?: boolean; 
}) => {
  return (
    <header className="mobile-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-emerald-500" />
          <div>
            <h1 className="text-mobile-title">{title}</h1>
            <p className="text-mobile-caption">Bem-vindo, João Silva</p>
          </div>
        </div>
        
        {showNotifications && (
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

// Metric Card Mobile Component
const MetricCardMobile = ({ icon: Icon, title, value, change, color, trend }: {
  icon: any;
  title: string;
  value: string;
  change?: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <div className="card-mobile-metric">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {change && (
          <div className={`text-sm font-medium flex items-center ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-mobile-caption">{title}</div>
    </div>
  );
};

// Home Screen Component
const HomeScreen = () => {
  return (
    <div className="mobile-content space-mobile-y">
      {/* Quick Stats */}
      <div className="grid-mobile-2">
        <MetricCardMobile
          icon={Leaf}
          title="CO₂ Evitado Hoje"
          value="0.8t"
          change="+12%"
          color="bg-green-500"
          trend="up"
        />
        <MetricCardMobile
          icon={Coins}
          title="Tokens Ganhos"
          value="47"
          change="+3"
          color="bg-orange-500"
          trend="up"
        />
      </div>

      {/* Vehicle Status */}
      <div className="card-mobile p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-mobile-subtitle">Meus Veículos</h3>
          <button className="text-emerald-600 text-sm font-medium">Ver Todos</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">ABC-1234</div>
                <div className="text-mobile-caption">Honda Civic</div>
              </div>
            </div>
            <div className="text-right">
              <div className="status-indicator status-online">Online</div>
              <div className="text-mobile-caption mt-1">94% Eficiência</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">DEF-5678</div>
                <div className="text-mobile-caption">Toyota Corolla</div>
              </div>
            </div>
            <div className="text-right">
              <div className="status-indicator status-warning">Manutenção</div>
              <div className="text-mobile-caption mt-1">87% Eficiência</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-mobile p-6">
        <h3 className="text-mobile-subtitle mb-4">Ações Rápidas</h3>
        <div className="grid-mobile-2">
          <button className="btn-mobile-secondary">
            <QrCode className="h-5 w-5 mr-2" />
            Scanner QR
          </button>
          <button className="btn-mobile-secondary">
            <MapPin className="h-5 w-5 mr-2" />
            Ver Mapa
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-mobile p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-mobile-subtitle">Atividade Recente</h3>
          <button className="text-emerald-600 text-sm font-medium">Ver Todas</button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <Coins className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Token ESG gerado</p>
              <p className="text-mobile-caption">Condução eficiente - ABC-1234</p>
              <p className="text-xs text-gray-500 mt-1">há 15 minutos</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Viagem concluída</p>
              <p className="text-mobile-caption">São Paulo → Campinas</p>
              <p className="text-xs text-gray-500 mt-1">há 2 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fleet Screen Component
const FleetScreen = () => {
  return (
    <div className="mobile-content space-mobile-y">
      {/* Fleet Overview */}
      <div className="grid-mobile-3">
        <MetricCardMobile
          icon={Car}
          title="Total Veículos"
          value="8"
          color="bg-blue-500"
        />
        <MetricCardMobile
          icon={Activity}
          title="Online"
          value="6"
          color="bg-green-500"
        />
        <MetricCardMobile
          icon={AlertTriangle}
          title="Alertas"
          value="2"
          color="bg-red-500"
        />
      </div>

      {/* Vehicle List */}
      <div className="card-mobile p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-mobile-subtitle">Lista de Veículos</h3>
          <button className="btn-mobile-icon">
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { plate: 'ABC-1234', model: 'Honda Civic', status: 'online', efficiency: 94, location: 'São Paulo, SP' },
            { plate: 'DEF-5678', model: 'Toyota Corolla', status: 'maintenance', efficiency: 87, location: 'Oficina Central' },
            { plate: 'GHI-9012', model: 'Nissan Sentra', status: 'online', efficiency: 91, location: 'Campinas, SP' },
            { plate: 'JKL-3456', model: 'Hyundai HB20', status: 'offline', efficiency: 89, location: 'Última: Santos, SP' }
          ].map((vehicle, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    vehicle.status === 'online' ? 'bg-green-500' : 
                    vehicle.status === 'maintenance' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}>
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{vehicle.plate}</div>
                    <div className="text-mobile-caption">{vehicle.model}</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className={`status-indicator ${
                    vehicle.status === 'online' ? 'status-online' : 
                    vehicle.status === 'maintenance' ? 'status-warning' : 'status-offline'
                  }`}>
                    {vehicle.status === 'online' ? 'Online' : 
                     vehicle.status === 'maintenance' ? 'Manutenção' : 'Offline'}
                  </div>
                  <div className="text-mobile-caption">{vehicle.efficiency}% Eficiência</div>
                </div>
              </div>
              
              <div className="flex items-center mt-2 text-mobile-caption">
                <MapPin className="h-4 w-4 mr-1" />
                {vehicle.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ESG Screen Component
const ESGScreen = () => {
  return (
    <div className="mobile-content space-mobile-y">
      {/* ESG Metrics */}
      <div className="grid-mobile-2">
        <MetricCardMobile
          icon={Leaf}
          title="CO₂ Total Evitado"
          value="2.4t"
          change="+12%"
          color="bg-green-500"
          trend="up"
        />
        <MetricCardMobile
          icon={Award}
          title="Certificações"
          value="3"
          change="+1"
          color="bg-blue-500"
          trend="up"
        />
      </div>

      {/* Environmental Impact */}
      <div className="card-mobile p-6">
        <h3 className="text-mobile-subtitle mb-4">Impacto Ambiental</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold">Emissões Reduzidas</div>
                <div className="text-mobile-caption">Este mês</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">-18%</div>
              <div className="text-mobile-caption">vs mês anterior</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold">Eficiência Energética</div>
                <div className="text-mobile-caption">Média da frota</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">91%</div>
              <div className="text-mobile-caption">+3% este mês</div>
            </div>
          </div>
        </div>
      </div>

      {/* ESG Goals */}
      <div className="card-mobile p-6">
        <h3 className="text-mobile-subtitle mb-4">Metas ESG</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Redução de CO₂</span>
              <span className="text-sm text-gray-600">76%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '76%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Eficiência Combustível</span>
              <span className="text-sm text-gray-600">84%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '84%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Condução Segura</span>
              <span className="text-sm text-gray-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: '92%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="card-mobile p-6">
        <h3 className="text-mobile-subtitle mb-4">Certificações Obtidas</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 text-green-600" />
              <div>
                <div className="font-medium">ISO 14001</div>
                <div className="text-mobile-caption">Gestão Ambiental</div>
              </div>
            </div>
            <div className="text-mobile-caption">Válida até 2025</div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium">GRI Standards</div>
                <div className="text-mobile-caption">Relatório de Sustentabilidade</div>
              </div>
            </div>
            <div className="text-mobile-caption">Atualizada</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wallet Screen Component
const WalletScreen = () => {
  return (
    <div className="mobile-content spac
(Content truncated due to size limit. Use line ranges to read in chunks)