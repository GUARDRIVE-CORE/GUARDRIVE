import React, { useState } from "react";
import {
  BarChart3,
  Car,
  Leaf,
  Coins,
  Bell,
  Settings,
  User,
  Menu,
  X,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  MapPin,
  Calendar,
  Download,
  Plus,
} from "lucide-react";

// Sidebar Component
const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: Car, label: "Frota", active: false },
    { icon: Leaf, label: "ESG & Tokens", active: false },
    { icon: BarChart3, label: "Relatórios", active: false },
    { icon: Settings, label: "Configurações", active: false },
    { icon: User, label: "Suporte", active: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-gradient-primary">
              GuardDrive
            </span>
          </div>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

// Header Component
const DashboardHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo de volta, João Silva</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Settings className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium text-gray-900">João Silva</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Metric Card Component
const MetricCard = ({
  icon: Icon,
  title,
  value,
  change,
  color,
}: {
  icon: any;
  title: string;
  value: string;
  change: string;
  color: string;
}) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div
          className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
};

// Chart Component (Placeholder)
const EmissionsChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Emissões vs Compensação
        </h3>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Ver Detalhes
        </button>
      </div>

      {/* Placeholder chart */}
      <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600">Gráfico de Emissões vs Compensação</p>
          <p className="text-sm text-gray-500 mt-2">Dados em tempo real</p>
        </div>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = () => {
  const activities = [
    {
      icon: Coins,
      title: "Token ESG gerado",
      description: "Veículo ABC-1234 - Condução eficiente",
      time: "há 15 minutos",
      color: "text-orange-500",
    },
    {
      icon: CheckCircle,
      title: "Manutenção concluída",
      description: "Veículo DEF-5678 - Revisão preventiva",
      time: "há 2 horas",
      color: "text-green-500",
    },
    {
      icon: AlertTriangle,
      title: "Alerta de segurança",
      description: "Veículo GHI-9012 - Velocidade excessiva",
      time: "há 4 horas",
      color: "text-red-500",
    },
    {
      icon: Activity,
      title: "Dispositivo conectado",
      description: "Veículo JKL-3456 - Status online",
      time: "há 6 horas",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Atividade Recente
        </h3>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Ver Todas
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: Plus, label: "Adicionar Veículo", color: "bg-emerald-500" },
    { icon: Download, label: "Gerar Relatório", color: "bg-blue-500" },
    { icon: MapPin, label: "Ver Mapa", color: "bg-purple-500" },
    { icon: Calendar, label: "Agendar Manutenção", color: "bg-orange-500" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Ações Rápidas
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
          >
            <div className={`p-3 rounded-lg ${action.color} mb-3`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={Leaf}
              title="CO₂ Evitado"
              value="2.4t"
              change="+12%"
              color="bg-green-500"
            />
            <MetricCard
              icon={Coins}
              title="Tokens Gerados"
              value="1,247"
              change="+8%"
              color="bg-orange-500"
            />
            <MetricCard
              icon={Car}
              title="Dispositivos Ativos"
              value="156"
              change="●"
              color="bg-blue-500"
            />
            <MetricCard
              icon={TrendingUp}
              title="Frotas Ativas"
              value="23"
              change="+2"
              color="bg-purple-500"
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EmissionsChart />
            <RecentActivity />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <QuickActions />

            {/* Additional widgets can be added here */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Mapa da Frota
              </h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Mapa Interativo da Frota</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Localização em tempo real dos veículos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
