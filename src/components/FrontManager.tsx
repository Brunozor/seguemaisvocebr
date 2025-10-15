
import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "../integrations/supabase/client";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Front {
  id: number;
  nome: string;
  ativo: boolean;
  titulo?: string;
  subtitulo?: string;
  cor_principal?: string;
  background_color?: string;
  background_image?: string;
  imagem_loading?: string;
  criou: string;
}

const FrontManager = () => {
  const [fronts, setFronts] = useState<Front[]>([]);
  const [newFrontName, setNewFrontName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFronts();
  }, []);

  const fetchFronts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('front_redirecionamento')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error("Error fetching fronts:", error);
        toast({
          title: "Error",
          description: "Failed to load fronts.",
          variant: "destructive",
        });
      } else {
        setFronts(data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: number, ativo: boolean) => {
    try {
      const { error } = await supabase
        .from('front_redirecionamento')
        .update({ ativo: !ativo })
        .eq('id', id);

      if (error) {
        console.error("Error updating front:", error);
        toast({
          title: "Error",
          description: "Failed to update front.",
          variant: "destructive",
        });
      } else {
        setFronts(fronts.map(front =>
          front.id === id ? { ...front, ativo: !ativo } : front
        ));
        toast({
          title: "Success",
          description: "Front updated successfully.",
        });
      }
    } catch (error) {
      console.error("Unexpected error updating front:", error);
      toast({
        title: "Error",
        description: "Unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleAddFront = async () => {
    if (!newFrontName) {
      toast({
        title: "Error",
        description: "Name is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('front_redirecionamento')
        .insert([{ 
          nome: newFrontName, 
          ativo: false,
          criou: 'admin'
        }]);

      if (error) {
        console.error("Error adding front:", error);
        toast({
          title: "Error",
          description: "Failed to add front.",
          variant: "destructive",
        });
      } else {
        setNewFrontName('');
        fetchFronts();
        toast({
          title: "Success",
          description: "Front added successfully.",
        });
      }
    } catch (error) {
      console.error("Unexpected error adding front:", error);
      toast({
        title: "Error",
        description: "Unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFront = async (id: number) => {
    try {
      const { error } = await supabase
        .from('front_redirecionamento')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting front:", error);
        toast({
          title: "Error",
          description: "Failed to delete front.",
          variant: "destructive",
        });
      } else {
        setFronts(fronts.filter(front => front.id !== id));
        toast({
          title: "Success",
          description: "Front deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Unexpected error deleting front:", error);
      toast({
        title: "Error",
        description: "Unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading fronts...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Front</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={newFrontName}
              onChange={(e) => setNewFrontName(e.target.value)}
              placeholder="Front Name"
            />
          </div>
        </div>
        <Button onClick={handleAddFront} className="mt-4">Add Front</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Fronts</h2>
        {fronts.map((front) => (
          <div key={front.id} className="flex items-center justify-between py-2 border-b">
            <div>
              <span className="font-medium">{front.nome}</span>
              {front.titulo && <p className="text-sm text-gray-500">{front.titulo}</p>}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id={`active-${front.id}`}
                  checked={front.ativo}
                  onCheckedChange={() => handleToggleActive(front.id, front.ativo)}
                />
                <Label htmlFor={`active-${front.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {front.ativo ? 'Ativo' : 'Inativo'}
                </Label>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteFront(front.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrontManager;
