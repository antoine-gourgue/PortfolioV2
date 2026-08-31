import { describe, expect, it } from 'vitest'
import {
  isTranslated,
  translateCommentary,
  TRANSLATED_LANGS,
} from '../../server/utils/commentary'

// Real ESPN commentary shapes, as observed in live match feeds.
describe('translateCommentary → french', () => {
  const fr = (text: string) => translateCommentary(text, 'fr')

  it('translates fouls and elides "de" before a vowel', () => {
    expect(fr('Foul by Achraf Hakimi (Paris Saint-Germain).')).toBe(
      'Faute d’Achraf Hakimi (Paris Saint-Germain).'
    )
    expect(fr('Foul by Leonardo Balerdi (Marseille).')).toBe(
      'Faute de Leonardo Balerdi (Marseille).'
    )
  })

  it('never clips a club name containing "de"', () => {
    expect(fr('Corner, Olympique de Marseille. Conceded by Marquinhos.')).toBe(
      'Corner pour Olympique de Marseille, concédé par Marquinhos.'
    )
  })

  it('translates a full goal line, fragments included', () => {
    expect(
      fr(
        'Goal! Paris Saint-Germain 1, Marseille 0. Kylian Mbappé (Paris Saint-Germain) right footed shot from the centre of the box to the bottom left corner. Assisted by Ousmane Dembélé with a through ball.'
      )
    ).toBe(
      'But ! Paris Saint-Germain 1, Marseille 0. Kylian Mbappé (Paris Saint-Germain) frappe du pied droit du centre de la surface, en bas à gauche. Sur une passe d’Ousmane Dembélé sur une passe en profondeur.'
    )
  })

  it('rejoins outcome fragments without stray spaces or double commas', () => {
    expect(
      fr(
        'Attempt saved. Bradley Barcola (Paris Saint-Germain) left footed shot from outside the box is saved in the bottom right corner.'
      )
    ).toBe(
      'Frappe arrêtée. Bradley Barcola (Paris Saint-Germain) frappe du pied gauche de l’extérieur de la surface, repoussée en bas à droite.'
    )
  })

  it('translates cards, substitutions and milestones', () => {
    expect(
      fr('Pierre Lees-Melou (Brest) is shown the yellow card for a bad foul.')
    ).toBe('Pierre Lees-Melou (Brest) reçoit un carton jaune pour une faute.')
    expect(
      fr(
        'Substitution, Marseille. Amine Harit replaces Valentin Rongier because of an injury.'
      )
    ).toBe(
      'Changement, Marseille : Amine Harit remplace Valentin Rongier, blessé.'
    )
    expect(
      fr('Match ends, Paris Saint-Germain 3, Olympique de Marseille 1.')
    ).toBe('Fin du match : Paris Saint-Germain 3, Olympique de Marseille 1.')
    expect(
      fr('The match official has announced 5 minutes of added time.')
    ).toBe('L’arbitre annonce 5 minutes de temps additionnel.')
  })

  it('does not double the period on VAR decisions', () => {
    // Regression: the greedy capture used to swallow the trailing period
    // into $1, producing "…Lyon.."
    expect(fr('VAR Decision: Goal Lens 1-1 Lyon.')).toBe(
      'Décision VAR : but accordé à Lens 1-1 Lyon.'
    )
    expect(fr('VAR Decision: No Penalty Marseille.')).toBe(
      'Décision VAR : pas de penalty pour Marseille.'
    )
  })
})

describe('translateCommentary → spanish', () => {
  it('translates fouls without french elision', () => {
    expect(
      translateCommentary('Foul by Vinícius Júnior (Real Madrid).', 'es')
    ).toBe('Falta de Vinícius Júnior (Real Madrid).')
  })
})

describe('fallback behavior', () => {
  it('returns unknown sentences untouched rather than mangled', () => {
    const novel = 'Some brand new ESPN phrasing nobody has seen.'
    expect(translateCommentary(novel, 'fr')).toBe(novel)
    expect(isTranslated(novel, 'fr')).toBe(false)
  })

  it('returns the original for unsupported languages and empty input', () => {
    const line = 'Foul by Achraf Hakimi (Paris Saint-Germain).'
    expect(translateCommentary(line, 'de')).toBe(line)
    expect(translateCommentary('', 'fr')).toBe('')
  })

  it('recognizes translated lines for coverage measurement', () => {
    expect(isTranslated('First Half begins.', 'fr')).toBe(true)
    expect(isTranslated('First Half begins.', 'es')).toBe(true)
    expect(TRANSLATED_LANGS).toEqual(['fr', 'es'])
  })
})
