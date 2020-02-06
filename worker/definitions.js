const definitions = [
  // --------------------------------------
  {
    domaineIds: ['c'],
    typeIds: ['apc'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['arc'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pxc'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['apc'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['arc'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pxc'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['apc'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['c'],
    typeIds: ['arc'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pxc'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['f'],
    typeIds: ['cxf'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['f'],
    typeIds: ['prf'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['f'],
    typeIds: ['cxf'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['f'],
    typeIds: ['prf'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['f'],
    typeIds: ['cxf'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['f'],
    typeIds: ['prf'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['g'],
    typeIds: ['arg'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cxg'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['prg'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pxg'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['arg'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cxg'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['prg'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pxg'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['arg'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cxg'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['prg'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pxg'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['h'],
    typeIds: ['aph'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cxh'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['prh'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pxh'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['aph'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cxh'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['prh'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pxh'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['aph'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cxh'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['prh'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pxh'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['m'],
    typeIds: ['apm'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['arm'],
    statutIds: ['val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['axm'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cxm'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['prm'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pxm'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['apm'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['axm'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cxm'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['prm'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pxm'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['apm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['arm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['axm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cxm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['prm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pxm'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['arm'],
    statutIds: ['dmc']
  },
  // --------------------------------------
  {
    domaineIds: ['s'],
    typeIds: ['cxs'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['s'],
    typeIds: ['prs'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['s'],
    typeIds: ['cxs'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['s'],
    typeIds: ['prs'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['s'],
    typeIds: ['cxs'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['s'],
    typeIds: ['prs'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['w'],
    typeIds: ['apw'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cxw'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['prw'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['arc'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['apw'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cxw'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['prw'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['arc'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['apw'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cxw'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['prw'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['arc'],
    statutIds: ['ech']
  }
]

module.exports = definitions
