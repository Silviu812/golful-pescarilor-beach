function Palm({x,y,rotation=0,size=1}){return <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${size})`}><ellipse cx="12" cy="17" rx="31" ry="19" fill="#6d7759" opacity=".12"/><path d="M0 0 Q9 17 6 29" fill="none" stroke="#b49a6d" strokeWidth="6"/>{Array.from({length:7},(_,n)=><g key={n} transform={`rotate(${n*51})`}><path d="M0 0 Q-23 -29 -3 -48 Q13 -30 0 0" fill={n%2?'#789773':'#94ab7e'} stroke="#698768" strokeWidth=".7"/><path d="M0 0 L-3 -42" stroke="#607f60" strokeWidth=".8" opacity=".65"/></g>)}<circle r="5" fill="#a59158"/></g>}
export default function BeachSurroundings(){return <g pointerEvents="none" aria-hidden="true">
 <path d="M337 130V2800M862 130V2800" stroke="#e6dfc9" strokeWidth="30"/>
 {Array.from({length:12},(_,i)=>140+i*235).map((y,i)=><g key={y}><Palm x={337} y={y} size={.48} rotation={i*29}/><Palm x={865} y={y+70} size={.48} rotation={i*37}/></g>)}
 <rect x="320" y="2905" width="560" height="65" rx="8" fill="#dfc9a5" stroke="#c4ac85"/>
 {Array.from({length:37},(_,i)=><path key={i} d={`M${330+i*15} 2908v59`} stroke="#c4ac85" opacity=".5"/>)}
 <text x="600" y="2943" textAnchor="middle" fontSize="10" letterSpacing="3" fill="#8d7858">PROMENADĂ</text>
 <g transform="translate(385 3000)"><rect width="150" height="76" rx="6" fill="#f4e8ce" stroke="#bca77c"/><rect x="8" y="8" width="134" height="36" fill="#a9bdad"/>{Array.from({length:7},(_,i)=><rect key={i} x={8+i*20} y="8" width="10" height="36" fill="#f8f2df"/>)}<rect x="8" y="53" width="134" height="13" fill="#c5a77a"/><text x="75" y="100" textAnchor="middle" fontSize="10" fill="#7c8169">BEACH BAR</text></g>
 <g transform="translate(695 3000)"><rect width="120" height="76" rx="6" fill="#e0e7dc" stroke="#b8c8bc"/>{[0,1,2].map(i=><g key={i}><rect x={8+i*38} y="8" width="28" height="60" rx="4" fill="#c1d7d1"/><circle cx={22+i*38} cy="24" r="6" fill="#e9f0e6"/></g>)}<text x="60" y="100" textAnchor="middle" fontSize="10" fill="#7c8169">DUȘURI</text></g>
 <Palm x={335} y={3050} size={.6}/><Palm x={865} y={3050} size={.6}/>
 </g>}
