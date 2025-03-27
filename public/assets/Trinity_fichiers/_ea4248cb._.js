;(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/_ea4248cb._.js',
  {
    '[project]/components/modal/LoginModal.tsx [app-client] (ecmascript)': (
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
          default: () => LoginModal,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function LoginModal({ isOpen, onClose }) {
          _s()
          const router = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useRouter'
          ])()
          if (!isOpen) return null
          const handleLogin = () => {
            router.push('/api/auth/signin')
          }
          const handleSignup = () => {
            router.push('/auth')
          }
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
              children: /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'jsxDEV'
              ])(
                'div',
                {
                  className:
                    'bg-white rounded-2xl shadow-lg w-80 p-6 relative animate-fade-in',
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'button',
                      {
                        onClick: onClose,
                        className:
                          'absolute top-4 right-4 text-teal-600 hover:text-teal-800',
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'FaTimes'
                          ],
                          {
                            size: 20,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/modal/LoginModal.tsx',
                            lineNumber: 31,
                            columnNumber: 21,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/modal/LoginModal.tsx',
                        lineNumber: 27,
                        columnNumber: 17,
                      },
                      this
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h2',
                      {
                        className: 'text-xl font-bold text-center mb-4',
                        children: 'Se connecter',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/modal/LoginModal.tsx',
                        lineNumber: 34,
                        columnNumber: 17,
                      },
                      this
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'p',
                      {
                        className: 'text-center text-gray-700 mb-6',
                        children:
                          'Votre compte vous permet de réserver votre créneau, accéder à vos listes et profiter de nos services personnalisés.',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/modal/LoginModal.tsx',
                        lineNumber: 36,
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
                        onClick: handleLogin,
                        className:
                          'bg-teal-600 text-white w-full py-3 rounded-full text-lg font-medium hover:bg-teal-700 transition',
                        children: 'Se connecter',
                      },
                      void 0,
                      false,
                      {
                        fileName: '[project]/components/modal/LoginModal.tsx',
                        lineNumber: 41,
                        columnNumber: 17,
                      },
                      this
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'p',
                      {
                        className: 'text-center mt-4 text-gray-800',
                        children: [
                          'Nouveau client ?',
                          ' ',
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'span',
                            {
                              onClick: handleSignup,
                              className:
                                'text-teal-600 hover:underline cursor-pointer',
                              children: 'S’inscrire',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/modal/LoginModal.tsx',
                              lineNumber: 50,
                              columnNumber: 21,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: '[project]/components/modal/LoginModal.tsx',
                        lineNumber: 48,
                        columnNumber: 17,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: '[project]/components/modal/LoginModal.tsx',
                  lineNumber: 26,
                  columnNumber: 13,
                },
                this
              ),
            },
            void 0,
            false,
            {
              fileName: '[project]/components/modal/LoginModal.tsx',
              lineNumber: 25,
              columnNumber: 9,
            },
            this
          )
        }
        _s(LoginModal, 'fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRouter'
            ],
          ]
        })
        _c = LoginModal
        var _c
        __turbopack_context__.k.register(_c, 'LoginModal')
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
    '[project]/lib/server-actions/products-actions.ts [app-client] (ecmascript)':
      (__turbopack_context__) => {
        'use strict'

        var {
          g: global,
          d: __dirname,
          k: __turbopack_refresh__,
          m: module,
        } = __turbopack_context__
        {
          /* __next_internal_action_entry_do_not_use__ {"00acd74ce2750f297daf0ed9559cbe5f29a62f2670":"getCategories","400964185e7bdeff65b5ae4401f74dc090c30d37eb":"getOpenFoodFacts","40374f78eee551aa5b070ccd31537b361f586b8cc0":"getProductById","4069354a6a1223516ed87ca3e247f88ccb38688265":"deleteProduct","4088a3f914a62013bb0e5528b4ed6929dd94d2f5a5":"getProductCategories","7fe9c165ea3fc8d61052e67378a1e12ca10d132aa3":"updateProduct"} */ __turbopack_context__.s(
            {
              deleteProduct: () => deleteProduct,
              getCategories: () => getCategories,
              getOpenFoodFacts: () => getOpenFoodFacts,
              getProductById: () => getProductById,
              getProductCategories: () => getProductCategories,
              updateProduct: () => updateProduct,
            }
          )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)'
            )
          var updateProduct = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '7fe9c165ea3fc8d61052e67378a1e12ca10d132aa3',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'updateProduct'
          )
          var getCategories = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '00acd74ce2750f297daf0ed9559cbe5f29a62f2670',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getCategories'
          )
          var getProductCategories = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '4088a3f914a62013bb0e5528b4ed6929dd94d2f5a5',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getProductCategories'
          )
          var deleteProduct = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '4069354a6a1223516ed87ca3e247f88ccb38688265',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'deleteProduct'
          )
          var getProductById = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '40374f78eee551aa5b070ccd31537b361f586b8cc0',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getProductById'
          )
          var getOpenFoodFacts = /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'createServerReference'
          ])(
            '400964185e7bdeff65b5ae4401f74dc090c30d37eb',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'callServer'
            ],
            void 0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'findSourceMapURL'
            ],
            'getOpenFoodFacts'
          )
        }
      },
    '[project]/app/product/[productId]/page.tsx [app-client] (ecmascript)': (
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
          default: () => ProductPage,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/image.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next-auth/react.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/app/contexts/CartContext.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/modal/LoginModal.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$products$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/lib/server-actions/products-actions.ts [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/ui/Accordion.tsx [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function ProductPage() {
          _s()
          const { data: session } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useSession'
          ])()
          const { productId } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useParams'
          ])()
          const router = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useRouter'
          ])()
          const [isLoginModalOpen, setIsLoginModalOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          const [isPending, startTransition] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useTransition'
          ])()
          const [product, setProduct] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(null)
          const [openFoodData, setOpenFoodData] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(null)
          const [quantity, setQuantity] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(0)
          const [rating, setRating] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(0)
          const {
            cartProducts,
            addProductToCart,
            removeProduct,
            updateProductQuantity,
          } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useCart'
          ])()
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'ProductPage.useEffect': () => {
                if (!productId) return
                const fetchProductData = {
                  'ProductPage.useEffect.fetchProductData': async () => {
                    const { product, error } = await (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$products$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'getProductById'
                    ])(productId)
                    if (error || !product) {
                      return
                    }
                    setProduct(product)
                    if (product?.barCode) {
                      const barCode =
                        typeof product.barCode === 'bigint'
                          ? product.barCode.toString()
                          : product.barCode
                      const { openFoodData } = await (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$products$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'getOpenFoodFacts'
                      ])(barCode)
                      setOpenFoodData(openFoodData)
                    }
                  },
                }['ProductPage.useEffect.fetchProductData']
                fetchProductData()
              },
            }['ProductPage.useEffect'],
            [productId, router]
          )
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'ProductPage.useEffect': () => {
                setRating(Math.floor(Math.random() * 5) + 1)
              },
            }['ProductPage.useEffect'],
            []
          )
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'ProductPage.useEffect': () => {
                if (product) {
                  const existingProduct = cartProducts.find(
                    {
                      'ProductPage.useEffect.existingProduct': (p) =>
                        p.id === product.id,
                    }['ProductPage.useEffect.existingProduct']
                  )
                  if (existingProduct) {
                    setQuantity(existingProduct.quantity)
                  }
                }
              },
            }['ProductPage.useEffect'],
            [cartProducts, product]
          )
          if (!product) {
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'p',
              {
                children: 'Chargement du produit...',
              },
              void 0,
              false,
              {
                fileName: '[project]/app/product/[productId]/page.tsx',
                lineNumber: 62,
                columnNumber: 12,
              },
              this
            )
          }
          const priceInEuros = (product.price / 1000).toFixed(2)
          const handleAddToCart = () => {
            if (!session) {
              setIsLoginModalOpen(true)
              return
            }
            startTransition(async () => {
              await addProductToCart(product.id, 1)
              setQuantity(1)
            })
          }
          const handleIncreaseQuantity = () => {
            startTransition(async () => {
              await updateProductQuantity(product.id, quantity + 1)
              setQuantity(quantity + 1)
            })
          }
          const handleDecreaseQuantity = () => {
            if (quantity <= 1) {
              startTransition(async () => {
                await removeProduct(product.id)
                setQuantity(0)
              })
            } else {
              startTransition(async () => {
                await updateProductQuantity(product.id, quantity - 1)
                setQuantity(quantity - 1)
              })
            }
          }
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'w-full px-2 md:px-12 py-4',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'nav',
                  {
                    className: 'text-gray-500 text-sm mb-6',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'span',
                        {
                          className:
                            'text-gray-600 cursor-pointer hover:underline',
                          children: 'Accueil',
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 103,
                          columnNumber: 11,
                        },
                        this
                      ),
                      ' >',
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {
                          href: `/category/${product.categories[0].category.id}`,
                          className: 'ml-1 cursor-pointer hover:underline',
                          children: [product.categories[0].category.name, ' >'],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 104,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'span',
                        {
                          className: 'ml-1 font-semibold text-gray-900',
                          children: product.name,
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 107,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/product/[productId]/page.tsx',
                    lineNumber: 102,
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
                    className:
                      'bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-start',
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'div',
                        {
                          className: 'flex-1 flex justify-center',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'default'
                            ],
                            {
                              src: product.picture,
                              alt: product.name,
                              width: 350,
                              height: 350,
                              className: 'object-contain w-auto h-96',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/app/product/[productId]/page.tsx',
                              lineNumber: 112,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 111,
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
                          className: 'flex-1 ml-4',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'h1',
                              {
                                className: 'text-2xl font-bold text-gray-900',
                                children: product.name,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/app/product/[productId]/page.tsx',
                                lineNumber: 122,
                                columnNumber: 13,
                              },
                              this
                            ),
                            product.nutriScore &&
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
                                      src: `/assets/nutri-score-${product.nutriScore.toUpperCase()}.png`,
                                      alt: `NutriScore ${product.nutriScore}`,
                                      width: 100,
                                      height: 40,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/app/product/[productId]/page.tsx',
                                      lineNumber: 126,
                                      columnNumber: 19,
                                    },
                                    this
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/app/product/[productId]/page.tsx',
                                  lineNumber: 125,
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
                                className: 'flex items-center mt-3',
                                children: [...Array(5)].map((_, index) =>
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
                                        '[project]/app/product/[productId]/page.tsx',
                                      lineNumber: 137,
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
                                  '[project]/app/product/[productId]/page.tsx',
                                lineNumber: 135,
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
                                className: 'mt-3',
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'button',
                                  {
                                    className:
                                      'bg-gray-200 px-4 py-1 text-sm rounded-md text-gray-700',
                                    children: 'Produit frais',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 145,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/app/product/[productId]/page.tsx',
                                lineNumber: 144,
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
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 121,
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
                            'w-64 bg-gray-100 p-6 rounded-lg flex flex-col items-center ml-4',
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              'span',
                              {
                                className:
                                  'text-3xl font-bold text-gray-900 underline decoration-yellow-400',
                                children: [priceInEuros, ' €'],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  '[project]/app/product/[productId]/page.tsx',
                                lineNumber: 150,
                                columnNumber: 13,
                              },
                              this
                            ),
                            quantity === 0
                              ? /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'button',
                                  {
                                    className:
                                      'mt-4 bg-teal-600 text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-teal-700 transition w-full h-12',
                                    onClick: handleAddToCart,
                                    disabled: isPending,
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
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 158,
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
                                          className: 'text-md font-semibold',
                                          children: 'Ajouter à mon panier',
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 159,
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
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 153,
                                    columnNumber: 17,
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
                                          onClick: handleDecreaseQuantity,
                                          className: 'rounded-full p-1',
                                          children: /*#__PURE__*/ (0,
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
                                                '[project]/app/product/[productId]/page.tsx',
                                              lineNumber: 164,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 163,
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
                                          className: 'font-semibold',
                                          children: quantity,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 166,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'button',
                                        {
                                          onClick: handleIncreaseQuantity,
                                          className: 'rounded-full p-1',
                                          children: /*#__PURE__*/ (0,
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
                                                '[project]/app/product/[productId]/page.tsx',
                                              lineNumber: 168,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 167,
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
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 162,
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
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 149,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/product/[productId]/page.tsx',
                    lineNumber: 110,
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
                                    children: 'Informations complémentaires',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 178,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.generic_name ||
                                      'Aucune description disponible.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
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
                                '[project]/app/product/[productId]/page.tsx',
                              lineNumber: 177,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 176,
                          columnNumber: 11,
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
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 185,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.ingredients_text ||
                                      'Ingrédients non disponibles.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 186,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'h3',
                                  {
                                    className: 'font-semibold mt-4',
                                    children: 'Informations nutritionnelles',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 190,
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
                                    className: 'flex items-center mt-2',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'default'
                                        ],
                                        {
                                          src: `/assets/nutri-score-${product.nutriScore?.toUpperCase()}.png`,
                                          alt: `NutriScore ${product.nutriScore}`,
                                          width: 100,
                                          height: 40,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 192,
                                          columnNumber: 17,
                                        },
                                        this
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'p',
                                        {
                                          className: 'text-gray-700 ml-2',
                                          children:
                                            "Le Nutri-score est un logo qui informe sur la qualité nutritionnelle d'un produit.",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            '[project]/app/product/[productId]/page.tsx',
                                          lineNumber: 198,
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
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 191,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'h3',
                                  {
                                    className: 'font-semibold mt-4',
                                    children: 'Origine',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 201,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.origins ||
                                      'Origine non renseignée.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 202,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'h3',
                                  {
                                    className: 'font-semibold mt-4',
                                    children: 'Valeurs nutritionnelles',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 206,
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
                                    className: 'text-gray-700 mt-2',
                                    children: [
                                      openFoodData?.quantity
                                        ? `Quantité : ${openFoodData.quantity}`
                                        : null,
                                      openFoodData?.nutriments?.energy_100g
                                        ? `Énergie : ${openFoodData.nutriments.energy_100g} kJ`
                                        : null,
                                      openFoodData?.nutriments?.[
                                        'energy-kcal_100g'
                                      ]
                                        ? `${openFoodData.nutriments['energy-kcal_100g']} kcal`
                                        : null,
                                      openFoodData?.nutriments?.fat_100g
                                        ? `Matières grasses : ${openFoodData.nutriments.fat_100g} g`
                                        : null,
                                      openFoodData?.nutriments?.[
                                        'saturated-fat_100g'
                                      ]
                                        ? `dont acides gras saturés ${openFoodData.nutriments['saturated-fat_100g']} g`
                                        : null,
                                      openFoodData?.nutriments
                                        ?.carbohydrates_100g
                                        ? `Glucides : ${openFoodData.nutriments.carbohydrates_100g} g`
                                        : null,
                                      openFoodData?.nutriments?.sugars_100g
                                        ? `dont sucres ${openFoodData.nutriments.sugars_100g} g`
                                        : null,
                                      openFoodData?.nutriments?.fiber_100g
                                        ? `Fibres alimentaires : ${openFoodData.nutriments.fiber_100g} g`
                                        : null,
                                      openFoodData?.nutriments?.proteins_100g
                                        ? `Protéines : ${openFoodData.nutriments.proteins_100g} g`
                                        : null,
                                      openFoodData?.nutriments?.salt_100g
                                        ? `Sel : ${openFoodData.nutriments.salt_100g} g`
                                        : null,
                                    ]
                                      .filter(Boolean)
                                      .join(', '),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 207,
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
                                '[project]/app/product/[productId]/page.tsx',
                              lineNumber: 184,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 183,
                          columnNumber: 11,
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
                                    children: 'Instruction de conservation',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 228,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.conservation_conditions ||
                                      'Aucune information sur la conservation.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 229,
                                    columnNumber: 15,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'h3',
                                  {
                                    className: 'font-semibold mt-4',
                                    children:
                                      'Contact exploitant / Service consommateur',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 233,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.manufacturing_places ||
                                      'Lieu de fabrication non disponible.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 234,
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
                                    className: 'text-gray-700 mt-2',
                                    children:
                                      openFoodData?.brands ||
                                      'Marque non renseignée.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/app/product/[productId]/page.tsx',
                                    lineNumber: 235,
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
                                '[project]/app/product/[productId]/page.tsx',
                              lineNumber: 227,
                              columnNumber: 13,
                            },
                            this
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/app/product/[productId]/page.tsx',
                          lineNumber: 226,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/app/product/[productId]/page.tsx',
                    lineNumber: 175,
                    columnNumber: 9,
                  },
                  this
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'default'
                  ],
                  {
                    isOpen: isLoginModalOpen,
                    onClose: () => setIsLoginModalOpen(false),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/app/product/[productId]/page.tsx',
                    lineNumber: 240,
                    columnNumber: 9,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/app/product/[productId]/page.tsx',
              lineNumber: 101,
              columnNumber: 7,
            },
            this
          )
        }
        _s(ProductPage, 'ussvUOyV71ZTHcHPOOXiwI4xp+k=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSession'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useParams'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useRouter'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useTransition'
            ],
            __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useCart'
            ],
          ]
        })
        _c = ProductPage
        var _c
        __turbopack_context__.k.register(_c, 'ProductPage')
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

//# sourceMappingURL=_ea4248cb._.js.map
