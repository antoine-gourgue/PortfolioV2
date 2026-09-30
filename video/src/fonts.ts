import '@fontsource-variable/inter'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import { continueRender, delayRender } from 'remotion'

// @font-face rules only download a face once text uses it, which can be
// after the first frame is captured. Force every face we use up front and
// hold the render until they are ready.
const faces = [
  '400 32px "Inter Variable"',
  '600 32px "Inter Variable"',
  '800 32px "Inter Tight Variable"',
  '300 32px "Inter Tight Variable"',
  '400 32px "JetBrains Mono Variable"',
  '700 32px "JetBrains Mono Variable"',
]

if (typeof document !== 'undefined') {
  const handle = delayRender('Loading fonts')
  Promise.all(faces.map((face) => document.fonts.load(face, 'AÉé×0')))
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle))
}
