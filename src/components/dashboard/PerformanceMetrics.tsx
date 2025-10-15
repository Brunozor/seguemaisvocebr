
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Database, Globe } from "lucide-react";

const PerformanceMetrics = () => {
  const performanceData = [
    {
      name: "Tempo de Redirecionamento",
      value: 3.2,
      target: 3.0,
      unit: "s",
      status: "warning",
      icon: Clock
    },
    {
      name: "Consulta IP/Geo",
      value: 1.8,
      target: 2.0,
      unit: "s",
      status: "good",
      icon: Globe
    },
    {
      name: "Geração Client Code",
      value: 0.1,
      target: 0.2,
      unit: "s",
      status: "good",
      icon: Zap
    },
    {
      name: "Salvamento no DB",
      value: 0.3,
      target: 0.5,
      unit: "s",
      status: "good",
      icon: Database
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good': return <Badge className="bg-green-100 text-green-800">Bom</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-800">Crítico</Badge>;
      default: return <Badge>Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {performanceData.map((metric, index) => {
          const percentage = Math.min((metric.target / metric.value) * 100, 100);
          
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <metric.icon className="h-4 w-4" />
                    {metric.name}
                  </CardTitle>
                  <CardDescription>Meta: {metric.target}{metric.unit}</CardDescription>
                </div>
                {getStatusBadge(metric.status)}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-gray-600">
                    {percentage.toFixed(0)}% da meta alcançada
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Otimizações Implementadas</CardTitle>
          <CardDescription>Melhorias de performance aplicadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Edge Functions para IP/Geo</h4>
                <p className="text-sm text-gray-600">Redução de 2-3 segundos no tempo de consulta</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Cache Inteligente</h4>
                <p className="text-sm text-gray-600">Cache de 30 minutos para dados geográficos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Remoção de Delays Artificiais</h4>
                <p className="text-sm text-gray-600">Eliminação de 4-6 segundos de espera desnecessária</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Operações Paralelas</h4>
                <p className="text-sm text-gray-600">Execução simultânea de múltiplas tarefas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Otimizações</CardTitle>
          <CardDescription>Melhorias planejadas para implementação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Error Tracking</h4>
                <p className="text-sm text-gray-600">Implementar Sentry ou sistema similar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Progress Indicator</h4>
                <p className="text-sm text-gray-600">Feedback visual em tempo real</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Bundle Optimization</h4>
                <p className="text-sm text-gray-600">Code splitting e lazy loading</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
