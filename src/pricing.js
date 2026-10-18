export const periods = [
 {label:'TOATĂ ZIUA',hours:'10:00 — 20:00',price:50},
 {label:'DIMINEAȚĂ & PRÂNZ',hours:'10:00 — 16:00',price:40},
 {label:'SEARĂ',hours:'16:00 — 20:00',price:20},
];
export const bookingTotal=(selected,period)=>selected.length*period.price;
