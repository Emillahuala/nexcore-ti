/**
 * Require packages: npm install @googleapis/searchconsole dotenv
 */
const { searchconsole } = require('@googleapis/searchconsole');
require('dotenv').config();

async function getLowHangingKeywords() {
  const sc = searchconsole('v1');
  const auth = new sc.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SA_CREDENTIALS, // path to service account json
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const client = await auth.getClient();
  
  const siteUrl = 'https://nexcore-ti.com';
  const startDate = '2023-01-01';
  const endDate = '2023-12-31';

  try {
    const response = await sc.searchanalytics.query({
      auth: client,
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50,
      },
    });

    const rows = response.data.rows || [];
    
    // Filtro para extraer keywords "frutos bajos": posicion 8-15 y al menos 1000 impresiones
    const lowHanging = rows.filter(r => r.position >= 8 && r.position <= 15 && r.impressions >= 1000);
    
    console.log('--- Oportunidades SEO de bajo esfuerzo ---');
    lowHanging.forEach(r => {
      console.log(`Keyword: ${r.keys[0]} | Impr: ${r.impressions} | Clics: ${r.clicks} | Pos: ${r.position.toFixed(1)}`);
    });
    
    // Aquí podrías enviar estos datos a una API de LLM para obtener sugerencias de contenido...
  } catch (error) {
    console.error('Error al conectarse a GSC:', error.message);
  }
}

getLowHangingKeywords();
