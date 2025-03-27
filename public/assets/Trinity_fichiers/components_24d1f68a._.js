;(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/components_24d1f68a._.js',
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
    '[project]/components/product/productCard.tsx [app-client] (ecmascript)': (
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
          default: () => ProductCard,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next-auth/react.js [app-client] (ecmascript)'
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
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/app/contexts/CartContext.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$LoginModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/modal/LoginModal.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/navigation.js [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function ProductCard({
          id,
          name,
          price,
          picture,
          nutriScore,
          rating,
          brand,
        }) {
          _s()
          const { data: session } = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useSession'
          ])()
          const router = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useRouter'
          ])()
          const [isPending, startTransition] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useTransition'
          ])()
          const [isLoginModalOpen, setIsLoginModalOpen] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(false)
          const [quantity, setQuantity] = (0,
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
          const priceInEuros = (price / 1000).toFixed(2)
          ;(0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useEffect'
          ])(
            {
              'ProductCard.useEffect': () => {
                const existingProduct = cartProducts.find(
                  {
                    'ProductCard.useEffect.existingProduct': (p) => p.id === id,
                  }['ProductCard.useEffect.existingProduct']
                )
                if (existingProduct) {
                  setQuantity(existingProduct.quantity)
                }
              },
            }['ProductCard.useEffect'],
            [cartProducts, id]
          )
          const handleAddToCart = () => {
            if (!session) {
              setIsLoginModalOpen(true)
              return
            }
            startTransition(async () => {
              try {
                await addProductToCart(id, 1)
                setQuantity(1)
              } catch (error) {
                console.error("Erreur lors de l'ajout au panier :", error)
              }
            })
          }
          const handleIncreaseQuantity = () => {
            startTransition(async () => {
              await updateProductQuantity(id, quantity + 1)
              setQuantity(quantity + 1)
            })
          }
          const handleDecreaseQuantity = () => {
            if (quantity <= 1) {
              startTransition(async () => {
                await removeProduct(id)
                setQuantity(0)
              })
            } else {
              startTransition(async () => {
                await updateProductQuantity(id, quantity - 1)
                setQuantity(quantity - 1)
              })
            }
          }
          return /*#__PURE__*/ (0,
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
                  'li',
                  {
                    className:
                      'bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col h-full',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'div',
                      {
                        className: 'flex flex-col flex-grow',
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'button',
                            {
                              onClick: () => router.push(`/product/${id}`),
                              className: 'flex flex-col flex-grow text-left',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className:
                                      'relative w-full h-48 flex justify-center items-center',
                                    children: /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'default'
                                      ],
                                      {
                                        src: picture,
                                        alt: name,
                                        width: 180,
                                        height: 180,
                                        className:
                                          'object-contain w-auto h-full',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/product/productCard.tsx',
                                        lineNumber: 84,
                                        columnNumber: 29,
                                      },
                                      this
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/product/productCard.tsx',
                                    lineNumber: 83,
                                    columnNumber: 25,
                                  },
                                  this
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'div',
                                  {
                                    className: 'flex-grow mt-2',
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'jsxDEV'
                                      ])(
                                        'h2',
                                        {
                                          className:
                                            'text-sm font-semibold text-gray-800 leading-tight',
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'span',
                                              {
                                                className:
                                                  'text-gray-600 uppercase text-xs',
                                                children: brand,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/product/productCard.tsx',
                                                lineNumber: 95,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'br',
                                              {},
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/product/productCard.tsx',
                                                lineNumber: 96,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                            name,
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            '[project]/components/product/productCard.tsx',
                                          lineNumber: 94,
                                          columnNumber: 29,
                                        },
                                        this
                                      ),
                                      nutriScore &&
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'mt-1',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'default'
                                              ],
                                              {
                                                src: `/assets/nutri-score-${nutriScore?.toUpperCase()}.png`,
                                                alt: `NutriScore ${nutriScore}`,
                                                width: 57,
                                                height: 30,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  '[project]/components/product/productCard.tsx',
                                                lineNumber: 102,
                                                columnNumber: 37,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/product/productCard.tsx',
                                            lineNumber: 101,
                                            columnNumber: 33,
                                          },
                                          this
                                        ),
                                      rating !== undefined &&
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'div',
                                          {
                                            className: 'flex items-center mt-1',
                                            children: [
                                              [...Array(5)].map((_, index) =>
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
                                                      '[project]/components/product/productCard.tsx',
                                                    lineNumber: 114,
                                                    columnNumber: 41,
                                                  },
                                                  this
                                                )
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className:
                                                    'ml-1 text-sm text-gray-500',
                                                  children: ['(', rating, ')'],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    '[project]/components/product/productCard.tsx',
                                                  lineNumber: 119,
                                                  columnNumber: 37,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/product/productCard.tsx',
                                            lineNumber: 112,
                                            columnNumber: 33,
                                          },
                                          this
                                        ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/product/productCard.tsx',
                                    lineNumber: 93,
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
                                '[project]/components/product/productCard.tsx',
                              lineNumber: 79,
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
                                'flex items-center justify-between mt-auto',
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  'span',
                                  {
                                    className:
                                      'text-xl font-bold text-gray-900',
                                    children: [priceInEuros, ' €'],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      '[project]/components/product/productCard.tsx',
                                    lineNumber: 126,
                                    columnNumber: 25,
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
                                          'bg-teal-600 text-white w-12 h-10 rounded-full flex items-center justify-center hover:bg-teal-700 transition disabled:opacity-50',
                                        onClick: handleAddToCart,
                                        disabled: isPending,
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'FaShoppingBag'
                                          ],
                                          {
                                            size: 16,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/product/productCard.tsx',
                                            lineNumber: 134,
                                            columnNumber: 33,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/product/productCard.tsx',
                                        lineNumber: 129,
                                        columnNumber: 29,
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
                                          'flex items-center bg-teal-600 text-white w-28 h-10 rounded-full justify-between px-2',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'button',
                                            {
                                              onClick: handleDecreaseQuantity,
                                              className: ' rounded-full p-1',
                                              children: /*#__PURE__*/ (0,
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
                                                    '[project]/components/product/productCard.tsx',
                                                  lineNumber: 142,
                                                  columnNumber: 37,
                                                },
                                                this
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/product/productCard.tsx',
                                              lineNumber: 138,
                                              columnNumber: 33,
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
                                                '[project]/components/product/productCard.tsx',
                                              lineNumber: 144,
                                              columnNumber: 33,
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
                                              className: ' rounded-full p-1',
                                              children: /*#__PURE__*/ (0,
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
                                                    '[project]/components/product/productCard.tsx',
                                                  lineNumber: 149,
                                                  columnNumber: 37,
                                                },
                                                this
                                              ),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/product/productCard.tsx',
                                              lineNumber: 145,
                                              columnNumber: 33,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          '[project]/components/product/productCard.tsx',
                                        lineNumber: 137,
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
                                '[project]/components/product/productCard.tsx',
                              lineNumber: 125,
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
                          '[project]/components/product/productCard.tsx',
                        lineNumber: 78,
                        columnNumber: 17,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/product/productCard.tsx',
                    lineNumber: 77,
                    columnNumber: 13,
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
                    fileName: '[project]/components/product/productCard.tsx',
                    lineNumber: 157,
                    columnNumber: 13,
                  },
                  this
                ),
              ],
            },
            void 0,
            true
          )
        }
        _s(ProductCard, 'v+TwGmqI7v1usWqFn4fo9HzUPnM=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useSession'
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
        _c = ProductCard
        var _c
        __turbopack_context__.k.register(_c, 'ProductCard')
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
    '[project]/components/general/ModesRetraitFAQ.tsx [app-client] (ecmascript)':
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
            default: () => ShippingModes,
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
          function ShippingModes() {
            _s()
            const [activeTab, setActiveTab] = (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useState'
            ])('drive')
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-8',
                children: [
                  /*#__PURE__*/ (0,
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
                          'h2',
                          {
                            className:
                              'text-xl font-semibold text-gray-900 mb-3',
                            children: 'Modes de retrait',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/ModesRetraitFAQ.tsx',
                            lineNumber: 11,
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
                            className: 'flex space-x-1',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'button',
                                {
                                  className: `flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-lg ${activeTab === 'drive' ? 'border-gray-300 bg-white text-black' : 'border-gray-300 text-gray-600 bg-gray-50'}`,
                                  onClick: () => setActiveTab('drive'),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'FaShoppingCart'
                                      ],
                                      {
                                        className: 'text-gray-700',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 22,
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
                                        className: 'font-semibold',
                                        children: 'Drive',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 23,
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
                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                  lineNumber: 14,
                                  columnNumber: 21,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'button',
                                {
                                  className: `flex items-center gap-2 px-6 py-3 text-sm font-medium border rounded-lg ${activeTab === 'delivery' ? 'border-gray-300 bg-white text-black' : 'border-gray-300 text-gray-600 bg-gray-50'}`,
                                  onClick: () => setActiveTab('delivery'),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        'FaTruck'
                                      ],
                                      {
                                        className: 'text-gray-700',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 34,
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
                                        className: 'font-semibold',
                                        children: 'Livraison',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 35,
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
                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                  lineNumber: 26,
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
                              '[project]/components/general/ModesRetraitFAQ.tsx',
                            lineNumber: 13,
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
                              'border border-gray-300 p-6 bg-white mt-[-1px] rounded-lg',
                            children:
                              activeTab === 'drive'
                                ? /*#__PURE__*/ (0,
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
                                          'p',
                                          {
                                            className:
                                              'text-gray-800 font-medium',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children: 'Retrait drive',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 43,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' à partir du',
                                              ' ',
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children:
                                                    'Mardi 11 février à 09h00',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 44,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 42,
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
                                            className: 'text-gray-800',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children: 'Montant minimum :',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 47,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' 30€',
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'text-gray-500',
                                                  children:
                                                    ' | Frais de préparation offerts',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 48,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 46,
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
                                            className: 'text-gray-800',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children:
                                                    'Moyens de paiement :',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 51,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' CB, Visa, Mastercard',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 50,
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
                                        '[project]/components/general/ModesRetraitFAQ.tsx',
                                      lineNumber: 41,
                                      columnNumber: 25,
                                    },
                                    this
                                  )
                                : /*#__PURE__*/ (0,
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
                                          'p',
                                          {
                                            className:
                                              'text-gray-800 font-medium',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children:
                                                    'Livraison à domicile',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 57,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' disponible à partir du',
                                              ' ',
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children:
                                                    'Mardi 11 février à 09h00',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 58,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 56,
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
                                            className: 'text-gray-800',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children: 'Montant minimum :',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 61,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' 50€',
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'text-gray-500',
                                                  children:
                                                    ' | Frais de livraison : 10€',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 62,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 60,
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
                                            className: 'text-gray-800',
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                'jsxDEV'
                                              ])(
                                                'span',
                                                {
                                                  className: 'font-bold',
                                                  children:
                                                    'Moyens de paiement :',
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                                  lineNumber: 65,
                                                  columnNumber: 33,
                                                },
                                                this
                                              ),
                                              ' CB, Visa, Mastercard',
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              '[project]/components/general/ModesRetraitFAQ.tsx',
                                            lineNumber: 64,
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
                                        '[project]/components/general/ModesRetraitFAQ.tsx',
                                      lineNumber: 55,
                                      columnNumber: 25,
                                    },
                                    this
                                  ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/ModesRetraitFAQ.tsx',
                            lineNumber: 39,
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
                        '[project]/components/general/ModesRetraitFAQ.tsx',
                      lineNumber: 10,
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
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'h2',
                          {
                            className:
                              'text-xl font-semibold text-gray-900 mb-3',
                            children: 'FAQ et Contact',
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              '[project]/components/general/ModesRetraitFAQ.tsx',
                            lineNumber: 73,
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
                            className: 'space-y-4',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'div',
                                {
                                  className:
                                    'bg-white p-4 border border-gray-300 rounded-lg',
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'p',
                                      {
                                        className:
                                          'text-sm font-semibold text-gray-900',
                                        children: 'Contactez-nous',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 77,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'a',
                                      {
                                        href: '/legal/contact',
                                        className:
                                          'text-[#005562] text-sm font-medium hover:underline',
                                        children: 'Nous joindre',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 78,
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
                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                  lineNumber: 76,
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
                                    'bg-white p-4 border border-gray-300 rounded-lg',
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'p',
                                      {
                                        className:
                                          'text-sm font-semibold text-gray-900',
                                        children: 'Questions fréquentes',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 87,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'div',
                                      {
                                        className: 'mt-2 flex flex-wrap gap-2',
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            'jsxDEV'
                                          ])(
                                            'span',
                                            {
                                              className:
                                                'px-3 py-1 bg-gray-100 border rounded-lg text-gray-800 text-xs font-medium',
                                              children: 'Mon Compte U',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/ModesRetraitFAQ.tsx',
                                              lineNumber: 89,
                                              columnNumber: 29,
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
                                                'px-3 py-1 bg-gray-100 border rounded-lg text-gray-800 text-xs font-medium',
                                              children: 'Ma Carte U',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/ModesRetraitFAQ.tsx',
                                              lineNumber: 92,
                                              columnNumber: 29,
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
                                                'px-3 py-1 bg-gray-100 border rounded-lg text-gray-800 text-xs font-medium',
                                              children: 'Ma commande',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/ModesRetraitFAQ.tsx',
                                              lineNumber: 95,
                                              columnNumber: 29,
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
                                                'px-3 py-1 bg-gray-100 border rounded-lg text-gray-800 text-xs font-medium',
                                              children: 'Mon panier',
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                '[project]/components/general/ModesRetraitFAQ.tsx',
                                              lineNumber: 98,
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
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 88,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'a',
                                      {
                                        href: '/legal/maintenance',
                                        className:
                                          'text-[#005562] text-sm font-medium hover:underline block mt-2',
                                        children: 'Tout voir',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ModesRetraitFAQ.tsx',
                                        lineNumber: 102,
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
                                    '[project]/components/general/ModesRetraitFAQ.tsx',
                                  lineNumber: 86,
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
                              '[project]/components/general/ModesRetraitFAQ.tsx',
                            lineNumber: 75,
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
                        '[project]/components/general/ModesRetraitFAQ.tsx',
                      lineNumber: 72,
                      columnNumber: 13,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/general/ModesRetraitFAQ.tsx',
                lineNumber: 9,
                columnNumber: 9,
              },
              this
            )
          }
          _s(ShippingModes, 'fYpdOJofUsY6oLmiCqT2XuO1p6k=')
          _c = ShippingModes
          var _c
          __turbopack_context__.k.register(_c, 'ShippingModes')
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
    '[project]/components/general/ReassuranceSection.tsx [app-client] (ecmascript)':
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
            default: () => ReassuranceSection,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          ;('use client')
          const reassurances = [
            {
              img: 'https://www.coursesu.com/on/demandware.static/-/Sites-DigitalU-Library/default/dwcb24c937/pictos/Footer_Reassurance_Proximite.svg',
              text: 'Un large choix de produits en ligne comme en magasin.',
              link: 'https://www.coursesu.com/nos-engagements.html',
            },
            {
              img: 'https://www.coursesu.com/on/demandware.static/-/Sites-DigitalU-Library/default/dwa9553dbd/pictos/Footer_Reassurance_Produits.svg',
              text: 'Nos équipes font vos courses comme vous.',
              link: 'https://www.coursesu.com/nos-engagements.html',
            },
            {
              img: 'https://www.coursesu.com/on/demandware.static/-/Sites-DigitalU-Library/default/dw97899079/pictos/Footer_Reassurance_CarteU.svg',
              text: 'Utilisez votre Carte U pour gagner des euros.',
              link: 'https://www.coursesu.com/nos-engagements.html',
            },
            {
              img: 'https://www.coursesu.com/on/demandware.static/-/Sites-DigitalU-Library/default/dw657b1dd2/pictos/Footer_Reassurance_Expiration.svg',
              text: 'Les dates limites de consommations sont choisies attentivement.',
              link: 'https://www.coursesu.com/nos-engagements.html',
            },
          ]
          function ReassuranceSection() {
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              'div',
              {
                className: 'w-full mt-10',
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#007d8f] py-6 px-6 text-white',
                      children: reassurances.map((item, index) =>
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'a',
                          {
                            href: '/legal/maintenance',
                            className:
                              'flex items-center gap-4 text-center sm:text-left',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'img',
                                {
                                  src: item.img,
                                  alt: '',
                                  width: '60',
                                  height: '60',
                                  className: 'w-14 h-14',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 36,
                                  columnNumber: 25,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'p',
                                {
                                  className: 'text-sm font-medium',
                                  children: item.text,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 43,
                                  columnNumber: 25,
                                },
                                this
                              ),
                            ],
                          },
                          index,
                          true,
                          {
                            fileName:
                              '[project]/components/general/ReassuranceSection.tsx',
                            lineNumber: 31,
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
                        '[project]/components/general/ReassuranceSection.tsx',
                      lineNumber: 29,
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
                      className:
                        'grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white',
                      children: [
                        /*#__PURE__*/ (0,
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
                                'h2',
                                {
                                  className: 'text-lg font-bold',
                                  children: 'Suivez-nous',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 50,
                                  columnNumber: 21,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'ul',
                                {
                                  className: 'flex gap-4 mt-2',
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            className:
                                              'footer-icon icon-facebook hover:opacity-80',
                                            rel: 'noopener',
                                            href: 'https://fr-fr.facebook.com/La.Marque.U/',
                                            target: '_blank',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'svg',
                                              {
                                                xmlns:
                                                  'http://www.w3.org/2000/svg',
                                                width: '37',
                                                height: '37',
                                                viewBox: '0 0 37 37',
                                                fill: 'none',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'rect',
                                                    {
                                                      width: '37',
                                                      height: '37',
                                                      rx: '18.5',
                                                      fill: '#007D8F',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 66,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'path',
                                                    {
                                                      d: 'M16.1875 15.4167H13.875V18.5H16.1875V27.75H20.0417V18.5H22.849L23.125 15.4167H20.0417V14.1317C20.0417 13.3955 20.1897 13.1042 20.9011 13.1042H23.125V9.25H20.1897C17.4178 9.25 16.1875 10.4702 16.1875 12.8074V15.4167Z',
                                                      fill: 'white',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 67,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/ReassuranceSection.tsx',
                                                lineNumber: 59,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/ReassuranceSection.tsx',
                                            lineNumber: 53,
                                            columnNumber: 29,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 52,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            className:
                                              'footer-icon icon-instagram hover:opacity-80',
                                            rel: 'noopener',
                                            href: 'https://www.instagram.com/ulescommercants/?hl=fr',
                                            target: '_blank',
                                            'aria-label':
                                              'Instagram Nouvelle fenêtre',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'svg',
                                              {
                                                xmlns:
                                                  'http://www.w3.org/2000/svg',
                                                width: '37',
                                                height: '37',
                                                viewBox: '0 0 37 37',
                                                fill: 'none',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'rect',
                                                    {
                                                      width: '37',
                                                      height: '37',
                                                      rx: '18.5',
                                                      fill: '#007D8F',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 89,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'path',
                                                    {
                                                      d: 'M18.5 10.9173C20.9697 10.9173 21.2627 10.9266 22.2385 10.9713C24.7453 11.0854 25.9162 12.2747 26.0303 14.763C26.075 15.7381 26.0835 16.031 26.0835 18.5008C26.0835 20.9713 26.0742 21.2634 26.0303 22.2385C25.9154 24.7245 24.7476 25.9162 22.2385 26.0303C21.2627 26.075 20.9713 26.0842 18.5 26.0842C16.0302 26.0842 15.7373 26.075 14.7622 26.0303C12.2493 25.9154 11.0846 24.7206 10.9705 22.2378C10.9258 21.2627 10.9165 20.9705 10.9165 18.5C10.9165 16.0302 10.9266 15.7381 10.9705 14.7622C11.0854 12.2747 12.2532 11.0846 14.7622 10.9705C15.7381 10.9266 16.0302 10.9173 18.5 10.9173ZM18.5 9.25C15.9879 9.25 15.6734 9.26079 14.6867 9.3055C11.3274 9.45967 9.46044 11.3235 9.30627 14.6859C9.26079 15.6734 9.25 15.9879 9.25 18.5C9.25 21.0121 9.26079 21.3274 9.3055 22.3141C9.45967 25.6734 11.3235 27.5403 14.6859 27.6945C15.6734 27.7392 15.9879 27.75 18.5 27.75C21.0121 27.75 21.3274 27.7392 22.3141 27.6945C25.6703 27.5403 27.5419 25.6765 27.6937 22.3141C27.7392 21.3274 27.75 21.0121 27.75 18.5C27.75 15.9879 27.7392 15.6734 27.6945 14.6867C27.5434 11.3305 25.6772 9.46044 22.3149 9.30627C21.3274 9.26079 21.0121 9.25 18.5 9.25V9.25ZM18.5 13.7501C15.8769 13.7501 13.7501 15.8769 13.7501 18.5C13.7501 21.1231 15.8769 23.2506 18.5 23.2506C21.1231 23.2506 23.2499 21.1239 23.2499 18.5C23.2499 15.8769 21.1231 13.7501 18.5 13.7501ZM18.5 21.5833C16.7972 21.5833 15.4167 20.2035 15.4167 18.5C15.4167 16.7972 16.7972 15.4167 18.5 15.4167C20.2028 15.4167 21.5833 16.7972 21.5833 18.5C21.5833 20.2035 20.2028 21.5833 18.5 21.5833ZM23.438 12.4528C22.8244 12.4528 22.3272 12.95 22.3272 13.5628C22.3272 14.1756 22.8244 14.6728 23.438 14.6728C24.0508 14.6728 24.5472 14.1756 24.5472 13.5628C24.5472 12.95 24.0508 12.4528 23.438 12.4528Z',
                                                      fill: 'white',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 90,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/ReassuranceSection.tsx',
                                                lineNumber: 82,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/ReassuranceSection.tsx',
                                            lineNumber: 75,
                                            columnNumber: 29,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 74,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            className:
                                              'footer-icon icon-twitter hover:opacity-80',
                                            rel: 'noopener',
                                            href: 'https://x.com/cooperativeu',
                                            target: '_blank',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'svg',
                                              {
                                                width: '37',
                                                height: '37',
                                                viewBox: '0 0 32 32',
                                                fill: 'none',
                                                xmlns:
                                                  'http://www.w3.org/2000/svg',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'rect',
                                                    {
                                                      width: '32',
                                                      height: '32',
                                                      rx: '16',
                                                      fill: '#007D8F',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 98,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'path',
                                                    {
                                                      d: 'M17.5222 14.7749L23.4785 8H22.0671L16.8952 13.8826L12.7644 8H8L14.2466 16.8955L8 24H9.41155L14.8732 17.7878L19.2356 24H24L17.5218 14.7749H17.5222ZM15.5889 16.9738L14.956 16.0881L9.92015 9.03974H12.0882L16.1522 14.728L16.7851 15.6137L22.0677 23.0075H19.8997L15.5889 16.9742V16.9738Z',
                                                      fill: 'white',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 99,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/ReassuranceSection.tsx',
                                                lineNumber: 97,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/ReassuranceSection.tsx',
                                            lineNumber: 96,
                                            columnNumber: 29,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 95,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'li',
                                      {
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          'jsxDEV'
                                        ])(
                                          'a',
                                          {
                                            className:
                                              'footer-icon icon-youtube hover:opacity-80',
                                            rel: 'noopener',
                                            href: 'https://www.youtube.com/channel/UC64Dt3bVFWVxKnd4pafs1aA',
                                            target: '_blank',
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              'jsxDEV'
                                            ])(
                                              'svg',
                                              {
                                                xmlns:
                                                  'http://www.w3.org/2000/svg',
                                                width: '37',
                                                height: '37',
                                                viewBox: '0 0 37 37',
                                                fill: 'none',
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'rect',
                                                    {
                                                      width: '37',
                                                      height: '37',
                                                      rx: '18.5',
                                                      fill: '#007D8F',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 106,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    'jsxDEV'
                                                  ])(
                                                    'path',
                                                    {
                                                      d: 'M24.3699 11.7044C21.5918 11.5148 15.4043 11.5156 12.6301 11.7044C9.62617 11.9095 9.27235 13.724 9.25 18.5001C9.27235 23.2677 9.62308 25.09 12.6301 25.2958C15.4051 25.4846 21.5918 25.4854 24.3699 25.2958C27.3738 25.0907 27.7276 23.2762 27.75 18.5001C27.7276 13.7325 27.3769 11.9102 24.3699 11.7044ZM16.1875 21.5834V15.4168L22.3542 18.4947L16.1875 21.5834Z',
                                                      fill: 'white',
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        '[project]/components/general/ReassuranceSection.tsx',
                                                      lineNumber: 107,
                                                      columnNumber: 37,
                                                    },
                                                    this
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  '[project]/components/general/ReassuranceSection.tsx',
                                                lineNumber: 105,
                                                columnNumber: 33,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              '[project]/components/general/ReassuranceSection.tsx',
                                            lineNumber: 104,
                                            columnNumber: 29,
                                          },
                                          this
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 103,
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
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 51,
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
                              '[project]/components/general/ReassuranceSection.tsx',
                            lineNumber: 49,
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
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'h2',
                                {
                                  className: 'text-lg font-bold',
                                  children: 'Inscrivez-vous à la Newsletter',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 114,
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
                                  className: 'text-sm mt-2',
                                  children:
                                    'Recevez les meilleures offres de votre magasin U',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 115,
                                  columnNumber: 21,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'a',
                                {
                                  href: '/legal/maintenance',
                                  className:
                                    'inline-block bg-[#007d8f] text-white font-medium px-6 py-3 rounded mt-4',
                                  children: 'Inscription à la newsletter',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 116,
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
                              '[project]/components/general/ReassuranceSection.tsx',
                            lineNumber: 113,
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
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'h2',
                                {
                                  className: 'text-lg font-bold',
                                  children:
                                    'Les consommateurs nous ont octroyé',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 124,
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
                                  className: 'mt-2 text-gray-800',
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'span',
                                      {
                                        className: 'text-xl font-bold',
                                        children: '3,9',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 126,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    ' / 5 sur',
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      'jsxDEV'
                                    ])(
                                      'span',
                                      {
                                        className: 'font-bold',
                                        children: ' 25 489 avis',
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          '[project]/components/general/ReassuranceSection.tsx',
                                        lineNumber: 127,
                                        columnNumber: 25,
                                      },
                                      this
                                    ),
                                    '.',
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 125,
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
                                  className: 'text-sm text-gray-600 mt-1',
                                  children:
                                    'Service pratique mais souvent des ruptures sur les produits en promotion.',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/ReassuranceSection.tsx',
                                  lineNumber: 129,
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
                              '[project]/components/general/ReassuranceSection.tsx',
                            lineNumber: 123,
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
                        '[project]/components/general/ReassuranceSection.tsx',
                      lineNumber: 48,
                      columnNumber: 13,
                    },
                    this
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: '[project]/components/general/ReassuranceSection.tsx',
                lineNumber: 28,
                columnNumber: 9,
              },
              this
            )
          }
          _c = ReassuranceSection
          var _c
          __turbopack_context__.k.register(_c, 'ReassuranceSection')
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
    '[project]/components/category/CategoryCarousel.tsx [app-client] (ecmascript)':
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
            default: () => CategoryCarousel,
          })
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$apple$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Apple$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/apple.js [app-client] (ecmascript) <export default as Apple>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drumstick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drumstick$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/drumstick.js [app-client] (ecmascript) <export default as Drumstick>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript) <export default as Snowflake>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$candy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Candy$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/candy.js [app-client] (ecmascript) <export default as Candy>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sandwich$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sandwich$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/sandwich.js [app-client] (ecmascript) <export default as Sandwich>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$soup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Soup$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/soup.js [app-client] (ecmascript) <export default as Soup>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$croissant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Croissant$3e$__ =
            __turbopack_context__.i(
              '[project]/node_modules/lucide-react/dist/esm/icons/croissant.js [app-client] (ecmascript) <export default as Croissant>'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
            )
          var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$get$2d$categories$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
            __turbopack_context__.i(
              '[project]/lib/server-actions/get-categories-actions.ts [app-client] (ecmascript)'
            )
          var _s = __turbopack_context__.k.signature()
          ;('use client')
          const categories = [
            {
              id: 'fruits-legumes',
              name: 'Fruits et Légumes',
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$apple$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Apple$3e$__[
                'Apple'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$drumstick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Drumstick$3e$__[
                'Drumstick'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sandwich$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sandwich$3e$__[
                'Sandwich'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__[
                'Sun'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__[
                'Snowflake'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$soup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Soup$3e$__[
                'Soup'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$candy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Candy$3e$__[
                'Candy'
              ],
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
              color: 'bg-teal-600',
              icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$croissant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Croissant$3e$__[
                'Croissant'
              ],
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
          function CategoryCarousel() {
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
                'CategoryCarousel.useEffect': () => {
                  async function fetchCategories() {
                    const dbCategories = await (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$server$2d$actions$2f$get$2d$categories$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'default'
                    ])()
                    setCategoryIds(
                      Object.fromEntries(
                        dbCategories.map(
                          {
                            'CategoryCarousel.useEffect.fetchCategories': (
                              c
                            ) => [c.name, c.id],
                          }['CategoryCarousel.useEffect.fetchCategories']
                        )
                      )
                    )
                  }
                  fetchCategories()
                },
              }['CategoryCarousel.useEffect'],
              []
            )
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
              'div',
              {
                className: 'overflow-x-auto px-4 py-4 scrollbar-hide',
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'flex flex-nowrap gap-4 snap-x snap-mandatory',
                    children: categories.map((category) => {
                      const url = makeCategoryUrl(category)
                      const Icon = category.icon
                      return /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {
                          href: url,
                          className: `flex flex-col items-center justify-center ${category.color} text-white rounded-xl min-w-[6rem] sm:min-w-[7rem] md:min-w-[8rem] h-28 shrink-0 hover:opacity-90 transition snap-center`,
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              Icon,
                              {
                                size: 28,
                                className: 'mb-2',
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/category/CategoryCarousel.tsx',
                                lineNumber: 162,
                                columnNumber: 29,
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
                                  'text-xs font-semibold text-center px-1',
                                children: category.name,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/category/CategoryCarousel.tsx',
                                lineNumber: 163,
                                columnNumber: 29,
                              },
                              this
                            ),
                          ],
                        },
                        category.id,
                        true,
                        {
                          fileName:
                            '[project]/components/category/CategoryCarousel.tsx',
                          lineNumber: 157,
                          columnNumber: 25,
                        },
                        this
                      )
                    }),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      '[project]/components/category/CategoryCarousel.tsx',
                    lineNumber: 152,
                    columnNumber: 13,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/components/category/CategoryCarousel.tsx',
                lineNumber: 151,
                columnNumber: 9,
              },
              this
            )
          }
          _s(CategoryCarousel, 'i8SJsxdqorv9ALngQZtyvH4MH24=')
          _c = CategoryCarousel
          var _c
          __turbopack_context__.k.register(_c, 'CategoryCarousel')
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
    '[project]/components/general/Banner.tsx [app-client] (ecmascript)': (
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
          default: () => Banner,
        })
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
          __turbopack_context__.i(
            '[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$searchProduct$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/product/searchProduct.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/hooks/use-mobile.tsx [app-client] (ecmascript)'
          )
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$category$2f$CategoryCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
          __turbopack_context__.i(
            '[project]/components/category/CategoryCarousel.tsx [app-client] (ecmascript)'
          )
        var _s = __turbopack_context__.k.signature()
        ;('use client')
        function Banner() {
          _s()
          const [showBanner, setShowBanner] = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useState'
          ])(true)
          const isMobile = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'useIsMobile'
          ])()
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            'div',
            {
              className: 'py-10 flex flex-col gap-6',
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'div',
                  {
                    className: 'w-full text-center',
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'jsxDEV'
                    ])(
                      'h1',
                      {
                        className:
                          'text-left text-2xl sm:text-xl font-semibold text-slate-900 leading-[150%]',
                        children: [
                          'Bienvenue au Trinity U ',
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'span',
                            {
                              className: 'font-bold',
                              children: 'Rennes Epitech',
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                '[project]/components/general/Banner.tsx',
                              lineNumber: 17,
                              columnNumber: 44,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: '[project]/components/general/Banner.tsx',
                        lineNumber: 16,
                        columnNumber: 17,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/general/Banner.tsx',
                    lineNumber: 15,
                    columnNumber: 13,
                  },
                  this
                ),
                showBanner &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'w-full bg-teal-800 text-white px-6 py-4 flex items-center rounded-lg shadow-md mb-4',
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'img',
                          {
                            width: '25',
                            height: '24',
                            className: 'mr-2',
                            src: '/assets/trinity-logo.png',
                            alt: 'Livraison',
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/components/general/Banner.tsx',
                            lineNumber: 23,
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
                                'h2',
                                {
                                  className: 'text-lg font-bold',
                                  children: 'Livraison course Trinity',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/Banner.tsx',
                                  lineNumber: 31,
                                  columnNumber: 25,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'p',
                                {
                                  className: 'text-sm',
                                  children:
                                    'Commandez en ligne et faites-vous livrer chez vous ou récupérez vos courses en magasin.',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/Banner.tsx',
                                  lineNumber: 32,
                                  columnNumber: 25,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/components/general/Banner.tsx',
                            lineNumber: 30,
                            columnNumber: 21,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'button',
                          {
                            className:
                              'ml-auto p-2 rounded-full hover:bg-white/20',
                            'aria-label': 'Fermer la bannière',
                            onClick: () => setShowBanner(false),
                            children: /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'jsxDEV'
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                'X'
                              ],
                              {
                                size: 20,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  '[project]/components/general/Banner.tsx',
                                lineNumber: 43,
                                columnNumber: 25,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: '[project]/components/general/Banner.tsx',
                            lineNumber: 38,
                            columnNumber: 21,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/components/general/Banner.tsx',
                      lineNumber: 22,
                      columnNumber: 17,
                    },
                    this
                  ),
                isMobile &&
                  /*#__PURE__*/ (0,
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
                      fileName: '[project]/components/general/Banner.tsx',
                      lineNumber: 48,
                      columnNumber: 26,
                    },
                    this
                  ),
                isMobile &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    'div',
                    {
                      className:
                        'text-center text-gray-900 text-lg font-semibold mt-4',
                      children: [
                        'Tentez un tour dans',
                        ' ',
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'jsxDEV'
                        ])(
                          'span',
                          {
                            className: 'relative inline-block',
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'span',
                                {
                                  className: 'relative z-10 font-bold',
                                  children: 'nos rayons',
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/Banner.tsx',
                                  lineNumber: 54,
                                  columnNumber: 11,
                                },
                                this
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                'jsxDEV'
                              ])(
                                'svg',
                                {
                                  className:
                                    'absolute bottom-0 left-0 w-full h-[0.5em] z-0',
                                  viewBox: '0 0 100 15',
                                  preserveAspectRatio: 'none',
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'jsxDEV'
                                  ])(
                                    'path',
                                    {
                                      d: 'M0 10 Q25 5, 50 10 T100 10',
                                      fill: 'none',
                                      stroke: '#FFC107',
                                      strokeWidth: '4',
                                      strokeLinecap: 'round',
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        '[project]/components/general/Banner.tsx',
                                      lineNumber: 60,
                                      columnNumber: 13,
                                    },
                                    this
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    '[project]/components/general/Banner.tsx',
                                  lineNumber: 55,
                                  columnNumber: 11,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: '[project]/components/general/Banner.tsx',
                            lineNumber: 53,
                            columnNumber: 17,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: '[project]/components/general/Banner.tsx',
                      lineNumber: 51,
                      columnNumber: 17,
                    },
                    this
                  ),
                isMobile &&
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'jsxDEV'
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$category$2f$CategoryCarousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      'default'
                    ],
                    {},
                    void 0,
                    false,
                    {
                      fileName: '[project]/components/general/Banner.tsx',
                      lineNumber: 72,
                      columnNumber: 26,
                    },
                    this
                  ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/components/general/Banner.tsx',
              lineNumber: 14,
              columnNumber: 9,
            },
            this
          )
        }
        _s(Banner, '2HfqcynQIB3KyaL+vm8s8u7OaLU=', false, function () {
          return [
            __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mobile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'useIsMobile'
            ],
          ]
        })
        _c = Banner
        var _c
        __turbopack_context__.k.register(_c, 'Banner')
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

//# sourceMappingURL=components_24d1f68a._.js.map
