;(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/_efae0c7d._.js',
  {
    '[project]/lib/utils.ts [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          cn: () => cn,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)'
          )
        function cn(...inputs) {
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'twMerge'
          ])(
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'clsx'
            ])(inputs)
          )
        }
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/placeholders-and-vanish-input.tsx [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          __turbopack_context__.s({
            PlaceholdersAndVanishInput: () => PlaceholdersAndVanishInput,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/lib/utils.ts [app-client] (ecmascript)'
            )
          var _s = __turbopack_context__.k.signature()
          ;('use client')
          function PlaceholdersAndVanishInput({
            placeholders,
            onChange,
            onSubmit,
            initalValue = '',
          }) {
            _s()
            const [currentPlaceholder, setCurrentPlaceholder] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(0)
            const intervalRef = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRef'
            ])(null)
            const startAnimation = () => {
              intervalRef.current = setInterval(() => {
                setCurrentPlaceholder(
                  (prev) => (prev + 1) % placeholders.length
                )
              }, 3000)
            }
            const handleVisibilityChange = () => {
              if (
                document.visibilityState !== 'visible' &&
                intervalRef.current
              ) {
                clearInterval(intervalRef.current) // Clear the interval when the tab is not visible
                intervalRef.current = null
              } else if (document.visibilityState === 'visible') {
                startAnimation() // Restart the interval when the tab becomes visible
              }
            }
            ;(0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useEffect'
            ])(
              {
                'PlaceholdersAndVanishInput.useEffect': () => {
                  startAnimation()
                  document.addEventListener(
                    'visibilitychange',
                    handleVisibilityChange
                  )
                  return {
                    'PlaceholdersAndVanishInput.useEffect': () => {
                      if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                      }
                      document.removeEventListener(
                        'visibilitychange',
                        handleVisibilityChange
                      )
                    },
                  }['PlaceholdersAndVanishInput.useEffect']
                },
              }['PlaceholdersAndVanishInput.useEffect'],
              [placeholders]
            )
            const canvasRef = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRef'
            ])(null)
            const newDataRef = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRef'
            ])([])
            const inputRef = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRef'
            ])(null)
            const [value, setValue] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(initalValue)
            const [animating, setAnimating] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(false)
            const draw = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCallback'
            ])(
              {
                'PlaceholdersAndVanishInput.useCallback[draw]': () => {
                  if (!inputRef.current) return
                  const canvas = canvasRef.current
                  if (!canvas) return
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  canvas.width = 800
                  canvas.height = 800
                  ctx.clearRect(0, 0, 800, 800)
                  const computedStyles = getComputedStyle(inputRef.current)
                  const fontSize = parseFloat(
                    computedStyles.getPropertyValue('font-size')
                  )
                  ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
                  ctx.fillStyle = '#FFF'
                  ctx.fillText(value, 16, 40)
                  const imageData = ctx.getImageData(0, 0, 800, 800)
                  const pixelData = imageData.data
                  const newData = []
                  for (let t = 0; t < 800; t++) {
                    let i = 4 * t * 800
                    for (let n = 0; n < 800; n++) {
                      let e = i + 4 * n
                      if (
                        pixelData[e] !== 0 &&
                        pixelData[e + 1] !== 0 &&
                        pixelData[e + 2] !== 0
                      ) {
                        newData.push({
                          x: n,
                          y: t,
                          color: [
                            pixelData[e],
                            pixelData[e + 1],
                            pixelData[e + 2],
                            pixelData[e + 3],
                          ],
                        })
                      }
                    }
                  }
                  newDataRef.current = newData.map(
                    {
                      'PlaceholdersAndVanishInput.useCallback[draw]': ({
                        x,
                        y,
                        color,
                      }) => ({
                        x,
                        y,
                        r: 1,
                        color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
                      }),
                    }['PlaceholdersAndVanishInput.useCallback[draw]']
                  )
                },
              }['PlaceholdersAndVanishInput.useCallback[draw]'],
              [value]
            )
            ;(0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useEffect'
            ])(
              {
                'PlaceholdersAndVanishInput.useEffect': () => {
                  draw()
                },
              }['PlaceholdersAndVanishInput.useEffect'],
              [value, draw]
            )
            const animate = (start) => {
              const animateFrame = (pos = 0) => {
                requestAnimationFrame(() => {
                  const newArr = []
                  for (let i = 0; i < newDataRef.current.length; i++) {
                    const current = newDataRef.current[i]
                    if (current.x < pos) {
                      newArr.push(current)
                    } else {
                      if (current.r <= 0) {
                        current.r = 0
                        continue
                      }
                      current.x += Math.random() > 0.5 ? 1 : -1
                      current.y += Math.random() > 0.5 ? 1 : -1
                      current.r -= 0.05 * Math.random()
                      newArr.push(current)
                    }
                  }
                  newDataRef.current = newArr
                  const ctx = canvasRef.current?.getContext('2d')
                  if (ctx) {
                    ctx.clearRect(pos, 0, 800, 800)
                    newDataRef.current.forEach((t) => {
                      const { x: n, y: i, r: s, color: color } = t
                      if (n > pos) {
                        ctx.beginPath()
                        ctx.rect(n, i, s, s)
                        ctx.fillStyle = color
                        ctx.strokeStyle = color
                        ctx.stroke()
                      }
                    })
                  }
                  if (newDataRef.current.length > 0) {
                    animateFrame(pos - 8)
                  } else {
                    setValue('')
                    setAnimating(false)
                  }
                })
              }
              animateFrame(start)
            }
            const handleKeyDown = (e) => {
              if (e.key === 'Enter' && !animating) {
                vanishAndSubmit()
              }
            }
            const vanishAndSubmit = () => {
              setAnimating(true)
              draw()
              const value = inputRef.current?.value || ''
              if (value && inputRef.current) {
                const maxX = newDataRef.current.reduce(
                  (prev, current) => (current.x > prev ? current.x : prev),
                  0
                )
                animate(maxX)
              }
            }
            const handleSubmit = (e) => {
              e.preventDefault()
              vanishAndSubmit()
              onSubmit && onSubmit(e)
            }
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'form',
              {
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'w-full relative max-w-xl mx-auto bg-slate-100/80 dark:bg-zinc-800 h-12 rounded-full overflow-hidden transition duration-200',
                  value && 'bg-gray-50'
                ),
                onSubmit: handleSubmit,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'canvas',
                    {
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'cn'
                      ])(
                        'absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 origin-top-left filter invert dark:invert-0 pr-20',
                        !animating ? 'opacity-0' : 'opacity-100'
                      ),
                      ref: canvasRef,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/ui/placeholders-and-vanish-input.tsx',
                      lineNumber: 187,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'input',
                    {
                      onChange: (e) => {
                        if (!animating) {
                          setValue(e.target.value)
                          onChange && onChange(e)
                        }
                      },
                      onKeyDown: handleKeyDown,
                      ref: inputRef,
                      value: value,
                      type: 'text',
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'cn'
                      ])(
                        'w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 pr-20',
                        animating && 'text-transparent dark:text-transparent'
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/ui/placeholders-and-vanish-input.tsx',
                      lineNumber: 194,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'button',
                    {
                      disabled: !value,
                      type: 'submit',
                      className:
                        'absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center',
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'motion'
                        ].svg,
                        {
                          xmlns: 'http://www.w3.org/2000/svg',
                          width: '24',
                          height: '24',
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          stroke: 'currentColor',
                          strokeWidth: '2',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          className: 'text-gray-300 h-4 w-4',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'path',
                              {
                                stroke: 'none',
                                d: 'M0 0h24v24H0z',
                                fill: 'none',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                                lineNumber: 228,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'motion'
                              ].path,
                              {
                                d: 'M5 12l14 0',
                                initial: {
                                  strokeDasharray: '50%',
                                  strokeDashoffset: '50%',
                                },
                                animate: {
                                  strokeDashoffset: value ? 0 : '50%',
                                },
                                transition: {
                                  duration: 0.3,
                                  ease: 'linear',
                                },
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                                lineNumber: 229,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'path',
                              {
                                d: 'M13 18l6 -6',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                                lineNumber: 243,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'path',
                              {
                                d: 'M13 6l6 6',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                                lineNumber: 244,
                                columnNumber: 11,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/components/ui/placeholders-and-vanish-input.tsx',
                          lineNumber: 216,
                          columnNumber: 9,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/ui/placeholders-and-vanish-input.tsx',
                      lineNumber: 211,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'absolute inset-0 flex items-center rounded-full pointer-events-none',
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'AnimatePresence'
                        ],
                        {
                          mode: 'wait',
                          children:
                            !value &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'motion'
                              ].p,
                              {
                                initial: {
                                  y: 5,
                                  opacity: 0,
                                },
                                animate: {
                                  y: 0,
                                  opacity: 1,
                                },
                                exit: {
                                  y: -15,
                                  opacity: 0,
                                },
                                transition: {
                                  duration: 0.3,
                                  ease: 'linear',
                                },
                                className:
                                  'dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 text-left w-[calc(100%-2rem)] truncate',
                                children: placeholders[currentPlaceholder],
                              },
                              `current-placeholder-${currentPlaceholder}`,
                              false,
                              {
                                fileName:
                                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                                lineNumber: 251,
                                columnNumber: 13,
                              },
                              this
                            ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/components/ui/placeholders-and-vanish-input.tsx',
                          lineNumber: 249,
                          columnNumber: 9,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/ui/placeholders-and-vanish-input.tsx',
                      lineNumber: 248,
                      columnNumber: 7,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName:
                  '[project]/components/ui/placeholders-and-vanish-input.tsx',
                lineNumber: 180,
                columnNumber: 5,
              },
              this
            )
          }
          _s(PlaceholdersAndVanishInput, 'dnJq+mDWojKn01+ATreHdonav8k=')
          _c = PlaceholdersAndVanishInput
          var _c
          __turbopack_context__.k.register(_c, 'PlaceholdersAndVanishInput')
          if (
            typeof globalThis.$RefreshHelpers$ === 'object' &&
            globalThis.$RefreshHelpers !== null
          ) {
            __turbopack_context__.k.registerExports(
              module,
              globalThis.$RefreshHelpers$
            )
          }
        }
      },
    '[project]/components/product/searchProduct.tsx [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          __turbopack_context__.s({
            default: () => __TURBOPACK__default__export__,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$placeholders$2d$and$2d$vanish$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/placeholders-and-vanish-input.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
            )
          var _s = __turbopack_context__.k.signature()
          ;('use client')
          const SearchProduct = ({ onSearch, setOpenSearch }) => {
            _s()
            const searchParams = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSearchParams'
            ])()
            const router = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRouter'
            ])()
            const pathname = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'usePathname'
            ])()
            const [search, setSearch] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(searchParams.get('product') || '')
            const handleChange = (e) => {
              setSearch(e.target.value)
            }
            const handleSubmit = (e) => {
              e.preventDefault()
              router.push('/?' + createQueryString('product', search))
              setOpenSearch?.(false)
              if (onSearch) {
                onSearch()
              }
            }
            const createQueryString = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCallback'
            ])(
              {
                'SearchProduct.useCallback[createQueryString]': (
                  name,
                  value
                ) => {
                  const params = new URLSearchParams(searchParams.toString())
                  params.set(name, value)
                  return params.toString()
                },
              }['SearchProduct.useCallback[createQueryString]'],
              [searchParams]
            )
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$placeholders$2d$and$2d$vanish$2d$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'PlaceholdersAndVanishInput'
              ],
              {
                placeholders: ['Pâtes', 'Riz', 'Poisson'],
                onChange: handleChange,
                onSubmit: handleSubmit,
                initalValue: search,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/product/searchProduct.tsx',
                lineNumber: 48,
                columnNumber: 5,
              },
              this
            )
          }
          _s(SearchProduct, 'yWWnBTel9bdnsxBUGF+hItEGito=', false, function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useSearchParams'
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useRouter'
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'usePathname'
              ],
            ]
          })
          _c = SearchProduct
          const __TURBOPACK__default__export__ = SearchProduct
          var _c
          __turbopack_context__.k.register(_c, 'SearchProduct')
          if (
            typeof globalThis.$RefreshHelpers$ === 'object' &&
            globalThis.$RefreshHelpers !== null
          ) {
            __turbopack_context__.k.registerExports(
              module,
              globalThis.$RefreshHelpers$
            )
          }
        }
      },
    '[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          DropdownMenu: () => DropdownMenu,
          DropdownMenuCheckboxItem: () => DropdownMenuCheckboxItem,
          DropdownMenuContent: () => DropdownMenuContent,
          DropdownMenuGroup: () => DropdownMenuGroup,
          DropdownMenuItem: () => DropdownMenuItem,
          DropdownMenuLabel: () => DropdownMenuLabel,
          DropdownMenuPortal: () => DropdownMenuPortal,
          DropdownMenuRadioGroup: () => DropdownMenuRadioGroup,
          DropdownMenuRadioItem: () => DropdownMenuRadioItem,
          DropdownMenuSeparator: () => DropdownMenuSeparator,
          DropdownMenuShortcut: () => DropdownMenuShortcut,
          DropdownMenuSub: () => DropdownMenuSub,
          DropdownMenuSubContent: () => DropdownMenuSubContent,
          DropdownMenuSubTrigger: () => DropdownMenuSubTrigger,
          DropdownMenuTrigger: () => DropdownMenuTrigger,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        ;('use client')
        const DropdownMenu =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Root'
          ]
        const DropdownMenuTrigger =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Trigger'
          ]
        const DropdownMenuGroup =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Group'
          ]
        const DropdownMenuPortal =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Portal'
          ]
        const DropdownMenuSub =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Sub'
          ]
        const DropdownMenuRadioGroup =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'RadioGroup'
          ]
        const DropdownMenuSubTrigger = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c = ({ className, inset, children, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'SubTrigger'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                  inset && 'pl-8',
                  className
                ),
                ...props,
                children: [
                  children,
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__[
                      'ChevronRight'
                    ],
                    {
                      className: 'ml-auto',
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/dropdown-menu.tsx',
                      lineNumber: 37,
                      columnNumber: 5,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 27,
                columnNumber: 3,
              },
              this
            ))
        )
        _c1 = DropdownMenuSubTrigger
        DropdownMenuSubTrigger.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SubTrigger'
          ].displayName
        const DropdownMenuSubContent = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c2 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'SubContent'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                  className
                ),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 47,
                columnNumber: 3,
              },
              this
            ))
        )
        _c3 = DropdownMenuSubContent
        DropdownMenuSubContent.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'SubContent'
          ].displayName
        const DropdownMenuContent = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c4 = ({ className, sideOffset = 4, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Portal'
              ],
              {
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'Content'
                  ],
                  {
                    ref: ref,
                    sideOffset: sideOffset,
                    className: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'cn'
                    ])(
                      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                      className
                    ),
                    ...props,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/ui/dropdown-menu.tsx',
                    lineNumber: 64,
                    columnNumber: 5,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 63,
                columnNumber: 3,
              },
              this
            ))
        )
        _c5 = DropdownMenuContent
        DropdownMenuContent.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Content'
          ].displayName
        const DropdownMenuItem = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c6 = ({ className, inset, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Item'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
                  inset && 'pl-8',
                  className
                ),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 83,
                columnNumber: 3,
              },
              this
            ))
        )
        _c7 = DropdownMenuItem
        DropdownMenuItem.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Item'
          ].displayName
        const DropdownMenuCheckboxItem = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c8 = ({ className, children, checked, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'CheckboxItem'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  className
                ),
                checked: checked,
                ...props,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'span',
                    {
                      className:
                        'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'ItemIndicator'
                        ],
                        {
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
                              'Check'
                            ],
                            {
                              className: 'h-4 w-4',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/ui/dropdown-menu.tsx',
                              lineNumber: 110,
                              columnNumber: 9,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/ui/dropdown-menu.tsx',
                          lineNumber: 109,
                          columnNumber: 7,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/dropdown-menu.tsx',
                      lineNumber: 108,
                      columnNumber: 5,
                    },
                    this
                  ),
                  children,
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 99,
                columnNumber: 3,
              },
              this
            ))
        )
        _c9 = DropdownMenuCheckboxItem
        DropdownMenuCheckboxItem.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'CheckboxItem'
          ].displayName
        const DropdownMenuRadioItem = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c10 = ({ className, children, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'RadioItem'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  className
                ),
                ...props,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'span',
                    {
                      className:
                        'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'ItemIndicator'
                        ],
                        {
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__[
                              'Circle'
                            ],
                            {
                              className: 'h-2 w-2 fill-current',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/ui/dropdown-menu.tsx',
                              lineNumber: 133,
                              columnNumber: 9,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/ui/dropdown-menu.tsx',
                          lineNumber: 132,
                          columnNumber: 7,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/dropdown-menu.tsx',
                      lineNumber: 131,
                      columnNumber: 5,
                    },
                    this
                  ),
                  children,
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 123,
                columnNumber: 3,
              },
              this
            ))
        )
        _c11 = DropdownMenuRadioItem
        DropdownMenuRadioItem.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'RadioItem'
          ].displayName
        const DropdownMenuLabel = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c12 = ({ className, inset, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Label'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'px-2 py-1.5 text-sm font-semibold',
                  inset && 'pl-8',
                  className
                ),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 147,
                columnNumber: 3,
              },
              this
            ))
        )
        _c13 = DropdownMenuLabel
        DropdownMenuLabel.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Label'
          ].displayName
        const DropdownMenuSeparator = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c14 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Separator'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('-mx-1 my-1 h-px bg-muted', className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dropdown-menu.tsx',
                lineNumber: 163,
                columnNumber: 3,
              },
              this
            ))
        )
        _c15 = DropdownMenuSeparator
        DropdownMenuSeparator.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Separator'
          ].displayName
        const DropdownMenuShortcut = ({ className, ...props }) => {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'span',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('ml-auto text-xs tracking-widest opacity-60', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/dropdown-menu.tsx',
              lineNumber: 176,
              columnNumber: 5,
            },
            this
          )
        }
        _c16 = DropdownMenuShortcut
        DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'
        var _c,
          _c1,
          _c2,
          _c3,
          _c4,
          _c5,
          _c6,
          _c7,
          _c8,
          _c9,
          _c10,
          _c11,
          _c12,
          _c13,
          _c14,
          _c15,
          _c16
        __turbopack_context__.k.register(
          _c,
          'DropdownMenuSubTrigger$React.forwardRef'
        )
        __turbopack_context__.k.register(_c1, 'DropdownMenuSubTrigger')
        __turbopack_context__.k.register(
          _c2,
          'DropdownMenuSubContent$React.forwardRef'
        )
        __turbopack_context__.k.register(_c3, 'DropdownMenuSubContent')
        __turbopack_context__.k.register(
          _c4,
          'DropdownMenuContent$React.forwardRef'
        )
        __turbopack_context__.k.register(_c5, 'DropdownMenuContent')
        __turbopack_context__.k.register(
          _c6,
          'DropdownMenuItem$React.forwardRef'
        )
        __turbopack_context__.k.register(_c7, 'DropdownMenuItem')
        __turbopack_context__.k.register(
          _c8,
          'DropdownMenuCheckboxItem$React.forwardRef'
        )
        __turbopack_context__.k.register(_c9, 'DropdownMenuCheckboxItem')
        __turbopack_context__.k.register(
          _c10,
          'DropdownMenuRadioItem$React.forwardRef'
        )
        __turbopack_context__.k.register(_c11, 'DropdownMenuRadioItem')
        __turbopack_context__.k.register(
          _c12,
          'DropdownMenuLabel$React.forwardRef'
        )
        __turbopack_context__.k.register(_c13, 'DropdownMenuLabel')
        __turbopack_context__.k.register(
          _c14,
          'DropdownMenuSeparator$React.forwardRef'
        )
        __turbopack_context__.k.register(_c15, 'DropdownMenuSeparator')
        __turbopack_context__.k.register(_c16, 'DropdownMenuShortcut')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/sheet.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Sheet: () => Sheet,
          SheetClose: () => SheetClose,
          SheetContent: () => SheetContent,
          SheetDescription: () => SheetDescription,
          SheetFooter: () => SheetFooter,
          SheetHeader: () => SheetHeader,
          SheetOverlay: () => SheetOverlay,
          SheetPortal: () => SheetPortal,
          SheetTitle: () => SheetTitle,
          SheetTrigger: () => SheetTrigger,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        ;('use client')
        const Sheet =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Root'
          ]
        const SheetTrigger =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Trigger'
          ]
        const SheetClose =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Close'
          ]
        const SheetPortal =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Portal'
          ]
        const SheetOverlay = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Overlay'
            ],
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                className
              ),
              ...props,
              ref: ref,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/sheet.tsx',
              lineNumber: 22,
              columnNumber: 3,
            },
            this
          )
        )
        _c = SheetOverlay
        SheetOverlay.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Overlay'
          ].displayName
        const sheetVariants = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'cva'
        ])(
          'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          {
            variants: {
              side: {
                top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
                bottom:
                  'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
                left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
                right:
                  'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
              },
            },
            defaultVariants: {
              side: 'right',
            },
          }
        )
        const SheetContent = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c1 = ({ side = 'right', className, children, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              SheetPortal,
              {
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    SheetOverlay,
                    {},
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/sheet.tsx',
                      lineNumber: 61,
                      columnNumber: 9,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'Content'
                    ],
                    {
                      ref: ref,
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'cn'
                      ])(
                        sheetVariants({
                          side,
                        }),
                        className
                      ),
                      ...props,
                      children: [
                        children,
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'Close'
                          ],
                          {
                            className:
                              'absolute right-4 top-4 text-white hover:text-gray-300 transition',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                  'X'
                                ],
                                {
                                  size: 24,
                                  className: 'mt-4 mr-4',
                                },
                                void 0,
                                false,
                                {
                                  fileName: '[project]/components/ui/sheet.tsx',
                                  lineNumber: 69,
                                  columnNumber: 17,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className: 'sr-only',
                                  children: 'Close',
                                },
                                void 0,
                                false,
                                {
                                  fileName: '[project]/components/ui/sheet.tsx',
                                  lineNumber: 70,
                                  columnNumber: 17,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/components/ui/sheet.tsx',
                            lineNumber: 68,
                            columnNumber: 13,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/components/ui/sheet.tsx',
                      lineNumber: 62,
                      columnNumber: 9,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/sheet.tsx',
                lineNumber: 60,
                columnNumber: 5,
              },
              this
            ))
        )
        _c2 = SheetContent
        SheetContent.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Content'
          ].displayName
        const SheetHeader = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('flex flex-col space-y-2 text-center sm:text-left', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/sheet.tsx',
              lineNumber: 81,
              columnNumber: 3,
            },
            this
          )
        _c3 = SheetHeader
        SheetHeader.displayName = 'SheetHeader'
        const SheetFooter = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                className
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/sheet.tsx',
              lineNumber: 95,
              columnNumber: 3,
            },
            this
          )
        _c4 = SheetFooter
        SheetFooter.displayName = 'SheetFooter'
        const SheetTitle = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c5 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Title'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('text-lg font-semibold text-foreground', className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/sheet.tsx',
                lineNumber: 109,
                columnNumber: 3,
              },
              this
            ))
        )
        _c6 = SheetTitle
        SheetTitle.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Title'
          ].displayName
        const SheetDescription = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c7 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Description'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('text-sm text-muted-foreground', className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/sheet.tsx',
                lineNumber: 121,
                columnNumber: 3,
              },
              this
            ))
        )
        _c8 = SheetDescription
        SheetDescription.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Description'
          ].displayName
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8
        __turbopack_context__.k.register(_c, 'SheetOverlay')
        __turbopack_context__.k.register(_c1, 'SheetContent$React.forwardRef')
        __turbopack_context__.k.register(_c2, 'SheetContent')
        __turbopack_context__.k.register(_c3, 'SheetHeader')
        __turbopack_context__.k.register(_c4, 'SheetFooter')
        __turbopack_context__.k.register(_c5, 'SheetTitle$React.forwardRef')
        __turbopack_context__.k.register(_c6, 'SheetTitle')
        __turbopack_context__.k.register(
          _c7,
          'SheetDescription$React.forwardRef'
        )
        __turbopack_context__.k.register(_c8, 'SheetDescription')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/badge.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Badge: () => Badge,
          badgeVariants: () => badgeVariants,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        const badgeVariants = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'cva'
        ])(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            variants: {
              variant: {
                default:
                  'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                  'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                  'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
              },
            },
            defaultVariants: {
              variant: 'default',
            },
          }
        )
        function Badge({ className, variant, ...props }) {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                badgeVariants({
                  variant,
                }),
                className
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/badge.tsx',
              lineNumber: 32,
              columnNumber: 5,
            },
            this
          )
        }
        _c = Badge
        var _c
        __turbopack_context__.k.register(_c, 'Badge')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/button.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Button: () => Button,
          buttonVariants: () => buttonVariants,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        const buttonVariants = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'cva'
        ])(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            variants: {
              variant: {
                default:
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                  'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary:
                  'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
              },
              size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
              },
            },
            defaultVariants: {
              variant: 'default',
              size: 'default',
            },
          }
        )
        const Button = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c = (
            { className, variant, size, asChild = false, ...props },
            ref
          ) => {
            const Comp = asChild
              ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'Slot'
                ]
              : 'button'
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              Comp,
              {
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  buttonVariants({
                    variant,
                    size,
                    className,
                  })
                ),
                ref: ref,
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/button.tsx',
                lineNumber: 46,
                columnNumber: 7,
              },
              this
            )
          })
        )
        _c1 = Button
        Button.displayName = 'Button'
        var _c, _c1
        __turbopack_context__.k.register(_c, 'Button$React.forwardRef')
        __turbopack_context__.k.register(_c1, 'Button')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/dialog.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Dialog: () => Dialog,
          DialogClose: () => DialogClose,
          DialogContent: () => DialogContent,
          DialogDescription: () => DialogDescription,
          DialogFooter: () => DialogFooter,
          DialogHeader: () => DialogHeader,
          DialogOverlay: () => DialogOverlay,
          DialogPortal: () => DialogPortal,
          DialogTitle: () => DialogTitle,
          DialogTrigger: () => DialogTrigger,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        ;('use client')
        const Dialog =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Root'
          ]
        const DialogTrigger =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Trigger'
          ]
        const DialogPortal =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Portal'
          ]
        const DialogClose =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Close'
          ]
        const DialogOverlay = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Overlay'
            ],
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                className
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/dialog.tsx',
              lineNumber: 21,
              columnNumber: 3,
            },
            this
          )
        )
        _c = DialogOverlay
        DialogOverlay.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Overlay'
          ].displayName
        const DialogContent = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c1 = ({ className, children, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              DialogPortal,
              {
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    DialogOverlay,
                    {},
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/dialog.tsx',
                      lineNumber: 37,
                      columnNumber: 5,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'Content'
                    ],
                    {
                      ref: ref,
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'cn'
                      ])(
                        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
                        className
                      ),
                      ...props,
                      children: [
                        children,
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'Close'
                          ],
                          {
                            className:
                              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                  'X'
                                ],
                                {
                                  className: 'h-4 w-4',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/ui/dialog.tsx',
                                  lineNumber: 48,
                                  columnNumber: 9,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className: 'sr-only',
                                  children: 'Close',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/ui/dialog.tsx',
                                  lineNumber: 49,
                                  columnNumber: 9,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/components/ui/dialog.tsx',
                            lineNumber: 47,
                            columnNumber: 7,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/components/ui/dialog.tsx',
                      lineNumber: 38,
                      columnNumber: 5,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/dialog.tsx',
                lineNumber: 36,
                columnNumber: 3,
              },
              this
            ))
        )
        _c2 = DialogContent
        DialogContent.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Content'
          ].displayName
        const DialogHeader = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                'flex flex-col space-y-1.5 text-center sm:text-left',
                className
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/dialog.tsx',
              lineNumber: 60,
              columnNumber: 3,
            },
            this
          )
        _c3 = DialogHeader
        DialogHeader.displayName = 'DialogHeader'
        const DialogFooter = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])(
                'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
                className
              ),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/dialog.tsx',
              lineNumber: 74,
              columnNumber: 3,
            },
            this
          )
        _c4 = DialogFooter
        DialogFooter.displayName = 'DialogFooter'
        const DialogTitle = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c5 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Title'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'text-lg font-semibold leading-none tracking-tight',
                  className
                ),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dialog.tsx',
                lineNumber: 88,
                columnNumber: 3,
              },
              this
            ))
        )
        _c6 = DialogTitle
        DialogTitle.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Title'
          ].displayName
        const DialogDescription = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c7 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Description'
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('text-sm text-muted-foreground', className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/dialog.tsx',
                lineNumber: 103,
                columnNumber: 3,
              },
              this
            ))
        )
        _c8 = DialogDescription
        DialogDescription.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Description'
          ].displayName
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8
        __turbopack_context__.k.register(_c, 'DialogOverlay')
        __turbopack_context__.k.register(_c1, 'DialogContent$React.forwardRef')
        __turbopack_context__.k.register(_c2, 'DialogContent')
        __turbopack_context__.k.register(_c3, 'DialogHeader')
        __turbopack_context__.k.register(_c4, 'DialogFooter')
        __turbopack_context__.k.register(_c5, 'DialogTitle$React.forwardRef')
        __turbopack_context__.k.register(_c6, 'DialogTitle')
        __turbopack_context__.k.register(
          _c7,
          'DialogDescription$React.forwardRef'
        )
        __turbopack_context__.k.register(_c8, 'DialogDescription')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/drawer.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Drawer: () => Drawer,
          DrawerClose: () => DrawerClose,
          DrawerContent: () => DrawerContent,
          DrawerDescription: () => DrawerDescription,
          DrawerFooter: () => DrawerFooter,
          DrawerHeader: () => DrawerHeader,
          DrawerOverlay: () => DrawerOverlay,
          DrawerPortal: () => DrawerPortal,
          DrawerTitle: () => DrawerTitle,
          DrawerTrigger: () => DrawerTrigger,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/vaul/dist/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        ;('use client')
        const Drawer = ({ shouldScaleBackground = true, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Drawer'
            ].Root,
            {
              shouldScaleBackground: shouldScaleBackground,
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/drawer.tsx',
              lineNumber: 12,
              columnNumber: 3,
            },
            this
          )
        _c = Drawer
        Drawer.displayName = 'Drawer'
        const DrawerTrigger =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Trigger
        const DrawerPortal =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Portal
        const DrawerClose =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Close
        const DrawerOverlay = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(({ className, ...props }, ref) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'Drawer'
            ].Overlay,
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('fixed inset-0 z-50 bg-black/80', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/drawer.tsx',
              lineNumber: 29,
              columnNumber: 3,
            },
            this
          )
        )
        _c1 = DrawerOverlay
        DrawerOverlay.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Overlay.displayName
        const DrawerContent = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c2 = ({ className, children, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              DrawerPortal,
              {
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    DrawerOverlay,
                    {},
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/drawer.tsx',
                      lineNumber: 42,
                      columnNumber: 5,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'Drawer'
                    ].Content,
                    {
                      ref: ref,
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'cn'
                      ])(
                        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background',
                        className
                      ),
                      ...props,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className:
                              'mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted',
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/components/ui/drawer.tsx',
                            lineNumber: 51,
                            columnNumber: 7,
                          },
                          this
                        ),
                        children,
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/components/ui/drawer.tsx',
                      lineNumber: 43,
                      columnNumber: 5,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/ui/drawer.tsx',
                lineNumber: 41,
                columnNumber: 3,
              },
              this
            ))
        )
        _c3 = DrawerContent
        DrawerContent.displayName = 'DrawerContent'
        const DrawerHeader = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('grid gap-1.5 p-4 text-center sm:text-left', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/drawer.tsx',
              lineNumber: 62,
              columnNumber: 3,
            },
            this
          )
        _c4 = DrawerHeader
        DrawerHeader.displayName = 'DrawerHeader'
        const DrawerFooter = ({ className, ...props }) =>
          /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('mt-auto flex flex-col gap-2 p-4', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/drawer.tsx',
              lineNumber: 73,
              columnNumber: 3,
            },
            this
          )
        _c5 = DrawerFooter
        DrawerFooter.displayName = 'DrawerFooter'
        const DrawerTitle = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c6 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Drawer'
              ].Title,
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])(
                  'text-lg font-semibold leading-none tracking-tight',
                  className
                ),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/drawer.tsx',
                lineNumber: 84,
                columnNumber: 3,
              },
              this
            ))
        )
        _c7 = DrawerTitle
        DrawerTitle.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Title.displayName
        const DrawerDescription = /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'forwardRef'
        ])(
          (_c8 = ({ className, ...props }, ref) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Drawer'
              ].Description,
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'cn'
                ])('text-sm text-muted-foreground', className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: '[project]/components/ui/drawer.tsx',
                lineNumber: 99,
                columnNumber: 3,
              },
              this
            ))
        )
        _c9 = DrawerDescription
        DrawerDescription.displayName =
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$vaul$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'Drawer'
          ].Description.displayName
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9
        __turbopack_context__.k.register(_c, 'Drawer')
        __turbopack_context__.k.register(_c1, 'DrawerOverlay')
        __turbopack_context__.k.register(_c2, 'DrawerContent$React.forwardRef')
        __turbopack_context__.k.register(_c3, 'DrawerContent')
        __turbopack_context__.k.register(_c4, 'DrawerHeader')
        __turbopack_context__.k.register(_c5, 'DrawerFooter')
        __turbopack_context__.k.register(_c6, 'DrawerTitle$React.forwardRef')
        __turbopack_context__.k.register(_c7, 'DrawerTitle')
        __turbopack_context__.k.register(
          _c8,
          'DrawerDescription$React.forwardRef'
        )
        __turbopack_context__.k.register(_c9, 'DrawerDescription')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/hooks/use-media-query.ts [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          useMediaQuery: () => useMediaQuery,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        function useMediaQuery(query) {
          _s()
          const [value, setValue] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'useMediaQuery.useEffect': () => {
                function onChange(event) {
                  setValue(event.matches)
                }
                const result = matchMedia(query)
                result.addEventListener('change', onChange)
                setValue(result.matches)
                return {
                  'useMediaQuery.useEffect': () =>
                    result.removeEventListener('change', onChange),
                }['useMediaQuery.useEffect']
              },
            }['useMediaQuery.useEffect'],
            [query]
          )
          return value
        }
        _s(useMediaQuery, '6e3AmMTt/hKjM/WfGIX1xtYrgdA=')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/responsiveDialog.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          ResponsiveDialog: () => ResponsiveDialog,
          ResponsiveDialogBody: () => ResponsiveDialogBody,
          ResponsiveDialogClose: () => ResponsiveDialogClose,
          ResponsiveDialogContent: () => ResponsiveDialogContent,
          ResponsiveDialogDescription: () => ResponsiveDialogDescription,
          ResponsiveDialogFooter: () => ResponsiveDialogFooter,
          ResponsiveDialogHeader: () => ResponsiveDialogHeader,
          ResponsiveDialogTitle: () => ResponsiveDialogTitle,
          ResponsiveDialogTrigger: () => ResponsiveDialogTrigger,
          desktop: () => desktop,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/dialog.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/drawer.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/hooks/use-media-query.ts [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature(),
          _s1 = __turbopack_context__.k.signature(),
          _s2 = __turbopack_context__.k.signature(),
          _s3 = __turbopack_context__.k.signature(),
          _s4 = __turbopack_context__.k.signature(),
          _s5 = __turbopack_context__.k.signature(),
          _s6 = __turbopack_context__.k.signature(),
          _s7 = __turbopack_context__.k.signature()
        ;('use client')
        const desktop = '(min-width: 768px)'
        const ResponsiveDialog = ({ children, ...props }) => {
          _s()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialog = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Dialog'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Drawer'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialog,
            {
              onClose: !isDesktop ? props.onClose : undefined,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 56,
              columnNumber: 5,
            },
            this
          )
        }
        _s(
          ResponsiveDialog,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c = ResponsiveDialog
        const ResponsiveDialogTrigger = ({
          className,
          children,
          style,
          ...props
        }) => {
          _s1()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogTrigger = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogTrigger'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerTrigger'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogTrigger,
            {
              className: className,
              style: style,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 75,
              columnNumber: 5,
            },
            this
          )
        }
        _s1(
          ResponsiveDialogTrigger,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c1 = ResponsiveDialogTrigger
        const ResponsiveDialogClose = ({ className, children, ...props }) => {
          _s2()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogClose = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogClose'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerClose'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogClose,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 90,
              columnNumber: 5,
            },
            this
          )
        }
        _s2(
          ResponsiveDialogClose,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c2 = ResponsiveDialogClose
        const ResponsiveDialogContent = ({ className, children, ...props }) => {
          _s3()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogContent = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogContent'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerContent'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogContent,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 105,
              columnNumber: 5,
            },
            this
          )
        }
        _s3(
          ResponsiveDialogContent,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c3 = ResponsiveDialogContent
        const ResponsiveDialogDescription = ({
          className,
          children,
          ...props
        }) => {
          _s4()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogDescription = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogDescription'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerDescription'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogDescription,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 122,
              columnNumber: 5,
            },
            this
          )
        }
        _s4(
          ResponsiveDialogDescription,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c4 = ResponsiveDialogDescription
        const ResponsiveDialogHeader = ({ className, children, ...props }) => {
          _s5()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogHeader = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogHeader'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerHeader'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogHeader,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 137,
              columnNumber: 5,
            },
            this
          )
        }
        _s5(
          ResponsiveDialogHeader,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c5 = ResponsiveDialogHeader
        const ResponsiveDialogTitle = ({ className, children, ...props }) => {
          _s6()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogTitle = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogTitle'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerTitle'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogTitle,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 152,
              columnNumber: 5,
            },
            this
          )
        }
        _s6(
          ResponsiveDialogTitle,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c6 = ResponsiveDialogTitle
        const ResponsiveDialogBody = ({ className, children, ...props }) => {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('px-4 md:px-0', className),
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 164,
              columnNumber: 5,
            },
            this
          )
        }
        _c7 = ResponsiveDialogBody
        const ResponsiveDialogFooter = ({ className, children, ...props }) => {
          _s7()
          const isDesktop = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useMediaQuery'
          ])(desktop)
          const ResponsiveDialogFooter = isDesktop
            ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DialogFooter'
              ]
            : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'DrawerFooter'
              ]
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            ResponsiveDialogFooter,
            {
              className: className,
              ...props,
              children: children,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/responsiveDialog.tsx',
              lineNumber: 179,
              columnNumber: 5,
            },
            this
          )
        }
        _s7(
          ResponsiveDialogFooter,
          'OwvWUQgjrMnuU8GZKzxgeJ0yhK4=',
          false,
          function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$media$2d$query$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useMediaQuery'
              ],
            ]
          }
        )
        _c8 = ResponsiveDialogFooter
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8
        __turbopack_context__.k.register(_c, 'ResponsiveDialog')
        __turbopack_context__.k.register(_c1, 'ResponsiveDialogTrigger')
        __turbopack_context__.k.register(_c2, 'ResponsiveDialogClose')
        __turbopack_context__.k.register(_c3, 'ResponsiveDialogContent')
        __turbopack_context__.k.register(_c4, 'ResponsiveDialogDescription')
        __turbopack_context__.k.register(_c5, 'ResponsiveDialogHeader')
        __turbopack_context__.k.register(_c6, 'ResponsiveDialogTitle')
        __turbopack_context__.k.register(_c7, 'ResponsiveDialogBody')
        __turbopack_context__.k.register(_c8, 'ResponsiveDialogFooter')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/lib/server-actions/scann-product-actions.ts [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          /* __next_internal_action_entry_do_not_use__ {"402fa3497bc9690afa9c94a6021bf5cc8adea2f423":"getProductRepository","7f0ba510d9fbb3b0e65fcda1adb4bf92f16e0563cb":"getOpenFoodFacts"} */ __turbopack_context__.s(
            {
              getOpenFoodFacts: () => getOpenFoodFacts,
              getProductRepository: () => getProductRepository,
            }
          )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)'
            )
          var getOpenFoodFacts = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '7f0ba510d9fbb3b0e65fcda1adb4bf92f16e0563cb',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getOpenFoodFacts'
          )
          var getProductRepository = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '402fa3497bc9690afa9c94a6021bf5cc8adea2f423',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getProductRepository'
          )
        }
      },
    '[project]/components/ui/skeleton.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          Skeleton: () => Skeleton,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/utils.ts [app-client] (ecmascript)'
          )
        function Skeleton({ className, ...props }) {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'cn'
              ])('animate-pulse rounded-md bg-muted', className),
              ...props,
            },
            void 0,
            false,
            {
              fileName: '[project]/components/ui/skeleton.tsx',
              lineNumber: 8,
              columnNumber: 5,
            },
            this
          )
        }
        _c = Skeleton
        var _c
        __turbopack_context__.k.register(_c, 'Skeleton')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/ui/Accordion.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          default: () => Accordion,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function Accordion({ title, children }) {
          _s()
          const [isOpen, setIsOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(true)
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'bg-white shadow-md rounded-lg overflow-hidden mb-4',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'button',
                  {
                    className:
                      'flex justify-between items-center w-full px-6 py-4 text-lg font-semibold text-gray-900 border-b border-gray-200',
                    onClick: () => setIsOpen(!isOpen),
                    children: [
                      title,
                      isOpen
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'FaChevronUp'
                            ],
                            {},
                            void 0,
                            false,
                            {
                              fileName: '[project]/components/ui/Accordion.tsx',
                              lineNumber: 16,
                              columnNumber: 27,
                            },
                            this
                          )
                        : /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'FaChevronDown'
                            ],
                            {},
                            void 0,
                            false,
                            {
                              fileName: '[project]/components/ui/Accordion.tsx',
                              lineNumber: 16,
                              columnNumber: 45,
                            },
                            this
                          ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/components/ui/Accordion.tsx',
                    lineNumber: 11,
                    columnNumber: 13,
                  },
                  this
                ),
                isOpen &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className: 'p-6',
                      children: children,
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/ui/Accordion.tsx',
                      lineNumber: 18,
                      columnNumber: 24,
                    },
                    this
                  ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/components/ui/Accordion.tsx',
              lineNumber: 10,
              columnNumber: 9,
            },
            this
          )
        }
        _s(Accordion, 'mEi83NlPXQzy/XIDfTYWzOSvaHw=')
        _c = Accordion
        var _c
        __turbopack_context__.k.register(_c, 'Accordion')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/scanner/scannerDrawer.tsx [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          __turbopack_context__.s({
            default: () => ScannerDrawer,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$barcode$2d$scanner$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/react-qr-barcode-scanner/dist/index.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/responsiveDialog.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$scann$2d$product$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/lib/server-actions/scann-product-actions.ts [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/skeleton.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/image.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/button.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/app/contexts/CartContext.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next-auth/react.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/Accordion.tsx [app-client] (ecmascript)'
            )
          var _s = __turbopack_context__.k.signature()
          ;('use client')
          function ScannerDrawer({ children }) {
            _s()
            const [isLoaded, setIsLoaded] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(false)
            const [data, setData] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(null)
            const [isFromOpenFoodFacts, setIsFromOpenFoodFacts] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(false)
            const [quantity, setQuantity] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(0)
            const [rating, setRating] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(0)
            const { data: session } = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSession'
            ])()
            const { addProductToCart, removeProduct, updateProductQuantity } =
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useCart'
              ])()
            const [errorMessage, setErrorMessage] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])('')
            ;(0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useEffect'
            ])(
              {
                'ScannerDrawer.useEffect': () => {
                  setRating(Math.floor(Math.random() * 5) + 1)
                },
              }['ScannerDrawer.useEffect'],
              []
            )
            const handleBarCodeUpdate = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCallback'
            ])(
              {
                'ScannerDrawer.useCallback[handleBarCodeUpdate]': async (
                  err,
                  result
                ) => {
                  if (!result) return
                  setIsLoaded(true)
                  setErrorMessage('')
                  const scannedCode = result.getText()
                  try {
                    const productData = await (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$scann$2d$product$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'getProductRepository'
                    ])(scannedCode)
                    const isInDB =
                      productData && productData.price !== undefined
                    const openFoodData = await (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$scann$2d$product$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'getOpenFoodFacts'
                    ])(scannedCode)
                    if (openFoodData?.status === 1) {
                      const productInfo = openFoodData.product
                      setData({
                        id: productInfo.code,
                        name:
                          productInfo.product_name_fr ||
                          productInfo.product_name ||
                          'Produit inconnu',
                        picture:
                          productInfo.image_front_url || '/default-product.png',
                        price: isInDB ? productData.price : 0,
                        nutriScore: productInfo.nutriscore_grade || 'unknown',
                        generic_name:
                          productInfo.generic_name ||
                          'Aucune description disponible.',
                        quantity: productInfo.quantity || 'Non spécifié',
                        ingredients_text:
                          productInfo.ingredients_text_fr || 'Non spécifié',
                        origins:
                          productInfo.origins || 'Origine non renseignée',
                        conservation_conditions:
                          productInfo.conservation_conditions ||
                          'Non renseigné',
                        manufacturing_places:
                          productInfo.manufacturing_places || 'Non spécifié',
                        brands: productInfo.brands || 'Non spécifié',
                        nutriments: productInfo.nutriments || {},
                      })
                      setIsFromOpenFoodFacts(!isInDB)
                    } else {
                      setData(null)
                      setErrorMessage(
                        'Produit non trouvé dans la base de données ni sur Open Food Facts.'
                      )
                    }
                  } catch (error) {
                    setErrorMessage(
                      'Erreur lors de la récupération des données.'
                    )
                    console.error(error)
                  }
                  setIsLoaded(false)
                },
              }['ScannerDrawer.useCallback[handleBarCodeUpdate]'],
              []
            )
            const title = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useMemo'
            ])(
              {
                'ScannerDrawer.useMemo[title]': () =>
                  !data
                    ? 'Scanner votre produit'
                    : data.name || 'Produit inconnu',
              }['ScannerDrawer.useMemo[title]'],
              [data]
            )
            const description = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useMemo'
            ])(
              {
                'ScannerDrawer.useMemo[description]': () => {
                  if (!data) return 'Passez le code barre devant la caméra.'
                  return isFromOpenFoodFacts
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'span',
                        {
                          className: 'text-red-500',
                          children: 'Produit pas en stock',
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/components/scanner/scannerDrawer.tsx',
                          lineNumber: 106,
                          columnNumber: 7,
                        },
                        this
                      )
                    : /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'span',
                        {
                          className: 'text-green-600',
                          children: 'Produit en stock',
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/components/scanner/scannerDrawer.tsx',
                          lineNumber: 108,
                          columnNumber: 7,
                        },
                        this
                      )
                },
              }['ScannerDrawer.useMemo[description]'],
              [data, isFromOpenFoodFacts]
            )
            const handleAddToCart = () => {
              if (!session) return
              addProductToCart(data.id, 1)
              setQuantity(1)
            }
            const handleIncreaseQuantity = () => {
              updateProductQuantity(data.id, quantity + 1)
              setQuantity(quantity + 1)
            }
            const handleDecreaseQuantity = () => {
              if (quantity <= 1) {
                removeProduct(data.id)
                setQuantity(0)
              } else {
                updateProductQuantity(data.id, quantity - 1)
                setQuantity(quantity - 1)
              }
            }
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'ResponsiveDialog'
              ],
              {
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'ResponsiveDialogTrigger'
                    ],
                    {
                      asChild: true,
                      children: children,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/scanner/scannerDrawer.tsx',
                      lineNumber: 135,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'ResponsiveDialogContent'
                    ],
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogHeader'
                          ],
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'ResponsiveDialogTitle'
                                ],
                                {
                                  children: title,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/scanner/scannerDrawer.tsx',
                                  lineNumber: 138,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'ResponsiveDialogDescription'
                                ],
                                {
                                  children: description,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/scanner/scannerDrawer.tsx',
                                  lineNumber: 139,
                                  columnNumber: 11,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/components/scanner/scannerDrawer.tsx',
                            lineNumber: 137,
                            columnNumber: 9,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'div',
                          {
                            className: 'max-h-[80vh] overflow-y-auto',
                            children: [
                              ' ',
                              !data &&
                                !isLoaded &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className:
                                      'flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg relative',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          className:
                                            'relative border-4 border-teal-500 rounded-lg overflow-hidden shadow-lg',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$qr$2d$barcode$2d$scanner$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'default'
                                              ],
                                              {
                                                width: 500,
                                                height: 400,
                                                onUpdate: handleBarCodeUpdate,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                lineNumber: 149,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'absolute inset-0 border-4 border-dashed border-teal-400 rounded-lg pointer-events-none animate-pulse',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                lineNumber: 154,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 148,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'p',
                                        {
                                          className:
                                            'text-sm text-gray-500 p-2',
                                          children:
                                            'Placez le code-barres dans la zone pour le scanner automatiquement.',
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 157,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 147,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              isLoaded &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Skeleton'
                                  ],
                                  {
                                    className: 'w-full h-10',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 163,
                                    columnNumber: 24,
                                  },
                                  this
                                ),
                              errorMessage &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'text-red-500 text-center my-4',
                                    children: errorMessage,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 165,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              data &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'flex flex-col md:flex-row p-4',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          className:
                                            'flex-1 flex justify-center',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'default'
                                            ],
                                            {
                                              src: data.picture,
                                              alt: data.name,
                                              width: 350,
                                              height: 350,
                                              className:
                                                'object-contain w-auto h-96',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/scanner/scannerDrawer.tsx',
                                              lineNumber: 170,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 169,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          className: 'flex-1 ml-4',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'h1',
                                              {
                                                className:
                                                  'text-2xl font-bold text-gray-900',
                                                children: data.name,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                lineNumber: 180,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            data.nutriScore &&
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className: 'mt-2',
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'default'
                                                    ],
                                                    {
                                                      src: `/assets/nutri-score-${data.nutriScore.toUpperCase()}.png`,
                                                      alt: `NutriScore ${data.nutriScore}`,
                                                      width: 100,
                                                      height: 40,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/scanner/scannerDrawer.tsx',
                                                      lineNumber: 186,
                                                      columnNumber: 21,
                                                    },
                                                    this
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                  lineNumber: 185,
                                                  columnNumber: 19,
                                                },
                                                this
                                              ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'flex items-center mt-3',
                                                children: [...Array(5)].map(
                                                  (_, index) =>
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'FaStar'
                                                      ],
                                                      {
                                                        className: `text-yellow-400 ${index < rating ? 'opacity-100' : 'opacity-30'}`,
                                                      },
                                                      index,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/components/scanner/scannerDrawer.tsx',
                                                        lineNumber: 197,
                                                        columnNumber: 21,
                                                      },
                                                      this
                                                    )
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                lineNumber: 195,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'w-64 bg-gray-100 p-6 rounded-lg flex flex-col items-center mt-4',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'span',
                                                    {
                                                      className:
                                                        'text-3xl font-bold text-gray-900 underline decoration-yellow-400',
                                                      children:
                                                        isFromOpenFoodFacts
                                                          ? 'N/A'
                                                          : `${(data.price / 1000).toFixed(2)} €`,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/scanner/scannerDrawer.tsx',
                                                      lineNumber: 205,
                                                      columnNumber: 19,
                                                    },
                                                    this
                                                  ),
                                                  isFromOpenFoodFacts
                                                    ? /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'button',
                                                        {
                                                          className:
                                                            'mt-4 bg-gray-400 text-white py-3 rounded-full flex items-center justify-center gap-2 w-full h-12 cursor-not-allowed',
                                                          disabled: true,
                                                          children: [
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'FaShoppingBag'
                                                              ],
                                                              {
                                                                size: 20,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                                lineNumber: 216,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'span',
                                                              {
                                                                className:
                                                                  'text-md font-semibold',
                                                                children:
                                                                  'Produit pas en stock',
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                                lineNumber: 217,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            '[project]/components/scanner/scannerDrawer.tsx',
                                                          lineNumber: 212,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      )
                                                    : quantity === 0
                                                      ? /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          'button',
                                                          {
                                                            className:
                                                              'mt-4 bg-teal-600 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-teal-700 transition w-full h-12',
                                                            onClick:
                                                              handleAddToCart,
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'jsxDEV'
                                                              ])(
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  'FaShoppingBag'
                                                                ],
                                                                {
                                                                  size: 20,
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                                  lineNumber: 226,
                                                                  columnNumber: 23,
                                                                },
                                                                this
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'jsxDEV'
                                                              ])(
                                                                'span',
                                                                {
                                                                  className:
                                                                    'text-md font-semibold',
                                                                  children:
                                                                    'Ajouter à mon panier',
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                                  lineNumber: 227,
                                                                  columnNumber: 23,
                                                                },
                                                                this
                                                              ),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              '[project]/components/scanner/scannerDrawer.tsx',
                                                            lineNumber: 222,
                                                            columnNumber: 21,
                                                          },
                                                          this
                                                        )
                                                      : /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          'div',
                                                          {
                                                            className:
                                                              'mt-4 bg-teal-600 text-white px-6 py-3 rounded-full flex items-center justify-between w-full h-12',
                                                            children: [
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'jsxDEV'
                                                              ])(
                                                                'button',
                                                                {
                                                                  onClick:
                                                                    handleDecreaseQuantity,
                                                                  className:
                                                                    'rounded-full p-1',
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      'jsxDEV'
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__[
                                                                        'Minus'
                                                                      ],
                                                                      {
                                                                        size: 20,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          '[project]/components/scanner/scannerDrawer.tsx',
                                                                        lineNumber: 237,
                                                                        columnNumber: 25,
                                                                      },
                                                                      this
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                                  lineNumber: 233,
                                                                  columnNumber: 23,
                                                                },
                                                                this
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'jsxDEV'
                                                              ])(
                                                                'span',
                                                                {
                                                                  className:
                                                                    'font-semibold',
                                                                  children:
                                                                    quantity,
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                                  lineNumber: 239,
                                                                  columnNumber: 23,
                                                                },
                                                                this
                                                              ),
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                'jsxDEV'
                                                              ])(
                                                                'button',
                                                                {
                                                                  onClick:
                                                                    handleIncreaseQuantity,
                                                                  className:
                                                                    'rounded-full p-1',
                                                                  children:
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      'jsxDEV'
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                                                                        'Plus'
                                                                      ],
                                                                      {
                                                                        size: 20,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          '[project]/components/scanner/scannerDrawer.tsx',
                                                                        lineNumber: 244,
                                                                        columnNumber: 25,
                                                                      },
                                                                      this
                                                                    ),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    '[project]/components/scanner/scannerDrawer.tsx',
                                                                  lineNumber: 240,
                                                                  columnNumber: 23,
                                                                },
                                                                this
                                                              ),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              '[project]/components/scanner/scannerDrawer.tsx',
                                                            lineNumber: 232,
                                                            columnNumber: 21,
                                                          },
                                                          this
                                                        ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/scanner/scannerDrawer.tsx',
                                                lineNumber: 204,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 179,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 168,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              data &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'mt-8',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          title: 'Description',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'div',
                                            {
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className: 'font-semibold',
                                                    children:
                                                      'Informations complémentaires',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 256,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.generic_name ||
                                                      'Aucune description disponible.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 259,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                '[project]/components/scanner/scannerDrawer.tsx',
                                              lineNumber: 255,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 254,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          title: 'Composition et origine',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'div',
                                            {
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className: 'font-semibold',
                                                    children: 'Ingrédients',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 267,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.ingredients_text ||
                                                      'Ingrédients non disponibles.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 268,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className:
                                                      'font-semibold mt-4',
                                                    children:
                                                      'Informations nutritionnelles',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 272,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className:
                                                      'flex items-center mt-2',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'default'
                                                        ],
                                                        {
                                                          src: `/assets/nutri-score-${data.nutriScore?.toUpperCase()}.png`,
                                                          alt: `NutriScore ${data.nutriScore}`,
                                                          width: 100,
                                                          height: 40,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/scanner/scannerDrawer.tsx',
                                                          lineNumber: 276,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'p',
                                                        {
                                                          className:
                                                            'text-gray-700 ml-2',
                                                          children:
                                                            "Le Nutri-score est un logo qui informe sur la qualité nutritionnelle d'un produit.",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/scanner/scannerDrawer.tsx',
                                                          lineNumber: 282,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 275,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className:
                                                      'font-semibold mt-4',
                                                    children: 'Origine',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 288,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.origins ||
                                                      'Origine non renseignée.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 289,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className:
                                                      'font-semibold mt-4',
                                                    children:
                                                      'Valeurs nutritionnelles',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 293,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children: [
                                                      data?.quantity
                                                        ? `Quantité : ${data.quantity}`
                                                        : null,
                                                      data?.nutriments
                                                        ?.energy_100g
                                                        ? `Énergie : ${data.nutriments.energy_100g} kJ`
                                                        : null,
                                                      data?.nutriments?.[
                                                        'energy-kcal_100g'
                                                      ]
                                                        ? `${data.nutriments['energy-kcal_100g']} kcal`
                                                        : null,
                                                      data?.nutriments?.fat_100g
                                                        ? `Matières grasses : ${data.nutriments.fat_100g} g`
                                                        : null,
                                                      data?.nutriments?.[
                                                        'saturated-fat_100g'
                                                      ]
                                                        ? `dont acides gras saturés ${data.nutriments['saturated-fat_100g']} g`
                                                        : null,
                                                      data?.nutriments
                                                        ?.carbohydrates_100g
                                                        ? `Glucides : ${data.nutriments.carbohydrates_100g} g`
                                                        : null,
                                                      data?.nutriments
                                                        ?.sugars_100g
                                                        ? `dont sucres ${data.nutriments.sugars_100g} g`
                                                        : null,
                                                      data?.nutriments
                                                        ?.fiber_100g
                                                        ? `Fibres alimentaires : ${data.nutriments.fiber_100g} g`
                                                        : null,
                                                      data?.nutriments
                                                        ?.proteins_100g
                                                        ? `Protéines : ${data.nutriments.proteins_100g} g`
                                                        : null,
                                                      data?.nutriments
                                                        ?.salt_100g
                                                        ? `Sel : ${data.nutriments.salt_100g} g`
                                                        : null,
                                                    ]
                                                      .filter(Boolean)
                                                      .join(', '),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 296,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                '[project]/components/scanner/scannerDrawer.tsx',
                                              lineNumber: 266,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 265,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          title: 'Conseils',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'div',
                                            {
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className: 'font-semibold',
                                                    children:
                                                      'Instruction de conservation',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 335,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.conservation_conditions ||
                                                      'Aucune information sur la conservation.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 336,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'h3',
                                                  {
                                                    className:
                                                      'font-semibold mt-4',
                                                    children:
                                                      'Contact exploitant / Service consommateur',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 341,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.manufacturing_places ||
                                                      'Lieu de fabrication non disponible.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 344,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'p',
                                                  {
                                                    className:
                                                      'text-gray-700 mt-2',
                                                    children:
                                                      data?.brands ||
                                                      'Marque non renseignée.',
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/scanner/scannerDrawer.tsx',
                                                    lineNumber: 348,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                '[project]/components/scanner/scannerDrawer.tsx',
                                              lineNumber: 334,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/scanner/scannerDrawer.tsx',
                                          lineNumber: 333,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 253,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              data &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'ResponsiveDialogFooter'
                                  ],
                                  {
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'Button'
                                      ],
                                      {
                                        variant: 'secondary',
                                        onClick: () => setData(null),
                                        children: 'Retour',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/scanner/scannerDrawer.tsx',
                                        lineNumber: 357,
                                        columnNumber: 15,
                                      },
                                      this
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/scanner/scannerDrawer.tsx',
                                    lineNumber: 356,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/components/scanner/scannerDrawer.tsx',
                            lineNumber: 143,
                            columnNumber: 9,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/components/scanner/scannerDrawer.tsx',
                      lineNumber: 136,
                      columnNumber: 7,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/scanner/scannerDrawer.tsx',
                lineNumber: 134,
                columnNumber: 5,
              },
              this
            )
          }
          _s(ScannerDrawer, 'LbeJ+LR+L+Ok6y8Gs3BB+laiJjA=', false, function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useSession'
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useCart'
              ],
            ]
          })
          _c = ScannerDrawer
          var _c
          __turbopack_context__.k.register(_c, 'ScannerDrawer')
          if (
            typeof globalThis.$RefreshHelpers$ === 'object' &&
            globalThis.$RefreshHelpers !== null
          ) {
            __turbopack_context__.k.registerExports(
              module,
              globalThis.$RefreshHelpers$
            )
          }
        }
      },
    '[project]/hooks/use-mobile.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          useIsMobile: () => useIsMobile,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        const MOBILE_BREAKPOINT = 768
        function useIsMobile() {
          _s()
          const [isMobile, setIsMobile] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(undefined)
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'useIsMobile.useEffect': () => {
                const mql = window.matchMedia(
                  `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
                )
                const onChange = {
                  'useIsMobile.useEffect.onChange': () => {
                    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
                  },
                }['useIsMobile.useEffect.onChange']
                mql.addEventListener('change', onChange)
                setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
                return {
                  'useIsMobile.useEffect': () =>
                    mql.removeEventListener('change', onChange),
                }['useIsMobile.useEffect']
              },
            }['useIsMobile.useEffect'],
            []
          )
          return !!isMobile
        }
        _s(useIsMobile, 'D6B2cPXNCaIbeOx+abFr1uxLRM0=')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/components/general/header-mobile.tsx [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          __turbopack_context__.s({
            default: () => HeaderMobile,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookUser$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/book-user.js [app-client] (ecmascript) <export default as BookUser>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanBarcode$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/scan-barcode.js [app-client] (ecmascript) <export default as ScanBarcode>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/shopping-basket.js [app-client] (ecmascript) <export default as ShoppingBasket>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/button.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/responsiveDialog.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scanner$2f$scannerDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/scanner/scannerDrawer.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next-auth/react.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/app/contexts/CartContext.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/image.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/ui/badge.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/components/product/searchProduct.tsx [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
            )
          var _s = __turbopack_context__.k.signature()
          function HeaderMobile() {
            _s()
            const { data: session } = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSession'
            ])()
            const [openSearch, setOpenSearch] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])(false)
            const router = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRouter'
            ])()
            const { cartProducts, removeProduct, handleUpdateProductQuantity } =
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useCart'
              ])()
            const handleLogout = async () => {
              await (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'signOut'
              ])({
                redirect: false,
              })
              router.push('/')
            }
            const totalItems = cartProducts.reduce(
              (acc, item) => acc + item.quantity,
              0
            )
            const totalPrice = cartProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            )
            const totalPriceEuro = (totalPrice / 1000).toFixed(2)
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'header',
              {
                className:
                  'bg-white border-t fixed bottom-0 w-full p-2 grid grid-cols-5 gap-2 z-50',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'Button'
                    ],
                    {
                      variant: 'ghost',
                      className:
                        'text-slate-500 flex flex-col items-center gap-1 w-auto h-auto',
                      asChild: true,
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {
                          href: '/',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__[
                                'Home'
                              ],
                              {
                                className: 'w-6 h-6',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header-mobile.tsx',
                                lineNumber: 63,
                                columnNumber: 11,
                              },
                              this
                            ),
                            'Accueil',
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/components/general/header-mobile.tsx',
                          lineNumber: 62,
                          columnNumber: 9,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/general/header-mobile.tsx',
                      lineNumber: 57,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'ResponsiveDialog'
                    ],
                    {
                      open: openSearch,
                      onOpenChange: setOpenSearch,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogTrigger'
                          ],
                          {
                            asChild: true,
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'Button'
                              ],
                              {
                                variant: 'ghost',
                                className:
                                  'text-slate-500 flex flex-col items-center gap-1 w-auto h-auto',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__[
                                      'Search'
                                    ],
                                    {
                                      className: 'w-6 h-6',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/components/general/header-mobile.tsx',
                                      lineNumber: 73,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                                  'Chercher',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/components/general/header-mobile.tsx',
                                lineNumber: 69,
                                columnNumber: 11,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 68,
                            columnNumber: 9,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogContent'
                          ],
                          {
                            className: 'flex flex-col gap-4 p-4',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'ResponsiveDialogTitle'
                                ],
                                {
                                  className: 'text-center',
                                  children: 'Recherche',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header-mobile.tsx',
                                  lineNumber: 78,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'default'
                                ],
                                {
                                  setOpenSearch: setOpenSearch,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header-mobile.tsx',
                                  lineNumber: 81,
                                  columnNumber: 11,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 77,
                            columnNumber: 9,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/components/general/header-mobile.tsx',
                      lineNumber: 67,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'ResponsiveDialog'
                    ],
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogTrigger'
                          ],
                          {
                            asChild: true,
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'Button'
                              ],
                              {
                                className:
                                  'rounded-full p-3 w-auto h-auto bg-teal-600 relative',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__[
                                      'ShoppingBasket'
                                    ],
                                    {
                                      width: 24,
                                      height: 24,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/components/general/header-mobile.tsx',
                                      lineNumber: 88,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                                  totalItems > 0 &&
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'Badge'
                                      ],
                                      {
                                        className:
                                          'bg-red-500 text-white absolute top-0 right-0 transform translate-x-3 -translate-y-2',
                                        children: totalItems,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/header-mobile.tsx',
                                        lineNumber: 90,
                                        columnNumber: 15,
                                      },
                                      this
                                    ),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/components/general/header-mobile.tsx',
                                lineNumber: 87,
                                columnNumber: 11,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 86,
                            columnNumber: 9,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogContent'
                          ],
                          {
                            className:
                              'w-full p-4 bg-white shadow-xl rounded-lg',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'ResponsiveDialogHeader'
                                ],
                                {
                                  className:
                                    'bg-teal-700 text-white p-4 rounded-t-lg shadow-md',
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'div',
                                    {
                                      className: 'flex items-center gap-2',
                                      children: /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'ResponsiveDialogTitle'
                                        ],
                                        {
                                          className:
                                            'text-white text-lg font-semibold',
                                          children: 'Mon Panier',
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/general/header-mobile.tsx',
                                          lineNumber: 99,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/components/general/header-mobile.tsx',
                                      lineNumber: 98,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header-mobile.tsx',
                                  lineNumber: 97,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'mt-4 space-y-3 max-h-[500px] overflow-y-auto p-2',
                                  children:
                                    cartProducts.length === 0
                                      ? /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'p',
                                          {
                                            className:
                                              'text-gray-500 text-center',
                                            children: 'Votre panier est vide.',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 107,
                                            columnNumber: 15,
                                          },
                                          this
                                        )
                                      : /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'ul',
                                          {
                                            className: 'space-y-4',
                                            children: cartProducts.map(
                                              (product) =>
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'li',
                                                  {
                                                    className:
                                                      'flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'default'
                                                        ],
                                                        {
                                                          src: product.picture,
                                                          alt: product.name,
                                                          width: 80,
                                                          height: 80,
                                                          className:
                                                            'rounded-md object-cover',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header-mobile.tsx',
                                                          lineNumber: 117,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'div',
                                                        {
                                                          className: 'flex-1',
                                                          children: [
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'h3',
                                                              {
                                                                className:
                                                                  'font-semibold text-gray-800 text-xs',
                                                                children:
                                                                  product.name,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  '[project]/components/general/header-mobile.tsx',
                                                                lineNumber: 125,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'p',
                                                              {
                                                                className:
                                                                  'text-sm font-bold text-gray-900',
                                                                children: [
                                                                  (
                                                                    product.price /
                                                                    1000
                                                                  ).toFixed(2),
                                                                  ' €',
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  '[project]/components/general/header-mobile.tsx',
                                                                lineNumber: 128,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'p',
                                                              {
                                                                className:
                                                                  'text-xs text-gray-500',
                                                                children: [
                                                                  'Prix au kg ',
                                                                  (
                                                                    product.price /
                                                                    1000
                                                                  ).toFixed(2),
                                                                  ' €',
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  '[project]/components/general/header-mobile.tsx',
                                                                lineNumber: 131,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header-mobile.tsx',
                                                          lineNumber: 124,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'div',
                                                        {
                                                          className:
                                                            'flex flex-col items-end gap-2',
                                                          children: [
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'button',
                                                              {
                                                                onClick: () =>
                                                                  removeProduct(
                                                                    product.id
                                                                  ),
                                                                className:
                                                                  'text-gray-500 hover:text-gray-700 transition',
                                                                children:
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    'jsxDEV'
                                                                  ])(
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                                                      'Trash2'
                                                                    ],
                                                                    {
                                                                      size: 18,
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        '[project]/components/general/header-mobile.tsx',
                                                                      lineNumber: 141,
                                                                      columnNumber: 25,
                                                                    },
                                                                    this
                                                                  ),
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  '[project]/components/general/header-mobile.tsx',
                                                                lineNumber: 137,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'jsxDEV'
                                                            ])(
                                                              'div',
                                                              {
                                                                className:
                                                                  'flex items-center bg-teal-600 text-white rounded-full px-3 py-2',
                                                                children: [
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    'jsxDEV'
                                                                  ])(
                                                                    'button',
                                                                    {
                                                                      onClick:
                                                                        () =>
                                                                          handleUpdateProductQuantity(
                                                                            product.id,
                                                                            product.quantity -
                                                                              1
                                                                          ),
                                                                      className:
                                                                        'hover:opacity-80',
                                                                      children:
                                                                        /*#__PURE__*/ (0,
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          'jsxDEV'
                                                                        ])(
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__[
                                                                            'Minus'
                                                                          ],
                                                                          {
                                                                            size: 16,
                                                                          },
                                                                          void 0,
                                                                          false,
                                                                          {
                                                                            fileName:
                                                                              '[project]/components/general/header-mobile.tsx',
                                                                            lineNumber: 153,
                                                                            columnNumber: 27,
                                                                          },
                                                                          this
                                                                        ),
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        '[project]/components/general/header-mobile.tsx',
                                                                      lineNumber: 144,
                                                                      columnNumber: 25,
                                                                    },
                                                                    this
                                                                  ),
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    'jsxDEV'
                                                                  ])(
                                                                    'span',
                                                                    {
                                                                      className:
                                                                        'mx-2 text-sm font-semibold',
                                                                      children:
                                                                        product.quantity,
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        '[project]/components/general/header-mobile.tsx',
                                                                      lineNumber: 156,
                                                                      columnNumber: 25,
                                                                    },
                                                                    this
                                                                  ),
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    'jsxDEV'
                                                                  ])(
                                                                    'button',
                                                                    {
                                                                      onClick:
                                                                        () =>
                                                                          handleUpdateProductQuantity(
                                                                            product.id,
                                                                            product.quantity +
                                                                              1
                                                                          ),
                                                                      className:
                                                                        'hover:opacity-80',
                                                                      children:
                                                                        /*#__PURE__*/ (0,
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          'jsxDEV'
                                                                        ])(
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                                                                            'Plus'
                                                                          ],
                                                                          {
                                                                            size: 16,
                                                                          },
                                                                          void 0,
                                                                          false,
                                                                          {
                                                                            fileName:
                                                                              '[project]/components/general/header-mobile.tsx',
                                                                            lineNumber: 169,
                                                                            columnNumber: 27,
                                                                          },
                                                                          this
                                                                        ),
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        '[project]/components/general/header-mobile.tsx',
                                                                      lineNumber: 160,
                                                                      columnNumber: 25,
                                                                    },
                                                                    this
                                                                  ),
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  '[project]/components/general/header-mobile.tsx',
                                                                lineNumber: 143,
                                                                columnNumber: 23,
                                                              },
                                                              this
                                                            ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header-mobile.tsx',
                                                          lineNumber: 136,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  product.id,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header-mobile.tsx',
                                                    lineNumber: 113,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                )
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 111,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header-mobile.tsx',
                                  lineNumber: 105,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              cartProducts.length > 0 &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'mt-6 border-t pt-4',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'div',
                                        {
                                          className:
                                            'flex justify-between items-center text-lg font-bold',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                children: 'Total estimé :',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header-mobile.tsx',
                                                lineNumber: 182,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                className: 'text-gray-900',
                                                children: [
                                                  totalPriceEuro,
                                                  ' €',
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/header-mobile.tsx',
                                                lineNumber: 183,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/general/header-mobile.tsx',
                                          lineNumber: 181,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          href: '/cart',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'Button'
                                            ],
                                            {
                                              className:
                                                'w-full bg-teal-600 text-white font-bold mt-3 hover:bg-teal-700 transition',
                                              children: 'Valider mon Panier',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/header-mobile.tsx',
                                              lineNumber: 186,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/general/header-mobile.tsx',
                                          lineNumber: 185,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/general/header-mobile.tsx',
                                    lineNumber: 180,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 96,
                            columnNumber: 9,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/components/general/header-mobile.tsx',
                      lineNumber: 85,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scanner$2f$scannerDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'Button'
                        ],
                        {
                          variant: 'ghost',
                          className:
                            'text-slate-500 flex flex-col items-center gap-1 w-auto h-auto',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanBarcode$3e$__[
                                'ScanBarcode'
                              ],
                              {
                                className: 'w-6 h-6',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header-mobile.tsx',
                                lineNumber: 200,
                                columnNumber: 11,
                              },
                              this
                            ),
                            'Scann',
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/components/general/header-mobile.tsx',
                          lineNumber: 196,
                          columnNumber: 9,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        '[project]/components/general/header-mobile.tsx',
                      lineNumber: 195,
                      columnNumber: 7,
                    },
                    this
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'ResponsiveDialog'
                    ],
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogTrigger'
                          ],
                          {
                            asChild: true,
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'Button'
                              ],
                              {
                                variant: 'ghost',
                                className:
                                  'text-slate-500 flex flex-col items-center gap-1 w-auto h-auto',
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                      'User'
                                    ],
                                    {
                                      className: 'w-6 h-6',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/components/general/header-mobile.tsx',
                                      lineNumber: 210,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                                  'Profil',
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/components/general/header-mobile.tsx',
                                lineNumber: 206,
                                columnNumber: 11,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 205,
                            columnNumber: 9,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'ResponsiveDialogContent'
                          ],
                          {
                            className:
                              'flex flex-col gap-4 p-4 text-sm text-slate-500',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$responsiveDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'ResponsiveDialogTitle'
                                ],
                                {
                                  className: 'text-center',
                                  children: 'Mon compte',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header-mobile.tsx',
                                  lineNumber: 215,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              session
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'Fragment'
                                    ],
                                    {
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: `/user?userId=${session.user.id}`,
                                            className:
                                              'flex items-center gap-3',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookUser$3e$__[
                                                  'BookUser'
                                                ],
                                                {
                                                  size: 24,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header-mobile.tsx',
                                                  lineNumber: 224,
                                                  columnNumber: 17,
                                                },
                                                this
                                              ),
                                              'Mon Compte',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 220,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: '/cart',
                                            className:
                                              'flex items-center gap-3',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__[
                                                  'ShoppingBasket'
                                                ],
                                                {
                                                  size: 24,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header-mobile.tsx',
                                                  lineNumber: 228,
                                                  columnNumber: 17,
                                                },
                                                this
                                              ),
                                              'Mon Panier',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 227,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'default'
                                          ],
                                          {
                                            href: `/user/${session?.user?.id}/order`,
                                            className:
                                              'flex items-center gap-3',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__[
                                                  'Package'
                                                ],
                                                {
                                                  size: 24,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header-mobile.tsx',
                                                  lineNumber: 235,
                                                  columnNumber: 17,
                                                },
                                                this
                                              ),
                                              'Mes Commandes',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 231,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                        session?.user?.role === 'Admin' &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'default'
                                            ],
                                            {
                                              href: '/admin',
                                              className:
                                                'flex items-center gap-3',
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
                                                    'Users'
                                                  ],
                                                  {
                                                    size: 24,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header-mobile.tsx',
                                                    lineNumber: 240,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                                'Admin',
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                '[project]/components/general/header-mobile.tsx',
                                              lineNumber: 239,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'button',
                                          {
                                            onClick: handleLogout,
                                            className:
                                              'flex items-center gap-3',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__[
                                                  'LogOut'
                                                ],
                                                {
                                                  className: 'text-red-500',
                                                  size: 24,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header-mobile.tsx',
                                                  lineNumber: 248,
                                                  columnNumber: 17,
                                                },
                                                this
                                              ),
                                              'Déconnexion',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 244,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true
                                  )
                                : /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'default'
                                    ],
                                    {
                                      href: '/api/auth/signin',
                                      className: 'flex items-center gap-3',
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                            'User'
                                          ],
                                          {
                                            className: 'text-teal-600',
                                            size: 30,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 254,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'span',
                                          {
                                            className: 'text-gray-800 text-sm',
                                            children: 'Se connecter',
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/header-mobile.tsx',
                                            lineNumber: 255,
                                            columnNumber: 15,
                                          },
                                          this
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        '[project]/components/general/header-mobile.tsx',
                                      lineNumber: 253,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              '[project]/components/general/header-mobile.tsx',
                            lineNumber: 214,
                            columnNumber: 9,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        '[project]/components/general/header-mobile.tsx',
                      lineNumber: 204,
                      columnNumber: 7,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/general/header-mobile.tsx',
                lineNumber: 56,
                columnNumber: 5,
              },
              this
            )
          }
          _s(HeaderMobile, 'XTo22vT8eCYTHWreERGG3HSTDT0=', false, function () {
            return [
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useSession'
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useRouter'
              ],
              __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'useCart'
              ],
            ]
          })
          _c = HeaderMobile
          var _c
          __turbopack_context__.k.register(_c, 'HeaderMobile')
          if (
            typeof globalThis.$RefreshHelpers$ === 'object' &&
            globalThis.$RefreshHelpers !== null
          ) {
            __turbopack_context__.k.registerExports(
              module,
              globalThis.$RefreshHelpers$
            )
          }
        }
      },
    '[project]/components/general/header.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          default: () => Header,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/image.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next-auth/react.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookUser$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/book-user.js [app-client] (ecmascript) <export default as BookUser>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/shopping-basket.js [app-client] (ecmascript) <export default as ShoppingBasket>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanBarcode$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/scan-barcode.js [app-client] (ecmascript) <export default as ScanBarcode>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/product/searchProduct.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/dropdown-menu.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/sheet.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/badge.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/button.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scanner$2f$scannerDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/scanner/scannerDrawer.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/app/contexts/CartContext.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/skeleton.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/hooks/use-mobile.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$general$2f$header$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/general/header-mobile.tsx [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        const Sidebar = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'default'
        ])(
          (_c = () =>
            __turbopack_context__.r(
              '[project]/components/general/sidebar.tsx [app-client] (ecmascript, next/dynamic entry, async loader)'
            )(__turbopack_context__.i)),
          {
            loadableGenerated: {
              modules: [
                '[project]/components/general/sidebar.tsx [app-client] (ecmascript, next/dynamic entry)',
              ],
            },
            ssr: false,
            loading: () =>
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'Skeleton'
                ],
                {
                  className: 'w-full h-8',
                },
                void 0,
                false,
                {
                  fileName: '[project]/components/general/header.tsx',
                  lineNumber: 51,
                  columnNumber: 18,
                },
                this
              ),
          }
        )
        _c1 = Sidebar
        function Header() {
          _s()
          const { data: session } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useSession'
          ])()
          const { cartProducts, removeProduct, handleUpdateProductQuantity } =
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCart'
            ])()
          const router = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useRouter'
          ])()
          const [showSearch, setShowSearch] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          const [searchOpen, setSearchOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          const [open, setOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          const isMobile = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useIsMobile'
          ])()
          const handleLogout = async () => {
            await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'signOut'
            ])({
              redirect: false,
            })
            router.push('/')
          }
          const openSearch = () => {
            setShowSearch(true)
            requestAnimationFrame(() => setSearchOpen(true))
          }
          const closeSearch = () => {
            setSearchOpen(false)
          }
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'Header.useEffect': () => {
                if (!searchOpen && showSearch) {
                  const t = setTimeout(
                    {
                      'Header.useEffect.t': () => {
                        setShowSearch(false)
                      },
                    }['Header.useEffect.t'],
                    300
                  )
                  return {
                    'Header.useEffect': () => clearTimeout(t),
                  }['Header.useEffect']
                }
              },
            }['Header.useEffect'],
            [searchOpen, showSearch]
          )
          const totalItems = cartProducts.reduce(
            (acc, item) => acc + item.quantity,
            0
          )
          const totalPrice = cartProducts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )
          const totalPriceEuro = (totalPrice / 1000).toFixed(2)
          if (isMobile) {
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$general$2f$header$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ],
              {},
              void 0,
              false,
              {
                fileName: '[project]/components/general/header.tsx',
                lineNumber: 95,
                columnNumber: 12,
              },
              this
            )
          }
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'header',
            {
              className: 'bg-white shadow-md sticky top-0 z-50',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className:
                      'container mx-auto flex items-center justify-between px-6 py-4',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'md:hidden p-2',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__[
                              'Menu'
                            ],
                            {
                              size: 26,
                              className: 'text-blue-600',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/general/header.tsx',
                              lineNumber: 102,
                              columnNumber: 11,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 101,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {
                          href: '/',
                          className: 'flex items-center',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ],
                            {
                              src: '/assets/trinity-logo.png',
                              alt: 'Accéder au Drive U sur CoursesU',
                              width: 50,
                              height: 20,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/general/header.tsx',
                              lineNumber: 105,
                              columnNumber: 11,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 104,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'hidden md:flex flex-1 mx-4 md:mx-8',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'Suspense'
                            ],
                            {
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'default'
                                ],
                                {},
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/header.tsx',
                                  lineNumber: 114,
                                  columnNumber: 13,
                                },
                                this
                              ),
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/general/header.tsx',
                              lineNumber: 113,
                              columnNumber: 11,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 112,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'button',
                        {
                          className: 'md:hidden p-2',
                          onClick: openSearch,
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__[
                              'Search'
                            ],
                            {
                              size: 22,
                              className: 'text-teal-600',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/general/header.tsx',
                              lineNumber: 118,
                              columnNumber: 11,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 117,
                          columnNumber: 9,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'flex items-center gap-4',
                          children: [
                            session
                              ? /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'DropdownMenu'
                                  ],
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'DropdownMenuTrigger'
                                        ],
                                        {
                                          className:
                                            'flex items-center gap-2 text-gray-700 ml-2',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                                'User'
                                              ],
                                              {
                                                size: 22,
                                                className: 'text-teal-600',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 124,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                className:
                                                  'text-sm hidden md:inline',
                                                children: 'Mon Compte',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 125,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 123,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'DropdownMenuContent'
                                        ],
                                        {
                                          className:
                                            'bg-white shadow-xl rounded-lg p-3 w-56 animate-fade-in border border-gray-200 mt-3',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuLabel'
                                              ],
                                              {
                                                className:
                                                  'text-gray-900 font-semibold text-sm px-4',
                                                children: 'Mon Compte',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 128,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuSeparator'
                                              ],
                                              {
                                                className:
                                                  'my-2 border-t border-gray-300',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 131,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuItem'
                                              ],
                                              {
                                                asChild: true,
                                                className:
                                                  'flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition',
                                                children: /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'default'
                                                  ],
                                                  {
                                                    href: `/user?userId=${session.user.id}`,
                                                    className:
                                                      'flex items-center gap-3',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookUser$3e$__[
                                                          'BookUser'
                                                        ],
                                                        {
                                                          className:
                                                            'text-teal-600',
                                                          size: 30,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 140,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'span',
                                                        {
                                                          className:
                                                            'text-gray-800 text-sm',
                                                          children:
                                                            'Mon Compte',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 141,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header.tsx',
                                                    lineNumber: 136,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 132,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuItem'
                                              ],
                                              {
                                                asChild: true,
                                                className:
                                                  'flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition',
                                                children: /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'default'
                                                  ],
                                                  {
                                                    href: '/cart',
                                                    className:
                                                      'flex items-center gap-3',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$basket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBasket$3e$__[
                                                          'ShoppingBasket'
                                                        ],
                                                        {
                                                          className:
                                                            'text-teal-600',
                                                          size: 30,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 149,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'span',
                                                        {
                                                          className:
                                                            'text-gray-800 text-sm',
                                                          children:
                                                            'Mon Panier',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 150,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header.tsx',
                                                    lineNumber: 148,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 144,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuItem'
                                              ],
                                              {
                                                asChild: true,
                                                className:
                                                  'flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition',
                                                children: /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'default'
                                                  ],
                                                  {
                                                    href: `/user/${session?.user?.id}/order`,
                                                    className:
                                                      'flex items-center gap-3',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__[
                                                          'Package'
                                                        ],
                                                        {
                                                          className:
                                                            'text-teal-600',
                                                          size: 30,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 161,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'span',
                                                        {
                                                          className:
                                                            'text-gray-800 text-sm',
                                                          children:
                                                            'Mes Commandes',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 162,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header.tsx',
                                                    lineNumber: 157,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 153,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            session?.user?.role === 'Admin' &&
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'DropdownMenuItem'
                                                ],
                                                {
                                                  asChild: true,
                                                  className:
                                                    'flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition',
                                                  children: /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'default'
                                                    ],
                                                    {
                                                      href: '/admin',
                                                      className:
                                                        'flex items-center gap-3',
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
                                                            'Users'
                                                          ],
                                                          {
                                                            className:
                                                              'text-teal-600',
                                                            size: 30,
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              '[project]/components/general/header.tsx',
                                                            lineNumber: 171,
                                                            columnNumber: 23,
                                                          },
                                                          this
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'jsxDEV'
                                                        ])(
                                                          'span',
                                                          {
                                                            className:
                                                              'text-gray-800 text-sm',
                                                            children: 'Admin',
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              '[project]/components/general/header.tsx',
                                                            lineNumber: 172,
                                                            columnNumber: 23,
                                                          },
                                                          this
                                                        ),
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/header.tsx',
                                                      lineNumber: 170,
                                                      columnNumber: 21,
                                                    },
                                                    this
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header.tsx',
                                                  lineNumber: 166,
                                                  columnNumber: 19,
                                                },
                                                this
                                              ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuSeparator'
                                              ],
                                              {
                                                className:
                                                  'my-2 border-t border-gray-300',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 176,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'DropdownMenuItem'
                                              ],
                                              {
                                                onClick: handleLogout,
                                                className:
                                                  'flex items-center gap-3 px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-md transition',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__[
                                                      'LogOut'
                                                    ],
                                                    {
                                                      className: 'text-red-500',
                                                      size: 20,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/header.tsx',
                                                      lineNumber: 181,
                                                      columnNumber: 19,
                                                    },
                                                    this
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'span',
                                                    {
                                                      className:
                                                        'text-sm font-medium',
                                                      children: 'Déconnexion',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/header.tsx',
                                                      lineNumber: 182,
                                                      columnNumber: 19,
                                                    },
                                                    this
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 177,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 127,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/general/header.tsx',
                                    lineNumber: 122,
                                    columnNumber: 13,
                                  },
                                  this
                                )
                              : /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'DropdownMenu'
                                  ],
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'DropdownMenuTrigger'
                                        ],
                                        {
                                          className:
                                            'flex items-center gap-2 text-gray-700 ml-2',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                              'User'
                                            ],
                                            {
                                              size: 22,
                                              className: 'text-teal-600',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/header.tsx',
                                              lineNumber: 189,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 188,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'DropdownMenuContent'
                                        ],
                                        {
                                          className:
                                            'bg-white shadow-xl rounded-lg p-3 w-56 animate-fade-in border border-gray-200 mt-3',
                                          children: /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'DropdownMenuItem'
                                            ],
                                            {
                                              asChild: true,
                                              className:
                                                'flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition',
                                              children: /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'default'
                                                ],
                                                {
                                                  href: '/api/auth/signin',
                                                  className:
                                                    'flex items-center gap-3',
                                                  children: [
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                                        'User'
                                                      ],
                                                      {
                                                        className:
                                                          'text-teal-600',
                                                        size: 30,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/components/general/header.tsx',
                                                        lineNumber: 200,
                                                        columnNumber: 21,
                                                      },
                                                      this
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'span',
                                                      {
                                                        className:
                                                          'text-gray-800 text-sm',
                                                        children:
                                                          'Se connecter',
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/components/general/header.tsx',
                                                        lineNumber: 201,
                                                        columnNumber: 21,
                                                      },
                                                      this
                                                    ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header.tsx',
                                                  lineNumber: 196,
                                                  columnNumber: 19,
                                                },
                                                this
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/header.tsx',
                                              lineNumber: 192,
                                              columnNumber: 17,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 191,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/general/header.tsx',
                                    lineNumber: 187,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'relative',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Sheet'
                                  ],
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'SheetTrigger'
                                        ],
                                        {
                                          className:
                                            'relative flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-teal-700 transition',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__[
                                                'ShoppingCart'
                                              ],
                                              {
                                                size: 22,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 210,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                className: 'hidden md:inline',
                                                children: 'Panier',
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 211,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            totalItems > 0 &&
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'Badge'
                                                ],
                                                {
                                                  className:
                                                    'bg-red-500 text-white absolute top-0 right-0 transform translate-x-3 -translate-y-2',
                                                  children: totalItems,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header.tsx',
                                                  lineNumber: 213,
                                                  columnNumber: 19,
                                                },
                                                this
                                              ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 209,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'SheetContent'
                                        ],
                                        {
                                          className:
                                            'sm:w-full p-4 bg-white shadow-xl rounded-lg',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'SheetHeader'
                                              ],
                                              {
                                                className:
                                                  'bg-teal-700 text-white p-4 rounded-t-lg shadow-md',
                                                children: /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  'jsxDEV'
                                                ])(
                                                  'div',
                                                  {
                                                    className:
                                                      'flex items-center gap-2',
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__[
                                                          'ShoppingCart'
                                                        ],
                                                        {
                                                          size: 24,
                                                          className:
                                                            'text-white',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 222,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          'SheetTitle'
                                                        ],
                                                        {
                                                          className:
                                                            'text-white text-lg font-semibold',
                                                          children:
                                                            'Mon Panier',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 223,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      '[project]/components/general/header.tsx',
                                                    lineNumber: 221,
                                                    columnNumber: 19,
                                                  },
                                                  this
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 220,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'div',
                                              {
                                                className:
                                                  'mt-4 space-y-3 max-h-[500px] overflow-y-auto p-2',
                                                children:
                                                  cartProducts.length === 0
                                                    ? /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'p',
                                                        {
                                                          className:
                                                            'text-gray-500 text-center',
                                                          children:
                                                            'Votre panier est vide.',
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 231,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      )
                                                    : /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'jsxDEV'
                                                      ])(
                                                        'ul',
                                                        {
                                                          className:
                                                            'space-y-4',
                                                          children:
                                                            cartProducts.map(
                                                              (product) =>
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  'jsxDEV'
                                                                ])(
                                                                  'li',
                                                                  {
                                                                    className:
                                                                      'flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm',
                                                                    children: [
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        'jsxDEV'
                                                                      ])(
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          'default'
                                                                        ],
                                                                        {
                                                                          src: product.picture,
                                                                          alt: product.name,
                                                                          width: 80,
                                                                          height: 80,
                                                                          className:
                                                                            'rounded-md object-cover',
                                                                        },
                                                                        void 0,
                                                                        false,
                                                                        {
                                                                          fileName:
                                                                            '[project]/components/general/header.tsx',
                                                                          lineNumber: 241,
                                                                          columnNumber: 27,
                                                                        },
                                                                        this
                                                                      ),
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        'jsxDEV'
                                                                      ])(
                                                                        'div',
                                                                        {
                                                                          className:
                                                                            'flex-1',
                                                                          children:
                                                                            [
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                'jsxDEV'
                                                                              ])(
                                                                                'h3',
                                                                                {
                                                                                  className:
                                                                                    'font-semibold text-gray-800 text-sm',
                                                                                  children:
                                                                                    product.name,
                                                                                },
                                                                                void 0,
                                                                                false,
                                                                                {
                                                                                  fileName:
                                                                                    '[project]/components/general/header.tsx',
                                                                                  lineNumber: 249,
                                                                                  columnNumber: 29,
                                                                                },
                                                                                this
                                                                              ),
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                'jsxDEV'
                                                                              ])(
                                                                                'p',
                                                                                {
                                                                                  className:
                                                                                    'text-lg font-bold text-gray-900',
                                                                                  children:
                                                                                    [
                                                                                      (
                                                                                        product.price /
                                                                                        1000
                                                                                      ).toFixed(
                                                                                        2
                                                                                      ),
                                                                                      ' €',
                                                                                    ],
                                                                                },
                                                                                void 0,
                                                                                true,
                                                                                {
                                                                                  fileName:
                                                                                    '[project]/components/general/header.tsx',
                                                                                  lineNumber: 252,
                                                                                  columnNumber: 29,
                                                                                },
                                                                                this
                                                                              ),
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                'jsxDEV'
                                                                              ])(
                                                                                'p',
                                                                                {
                                                                                  className:
                                                                                    'text-xs text-gray-500',
                                                                                  children:
                                                                                    [
                                                                                      'Prix au kg ',
                                                                                      (
                                                                                        product.price /
                                                                                        1000
                                                                                      ).toFixed(
                                                                                        2
                                                                                      ),
                                                                                      ' €',
                                                                                    ],
                                                                                },
                                                                                void 0,
                                                                                true,
                                                                                {
                                                                                  fileName:
                                                                                    '[project]/components/general/header.tsx',
                                                                                  lineNumber: 255,
                                                                                  columnNumber: 29,
                                                                                },
                                                                                this
                                                                              ),
                                                                            ],
                                                                        },
                                                                        void 0,
                                                                        true,
                                                                        {
                                                                          fileName:
                                                                            '[project]/components/general/header.tsx',
                                                                          lineNumber: 248,
                                                                          columnNumber: 27,
                                                                        },
                                                                        this
                                                                      ),
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        'jsxDEV'
                                                                      ])(
                                                                        'div',
                                                                        {
                                                                          className:
                                                                            'flex flex-col items-end gap-2',
                                                                          children:
                                                                            [
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                'jsxDEV'
                                                                              ])(
                                                                                'button',
                                                                                {
                                                                                  onClick:
                                                                                    () =>
                                                                                      removeProduct(
                                                                                        product.id
                                                                                      ),
                                                                                  className:
                                                                                    'text-gray-500 hover:text-gray-700 transition',
                                                                                  children:
                                                                                    /*#__PURE__*/ (0,
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                      'jsxDEV'
                                                                                    ])(
                                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                                                                        'Trash2'
                                                                                      ],
                                                                                      {
                                                                                        size: 18,
                                                                                      },
                                                                                      void 0,
                                                                                      false,
                                                                                      {
                                                                                        fileName:
                                                                                          '[project]/components/general/header.tsx',
                                                                                        lineNumber: 265,
                                                                                        columnNumber: 31,
                                                                                      },
                                                                                      this
                                                                                    ),
                                                                                },
                                                                                void 0,
                                                                                false,
                                                                                {
                                                                                  fileName:
                                                                                    '[project]/components/general/header.tsx',
                                                                                  lineNumber: 261,
                                                                                  columnNumber: 29,
                                                                                },
                                                                                this
                                                                              ),
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                'jsxDEV'
                                                                              ])(
                                                                                'div',
                                                                                {
                                                                                  className:
                                                                                    'flex items-center bg-teal-600 text-white rounded-full px-3 py-2',
                                                                                  children:
                                                                                    [
                                                                                      /*#__PURE__*/ (0,
                                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                        'jsxDEV'
                                                                                      ])(
                                                                                        'button',
                                                                                        {
                                                                                          onClick:
                                                                                            () =>
                                                                                              handleUpdateProductQuantity(
                                                                                                product.id,
                                                                                                product.quantity -
                                                                                                  1
                                                                                              ),
                                                                                          className:
                                                                                            'hover:opacity-80',
                                                                                          children:
                                                                                            /*#__PURE__*/ (0,
                                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                              'jsxDEV'
                                                                                            ])(
                                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__[
                                                                                                'Minus'
                                                                                              ],
                                                                                              {
                                                                                                size: 16,
                                                                                              },
                                                                                              void 0,
                                                                                              false,
                                                                                              {
                                                                                                fileName:
                                                                                                  '[project]/components/general/header.tsx',
                                                                                                lineNumber: 277,
                                                                                                columnNumber: 33,
                                                                                              },
                                                                                              this
                                                                                            ),
                                                                                        },
                                                                                        void 0,
                                                                                        false,
                                                                                        {
                                                                                          fileName:
                                                                                            '[project]/components/general/header.tsx',
                                                                                          lineNumber: 268,
                                                                                          columnNumber: 31,
                                                                                        },
                                                                                        this
                                                                                      ),
                                                                                      /*#__PURE__*/ (0,
                                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                        'jsxDEV'
                                                                                      ])(
                                                                                        'span',
                                                                                        {
                                                                                          className:
                                                                                            'mx-2 text-sm font-semibold',
                                                                                          children:
                                                                                            product.quantity,
                                                                                        },
                                                                                        void 0,
                                                                                        false,
                                                                                        {
                                                                                          fileName:
                                                                                            '[project]/components/general/header.tsx',
                                                                                          lineNumber: 280,
                                                                                          columnNumber: 31,
                                                                                        },
                                                                                        this
                                                                                      ),
                                                                                      /*#__PURE__*/ (0,
                                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                        'jsxDEV'
                                                                                      ])(
                                                                                        'button',
                                                                                        {
                                                                                          onClick:
                                                                                            () =>
                                                                                              handleUpdateProductQuantity(
                                                                                                product.id,
                                                                                                product.quantity +
                                                                                                  1
                                                                                              ),
                                                                                          className:
                                                                                            'hover:opacity-80',
                                                                                          children:
                                                                                            /*#__PURE__*/ (0,
                                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                                              'jsxDEV'
                                                                                            ])(
                                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                                                                                                'Plus'
                                                                                              ],
                                                                                              {
                                                                                                size: 16,
                                                                                              },
                                                                                              void 0,
                                                                                              false,
                                                                                              {
                                                                                                fileName:
                                                                                                  '[project]/components/general/header.tsx',
                                                                                                lineNumber: 293,
                                                                                                columnNumber: 33,
                                                                                              },
                                                                                              this
                                                                                            ),
                                                                                        },
                                                                                        void 0,
                                                                                        false,
                                                                                        {
                                                                                          fileName:
                                                                                            '[project]/components/general/header.tsx',
                                                                                          lineNumber: 284,
                                                                                          columnNumber: 31,
                                                                                        },
                                                                                        this
                                                                                      ),
                                                                                    ],
                                                                                },
                                                                                void 0,
                                                                                true,
                                                                                {
                                                                                  fileName:
                                                                                    '[project]/components/general/header.tsx',
                                                                                  lineNumber: 267,
                                                                                  columnNumber: 29,
                                                                                },
                                                                                this
                                                                              ),
                                                                            ],
                                                                        },
                                                                        void 0,
                                                                        true,
                                                                        {
                                                                          fileName:
                                                                            '[project]/components/general/header.tsx',
                                                                          lineNumber: 260,
                                                                          columnNumber: 27,
                                                                        },
                                                                        this
                                                                      ),
                                                                    ],
                                                                  },
                                                                  product.id,
                                                                  true,
                                                                  {
                                                                    fileName:
                                                                      '[project]/components/general/header.tsx',
                                                                    lineNumber: 237,
                                                                    columnNumber: 25,
                                                                  },
                                                                  this
                                                                )
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            '[project]/components/general/header.tsx',
                                                          lineNumber: 235,
                                                          columnNumber: 21,
                                                        },
                                                        this
                                                      ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/general/header.tsx',
                                                lineNumber: 229,
                                                columnNumber: 17,
                                              },
                                              this
                                            ),
                                            cartProducts.length > 0 &&
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'div',
                                                {
                                                  className:
                                                    'mt-6 border-t pt-4',
                                                  children: [
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      'div',
                                                      {
                                                        className:
                                                          'flex justify-between items-center text-lg font-bold',
                                                        children: [
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            'jsxDEV'
                                                          ])(
                                                            'span',
                                                            {
                                                              children:
                                                                'Total estimé :',
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                '[project]/components/general/header.tsx',
                                                              lineNumber: 306,
                                                              columnNumber: 23,
                                                            },
                                                            this
                                                          ),
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            'jsxDEV'
                                                          ])(
                                                            'span',
                                                            {
                                                              className:
                                                                'text-gray-900',
                                                              children: [
                                                                totalPriceEuro,
                                                                ' €',
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                            {
                                                              fileName:
                                                                '[project]/components/general/header.tsx',
                                                              lineNumber: 307,
                                                              columnNumber: 23,
                                                            },
                                                            this
                                                          ),
                                                        ],
                                                      },
                                                      void 0,
                                                      true,
                                                      {
                                                        fileName:
                                                          '[project]/components/general/header.tsx',
                                                        lineNumber: 305,
                                                        columnNumber: 21,
                                                      },
                                                      this
                                                    ),
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      'jsxDEV'
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        'default'
                                                      ],
                                                      {
                                                        href: '/cart',
                                                        children:
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            'jsxDEV'
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              'Button'
                                                            ],
                                                            {
                                                              className:
                                                                'w-full bg-teal-600 text-white font-bold mt-3 hover:bg-teal-700 transition',
                                                              children:
                                                                'Valider mon Panier',
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                '[project]/components/general/header.tsx',
                                                              lineNumber: 310,
                                                              columnNumber: 23,
                                                            },
                                                            this
                                                          ),
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          '[project]/components/general/header.tsx',
                                                        lineNumber: 309,
                                                        columnNumber: 21,
                                                      },
                                                      this
                                                    ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    '[project]/components/general/header.tsx',
                                                  lineNumber: 304,
                                                  columnNumber: 19,
                                                },
                                                this
                                              ),
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/general/header.tsx',
                                          lineNumber: 219,
                                          columnNumber: 15,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/general/header.tsx',
                                    lineNumber: 208,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header.tsx',
                                lineNumber: 207,
                                columnNumber: 11,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scanner$2f$scannerDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'default'
                              ],
                              {
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$barcode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanBarcode$3e$__[
                                    'ScanBarcode'
                                  ],
                                  {},
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/general/header.tsx',
                                    lineNumber: 320,
                                    columnNumber: 13,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header.tsx',
                                lineNumber: 319,
                                columnNumber: 11,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 120,
                          columnNumber: 9,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/components/general/header.tsx',
                    lineNumber: 100,
                    columnNumber: 7,
                  },
                  this
                ),
                showSearch &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      onClick: closeSearch,
                      className:
                        'fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300',
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          onClick: (e) => e.stopPropagation(),
                          className: `relative w-full max-w-md bg-white rounded-b-3xl shadow-xl p-6 ${searchOpen ? 'animate-slide-down' : 'animate-slide-up'}`,
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'button',
                              {
                                onClick: closeSearch,
                                className:
                                  'absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header.tsx',
                                lineNumber: 335,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'h2',
                              {
                                className: 'text-xl font-semibold text-center',
                                children: 'Recherche',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header.tsx',
                                lineNumber: 339,
                                columnNumber: 13,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'div',
                              {
                                className: 'mt-6',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Suspense'
                                  ],
                                  {
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'default'
                                      ],
                                      {
                                        onSearch: closeSearch,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/header.tsx',
                                        lineNumber: 342,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/general/header.tsx',
                                    lineNumber: 341,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/header.tsx',
                                lineNumber: 340,
                                columnNumber: 13,
                              },
                              this
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: '[project]/components/general/header.tsx',
                          lineNumber: 329,
                          columnNumber: 11,
                        },
                        this
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/general/header.tsx',
                      lineNumber: 325,
                      columnNumber: 9,
                    },
                    this
                  ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/components/general/header.tsx',
              lineNumber: 99,
              columnNumber: 5,
            },
            this
          )
        }
        _s(Header, 'IkDJMxgpQmnQ+JiKRzKVcZk6kWo=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSession'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCart'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRouter'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useIsMobile'
            ],
          ]
        })
        _c2 = Header
        var _c, _c1, _c2
        __turbopack_context__.k.register(_c, 'Sidebar$dynamic')
        __turbopack_context__.k.register(_c1, 'Sidebar')
        __turbopack_context__.k.register(_c2, 'Header')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
    '[project]/lib/server-actions/get-categories-actions.ts [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          /* __next_internal_action_entry_do_not_use__ {"00ed0b82ecec129a24d8e3abaf1525b538308f5b52":"default"} */ __turbopack_context__.s(
            {
              default: () => __TURBOPACK__default__export__,
            }
          )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)'
            )
          const __TURBOPACK__default__export__ = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '00ed0b82ecec129a24d8e3abaf1525b538308f5b52',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'default'
          )
        }
      },
    '[project]/components/general/sidebar.tsx [app-client] (ecmascript)': (
      __turbopack_context__
    ) => {
      'use strict'

      var {
        g: global,
        d: __dirname,
        k: __turbopack_refresh__,
        m: module,
      } = __turbopack_context__
      {
        __turbopack_context__.s({
          default: () => Sidebar,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$get$2d$categories$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/server-actions/get-categories-actions.ts [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function Sidebar({ className, setOpen }) {
          _s()
          const [categoryIds, setCategoryIds] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])({})
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'Sidebar.useEffect': () => {
                async function fetchCategories() {
                  const dbCategories = await (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$get$2d$categories$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'default'
                  ])()
                  setCategoryIds(
                    Object.fromEntries(
                      dbCategories.map(
                        {
                          'Sidebar.useEffect.fetchCategories': (c) => [
                            c.name,
                            c.id,
                          ],
                        }['Sidebar.useEffect.fetchCategories']
                      )
                    )
                  )
                }
                fetchCategories()
              },
            }['Sidebar.useEffect'],
            []
          )
          const categories = [
            {
              id: 'fruits-legumes',
              name: 'Fruits et Légumes',
              image: '/categories/fruits_legumes.png',
              subcategories: [
                'Légumes et dérivés',
                'Fruits et produits dérivés',
                'Salades',
                'Fruits secs',
                'Fruits tropicaux',
              ],
            },
            {
              id: 'viandes-poissons',
              name: 'Viandes et Poissons',
              image: '/categories/viande_poissons.png',
              subcategories: [
                'Viandes',
                'Charcuteries',
                'Jambons',
                'Poissons',
                'Filets de poissons',
                'Poissons surgelés',
                'Saumons',
                'Poissons fumés',
              ],
            },
            {
              id: 'charcuterie-traiteur',
              name: 'Charcuterie et Traiteur',
              image: '/categories/charcuterie.webp',
              subcategories: [
                'Charcuteries',
                'Jambons',
                'Saucissons',
                'Pâtés',
                'Rillettes',
                'Terrines',
                'Plats préparés à base de charcuterie',
              ],
            },
            {
              id: 'produits-frais',
              name: 'Produits Frais',
              image: '/categories/produit_frais.png',
              subcategories: [
                'Produits laitiers',
                'Desserts',
                'Fromages',
                'Yaourts',
                'Viandes fraîches',
                'Poissons frais',
              ],
            },
            {
              id: 'surgeles',
              name: 'Surgelés',
              image: '/categories/surgeles_etoile.png',
              subcategories: [
                'Plats préparés surgelés',
                'Desserts glacés',
                'Poissons surgelés',
                'Viandes surgelées',
                'Viennoiseries surgelées',
              ],
            },
            {
              id: 'epicerie-salee',
              name: 'Épicerie Salée',
              image: '/categories/epicerie_salee.png',
              subcategories: [
                'Pâtes',
                'Riz',
                'Conserves',
                'Soupes',
                'Plats préparés en conserve',
                'Assaisonnements',
              ],
            },
            {
              id: 'epicerie-sucree',
              name: 'Épicerie Sucrée',
              image: '/categories/epicerie_sucree.png',
              subcategories: [
                'Biscuits',
                'Chocolats',
                'Confiseries',
                'Bonbons',
                'Céréales',
                'Miel',
                'Confitures',
              ],
            },
            {
              id: 'pains-viennoiseries-patisseries',
              name: 'Pains, Viennoiseries et Pâtisseries',
              image: '/categories/pains_viennoiseries_patisseries.png',
              subcategories: [
                'Pains',
                'Baguettes',
                'Pains de mie',
                'Viennoiseries',
                'Croissants',
                'Gâteaux',
              ],
            },
          ]
          function makeCategoryUrl(cat) {
            const subcatIds = cat.subcategories
              .map((subcatName) => categoryIds[subcatName])
              .filter(Boolean)
            const queryString = subcatIds
              .map((id) => `categories=${encodeURIComponent(id)}`)
              .join('&')
            return `/category?${queryString}`
          }
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'aside',
            {
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'default'
              ])(
                'md:w-64 h-screen bg-white shadow-md p-4 pt-24 overflow-y-auto fixed left-0 top-0',
                className
              ),
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'nav',
                {
                  className: 'space-y-2',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h2',
                      {
                        className: 'hidden md:block text-lg font-bold mb-4',
                        children: 'Rayons',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/general/sidebar.tsx',
                        lineNumber: 157,
                        columnNumber: 9,
                      },
                      this
                    ),
                    categories.map((cat) => {
                      const url = makeCategoryUrl(cat)
                      return /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {
                          onClick: () => setOpen?.(false),
                          href: url,
                          className:
                            ' flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition ',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'img',
                              {
                                src: cat.image,
                                alt: cat.name,
                                width: 40,
                                height: 40,
                                className: 'object-contain',
                                loading: 'lazy',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/sidebar.tsx',
                                lineNumber: 174,
                                columnNumber: 15,
                              },
                              this
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                className: 'text-gray-700 font-bold',
                                children: [cat.name, ' '],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/components/general/sidebar.tsx',
                                lineNumber: 183,
                                columnNumber: 15,
                              },
                              this
                            ),
                          ],
                        },
                        cat.id,
                        true,
                        {
                          fileName: '[project]/components/general/sidebar.tsx',
                          lineNumber: 163,
                          columnNumber: 13,
                        },
                        this
                      )
                    }),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '[project]/components/general/sidebar.tsx',
                  lineNumber: 156,
                  columnNumber: 7,
                },
                this
              ),
            },
            void 0,
            false,
            {
              fileName: '[project]/components/general/sidebar.tsx',
              lineNumber: 150,
              columnNumber: 5,
            },
            this
          )
        }
        _s(Sidebar, 'i8SJsxdqorv9ALngQZtyvH4MH24=')
        _c = Sidebar
        var _c
        __turbopack_context__.k.register(_c, 'Sidebar')
        if (
          typeof globalThis.$RefreshHelpers$ === 'object' &&
          globalThis.$RefreshHelpers !== null
        ) {
          __turbopack_context__.k.registerExports(
            module,
            globalThis.$RefreshHelpers$
          )
        }
      }
    },
  },
])

//# sourceMappingURL=_efae0c7d._.js.map
