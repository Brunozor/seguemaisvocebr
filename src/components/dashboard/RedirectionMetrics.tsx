
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const RedirectionMetrics = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['redirection-metrics'],
    queryFn: async () => {
      // Dados dos últimos 7 dias
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

        const { count } = await supabase
          .from('utm')
          .select('*', { count: 'exact', head: true })
          .gte('timestamp', startOfDay.toISOString())
          .lt('timestamp', endOfDay.toISOString());

        days.push({
          date: startOfDay.toLocaleDateString('pt-BR', { weekday: 'short' }),
          redirections: count || 0
        });
      }

      // Dados por source
      const { data: sourceData } = await supabase
        .from('utm')
        .select('utm_source')
        .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      const sourceCounts = sourceData?.reduce((acc: any, item) => {
        acc[item.utm_source] = (acc[item.utm_source] || 0) + 1;
        return acc;
      }, {}) || {};

      const pieData = Object.entries(sourceCounts).map(([source, count]) => ({
        name: source,
        value: count as number
      }));

      return { weeklyData: days, sourceData: pieData };
    },
    refetchInterval: 60000 // Atualiza a cada minuto
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Redirecionamentos por Dia</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                redirections: {
                  label: "Redirecionamentos",
                  color: "#8884D8"
                }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData?.weeklyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="redirections" fill="#8884D8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
            <CardDescription>Distribuição por UTM Source</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Redirecionamentos",
                  color: "#8884D8"
                }
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData?.sourceData || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {(chartData?.sourceData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendência de Redirecionamentos</CardTitle>
          <CardDescription>Evolução ao longo da semana</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              redirections: {
                label: "Redirecionamentos",
                color: "#82ca9d"
              }
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData?.weeklyData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="redirections" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectionMetrics;
