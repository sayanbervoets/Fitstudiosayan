// Neemt proeflesaanvragen aan. Zonder ingestelde PROEFLES_WEBHOOK antwoordt
// deze route bewust met 503, zodat het formulier terugvalt op WhatsApp in
// plaats van een aanvraag te laten verdwijnen in een succesmelding.
export async function POST(verzoek) {
  const aanvraag = await verzoek.json().catch(() => null);
  if (!aanvraag?.naam || !aanvraag?.telefoon) {
    return Response.json({ fout: 'naam en telefoon zijn verplicht' }, { status: 400 });
  }

  const doel = process.env.PROEFLES_WEBHOOK;
  if (!doel) return Response.json({ fout: 'nog geen ontvanger ingesteld' }, { status: 503 });

  try {
    const r = await fetch(doel, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...aanvraag, ontvangen: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error(`ontvanger gaf ${r.status}`);
    return Response.json({ ok: true });
  } catch (e) {
    console.error('proefles doorsturen mislukt:', e.message);
    return Response.json({ fout: 'doorsturen mislukt' }, { status: 502 });
  }
}
