import React,{useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion,AnimatePresence,MotionConfig} from 'motion/react';
import {ArrowUpRight,ArrowRight,Check,ChevronLeft,ChevronRight,Sun,Globe2,HelpCircle,X,Waves,MapPin,Minus,Plus,RotateCcw} from 'lucide-react';
import {AnimatedNumber} from './AnimatedNumber';
import './style.css';
import {zoneForSeat} from './zones';
import BeachMap,{seatName} from './BeachMap';

const occupied=new Set(Array.from({length:512},(_,id)=>id).filter(id=>(id*37+11)%19<5));
const periods=[{label:'TOATĂ ZIUA',hours:'10:00 — 20:00'},{label:'DIMINEAȚĂ & PRÂNZ',hours:'10:00 — 16:00'},{label:'SEARĂ',hours:'16:00 — 20:00'}];
const initialDay=new Date(2026,6,18);
const rate=id=>zoneForSeat(id).price;
const fmt=(day)=>new Intl.DateTimeFormat('ro-RO',{day:'numeric',month:'long'}).format(day);
function App(){
 const [day,setDay]=useState(0),[selected,setSelected]=useState([]),[period,setPeriod]=useState(periods[0]),[modal,setModal]=useState(null),[done,setDone]=useState(false),[lang,setLang]=useState(false);
 const closeRef=useRef(null),lastFocus=useRef(null);
 useEffect(()=>{const dock=document.querySelector('.kiosk>footer'),root=dock.closest('.kiosk');const measure=()=>root.style.setProperty('--booking-dock-height',dock.getBoundingClientRect().height+'px');const observer=new ResizeObserver(measure);observer.observe(dock);measure();return()=>observer.disconnect()},[]);
 useEffect(()=>{if(modal){lastFocus.current=document.activeElement;closeRef.current?.focus()}else lastFocus.current?.focus()},[modal]);
 const total=selected.reduce((a,id)=>a+rate(id),0);
 const date=new Date(initialDay);date.setDate(date.getDate()+day);
 function toggle(id){if(!occupied.has(id))setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])}
 function changeDay(n){setDay(Math.max(0,n));setSelected([])}
 return <MotionConfig reducedMotion="user"><main className="kiosk">
 <header><a className="brand" href="#" aria-label="Golful Pescarilor"><img src={import.meta.env.BASE_URL + "logo-oficial.png"} alt="Restaurant Golful Pescarilor — Plaja Agigea"/></a><div className="header-right"><span className="beach-club">BEACH CLUB<br/>AGIGEA, ROMÂNIA</span><button className="language" onClick={()=>setLang(!lang)} aria-expanded={lang}><Globe2 size={17}/> RO</button>{lang&&<div className="language-pop">Română <Check size={16}/><small>Alte limbi — în curând</small></div>}</div></header>
 <section className="intro"><div className="eyebrow"><span/> SALT IN THE AIR. SLOW DAYS.</div><motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}}>Un loc la soare.<br/><span>Doar al tău.</span><span className="hero-sun">☀</span></motion.h1><p>Alege-ți șezlongul. De restul se ocupă marea.</p><div className="weather"><Sun size={23}/><strong>28°</strong><span>O zi perfectă<br/>pentru mare</span></div></section>
 <nav className="steps" aria-label="Pașii rezervării"><span className="active"><b>01</b> Alege locul</span><span className="step-line"/><span><b>02</b> Rezervarea ta</span><span className="step-line"/><span><b>03</b> Enjoy the sun</span></nav>
 <section className="date-panel"><div><span className="overline">ZIUA TA DE PLAJĂ</span><strong>{fmt(date)} <span>2026</span></strong></div><div className="date-actions"><button disabled={day===0} onClick={()=>changeDay(day-1)} aria-label="Ziua precedentă"><ChevronLeft/></button><button className="today" onClick={()=>changeDay(0)}>{day===0?'Zi demo':`+${day} zile`}</button><button onClick={()=>changeDay(day+1)} aria-label="Ziua următoare"><ChevronRight/></button></div><span className="date-divider"/><div className="hours"><span className="overline">FĂRĂ GRABĂ</span><strong>{period.hours}</strong></div></section>
 <section className="map-section"><div className="section-heading"><div><span className="overline">512 ȘEZLONGURI · 128 UMBRELE</span><h2>Unde stăm azi?</h2></div><span className="availability"><i/>{512-occupied.size} locuri libere</span></div>
 <BeachMap selected={selected} occupied={occupied} toggle={toggle} rate={rate}/>
 <div className="legend"><span><i className="free"/>Disponibil</span><span><i className="selected"/>Selectat</span><span><i className="taken"/>Ocupat</span><span><i className="vip-dot"/>VIP</span><button onClick={()=>setModal('help')}><HelpCircle size={17}/> Cum aleg?</button></div></section>
 <section className="amenities"><div className="amenity-icon"><Waves size={23}/></div><div><strong>Mai puține griji. Mai multă mare.</strong><p>Umbrelă inclusă · Wi-Fi · Acces dușuri</p></div><span className="little-sun">✳</span></section>
 <footer><div className="filters booking-periods" aria-label="Perioada rezervării">{periods.map(p=><button key={p.label} className={period.label===p.label?'chosen':''} aria-pressed={period.label===p.label} onClick={()=>setPeriod(p)}>{period.label===p.label&&<motion.span layoutId="filter" className="filter-bg" transition={{type:'spring',bounce:.15,duration:.4}}/>}<span>{p.label}</span><small>{p.hours}</small></button>)}<span className="price-from">de la <b>50 lei</b> / zi</span></div><div className="selection-info"><div><h3>{selected.length?`${selected.length} șezlong${selected.length===1?'':'uri'} selectat${selected.length===1?'':'e'}`:'Soarele te așteaptă.'}</h3><span className="selection-hint">{selected.length?selected.map(seatName).join(' · '):'Atinge un șezlong disponibil pe hartă.'}</span></div>{!!selected.length&&<button className="reset" onClick={()=>setSelected([])} aria-label="Șterge selecția"><RotateCcw size={19}/></button>}<div className="total"><strong><AnimatedNumber value={total}/><small> lei</small></strong><span>{period.label.toLocaleLowerCase('ro-RO')}</span></div></div><button className="continue" disabled={!selected.length} onClick={()=>{setDone(false);setModal('booking')}}><span>Continuă cu rezervarea</span><ArrowRight size={25}/></button><div className="footer-bottom"><span>MADE FOR SLOW SUMMERS.</span><button onClick={()=>setModal('help')}>Ai nevoie de ajutor? <ArrowUpRight size={14}/></button></div></footer>
 <AnimatePresence>{modal&&<motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setModal(null)}><motion.section role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="modal" initial={{y:70,opacity:0}} animate={{y:0,opacity:1}} exit={{y:70,opacity:0}} onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')setModal(null);if(e.key==='Tab'){const els=e.currentTarget.querySelectorAll('button');const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}><button ref={closeRef} className="close" onClick={()=>setModal(null)} aria-label="Închide"><X/></button><span className="modal-mark">{done?<Check size={40}/>:<Sun size={40}/>}</span><span className="overline">{modal==='help'?'UN PIC MAI APROAPE DE VACANȚĂ':'YOUR LITTLE PATCH OF PARADISE'}</span><h2 id="dialog-title">{modal==='help'?'Locul perfect, într-o atingere.':done?'Ne vedem la mare.':'O zi numai pentru tine.'}</h2>{modal==='help'?<><p>Mărește harta cu două degete sau cu rotița mouse-ului. Trage pentru a te deplasa. Atinge șezlongurile verzi pentru a le selecta individual. Fiecare grup are 4 șezlonguri: două în stânga umbrelei și două în dreapta.</p><p>VIP: 150 lei · Prima linie: 90 lei · Zona centrală: 70 lei · Zona relax: 50 lei / șezlong. Tarife demo. Locurile gri sunt ocupate.</p><button className="continue" onClick={()=>setModal(null)}>Am înțeles <ArrowRight/></button></>:done?<><p>Așa va arăta confirmarea rezervării tale. Acesta este un prototip de design — nu s-a făcut nicio rezervare și nu s-a efectuat nicio plată.</p><button className="continue" onClick={()=>{setModal(null);setSelected([])}}>Înapoi la plajă <ArrowRight/></button></>:<><p>{fmt(date)} 2026 · {period.label.toLocaleLowerCase('ro-RO')} · {period.hours}</p><div className="booking-details"><span>{selected.length} {selected.length===1?"șezlong":"șezlonguri"} + umbrelă inclusă</span><strong>{total} lei</strong></div><p className="demo-note">Previzualizare design. Disponibilitatea și tarifele sunt demonstrative.</p><button className="continue" onClick={()=>setDone(true)}>Vezi confirmarea demo <ArrowRight/></button></>}</motion.section></motion.div>}</AnimatePresence>
 </main></MotionConfig>
}
createRoot(document.getElementById('root')).render(<App/>);
import './map-layout.css';
import './fullscreen-map.css';

import './compact-controls.css';
import './desktop-layout.css';
import './sidebar-layout.css';
import './vector-camera.css';

import './brand-periods.css';

import './booking-periods.css';



import './mobile-compact.css';
