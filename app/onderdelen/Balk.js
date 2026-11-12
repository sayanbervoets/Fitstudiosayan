'use client';

import Link from 'next/link';
import Logo from './Logo';
import { useEffect, useRef, useState } from 'react';
import { bedrijf } from '@/lib/bedrijf';

const menu = [
  ['Aanbod', '/aanbod/'],
  ['Tarieven', '/tarieven/'],
  ['Rooster', '/trainingstijden/'],
  ['Webshop', '/webshop/'],
  ['Over ons', '/waarom-trainen-bij-sayan/'],
  ['De Sportwagen', '/de-sportwagen-friesland/'],
  ['Ervaringen', '/recensies/'],
  ['Contact', '/contact/'],
];

export default function Balk() {
  const [gescrold, zetGescrold] = useState(false);
  const [open, zetOpen] = useState(false);
  const balkRef = useRef(null);

  // Doorzichtig mag alleen boven een donkere hero. Op een pagina zonder hero
  // stond het witte logo op een witte achtergrond en was de balk onleesbaar.
  useEffect(() => {
    const heeftHero = !!document.querySelector('.hero');
    const meet = () => zetGescrold(!heeftHero || window.scrollY > 40);
    meet();
    if (!heeftHero) return;
    window.addEventListener('scroll', meet, { passive: true });
    return () => window.removeEventListener('scroll', meet);
  }, []);

  // Achtergrond niet mee laten scrollen zolang het menu openstaat.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Op mobiel sluit het menu met Escape en bij tikken buiten de balk.
  useEffect(() => {
    if (!open) return;
    const toets = (e) => { if (e.key === 'Escape') zetOpen(false); };
    const tik = (e) => { if (balkRef.current && !balkRef.current.contains(e.target)) zetOpen(false); };
    document.addEventListener('keydown', toets);
    document.addEventListener('pointerdown', tik);
    return () => {
      document.removeEventListener('keydown', toets);
      document.removeEventListener('pointerdown', tik);
    };
  }, [open]);

  return (
    <header ref={balkRef} className={`balk${gescrold || open ? ' balk-vast' : ''}`}>
      <div className="omhulsel balk-in">
        <Link href="/" className="balk-logo" aria-label="Fitstudio Sayan, naar de startpagina">
          <Logo hoogte={38} licht={!gescrold && !open} />
        </Link>

        <nav className="balk-nav">
          {menu.slice(0, 5).map(([naam, pad]) => (
            <Link key={pad} href={pad}>
              {naam}
            </Link>
          ))}
        </nav>

        <Link href="/proefles/" className="knop knop-vuur knop-klein balk-knop">
          Gratis proefles
        </Link>

        <button
          type="button"
          className="hamburger"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          aria-controls="uitklapmenu"
          onClick={() => zetOpen((v) => !v)}
        >
          <span className={open ? 'kruis' : ''} />
          <span className={open ? 'kruis' : ''} />
          <span className={open ? 'kruis' : ''} />
        </button>
      </div>

      <div id="uitklapmenu" className={`uitklap${open ? ' uitklap-open' : ''}`} hidden={!open}>
        <nav>
          {menu.map(([naam, pad]) => (
            <Link key={pad} href={pad} onClick={() => zetOpen(false)}>
              {naam}
            </Link>
          ))}
        </nav>
        <div className="uitklap-onder">
          <Link href="/proefles/" className="knop knop-vuur" onClick={() => zetOpen(false)}>
            Gratis proefles aanvragen
          </Link>
          <p>
            <a href={`tel:${bedrijf.telefoon.replace(/\s/g, '')}`}>{bedrijf.telefoonNet}</a>
            <br />
            <a href={`mailto:${bedrijf.email}`}>{bedrijf.email}</a>
            <br />
            {bedrijf.straat}, {bedrijf.postcode} {bedrijf.plaats}
          </p>
        </div>
      </div>
    </header>
  );
}
