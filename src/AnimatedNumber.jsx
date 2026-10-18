// Adapted from Motion Primitives (MIT), ibelick.
// https://github.com/ibelick/motion-primitives/blob/main/components/core/animated-number.tsx
import {motion,useSpring,useTransform} from 'motion/react';
import {useEffect} from 'react';
export function AnimatedNumber({value,className}) {
 const spring=useSpring(value,{stiffness:160,damping:26});
 const display=useTransform(spring,current=>Math.round(current).toLocaleString('ro-RO'));
 useEffect(()=>{spring.set(value)},[spring,value]);
 return <motion.span className={className} style={{fontVariantNumeric:'tabular-nums'}}>{display}</motion.span>;
}
