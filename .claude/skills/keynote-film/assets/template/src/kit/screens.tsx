import React from 'react'
import { Img, random, staticFile } from 'remotion'
import { fonts } from '../config'

/**
 * A stand-in screen drawn in code, for a first cut before the real
 * screenshots exist. Light UI on purpose: dark screens sink into the stage.
 */
export type MockSpec = {
  mock: 'desktop' | 'web' | 'mobile'
  title: string
  accent?: string
  seed?: string
}

/**
 * What a screen shows: an image path under `public/` (or a URL), a mock, or
 * any React element, such as a product UI rebuilt in code.
 */
export type Media = string | MockSpec | React.ReactElement

export const mediaSrc = (path: string) =>
  /^(https?:|data:|\/)/.test(path) ? path : staticFile(path)

/** Fills its (positioned) parent with the media, anchored to the top. */
export const Shot: React.FC<{ media: Media; style?: React.CSSProperties }> = ({
  media,
  style,
}) => {
  if (typeof media === 'string') {
    return (
      <Img
        src={mediaSrc(media)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          ...style,
        }}
      />
    )
  }
  if (React.isValidElement(media)) {
    return (
      <div
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
      >
        {media}
      </div>
    )
  }
  return <MockScreen spec={media as MockSpec} style={style} />
}

export const TrafficLights: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <div style={{ display: 'flex', gap: size * 0.66 }}>
    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
      <div
        key={c}
        style={{ width: size, height: size, borderRadius: size, background: c }}
      />
    ))}
  </div>
)

const bar = (
  w: string,
  h: string,
  color = '#d2d2d7',
  extra?: React.CSSProperties
): React.CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 999,
  background: color,
  flexShrink: 0,
  ...extra,
})

const Chart: React.FC<{ seed: string; accent: string }> = ({
  seed,
  accent,
}) => {
  const pts = Array.from({ length: 9 }, (_, i) => {
    const y = 70 - i * 5 - random(`${seed}-pt-${i}`) * 26
    return `${i * 12.5},${Math.max(8, y)}`
  })
  return (
    <svg
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <polygon
        points={`0,80 ${pts.join(' ')} 100,80`}
        fill={accent}
        opacity={0.16}
      />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={accent}
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

const Desktop: React.FC<{ spec: MockSpec; accent: string; seed: string }> = ({
  spec,
  accent,
  seed,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(110% 90% at 15% 0%, ${accent} 0%, transparent 55%), radial-gradient(90% 80% at 95% 100%, #5e5ce6 0%, transparent 60%), linear-gradient(160deg, #1b2140, #090b14)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: '0 0 auto 0',
        height: '3.4cqh',
        background: 'rgba(0,0,0,0.28)',
        display: 'flex',
        alignItems: 'center',
        gap: '2cqw',
        padding: '0 2cqw',
      }}
    >
      {[3, 5, 4, 6].map((w, i) => (
        <div key={i} style={bar(`${w}cqw`, '1cqh', 'rgba(255,255,255,0.7)')} />
      ))}
    </div>
    <div
      style={{
        position: 'absolute',
        left: '8cqw',
        top: '9cqh',
        width: '84cqw',
        height: '84cqh',
        borderRadius: '1.4cqw',
        overflow: 'hidden',
        background: '#fbfbfd',
        boxShadow: '0 2cqw 5cqw rgba(0,0,0,0.45)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: '6.5%',
          background: '#ececf0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.4cqw',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '0.7cqw' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div
              key={c}
              style={{
                width: '1.1cqw',
                height: '1.1cqw',
                borderRadius: '50%',
                background: c,
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div
          style={{
            width: '22%',
            background: '#f2f2f6',
            padding: '2.2cqw 1.6cqw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5cqh',
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: '1.9cqw',
              color: '#1d1d1f',
              marginBottom: '1cqh',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {spec.title}
          </div>
          {[70, 55, 80, 60, 45, 65].map((w, i) => (
            <div
              key={i}
              style={{
                padding: '0.8cqh 0.8cqw',
                borderRadius: '0.6cqw',
                background: i === 1 ? `${accent}22` : 'transparent',
              }}
            >
              <div
                style={bar(`${w}%`, '1.2cqh', i === 1 ? accent : '#c7c7cc')}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            flex: 1,
            padding: '2.6cqw',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.4cqh',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: '2.8cqw',
              letterSpacing: '-0.02em',
              color: '#1d1d1f',
            }}
          >
            {spec.title}
          </div>
          <div style={{ display: 'flex', gap: '1.4cqw' }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '1.4cqw',
                  borderRadius: '1cqw',
                  background: '#fff',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2cqh',
                }}
              >
                <div style={bar('45%', '1.1cqh')} />
                <div
                  style={bar(
                    `${50 + random(`${seed}-kpi-${i}`) * 40}%`,
                    '3cqh',
                    i === 0 ? accent : '#1d1d1f'
                  )}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: '1cqw',
              background: '#fff',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.06)',
              padding: '1.6cqw',
              minHeight: 0,
            }}
          >
            <Chart seed={seed} accent={accent} />
          </div>
        </div>
      </div>
    </div>
  </>
)

const Web: React.FC<{ spec: MockSpec; accent: string; seed: string }> = ({
  spec,
  accent,
  seed,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        height: '9cqh',
        display: 'flex',
        alignItems: 'center',
        gap: '2cqw',
        padding: '0 4cqw',
        borderBottom: '1px solid #ececf0',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '2.4cqw',
          height: '2.4cqw',
          borderRadius: '0.7cqw',
          background: accent,
        }}
      />
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: '2.2cqw',
          color: '#1d1d1f',
          marginRight: 'auto',
        }}
      >
        {spec.title}
      </div>
      {[5, 6, 4, 5].map((w, i) => (
        <div key={i} style={bar(`${w}cqw`, '1.2cqh')} />
      ))}
      <div style={bar('9cqw', '4.4cqh', accent)} />
    </div>
    <div
      style={{ flex: 1, display: 'flex', padding: '5cqh 4cqw', gap: '4cqw' }}
    >
      <div
        style={{
          flex: 1.1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2.6cqh',
        }}
      >
        <div style={bar('22%', '2.4cqh', `${accent}33`)} />
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: '5.2cqw',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: '#1d1d1f',
          }}
        >
          {spec.title}
        </div>
        <div style={bar('92%', '1.6cqh')} />
        <div style={bar('74%', '1.6cqh')} />
        <div style={{ display: 'flex', gap: '1.4cqw', marginTop: '1.4cqh' }}>
          <div style={bar('13cqw', '6cqh', accent)} />
          <div style={bar('11cqw', '6cqh', '#ececf0')} />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          borderRadius: '2cqw',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(140deg, ${accent}, #5e5ce6)`,
        }}
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${12 + i * 30}%`,
              top: `${16 + i * 34}%`,
              width: '52%',
              height: '36%',
              borderRadius: '1.4cqw',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 1.4cqw 3cqw rgba(0,0,0,0.2)',
              padding: '1.6cqw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4cqh',
            }}
          >
            <div style={bar('40%', '1.4cqh', accent)} />
            <div style={bar('80%', '1.2cqh')} />
            <div
              style={bar(`${40 + random(`${seed}-w-${i}`) * 40}%`, '1.2cqh')}
            />
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: 'flex', gap: '2cqw', padding: '0 4cqw 4cqh' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '15cqh',
            borderRadius: '1.4cqw',
            background: '#f5f5f7',
            padding: '1.6cqw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4cqh',
          }}
        >
          <div
            style={{
              width: '3cqw',
              height: '3cqw',
              borderRadius: '50%',
              background: `${accent}${['ff', 'aa', '66'][i]}`,
            }}
          />
          <div style={bar('70%', '1.3cqh', '#1d1d1f')} />
          <div style={bar('90%', '1.1cqh')} />
        </div>
      ))}
    </div>
  </div>
)

const Mobile: React.FC<{ spec: MockSpec; accent: string; seed: string }> = ({
  spec,
  accent,
  seed,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: '#f2f2f7',
      display: 'flex',
      flexDirection: 'column',
      padding: '0 6cqw',
    }}
  >
    <div
      style={{
        height: '11cqh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: '2cqh',
        fontFamily: fonts.body,
        fontWeight: 600,
        fontSize: '4.4cqw',
        color: '#1d1d1f',
        flexShrink: 0,
      }}
    >
      9:41
      <div style={{ display: 'flex', gap: '1.4cqw' }}>
        <div style={bar('6cqw', '1.6cqh', '#1d1d1f')} />
        <div style={bar('7cqw', '1.6cqh', '#1d1d1f')} />
      </div>
    </div>
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: '9cqw',
        letterSpacing: '-0.03em',
        color: '#1d1d1f',
        lineHeight: 1.1,
        margin: '1cqh 0 2.4cqh',
      }}
    >
      {spec.title}
    </div>
    <div style={bar('100%', '4.4cqh', '#e3e3e8', { marginBottom: '2.4cqh' })} />
    <div
      style={{
        height: '24cqh',
        borderRadius: '5cqw',
        background: `linear-gradient(140deg, ${accent}, #5e5ce6)`,
        padding: '5cqw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '1.4cqh',
        flexShrink: 0,
      }}
    >
      <div style={bar('55%', '2.2cqh', 'rgba(255,255,255,0.95)')} />
      <div style={bar('35%', '1.6cqh', 'rgba(255,255,255,0.6)')} />
    </div>
    <div
      style={{
        marginTop: '2.4cqh',
        borderRadius: '4cqw',
        background: '#fff',
        padding: '0 4cqw',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3.4cqw',
            height: '8cqh',
            borderBottom: i < 3 ? '1px solid #ececf0' : undefined,
          }}
        >
          <div
            style={{
              width: '9cqw',
              height: '9cqw',
              borderRadius: '2.4cqw',
              background: i === 0 ? accent : '#d2d2d7',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1cqh',
            }}
          >
            <div
              style={bar(
                `${45 + random(`${seed}-r-${i}`) * 35}%`,
                '1.6cqh',
                '#1d1d1f'
              )}
            />
            <div style={bar('70%', '1.2cqh')} />
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '10cqh',
        background: 'rgba(255,255,255,0.94)',
        borderTop: '1px solid #e3e3e8',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '1.8cqh',
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: '6cqw',
            height: '6cqw',
            borderRadius: '1.8cqw',
            background: i === 0 ? accent : '#c7c7cc',
          }}
        />
      ))}
    </div>
  </div>
)

export const MockScreen: React.FC<{
  spec: MockSpec
  style?: React.CSSProperties
}> = ({ spec, style }) => {
  const accent = spec.accent ?? '#0a84ff'
  const seed = spec.seed ?? spec.title
  const Variant = { desktop: Desktop, web: Web, mobile: Mobile }[spec.mock]
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        // Sizes inside the mock are in container units, so it reads the same
        // on a phone screen, a laptop lid or a full-width window
        containerType: 'size',
        ...style,
      }}
    >
      <Variant spec={spec} accent={accent} seed={seed} />
    </div>
  )
}
