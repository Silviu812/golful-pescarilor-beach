// Zone definitions are independent of presentation; a layout editor can assign seats by ID.
export const zones = [
 {id:'vip',label:'VIP',price:150,color:'#d3ad67',stroke:'#89632e',seatIds:Array.from({length:64},(_,i)=>i)},
 {id:'front',label:'Prima linie',price:90,color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:64},(_,i)=>i+64)},
 {id:'standard',label:'Standard',price:70,color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:192},(_,i)=>i+128)},
 {id:'relax',label:'Zona relax',price:50,color:'#9cbb92',stroke:'#4e7053',seatIds:Array.from({length:192},(_,i)=>i+320)},
];
const bySeat=new Map(zones.flatMap(zone=>zone.seatIds.map(id=>[id,zone])));
export const zoneForSeat=id=>bySeat.get(id)||zones[2];

