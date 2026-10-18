// Zone definitions are independent of presentation; a layout editor can assign seats by ID.
export const zones = [
 {id:'front',label:'Prima linie',color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:128},(_,i)=>i)},
 {id:'standard',label:'Standard',color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:192},(_,i)=>i+128)},
 {id:'relax',label:'Zona relax',color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:192},(_,i)=>i+320)},
];
const bySeat=new Map(zones.flatMap(zone=>zone.seatIds.map(id=>[id,zone])));
export const zoneForSeat=id=>bySeat.get(id)||zones[1];

