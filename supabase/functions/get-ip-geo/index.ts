
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GeoData {
  cidade: string | null;
  estado: string | null;
  pais: string | null;
  pagina: string;
  user_agent: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userAgent, currentUrl } = await req.json();
    
    console.log('Starting IP/Geo lookup...');
    
    // Get IP address with timeout
    const ipController = new AbortController();
    const ipTimeoutId = setTimeout(() => ipController.abort(), 2000);
    
    let ipAddress: string | null = null;
    
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: ipController.signal
      });
      
      clearTimeout(ipTimeoutId);
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;
        console.log('IP obtained:', ipAddress);
      }
    } catch (error) {
      console.error('Error getting IP:', error);
      clearTimeout(ipTimeoutId);
    }

    // Get geo data in parallel if we have IP
    let geoData: GeoData = {
      cidade: null,
      estado: null,
      pais: null,
      pagina: currentUrl || '',
      user_agent: userAgent || ''
    };

    if (ipAddress) {
      const geoController = new AbortController();
      const geoTimeoutId = setTimeout(() => geoController.abort(), 2000);
      
      try {
        const geoResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
          signal: geoController.signal,
          headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(geoTimeoutId);
        
        if (geoResponse.ok) {
          const geoApiData = await geoResponse.json();
          
          if (!geoApiData.error) {
            geoData.cidade = geoApiData.city || null;
            geoData.estado = geoApiData.region || null;
            geoData.pais = geoApiData.country_name || null;
            console.log('Geo data obtained:', geoData);
          }
        }
      } catch (error) {
        console.error('Error getting geo data:', error);
        clearTimeout(geoTimeoutId);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        ip: ipAddress,
        geoData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to get IP/Geo data',
        ip: null,
        geoData: {
          cidade: null,
          estado: null,
          pais: null,
          pagina: '',
          user_agent: ''
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 // Return 200 even on error to not break the flow
      }
    );
  }
});
