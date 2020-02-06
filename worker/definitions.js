const definitions = [
  // --------------------------------------
  {
    domaineIds: ['c'],
    typeIds: ['ap'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['ar'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pc'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['c'],
    typeIds: ['ap'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['ar'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pc'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['c'],
    typeIds: ['ap'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['c'],
    typeIds: ['ar'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['c'],
    typeIds: ['pc'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['f'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['f'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['f'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['f'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['f'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['f'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['g'],
    typeIds: ['ar'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['px'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['g'],
    typeIds: ['ar'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['px'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['g'],
    typeIds: ['ar'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['g'],
    typeIds: ['px'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['h'],
    typeIds: ['ap'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['px'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['h'],
    typeIds: ['ap'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['px'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['h'],
    typeIds: ['ap'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['h'],
    typeIds: ['px'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['m'],
    typeIds: ['ap'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ar'],
    statutIds: ['val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ax'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['px'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ap'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ax'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['px'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ap'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ar'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ax'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['px'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['m'],
    typeIds: ['ar'],
    statutIds: ['dmc']
  },
  // --------------------------------------
  {
    domaineIds: ['s'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['s'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['s'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['s'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['s'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['s'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  // --------------------------------------
  {
    domaineIds: ['w'],
    typeIds: ['ap'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cx'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['pr'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['ar'],
    statutIds: ['mod', 'val']
  },
  {
    domaineIds: ['w'],
    typeIds: ['ap'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cx'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['pr'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['ar'],
    statutIds: ['dmi']
  },
  {
    domaineIds: ['w'],
    typeIds: ['ap'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['cx'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['pr'],
    statutIds: ['ech']
  },
  {
    domaineIds: ['w'],
    typeIds: ['ar'],
    statutIds: ['ech']
  }
]

module.exports = definitions
