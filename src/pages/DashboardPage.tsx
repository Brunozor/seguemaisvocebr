
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import RedirectionMetrics from "@/components/dashboard/RedirectionMetrics";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
import ErrorTracking from "@/components/dashboard/ErrorTracking";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Métricas</h1>
            <p className="text-gray-600 mt-2">Monitoramento em tempo real do sistema de redirecionamento</p>
          </div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="redirections">Redirecionamentos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Erros & Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <MetricsOverview />
          </TabsContent>

          <TabsContent value="redirections">
            <RedirectionMetrics />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="errors">
            <ErrorTracking />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
