import { CartItem } from './store';

export const DELIVERY_CHARGES = {
  standard: 99,
  express: 199,
  freeThreshold: 2000,
};

export const BULK_DISCOUNTS = [
  { minQuantity: 3, discount: 10, label: '10% off on 3+ items' },
  { minQuantity: 5, discount: 15, label: '15% off on 5+ items' },
  { minQuantity: 10, discount: 20, label: '20% off on 10+ items' },
];

// Products eligible for BOGO (by category)
export const BOGO_CATEGORIES = ['Accessories'];

export interface OrderSummary {
  subtotal: number;
  bogoDiscount: number;
  bulkDiscount: number;
  bulkDiscountPercent: number;
  deliveryCharge: number;
  deliveryType: 'standard' | 'express' | 'free';
  grandTotal: number;
  totalItems: number;
  freeItems: CartItem[];
}

export function calculateBOGODiscount(cart: CartItem[]): { discount: number; freeItems: CartItem[] } {
  let discount = 0;
  const freeItems: CartItem[] = [];

  // Group BOGO eligible items
  const bogoItems = cart.filter((item) =>
    BOGO_CATEGORIES.includes(item.product.category)
  );

  bogoItems.forEach((item) => {
    const freeQty = Math.floor(item.quantity / 2);
    if (freeQty > 0) {
      discount += freeQty * item.product.price;
      freeItems.push({
        ...item,
        quantity: freeQty,
      });
    }
  });

  return { discount, freeItems };
}

export function calculateBulkDiscount(
  totalItems: number,
  subtotal: number
): { discount: number; percent: number } {
  let applicableDiscount = { minQuantity: 0, discount: 0, label: '' };

  for (const tier of BULK_DISCOUNTS) {
    if (totalItems >= tier.minQuantity) {
      applicableDiscount = tier;
    }
  }

  if (applicableDiscount.discount > 0) {
    return {
      discount: Math.round(subtotal * (applicableDiscount.discount / 100)),
      percent: applicableDiscount.discount,
    };
  }

  return { discount: 0, percent: 0 };
}

export function calculateOrderSummary(
  cart: CartItem[],
  deliveryType: 'standard' | 'express' = 'standard'
): OrderSummary {
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  const { discount: bogoDiscount, freeItems } = calculateBOGODiscount(cart);
  const { discount: bulkDiscount, percent: bulkDiscountPercent } =
    calculateBulkDiscount(totalItems, subtotal - bogoDiscount);

  const afterDiscounts = subtotal - bogoDiscount - bulkDiscount;

  let deliveryCharge = 0;
  let finalDeliveryType: 'standard' | 'express' | 'free' = deliveryType;

  if (afterDiscounts >= DELIVERY_CHARGES.freeThreshold) {
    deliveryCharge = 0;
    finalDeliveryType = 'free';
  } else if (deliveryType === 'express') {
    deliveryCharge = DELIVERY_CHARGES.express;
  } else {
    deliveryCharge = DELIVERY_CHARGES.standard;
  }

  const grandTotal = afterDiscounts + deliveryCharge;

  return {
    subtotal,
    bogoDiscount,
    bulkDiscount,
    bulkDiscountPercent,
    deliveryCharge,
    deliveryType: finalDeliveryType,
    grandTotal,
    totalItems,
    freeItems,
  };
}
