
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

const ErrorTracking = () => {
  const recentLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      level: "info",
      message: "Redirecionamento concluído com sucesso",
      details: "Client code: 12345, IP: 192.168.1.1"
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      level: "warning",
      message: "Consulta de geolocalização lenta",
      details: "Tempo: 3.2s (acima da meta de 2s)"
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      level: "error",
      message: "Falha na consulta de IP",
      details: "API ipify.org retornou timeout"
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      level: "info",
      message: "Cache hit para dados geográficos",
      details: "IP já consultado, usando cache local"
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      level: "success",
      message: "Edge function executada com sucesso",
      details: "Tempo de execução: 450ms"
    }
  ];

  const errorStats = [
    {
      title: "Taxa de Sucesso",
      value: "98.5%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Erros Críticos",
      value: "2",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Warnings",
      value: "15",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Tempo Médio",
      value: "3.2s",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      default:
        return <Badge>Log</Badge>;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {errorStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs Recentes</CardTitle>
          <CardDescription>Últimas atividades do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="flex-shrink-0 mt-1">
                  {getLevelIcon(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{log.message}</p>
                    {getLevelBadge(log.level)}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{log.details}</p>
                  <p className="text-xs text-gray-500">
                    {log.timestamp.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plano de Monitoramento</CardTitle>
          <CardDescription>Próximos passos para melhorar o tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Implementar Sentry</h4>
                <p className="text-sm text-gray-600">Sistema profissional de error tracking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Alertas Automáticos</h4>
                <p className="text-sm text-gray-600">Notificações quando taxa de erro maior que 5%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Métricas de Performance</h4>
                <p className="text-sm text-gray-600">Tracking detalhado de cada etapa</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Health Checks</h4>
                <p className="text-sm text-gray-600">Verificação automática dos serviços</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorTracking;
