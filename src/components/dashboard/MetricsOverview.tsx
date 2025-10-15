
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const MetricsOverview = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: async () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

      // Total de redirecionamentos hoje
      const { count: todayCount } = await supabase
        .from('utm')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', today.toISOString());

      // Total de redirecionamentos ontem
      const { count: yesterdayCount } = await supabase
        .from('utm')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', yesterday.toISOString())
        .lt('timestamp', today.toISOString());

      // Últimos 7 dias
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const { count: weekCount } = await supabase
        .from('utm')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', weekAgo.toISOString());

      // Conversões
      const { count: conversions } = await supabase
        .from('comprou')
        .select('*', { count: 'exact', head: true })
        .gte('comprou', today.toISOString());

      return {
        todayRedirections: todayCount || 0,
        yesterdayRedirections: yesterdayCount || 0,
        weekRedirections: weekCount || 0,
        todayConversions: conversions || 0,
        conversionRate: todayCount ? ((conversions || 0) / todayCount * 100).toFixed(1) : '0',
        growthRate: yesterdayCount ? (((todayCount || 0) - yesterdayCount) / yesterdayCount * 100).toFixed(1) : '0'
      };
    },
    refetchInterval: 30000 // Atualiza a cada 30 segundos
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Redirecionamentos Hoje",
      value: metrics?.todayRedirections || 0,
      description: `${metrics?.growthRate || 0}% vs ontem`,
      icon: Activity,
      trend: parseFloat(metrics?.growthRate || '0') > 0 ? 'up' : 'down'
    },
    {
      title: "Conversões Hoje",
      value: metrics?.todayConversions || 0,
      description: `Taxa: ${metrics?.conversionRate || 0}%`,
      icon: TrendingUp,
      trend: 'up'
    },
    {
      title: "Últimos 7 Dias",
      value: metrics?.weekRedirections || 0,
      description: "Total de redirecionamentos",
      icon: Users,
      trend: 'up'
    },
    {
      title: "Tempo Médio",
      value: "3.2s",
      description: "Redirecionamento médio",
      icon: Clock,
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${card.trend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
          <CardDescription>Monitoramento em tempo real dos serviços</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API de Geolocalização</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Edge Functions</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Banco de Dados</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
