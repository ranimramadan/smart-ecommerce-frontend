// src/config/endpoints.ts
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, "") || "http://localhost:8000";

const api = (p: string) => `${API_BASE}/api${p}`;
const raw = (p: string) => `${API_BASE}${p}`; // لأشياء خارج /api مثل sanctum/csrf-cookie

export const ENDPOINTS = {
  // ========================
  // Auth / Session
  // ========================
  AUTH: {
    csrf: raw("/sanctum/csrf-cookie"),
    register: api("/auth/register"),
    login: api("/auth/login"),
    logout: api("/auth/logout"),
    me: api("/user"),
  },

  // ========================
  // Profile
  // ========================
  PROFILE: {
    show: api("/profile"),
    update: api("/profile"),
  },

  // ========================
  // RBAC: Users / Roles / Permissions
  // ========================
  USERS: {
    index: api("/users"),
    store: api("/users"),
    show: (userId: number | string) => api(`/users/${userId}`),
    update: (userId: number | string) => api(`/users/${userId}`),
    destroy: (userId: number | string) => api(`/users/${userId}`),
    assignRole: (userId: number | string) => api(`/users/${userId}/roles`),
  },

  ROLES: {
    index: api("/roles"),
    store: api("/roles"),
    show: (roleId: number | string) => api(`/roles/${roleId}`),
    update: (roleId: number | string) => api(`/roles/${roleId}`),
    destroy: (roleId: number | string) => api(`/roles/${roleId}`),
    assignPermissions: (roleId: number | string) => api(`/roles/${roleId}/permissions`),
  },

  PERMISSIONS: {
    index: api("/permissions"),
    store: api("/permissions"),
    show: (permissionId: number | string) => api(`/permissions/${permissionId}`),
    update: (permissionId: number | string) => api(`/permissions/${permissionId}`),
    destroy: (permissionId: number | string) => api(`/permissions/${permissionId}`),
  },

  // ========================
  // Catalog (Public)
  // ========================
  CATALOG: {
    brands: {
      index: api("/brands"),
      show: (brandId: number | string) => api(`/brands/${brandId}`),
    },
    categories: {
      index: api("/categories"),
      show: (categoryId: number | string) => api(`/categories/${categoryId}`),
      tree: api("/categories-tree"),
    },
    attributes: {
      index: api("/attributes"),
      show: (attributeId: number | string) => api(`/attributes/${attributeId}`),
      values: (attributeId: number | string) => api(`/attributes/${attributeId}/values`),
    },
    values: {
      show: (valueId: number | string) => api(`/values/${valueId}`),
    },
    products: {
      index: api("/products"),
      show: (productId: number | string) => api(`/products/${productId}`),
    },
  },

  // ========================
  // Catalog Management (Admin)
  // ========================
  CATALOG_ADMIN: {
    brands: {
      store: api(`/brands`), // POST
      update: (brandId: number | string) => api(`/brands/${brandId}`), // PUT
      destroy: (brandId: number | string) => api(`/brands/${brandId}`), // DELETE
    },
    categories: {
      store: api(`/categories`), // POST
      update: (categoryId: number | string) => api(`/categories/${categoryId}`), // PUT
      destroy: (categoryId: number | string) => api(`/categories/${categoryId}`), // DELETE
      syncAttributes: (categoryId: number | string) =>
        api(`/categories/${categoryId}/attributes/sync`), // POST
    },
    attributes: {
      store: api(`/attributes`), // POST
      update: (attributeId: number | string) => api(`/attributes/${attributeId}`), // PUT
      destroy: (attributeId: number | string) => api(`/attributes/${attributeId}`), // DELETE
      values: {
        store: (attributeId: number | string) => api(`/attributes/${attributeId}/values`), // POST
      },
    },
    values: {
      update: (valueId: number | string) => api(`/values/${valueId}`), // PUT
      destroy: (valueId: number | string) => api(`/values/${valueId}`), // DELETE
    },

    // ===== Products (Admin ops; نفس الكنترولر لكن عمليات كتابة) =====
    products: {
      store: api(`/products`), // POST /products
      update: (productId: number | string) => api(`/products/${productId}`), // PUT /products/{id}
      destroy: (productId: number | string) => api(`/products/${productId}`), // DELETE /products/{id}

      // صور المنتج
      addImages: (productId: number | string) => api(`/products/${productId}/images`), // POST
      removeImage: (productId: number | string, imageId: number | string) =>
        api(`/products/${productId}/images/${imageId}`), // DELETE
    },
  },

  // ========================
  // Reviews
  // ========================
  REVIEWS: {
    public: {
      index: (productId: number | string) => api(`/products/${productId}/reviews`),
      summary: (productId: number | string) => api(`/products/${productId}/reviews/summary`),
    },
    auth: {
      myReview: (productId: number | string) => api(`/products/${productId}/reviews/me`),
      store: (productId: number | string) => api(`/products/${productId}/reviews`),
      update: (reviewId: number | string) => api(`/reviews/${reviewId}`),
      destroy: (reviewId: number | string) => api(`/reviews/${reviewId}`),
      vote: (reviewId: number | string) => api(`/reviews/${reviewId}/vote`), // POST/DELETE
      report: (reviewId: number | string) => api(`/reviews/${reviewId}/report`),
    },
    admin: {
      moderate: (reviewId: number | string) => api(`/reviews/${reviewId}/status`),
      reportsIndex: api(`/reviews/reports`),
      deleteReport: (reportId: number | string) => api(`/reviews/reports/${reportId}`),
    },
  },

  // ========================
  // Cart
  // ========================
  CART: {
    publicShow: api("/cart"),
    auth: {
      addItem: api("/cart/items"),
      updateQty: (itemId: number | string) => api(`/cart/items/${itemId}`),
      removeItem: (itemId: number | string) => api(`/cart/items/${itemId}`),
      clear: api("/cart/clear"),
      coupon: {
        apply: api("/cart/coupon/apply"),
        remove: api("/cart/coupon"),
      },
    },
  },

  // ========================
  // Wishlist (guest/stateful + user)
  // ========================
  WISHLIST: {
    index: api("/wishlist"),
    add: api("/wishlist/add"),
    remove: api("/wishlist/remove"),
    clear: api("/wishlist/clear"),
  },

  // ========================
  // Orders (Admin + Customer)
  // ========================
  ORDERS: {
    admin: {
      index: api("/orders"),
      show: (orderId: number | string) => api(`/orders/${orderId}`),
      update: (orderId: number | string) => api(`/orders/${orderId}`),
      destroy: (orderId: number | string) => api(`/orders/${orderId}`),
      updateStatus: (orderId: number | string) => api(`/orders/${orderId}/status`),
      adminCancel: (orderId: number | string) => api(`/orders/${orderId}/cancel`),
      updateAddresses: (orderId: number | string) => api(`/orders/${orderId}/addresses`),
      timeline: (orderId: number | string) => api(`/orders/${orderId}/timeline`),
      stats: {
        daily: api("/orders/statistics/daily"),
        monthly: api("/orders/statistics/monthly"),
      },
      createInvoiceFromOrder: (orderId: number | string) => api(`/orders/${orderId}/invoices`),
      issueInvoiceForOrder: (orderId: number | string) => api(`/orders/${orderId}/invoices/issue`),
      invoiceable: (orderId: number | string) => api(`/orders/${orderId}/invoiceable`),
    },
    customer: {
      index: api("/my-orders"),
      show: (orderId: number | string) => api(`/my-orders/${orderId}`),
      timeline: (orderId: number | string) => api(`/my-orders/${orderId}/timeline`),
      cancel: (orderId: number | string) => api(`/my-orders/${orderId}/cancel`),
      payments: {
        process: (orderId: number | string) => api(`/my-orders/${orderId}/pay`),
        codConfirm: (orderId: number | string) => api(`/my-orders/${orderId}/cod-confirm`),
        start: (orderId: number | string) => api(`/my-orders/${orderId}/payments/start`),
        history: (orderId: number | string) => api(`/my-orders/${orderId}/payment-history`),
        methods: (orderId: number | string) => api(`/my-orders/${orderId}/payment-methods`),
      },
      refunds: {
        request: (orderId: number | string) => api(`/my-orders/${orderId}/refund-request`),
        status: (orderId: number | string) => api(`/my-orders/${orderId}/refund-status`),
        list: (orderId: number | string) => api(`/my-orders/${orderId}/refunds`),
        details: (orderId: number | string, refundId: number | string) =>
          api(`/my-orders/${orderId}/refunds/${refundId}`),
      },
      invoices: {
        byOrder: (orderId: number | string) => api(`/my-orders/${orderId}/invoices`),
        pdf: (orderId: number | string, invoiceId: number | string) =>
          api(`/my-orders/${orderId}/invoices/${invoiceId}/pdf`),
        publicUrl: (orderId: number | string, invoiceId: number | string) =>
          api(`/my-orders/${orderId}/invoices/${invoiceId}/public-url`),
      },
    },
  },

  // ========================
  // Payment Providers (Admin)
  // ========================
  PAYMENT_PROVIDERS: {
    index: api("/payment-providers"),
    store: api("/payment-providers"),
    show: (id: number | string) => api(`/payment-providers/${id}`),
    update: (id: number | string) => api(`/payment-providers/${id}`),
    destroy: (id: number | string) => api(`/payment-providers/${id}`),
    activate: (id: number | string) => api(`/payment-providers/${id}/activate`),
    deactivate: (id: number | string) => api(`/payment-providers/${id}/deactivate`),
  },

  // ========================
  // Payments
  // ========================
  PAYMENTS: {
    publicMethods: api("/payment-methods"),
    admin: {
      index: api("/payments"),
      show: (paymentId: number | string) => api(`/payments/${paymentId}`),
      refund: (paymentId: number | string) => api(`/payments/${paymentId}/refunds`),
    },
  },

  // ========================
  // Refunds (Admin)
  // ========================
  REFUNDS: {
    admin: {
      index: api("/refunds"),
      show: (refundId: number | string) => api(`/refunds/${refundId}`),
    },
  },

  // ========================
  // Checkout
  // ========================
  CHECKOUT: {
    placeOrder: (cartId: number | string) => api(`/checkout/carts/${cartId}/place-order`),
    updateAddresses: (orderId: number | string) => api(`/checkout/orders/${orderId}/addresses`),
  },

  // ========================
  // Invoices (Admin)
  // ========================
  INVOICES: {
    admin: {
      index: api("/invoices"),
      show: (invoiceId: number | string) => api(`/invoices/${invoiceId}`),
      addItems: (invoiceId: number | string) => api(`/invoices/${invoiceId}/items`),
      markPaid: (invoiceId: number | string) => api(`/invoices/${invoiceId}/mark-paid`),
      pdf: (invoiceId: number | string) => api(`/invoices/${invoiceId}/pdf`),
      publicUrl: (invoiceId: number | string) => api(`/invoices/${invoiceId}/public-url`),
    },
  },

  // ========================
  // Inventory (Admin)
  // ========================
  INVENTORY: {
    movements: api("/inventory/movements"),
    adjustments: api("/inventory/adjustments"),
  },

  // ========================
  // Shipping
  // ========================
  SHIPPING: {
    public: {
      quote: api("/shipping/quote"),
      trackByNumber: api("/shipping/track"),
    },
    admin: {
      carriers: {
        index: api("/shipping-carriers"),
        show: (carrierId: number | string) => api(`/shipping-carriers/${carrierId}`),
        store: api("/shipping-carriers"),
        update: (carrierId: number | string) => api(`/shipping-carriers/${carrierId}`),
        destroy: (carrierId: number | string) => api(`/shipping-carriers/${carrierId}`),
      },
      rates: {
        index: api("/shipping-rates"),
        show: (rateId: number | string) => api(`/shipping-rates/${rateId}`),
        store: api("/shipping-rates"),
        update: (rateId: number | string) => api(`/shipping-rates/${rateId}`),
        destroy: (rateId: number | string) => api(`/shipping-rates/${rateId}`),
      },
      zones: {
        index: api("/shipping-zones"),
        show: (zoneId: number | string) => api(`/shipping-zones/${zoneId}`),
        store: api("/shipping-zones"),
        update: (zoneId: number | string) => api(`/shipping-zones/${zoneId}`),
        destroy: (zoneId: number | string) => api(`/shipping-zones/${zoneId}`),
        regions: {
          list: (zoneId: number | string) => api(`/shipping-zones/${zoneId}/regions`),
          add: (zoneId: number | string) => api(`/shipping-zones/${zoneId}/regions`),
          remove: (zoneId: number | string, regionId: number | string) =>
            api(`/shipping-zones/${zoneId}/regions/${regionId}`),
        },
      },
      shipments: {
        index: api("/shipments"),
        show: (shipmentId: number | string) => api(`/shipments/${shipmentId}`),
        store: api("/shipments"),
        update: (shipmentId: number | string) => api(`/shipments/${shipmentId}`),
        events: (shipmentId: number | string) => api(`/shipments/${shipmentId}/events`),
        cancel: (shipmentId: number | string) => api(`/shipments/${shipmentId}/cancel`),
        markDelivered: (shipmentId: number | string) => api(`/shipments/${shipmentId}/mark-delivered`),
        items: {
          store: (shipmentId: number | string) => api(`/shipments/${shipmentId}/items`),
        },
      },
      shipmentItems: {
        updateQty: (itemId: number | string) => api(`/shipment-items/${itemId}`),
        destroy: (itemId: number | string) => api(`/shipment-items/${itemId}`),
      },
    },
  },

  // ========================
  // Settings
  // ========================
  SETTINGS: {
    public: {
      index: api("/public/settings"),
    },
    admin: {
      index: api("/settings"),
      upsertMany: api("/settings/batch"),
      show: (fullKey: string) => api(`/settings/${encodeURI(fullKey)}`),
      update: (fullKey: string) => api(`/settings/${encodeURI(fullKey)}`),
    },
  },

  // ========================
  // Blog
  // ========================
  BLOG: {
    public: {
      posts: {
        index: api("/blog/public/posts"),
        show: (postIdOrSlug: number | string) => api(`/blog/public/posts/${postIdOrSlug}`),
        comments: {
          index: (postIdOrSlug: number | string) => api(`/blog/public/posts/${postIdOrSlug}/comments`),
          store: (postIdOrSlug: number | string) => api(`/blog/public/posts/${postIdOrSlug}/comments`),
        },
        media: {
          index: (postIdOrSlug: number | string) => api(`/blog/public/posts/${postIdOrSlug}/media`),
        },
      },
      categories: {
        index: api("/blog/public/categories"),
        show: (catIdOrSlug: number | string) => api(`/blog/public/categories/${catIdOrSlug}`),
      },
      tags: {
        index: api("/blog/public/tags"),
        show: (tagIdOrSlug: number | string) => api(`/blog/public/tags/${tagIdOrSlug}`),
      },
    },
    admin: {
      posts: {
        index: api("/blog/posts"),
        store: api("/blog/posts"),
        update: (postId: number | string) => api(`/blog/posts/${postId}`),
        destroy: (postId: number | string) => api(`/blog/posts/${postId}`),
        publish: (postId: number | string) => api(`/blog/posts/${postId}/publish`),
        unpublish: (postId: number | string) => api(`/blog/posts/${postId}/unpublish`),
      },
      categories: {
        index: api("/blog/categories"),
        store: api("/blog/categories"),
        update: (catId: number | string) => api(`/blog/categories/${catId}`),
        destroy: (catId: number | string) => api(`/blog/categories/${catId}`),
      },
      tags: {
        index: api("/blog/tags"),
        store: api("/blog/tags"),
        update: (tagId: number | string) => api(`/blog/tags/${tagId}`),
        destroy: (tagId: number | string) => api(`/blog/tags/${tagId}`),
      },
      comments: {
        index: api("/blog/comments"),
        moderate: (commentId: number | string) => api(`/blog/comments/${commentId}/moderate`),
        destroy: (commentId: number | string) => api(`/blog/comments/${commentId}`),
      },
      media: {
        index: (postId: number | string) => api(`/blog/posts/${postId}/media`),
        store: (postId: number | string) => api(`/blog/posts/${postId}/media`),
        update: (imageId: number | string) => api(`/media/${imageId}`),
        destroy: (imageId: number | string) => api(`/media/${imageId}`),
      },
    },
  },

  // ========================
  // Webhooks
  // ========================
  WEBHOOKS: {
    handle: (provider: string) => api(`/webhooks/${provider}`),
  },
} as const;
