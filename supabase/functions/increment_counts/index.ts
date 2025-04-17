
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { action, videoId } = await req.json();
    
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: "videoId is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "view") {
      const { data, error } = await supabaseClient
        .from("completed_videos")
        .update({ view_count: supabaseClient.rpc("increment", { value: 1 }) })
        .eq("id", videoId)
        .select("view_count")
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, count: data.view_count }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else if (action === "share") {
      const { data, error } = await supabaseClient
        .from("completed_videos")
        .update({ share_count: supabaseClient.rpc("increment", { value: 1 }) })
        .eq("id", videoId)
        .select("share_count")
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, count: data.share_count }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use 'view' or 'share'." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
