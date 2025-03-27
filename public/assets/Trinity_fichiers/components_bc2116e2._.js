;(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([
  'static/chunks/components_bc2116e2._.js',
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
  },
])

//# sourceMappingURL=components_bc2116e2._.js.map
