// Extracts the land around France from Natural Earth (world-atlas, 1:50m)
// into src/data/france-map.json, so the Maps scenes draw a real map
// without fetching tiles at render time.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { feature } from 'topojson-client'

const require = createRequire(import.meta.url)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const topo = JSON.parse(
  readFileSync(require.resolve('world-atlas/countries-50m.json'), 'utf8')
)
const countries = feature(topo, topo.objects.countries).features

// Metropolitan France with enough margin for the Channel and the Alps
const bbox = { w: -8, e: 11, s: 40.5, n: 53 }
const inBox = ([lon, lat]) =>
  lon > bbox.w - 4 && lon < bbox.e + 4 && lat > bbox.s - 4 && lat < bbox.n + 4

const round = (n) => Math.round(n * 1000) / 1000
const out = []
for (const c of countries) {
  const polys =
    c.geometry.type === 'Polygon'
      ? [c.geometry.coordinates]
      : c.geometry.type === 'MultiPolygon'
        ? c.geometry.coordinates
        : []
  for (const poly of polys) {
    const ring = poly[0]
    if (!ring.some(inBox)) continue
    out.push({
      france: c.id === '250',
      ring: ring.map(([lon, lat]) => [round(lon), round(lat)]),
    })
  }
}
writeFileSync(
  join(root, 'src/data/france-map.json'),
  JSON.stringify({ bbox, polygons: out })
)
console.log(`${out.length} polygons`)
