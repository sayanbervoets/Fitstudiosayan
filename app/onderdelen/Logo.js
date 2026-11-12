// Het echte logo van Fitstudio Sayan (van fitstudiosayan.nl), bijgesneden en
// transparant gemaakt. Op een donkere achtergrond de lichte versie: het
// donkerblauw is daarin wit, het limoen blijft.
export default function Logo({ hoogte = 40, licht = false }) {
  const h = Math.round(hoogte * 1.35);
  return (
    <img
      className="merk-logo"
      src={licht ? '/logo/fitstudio-sayan-licht.png' : '/logo/fitstudio-sayan.png'}
      alt="Fitstudio Sayan"
      width={Math.round((h * 1124) / 421)}
      height={h}
      style={{ height: h, width: 'auto', display: 'block' }}
    />
  );
}
