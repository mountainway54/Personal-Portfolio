export const definitions = [
  {name:'V',x:33.85,w:465.16,bottom:266.52,shape:'<polygon points="33.85,25.48 67.43,25.48 266.52,159.67 465.47,25.48 499.01,25.48 266.52,182.29"/>'},
  {name:'V',x:253.79,w:465.16,bottom:486.46,shape:'<polygon points="253.79,25.48 287.36,25.48 486.46,159.67 685.41,25.48 718.95,25.48 486.46,182.29"/>'},
  {name:'I',x:788.35,w:18.76,shape:'<rect x="788.35" y="25.48" width="18.76" height="64.74"/><rect x="788.35" y="114.97" width="18.76" height="64.75"/>'},
  {name:'L',x:904.51,w:156.51,shape:'<path d="M904.51 25.48H923.27V160.96H1061.02V179.73H904.51Z"/>'},
  {name:'L',x:1061.02,w:156.5,shape:'<path d="M1061.02 25.48H1079.78V160.96H1217.52V179.73H1061.02Z"/>'},
  {name:'L',x:1217.52,w:93.64,shape:'<path d="M1217.52 25.48H1236.28V160.96H1311.16V179.73H1217.52Z"/>'},
  {name:'I',x:1363.43,w:18.76,shape:'<rect x="1363.43" y="25.48" width="18.76" height="64.74"/><rect x="1363.43" y="114.97" width="18.76" height="64.75"/>'},
  {name:'N',x:1490.52,w:210,shape:'<polygon points="1700.52,25.48 1700.52,184.78 1509.28,55.7 1509.28,179.73 1490.52,179.73 1490.52,20.43 1681.76,149.38 1681.76,25.48"/>'}
];

export function shape(index: number, scale = 1) {
  const d = definitions[index]!
  const width = d.w * scale
  // Preserve the original outlines at rest and the perpendicular thickness in motion.
  if (d.name === 'I' || Math.abs(scale - 1) < 0.00001) return d.shape
  if (d.name === 'V') {
    const bottom = d.x + (d.bottom! - d.x) * scale
    const right = d.x + width
    const slope = (182.29 - 25.48) / (bottom - d.x)
    const innerOffset = 18.76 * Math.sqrt(1 + slope * slope)
    const inset = innerOffset / slope
    return `<polygon points="${d.x},25.48 ${d.x + inset},25.48 ${bottom},${182.29 - innerOffset} ${right - inset},25.48 ${right},25.48 ${bottom},182.29"/>`
  }
  const left = d.x + 9.38
  const right = d.x + width - 9.38
  const path = d.name === 'L'
    ? `M${left} 25.48V170.345H${d.x + width}`
    : `M${left} 179.73V38.065L${right} 167.08V25.48`
  return `<path d="${path}" fill="none" stroke="currentColor" stroke-width="18.76" stroke-linejoin="miter" stroke-linecap="butt"/>`
}

