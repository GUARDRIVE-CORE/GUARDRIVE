import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { LineChart, PieChart } from "react-native-chart-kit";
import Card, { CardHeader, CardBody } from "../components/Card";
import Button from "../components/Button";
import {
  colors,
  typography,
  spacing,
  borderRadius,
  layout,
} from "../styles/theme";

const { width } = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({
    name: "João Silva",
    company: "Transportes ABC",
    avatar: null,
  });
  const [fleetData, setFleetData] = useState({
    totalVehicles: 15,
    activeVehicles: 12,
    alerts: 2,
    maintenance: 1,
  });
  const [esgData, setEsgData] = useState({
    co2Saved: 2.3,
    tokens: 45,
    score: 8.7,
    trend: "+12%",
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simular carregamento de dados
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const chartConfig = {
    backgroundColor: colors.white,
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(30, 58, 138, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: borderRadius.md,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: colors.primary,
    },
  };

  const emissionsData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        data: [2.1, 1.8, 2.5, 2.0, 1.9, 2.3],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const vehicleStatusData = [
    {
      name: "Ativos",
      population: 12,
      color: colors.success,
      legendFontColor: colors.gray600,
      legendFontSize: 12,
    },
    {
      name: "Alertas",
      population: 2,
      color: colors.warning,
      legendFontColor: colors.gray600,
      legendFontSize: 12,
    },
    {
      name: "Manutenção",
      population: 1,
      color: colors.error,
      legendFontColor: colors.gray600,
      legendFontSize: 12,
    },
  ];

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color = colors.primary,
    onPress,
  }) => (
    <Card style={styles.statCard} onPress={onPress}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
          <Icon name={icon} size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </Card>
  );

  const QuickAction = ({ icon, title, onPress, color = colors.primary }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={20} color={color} />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={colors.primaryGradient}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Icon name="user" size={24} color={colors.white} />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.greeting}>Olá, {userData.name}! 👋</Text>
                <Text style={styles.company}>{userData.company}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Icon name="bell" size={24} color={colors.white} />
              {fleetData.alerts > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {fleetData.alerts}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Fleet Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visão Geral da Frota</Text>
            <View style={styles.statsGrid}>
              <StatCard
                icon="truck"
                title="Veículos Ativos"
                value={`${fleetData.activeVehicles}/${fleetData.totalVehicles}`}
                color={colors.success}
                onPress={() => navigation.navigate("Fleet")}
              />
              <StatCard
                icon="alert-triangle"
                title="Alertas"
                value={fleetData.alerts}
                subtitle="Requer atenção"
                color={colors.warning}
                onPress={() => navigation.navigate("Alerts")}
              />
              <StatCard
                icon="tool"
                title="Manutenção"
                value={fleetData.maintenance}
                subtitle="Agendada"
                color={colors.error}
                onPress={() => navigation.navigate("Maintenance")}
              />
              <StatCard
                icon="shield"
                title="Conformidade"
                value="95%"
                subtitle="ESG Score"
                color={colors.primary}
                onPress={() => navigation.navigate("ESG")}
              />
            </View>
          </View>

          {/* ESG Metrics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Métricas ESG Hoje</Text>
            <Card style={styles.esgCard}>
              <View style={styles.esgMetrics}>
                <View style={styles.esgMetric}>
                  <Icon name="leaf" size={32} color={colors.secondary} />
                  <Text style={styles.esgValue}>-{esgData.co2Saved}t</Text>
                  <Text style={styles.esgLabel}>CO₂ Evitado</Text>
                </View>
                <View style={styles.esgMetric}>
                  <Icon name="dollar-sign" size={32} color={colors.accent} />
                  <Text style={styles.esgValue}>{esgData.tokens}</Text>
                  <Text style={styles.esgLabel}>Tokens ESG</Text>
                </View>
                <View style={styles.esgMetric}>
                  <Icon name="trending-up" size={32} color={colors.success} />
                  <Text style={styles.esgValue}>{esgData.score}</Text>
                  <Text style={styles.esgLabel}>Score ESG</Text>
                </View>
              </View>
              <View style={styles.esgTrend}>
                <Icon name="arrow-up" size={16} color={colors.success} />
                <Text style={styles.esgTrendText}>
                  {esgData.trend} vs. mês anterior
                </Text>
              </View>
            </Card>
          </View>

          {/* Charts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emissões vs. Compensação</Text>
            <Card style={styles.chartCard}>
              <LineChart
                data={emissionsData}
                width={width - 64}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status da Frota</Text>
            <Card style={styles.chartCard}>
              <PieChart
                data={vehicleStatusData}
                width={width - 64}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                style={styles.chart}
              />
            </Card>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.quickActions}>
              <QuickAction
                icon="plus"
                title="Adicionar Veículo"
                onPress={() => navigation.navigate("AddVehicle")}
                color={colors.primary}
              />
              <QuickAction
                icon="search"
                title="Localizar Frota"
                onPress={() => navigation.navigate("Map")}
                color={colors.secondary}
              />
              <QuickAction
                icon="file-text"
                title="Relatórios"
                onPress={() => navigation.navigate("Reports")}
                color={colors.accent}
              />
              <QuickAction
                icon="settings"
                title="Configurações"
                onPress={() => navigation.navigate("Settings")}
                color={colors.gray600}
              />
            </View>
          </View>

          {/* CTA */}
          <Card style={styles.ctaCard}>
            <CardHeader>
              <Text style={styles.ctaTitle}>Maximize seu Impacto ESG</Text>
              <Text style={styles.ctaSubtitle}>
                Descubra como otimizar suas métricas de sustentabilidade
              </Text>
            </CardHeader>
            <CardBody>
              <Button
                title="Ver Oportunidades"
                variant="secondary"
                onPress={() => navigation.navigate("ESGOpportunities")}
                icon={
                  <Icon name="trending-up" size={20} color={colors.white} />
                }
              />
            </CardBody>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.white,
  },
  company: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
    opacity: 0.8,
  },
  notificationButton: {
    position: "relative",
    padding: spacing.sm,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.gray900,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.fontSize["2xl"],
    fontFamily: typography.fontFamily.bold,
    color: colors.gray900,
  },
  statTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.gray700,
  },
  statSubtitle: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray500,
    marginTop: spacing.xs,
  },
  esgCard: {
    padding: spacing.xl,
  },
  esgMetrics: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.lg,
  },
  esgMetric: {
    alignItems: "center",
  },
  esgValue: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.gray900,
    marginTop: spacing.sm,
  },
  esgLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.gray600,
    marginTop: spacing.xs,
  },
  esgTrend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
  },
  esgTrendText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.success,
  },
  chartCard: {
    padding: spacing.md,
    alignItems: "center",
  },
  chart: {
    borderRadius: borderRadius.md,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    minWidth: "45%",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.gray700,
    textAlign: "center",
  },
  ctaCard: {
    backgroundColor: colors.gray900,
    marginBottom: spacing.xl,
  },
  ctaTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  ctaSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.gray300,
    marginBottom: spacing.lg,
  },
});

export default DashboardScreen;
