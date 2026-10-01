import React from 'react'
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { BEAT, fonts, stage } from '../config'
import { StageLight } from '../kit/light'
import { LogoTrace, type Mark } from '../kit/mark'
import { Body, Rise, ease, easeIn, easeOut, fitSize } from '../kit/motion'
import { BeatWords, Letters, SilverText } from '../kit/type'

/** When the list starts, one item per beat; then the card comes in. */
export const LIST_AT = 84
export const cardAt = (items: number) =>
  items ? LIST_AT + items * BEAT + 24 : LIST_AT

/**
 * The call to action as an Apple end card, in three movements of type: the
 * headline, a list one word per beat, then the mark, the name and the link.
 */
export const EndCard: React.FC<{
  len: number
  word: string
  line: string
  sub: string
  lead: string
  beats: string[]
  cta: string
  name: string
  mark: Mark
}> = ({ len, word, line, sub, lead, beats, cta, name, mark }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  const card = cardAt(beats.length)
  const allAt = LIST_AT + beats.length * BEAT
  const enter = ease(f, [4, 22], [0, 1], easeOut)
  const aOut = ease(f, [LIST_AT - 16, LIST_AT - 2], [0, 1], easeIn)
  const row = ease(f, [allAt, allAt + 14], [0, 1], easeOut)
  const bOut = ease(f, [card - 12, card], [0, 1], easeIn)
  const url = spring({
    frame: f - card - 22,
    fps,
    config: { damping: 18, stiffness: 110 },
  })
  const fade = ease(f, [len - 22, len], [0, 1])
  const out = (t: number): React.CSSProperties => ({
    opacity: 1 - t,
    transform: `translateY(${-t * 70}px)`,
    filter: t > 0 ? `blur(${t * 10}px)` : undefined,
  })
  const rowText = beats.join(' · ')
  return (
    <AbsoluteFill style={{ opacity: 1 - fade }}>
      <StageLight y={44} w={62} h={38} opacity={ease(f, [0, 30], [0, 1])} />
      {f < LIST_AT && (
        <AbsoluteFill style={{ transform: `scale(${1 + f * 0.0006})` }}>
          <div
            style={{
              position: 'absolute',
              top: 420,
              width: '100%',
              ...out(aOut),
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                opacity: enter,
                transform: `scale(${1.12 - enter * 0.12})`,
                filter: enter < 1 ? `blur(${(1 - enter) * 14}px)` : undefined,
              }}
            >
              <SilverText
                size={fitSize(word, 190, 1000)}
                sweepAt={26}
                weight={800}
              >
                {word}
              </SilverText>
            </div>
            <Rise at={24}>
              <Body
                size={fitSize(line, 62, 1000)}
                color={stage.white}
                weight={700}
              >
                {line}
              </Body>
            </Rise>
            <Rise at={36} style={{ marginTop: 14 }}>
              <Body size={40}>{sub}</Body>
            </Rise>
          </div>
        </AbsoluteFill>
      )}
      {beats.length > 0 && f >= LIST_AT - 6 && f < card && (
        <div
          style={{
            position: 'absolute',
            top: 440,
            width: '100%',
            ...out(bOut),
          }}
        >
          <Rise at={LIST_AT - 6}>
            <Body size={44}>{lead}</Body>
          </Rise>
          <div
            style={{
              marginTop: 18,
              height: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BeatWords
              size={fitSize(
                beats.reduce((a, b) => (b.length > a.length ? b : a), '') + '.',
                170
              )}
              until={allAt}
              words={beats.map((b, i) => ({
                text: `${b}.`,
                at: LIST_AT + i * BEAT,
                silver: true,
              }))}
            />
            {f >= allAt && (
              <div
                style={{
                  opacity: row,
                  transform: `scale(${1.08 - row * 0.08})`,
                  filter: row < 1 ? `blur(${(1 - row) * 10}px)` : undefined,
                }}
              >
                <Body
                  size={fitSize(rowText, 60, 1000)}
                  color={stage.white}
                  weight={700}
                >
                  {rowText}
                </Body>
              </div>
            )}
          </div>
        </div>
      )}
      {f >= card && (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${1 + (f - card) * 0.0006})`,
          }}
        >
          <LogoTrace mark={mark} at={card} size={200} fillAt={card + 14} />
          <div style={{ marginTop: 34 }}>
            <Letters
              text={name}
              at={card + 8}
              size={fitSize(name, 100)}
              silver
            />
          </div>
          <div
            style={{
              marginTop: 40,
              padding: '20px 44px',
              borderRadius: 999,
              background: stage.blue,
              fontFamily: fonts.display,
              fontSize: fitSize(cta, 46, 820),
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              boxShadow: '0 0 60px rgba(0,113,227,0.45)',
              transform: `scale(${0.85 + url * 0.15})`,
              opacity: Math.min(1, url * 1.5),
            }}
          >
            {cta}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  )
}
