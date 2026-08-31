/**
 * Translation of ESPN's match commentary, which only exists in English —
 * their API's `lang` parameter changes the feed, not the language. The
 * commentary is highly templated: on a five-match sample the patterns
 * below covered 100% of the 583 lines observed, so pattern translation
 * is enough. Any sentence that matches nothing is returned untouched
 * rather than mangled.
 */

interface Rules {
  // Descriptive fragments, replaced anywhere in the sentence. Order
  // matters: long expressions first, otherwise a short fragment would eat
  // the tail of a longer one.
  fragments: Array<[RegExp, string]>
  // Full sentences. `$1`, `$2`… carry the names and numbers over.
  sentences: Array<[RegExp, string]>
  // Phrases after which French "de" elides before a vowel
  elide: string[]
}

// French
const FR_FRAGMENTS: Rules['fragments'] = [
  // feet and body parts
  [/\bright footed shot\b/g, 'frappe du pied droit'],
  [/\bleft footed shot\b/g, 'frappe du pied gauche'],
  [/\bheader\b/g, 'tête'],

  // shot zones
  [/\bfrom outside the box\b/g, 'de l’extérieur de la surface'],
  [/\bfrom the centre of the box\b/g, 'du centre de la surface'],
  [/\bfrom the right side of the box\b/g, 'du côté droit de la surface'],
  [/\bfrom the left side of the box\b/g, 'du côté gauche de la surface'],
  [/\bfrom very close range\b/g, 'à bout portant'],
  [/\bfrom long range on the right\b/g, 'de loin sur la droite'],
  [/\bfrom long range on the left\b/g, 'de loin sur la gauche'],
  [/\bfrom more than 35 yards\b/g, 'de plus de 30 mètres'],
  [/\bfrom a difficult angle on the right\b/g, 'd’un angle fermé à droite'],
  [/\bfrom a difficult angle on the left\b/g, 'd’un angle fermé à gauche'],

  // shot outcomes
  [/\bis saved in the top right corner\b/g, ', repoussée en haut à droite'],
  [/\bis saved in the top left corner\b/g, ', repoussée en haut à gauche'],
  [/\bis saved in the bottom right corner\b/g, ', repoussée en bas à droite'],
  [/\bis saved in the bottom left corner\b/g, ', repoussée en bas à gauche'],
  [/\bis saved in the centre of the goal\b/g, ', repoussée au centre'],
  [/\bis saved\b/g, ', repoussée'],
  [/\bis blocked\b/g, ', contrée'],
  [/\bis high and wide to the right\b/g, ', mais passe au-dessus et à droite'],
  [/\bis high and wide to the left\b/g, ', mais passe au-dessus et à gauche'],
  [/\bis just a bit too high\b/g, ', mais passe juste au-dessus'],
  [/\bis close, but misses to the right\b/g, ', mais passe tout près à droite'],
  [/\bis close, but misses to the left\b/g, ', mais passe tout près à gauche'],
  [/\bis too high\b/g, ', mais passe au-dessus'],
  [/\bmisses to the right\b/g, ', mais passe à droite'],
  [/\bmisses to the left\b/g, ', mais passe à gauche'],
  [/\bhits the right post\b/g, ', mais touche le poteau droit'],
  [/\bhits the left post\b/g, ', mais touche le poteau gauche'],
  [/\bhits the bar\b/g, ', mais touche la barre'],
  [/\bto the bottom right corner\b/g, ', en bas à droite'],
  [/\bto the bottom left corner\b/g, ', en bas à gauche'],
  [/\bto the top right corner\b/g, ', en haut à droite'],
  [/\bto the top left corner\b/g, ', en haut à gauche'],
  [/\bto the centre of the goal\b/g, ', au centre du but'],

  // assists and phases of play
  [/\bAssisted by\b/g, 'Sur une passe de'],
  [/\bwith a cross\b/g, 'sur un centre'],
  [/\bwith a through ball\b/g, 'sur une passe en profondeur'],
  [/\bwith a headed pass\b/g, 'sur une déviation de la tête'],
  [/\bfollowing a corner\b/g, 'après un corner'],
  [/\bfollowing a fast break\b/g, 'en contre-attaque'],
  [/\bfollowing a set piece situation\b/g, 'sur coup de pied arrêté'],
  [/\bafter a corner\b/g, 'après un corner'],

  // Must stay last: "Assisted by" and "Foul by" are consumed above, only
  // the goalkeeper's "by" remains.
  [/\bby\b/g, 'par'],
]

// French
const FR_SENTENCES: Rules['sentences'] = [
  // VAR decisions
  [
    /^VAR Decision: No Penalty (.+?)\.?$/,
    'Décision VAR : pas de penalty pour $1.',
  ],
  [/^VAR Decision: Penalty (.+?)\.?$/, 'Décision VAR : penalty pour $1.'],
  [/^VAR Decision: Goal (.+?)\.?$/, 'Décision VAR : but accordé à $1.'],
  [/^VAR Decision: No Goal (.+?)\.?$/, 'Décision VAR : but refusé à $1.'],
  [
    /^VAR Decision: Card upgraded (.+?)\.?$/,
    'Décision VAR : carton aggravé pour $1.',
  ],
  [/^VAR Decision: (.+?)\.?$/, 'Décision VAR : $1.'],

  // fouls and free kicks
  [/^Foul by (.+)\.$/, 'Faute de $1.'],
  [/^Hand ?ball by (.+)\.$/, 'Main de $1.'],
  [
    /^(.+) wins a free kick in the defensive half\.$/,
    '$1 obtient un coup franc dans son camp.',
  ],
  [
    /^(.+) wins a free kick in the attacking half\.$/,
    '$1 obtient un coup franc dans le camp adverse.',
  ],
  [
    /^(.+) wins a free kick on the left wing\.$/,
    '$1 obtient un coup franc sur l’aile gauche.',
  ],
  [
    /^(.+) wins a free kick on the right wing\.$/,
    '$1 obtient un coup franc sur l’aile droite.',
  ],

  // cards
  [
    /^(.+) is shown the yellow card for a bad foul\.$/,
    '$1 reçoit un carton jaune pour une faute.',
  ],
  [
    /^(.+) is shown the yellow card for excessive celebration\.$/,
    '$1 reçoit un carton jaune pour célébration excessive.',
  ],
  [
    /^(.+) is shown the yellow card for hand ?ball\.$/,
    '$1 reçoit un carton jaune pour une main.',
  ],
  [
    /^(.+) is shown the red card for violent conduct\.$/,
    '$1 est expulsé pour comportement violent.',
  ],
  [/^(.+) is shown the yellow card\.$/, '$1 reçoit un carton jaune.'],
  [
    /^(.+) is shown the red card for a bad foul\.$/,
    '$1 reçoit un carton rouge pour une faute.',
  ],
  [
    /^Second yellow card to (.+)\.$/,
    'Deuxième carton jaune pour $1, qui est expulsé.',
  ],
  [/^(.+) is shown the red card\.$/, '$1 est expulsé.'],

  // corners, offsides, penalties
  [/^Corner, (.+)\. Conceded by (.+)\.$/, 'Corner pour $1, concédé par $2.'],
  [/^Corner, (.+)\.$/, 'Corner pour $1.'],
  [
    /^Offside, (.+)\. (.+) tries a through ball, but (.+) is caught offside\.$/,
    'Hors-jeu, $1. $2 tente une passe en profondeur, mais $3 est signalé hors-jeu.',
  ],
  [/^Offside, (.+)\.$/, 'Hors-jeu, $1.'],
  [
    /^Penalty conceded by (.+) after a foul in the penalty area\.$/,
    'Penalty concédé par $1 après une faute dans la surface.',
  ],
  [
    /^Penalty (.+)\. (.+) draws a foul in the penalty area\.$/,
    'Penalty pour $1. $2 obtient une faute dans la surface.',
  ],
  [/^Penalty saved!(.*)$/, 'Penalty arrêté !$1'],
  [/^Penalty missed!(.*)$/, 'Penalty manqué !$1'],

  // shots and goals: the head is fixed, the tail goes through the fragments
  [/^Attempt missed\.(.*)$/, 'Frappe manquée.$1'],
  [/^Attempt saved\.(.*)$/, 'Frappe arrêtée.$1'],
  [/^Attempt blocked\.(.*)$/, 'Frappe contrée.$1'],
  [/^Goal!(.*)$/, 'But !$1'],
  [/^Own Goal by (.+)\.$/, 'But contre son camp de $1.'],

  // substitutions and injuries
  [
    /^Substitution, (.+)\. (.+) replaces (.+) because of an injury\.$/,
    'Changement, $1 : $2 remplace $3, blessé.',
  ],
  [
    /^Substitution, (.+)\. (.+) replaces (.+)\.$/,
    'Changement, $1 : $2 remplace $3.',
  ],
  [
    /^Delay in match because of an injury (.+)\.$/,
    'Interruption : $1 est blessé.',
  ],
  [/^Delay in match (.+)\.$/, 'Interruption du match : $1.'],
  [/^Delay over\. They are ready to continue\.$/, 'Reprise du jeu.'],
  [/^Delay over\.(.*)$/, 'Reprise du jeu.$1'],

  // match milestones
  [
    /^Lineups are announced and players are warming up\.$/,
    'Les compositions sont annoncées, les joueurs s’échauffent.',
  ],
  [/^First Half begins\.$/, 'Coup d’envoi.'],
  [/^First Half ends, (.+) (\d+), (.+) (\d+)\.$/, 'Mi-temps : $1 $2, $3 $4.'],
  [
    /^Second Half begins (.+) (\d+), (.+) (\d+)\.$/,
    'Reprise de la seconde période : $1 $2, $3 $4.',
  ],
  [
    /^Second Half ends, (.+) (\d+), (.+) (\d+)\.$/,
    'Fin de la seconde période : $1 $2, $3 $4.',
  ],
  [/^Match ends, (.+) (\d+), (.+) (\d+)\.$/, 'Fin du match : $1 $2, $3 $4.'],
  [
    /^The match official has announced (\d+) minutes of added time\.$/,
    'L’arbitre annonce $1 minutes de temps additionnel.',
  ],
  [
    /^Fourth official has announced (\d+) minutes of added time\.$/,
    'Le quatrième arbitre annonce $1 minutes de temps additionnel.',
  ],
  [/^Delay in match for a drinks break\.$/, 'Pause fraîcheur.'],
]

// "Sur une passe de Angel" → "d'Angel". Applied only after known phrases
// so a club name containing "de" never gets clipped.

const FR_ELIDE = [
  'Sur une passe de',
  'Faute de',
  'Main de',
  'But contre son camp de',
]

// Spanish
const ES_FRAGMENTS: Rules['fragments'] = [
  [/\bright footed shot\b/g, 'disparo con la derecha'],
  [/\bleft footed shot\b/g, 'disparo con la izquierda'],
  [/\bheader\b/g, 'cabezazo'],

  [/\bfrom outside the box\b/g, 'desde fuera del área'],
  [/\bfrom the centre of the box\b/g, 'desde el centro del área'],
  [/\bfrom the right side of the box\b/g, 'desde la banda derecha del área'],
  [/\bfrom the left side of the box\b/g, 'desde la banda izquierda del área'],
  [/\bfrom very close range\b/g, 'a bocajarro'],
  [/\bfrom long range on the right\b/g, 'desde lejos por la derecha'],
  [/\bfrom long range on the left\b/g, 'desde lejos por la izquierda'],
  [/\bfrom more than 35 yards\b/g, 'desde más de 30 metros'],
  [
    /\bfrom a difficult angle on the right\b/g,
    'desde un ángulo difícil por la derecha',
  ],
  [
    /\bfrom a difficult angle on the left\b/g,
    'desde un ángulo difícil por la izquierda',
  ],

  [/\bis saved in the top right corner\b/g, ', atajado arriba a la derecha'],
  [/\bis saved in the top left corner\b/g, ', atajado arriba a la izquierda'],
  [/\bis saved in the bottom right corner\b/g, ', atajado abajo a la derecha'],
  [/\bis saved in the bottom left corner\b/g, ', atajado abajo a la izquierda'],
  [/\bis saved in the centre of the goal\b/g, ', atajado en el centro'],
  [/\bis saved\b/g, ', atajado'],
  [/\bis blocked\b/g, ', bloqueado'],
  [
    /\bis high and wide to the right\b/g,
    ', pero se va alto y desviado a la derecha',
  ],
  [
    /\bis high and wide to the left\b/g,
    ', pero se va alto y desviado a la izquierda',
  ],
  [/\bis just a bit too high\b/g, ', pero se va un poco alto'],
  [
    /\bis close, but misses to the right\b/g,
    ', pero se va cerca por la derecha',
  ],
  [
    /\bis close, but misses to the left\b/g,
    ', pero se va cerca por la izquierda',
  ],
  [/\bis too high\b/g, ', pero se va alto'],
  [/\bmisses to the right\b/g, ', pero se va desviado a la derecha'],
  [/\bmisses to the left\b/g, ', pero se va desviado a la izquierda'],
  [/\bhits the right post\b/g, ', pero da en el palo derecho'],
  [/\bhits the left post\b/g, ', pero da en el palo izquierdo'],
  [/\bhits the bar\b/g, ', pero da en el larguero'],
  [/\bto the bottom right corner\b/g, ', abajo a la derecha'],
  [/\bto the bottom left corner\b/g, ', abajo a la izquierda'],
  [/\bto the top right corner\b/g, ', arriba a la derecha'],
  [/\bto the top left corner\b/g, ', arriba a la izquierda'],
  [/\bto the centre of the goal\b/g, ', al centro de la portería'],

  [/\bAssisted by\b/g, 'Asistencia de'],
  [/\bwith a cross\b/g, 'con un centro'],
  [/\bwith a through ball\b/g, 'con un pase en profundidad'],
  [/\bwith a headed pass\b/g, 'con un pase de cabeza'],
  [/\bfollowing a corner\b/g, 'tras un córner'],
  [/\bfollowing a fast break\b/g, 'en un contraataque'],
  [/\bfollowing a set piece situation\b/g, 'a balón parado'],
  [/\bafter a corner\b/g, 'tras un córner'],

  // Must stay last, same reason as in French
  [/\bby\b/g, 'por'],
]

const ES_SENTENCES: Rules['sentences'] = [
  [
    /^VAR Decision: No Penalty (.+?)\.?$/,
    'Decisión del VAR: no hay penalti para $1.',
  ],
  [/^VAR Decision: Penalty (.+?)\.?$/, 'Decisión del VAR: penalti para $1.'],
  [/^VAR Decision: Goal (.+?)\.?$/, 'Decisión del VAR: gol para $1.'],
  [/^VAR Decision: No Goal (.+?)\.?$/, 'Decisión del VAR: gol anulado a $1.'],
  [
    /^VAR Decision: Card upgraded (.+?)\.?$/,
    'Decisión del VAR: tarjeta agravada para $1.',
  ],
  [/^VAR Decision: (.+?)\.?$/, 'Decisión del VAR: $1.'],

  [/^Foul by (.+)\.$/, 'Falta de $1.'],
  [/^Hand ?ball by (.+)\.$/, 'Mano de $1.'],
  [
    /^(.+) wins a free kick in the defensive half\.$/,
    '$1 gana un tiro libre en su campo.',
  ],
  [
    /^(.+) wins a free kick in the attacking half\.$/,
    '$1 gana un tiro libre en campo contrario.',
  ],
  [
    /^(.+) wins a free kick on the left wing\.$/,
    '$1 gana un tiro libre en la banda izquierda.',
  ],
  [
    /^(.+) wins a free kick on the right wing\.$/,
    '$1 gana un tiro libre en la banda derecha.',
  ],

  [
    /^(.+) is shown the yellow card for a bad foul\.$/,
    '$1 recibe tarjeta amarilla por una falta.',
  ],
  [
    /^(.+) is shown the yellow card for excessive celebration\.$/,
    '$1 recibe tarjeta amarilla por celebración excesiva.',
  ],
  [
    /^(.+) is shown the yellow card for hand ?ball\.$/,
    '$1 recibe tarjeta amarilla por mano.',
  ],
  [
    /^(.+) is shown the red card for violent conduct\.$/,
    '$1 es expulsado por conducta violenta.',
  ],
  [/^(.+) is shown the yellow card\.$/, '$1 recibe tarjeta amarilla.'],
  [
    /^(.+) is shown the red card for a bad foul\.$/,
    '$1 recibe tarjeta roja por una falta.',
  ],
  [
    /^Second yellow card to (.+)\.$/,
    'Segunda amarilla para $1, que es expulsado.',
  ],
  [/^(.+) is shown the red card\.$/, '$1 es expulsado.'],

  [/^Corner, (.+)\. Conceded by (.+)\.$/, 'Córner para $1, cedido por $2.'],
  [/^Corner, (.+)\.$/, 'Córner para $1.'],
  [
    /^Offside, (.+)\. (.+) tries a through ball, but (.+) is caught offside\.$/,
    'Fuera de juego, $1. $2 intenta un pase en profundidad, pero $3 está en fuera de juego.',
  ],
  [/^Offside, (.+)\.$/, 'Fuera de juego, $1.'],
  [
    /^Penalty conceded by (.+) after a foul in the penalty area\.$/,
    'Penalti cometido por $1 tras una falta en el área.',
  ],
  [
    /^Penalty (.+)\. (.+) draws a foul in the penalty area\.$/,
    'Penalti para $1. $2 recibe una falta en el área.',
  ],
  [/^Penalty saved!(.*)$/, '¡Penalti atajado!$1'],
  [/^Penalty missed!(.*)$/, '¡Penalti fallado!$1'],

  [/^Attempt missed\.(.*)$/, 'Disparo fallado.$1'],
  [/^Attempt saved\.(.*)$/, 'Disparo atajado.$1'],
  [/^Attempt blocked\.(.*)$/, 'Disparo bloqueado.$1'],
  [/^Goal!(.*)$/, '¡Gol!$1'],
  [/^Own Goal by (.+)\.$/, 'Gol en propia puerta de $1.'],

  [
    /^Substitution, (.+)\. (.+) replaces (.+) because of an injury\.$/,
    'Cambio, $1: $2 sustituye a $3, lesionado.',
  ],
  [
    /^Substitution, (.+)\. (.+) replaces (.+)\.$/,
    'Cambio, $1: $2 sustituye a $3.',
  ],
  [
    /^Delay in match because of an injury (.+)\.$/,
    'Interrupción por lesión de $1.',
  ],
  [/^Delay in match (.+)\.$/, 'Interrupción del partido: $1.'],
  [/^Delay over\. They are ready to continue\.$/, 'Se reanuda el juego.'],
  [/^Delay over\.(.*)$/, 'Se reanuda el juego.$1'],

  [
    /^Lineups are announced and players are warming up\.$/,
    'Se anuncian las alineaciones y los jugadores calientan.',
  ],
  [/^First Half begins\.$/, 'Comienza el partido.'],
  [/^First Half ends, (.+) (\d+), (.+) (\d+)\.$/, 'Descanso: $1 $2, $3 $4.'],
  [
    /^Second Half begins (.+) (\d+), (.+) (\d+)\.$/,
    'Comienza la segunda parte: $1 $2, $3 $4.',
  ],
  [
    /^Second Half ends, (.+) (\d+), (.+) (\d+)\.$/,
    'Final de la segunda parte: $1 $2, $3 $4.',
  ],
  [
    /^Match ends, (.+) (\d+), (.+) (\d+)\.$/,
    'Final del partido: $1 $2, $3 $4.',
  ],
  [
    /^The match official has announced (\d+) minutes of added time\.$/,
    'El árbitro añade $1 minutos de descuento.',
  ],
  [
    /^Fourth official has announced (\d+) minutes of added time\.$/,
    'El cuarto árbitro añade $1 minutos de descuento.',
  ],
  [/^Delay in match for a drinks break\.$/, 'Pausa de hidratación.'],
]

const RULES: Record<string, Rules> = {
  fr: { fragments: FR_FRAGMENTS, sentences: FR_SENTENCES, elide: FR_ELIDE },
  es: { fragments: ES_FRAGMENTS, sentences: ES_SENTENCES, elide: [] },
}

// "Sur une passe de Angel" → "d'Angel". Applied only after known phrases
// so a club name containing "de" never gets clipped.
const elide = (text: string, prefixes: string[]) => {
  let out = text
  for (const prefix of prefixes) {
    const re = new RegExp(`${prefix} ([AEIOUYÀÂÉÈÊËÎÏÔÖÙÛÜ])`, 'g')
    out = out.replace(re, `${prefix.slice(0, -1)}’$1`)
  }
  return out
}

const applyFragments = (text: string, rules: Rules) => {
  let out = text
  for (const [re, fr] of rules.fragments) out = out.replace(re, fr)
  // Outcome fragments start with a comma: rejoin cleanly
  return elide(out, rules.elide)
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Translate one commentary line into `lang`. Returns the original English
 * when the language is unsupported or no pattern matches: an untranslated
 * sentence beats a wrong one.
 */
export const translateCommentary = (text: string, lang: string): string => {
  const rules = RULES[lang]
  const src = text.trim()
  if (!rules || !src) return text
  for (const [re, out] of rules.sentences) {
    if (!re.test(src)) continue
    return applyFragments(src.replace(re, out), rules)
  }
  return src
}

/** True when the line was recognized, used to measure coverage. */
export const isTranslated = (text: string, lang: string): boolean =>
  (RULES[lang]?.sentences ?? []).some(([re]) => re.test(text.trim()))

export const TRANSLATED_LANGS = Object.keys(RULES)
