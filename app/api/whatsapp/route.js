// Ontvangt binnenkomende WhatsApp-berichten via de Twilio (sandbox) webhook.
//
// Fase 1 (dit bestand nu): alleen een directe echo-reactie via TwiML, puur om
// de hele keten te verifiëren: WhatsApp -> Twilio -> deze route -> terug naar
// WhatsApp. Er wordt hier nog niets naar een AI-model of de agenda gestuurd.
//
// Twilio stuurt het bericht als 'application/x-www-form-urlencoded' met
// velden zoals 'From' (bv. "whatsapp:+316...") en 'Body' (de tekst).
export async function POST(verzoek) {
  const data = await verzoek.formData().catch(() => null);
  if (!data) {
    return nieuweTwiml('Kon het bericht niet lezen.');
  }

  const van = data.get('From') || 'onbekend';
  const tekst = (data.get('Body') || '').trim();

  console.log(`WhatsApp van ${van}: ${tekst}`);

  if (!tekst) {
    return nieuweTwiml('Ik heb niets ontvangen, kun je het nog eens proberen?');
  }

  // Tijdelijke test-reactie. Wordt in de volgende fase vervangen door de
  // AI-agent die de agenda checkt en zelf verplaatst/afzegt.
  return nieuweTwiml(`Ontvangen: "${tekst}". De slimme agent komt in de volgende stap — dit bevestigt dat de verbinding werkt.`);
}

function nieuweTwiml(bericht) {
  const veilig = bericht
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${veilig}</Message></Response>`;
  return new Response(twiml, {
    status: 200,
    headers: { 'content-type': 'text/xml' },
  });
}
