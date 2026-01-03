import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag, Gift, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateOrderSummary, BOGO_CATEGORIES, BULK_DISCOUNTS } from '@/lib/offers';

export function CartDrawer() {
  const navigate = useNavigate();
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useStore();
  const orderSummary = calculateOrderSummary(cart);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? 'Your cart is empty'
              : `${orderSummary.totalItems} item${orderSummary.totalItems > 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button variant="default" onClick={() => setCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Offers Banner */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 my-2">
              <p className="text-xs font-medium text-accent flex items-center gap-1 mb-1">
                <Gift className="h-3 w-3" />
                Special Offers
              </p>
              <p className="text-xs text-muted-foreground">
                • BOGO on {BOGO_CATEGORIES.join(', ')} • {BULK_DISCOUNTS[0].label}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map((item) => {
                const isBOGO = BOGO_CATEGORIES.includes(item.product.category);
                const freeQty = isBOGO ? Math.floor(item.quantity / 2) : 0;

                return (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-3 bg-secondary/50 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.size} • {item.color}
                      </p>
                      <p className="font-semibold mt-1">
                        ₹{item.product.price.toLocaleString()}
                      </p>
                      {freeQty > 0 && (
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <Gift className="h-3 w-3" />
                          {freeQty} free item{freeQty > 1 ? 's' : ''}!
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{orderSummary.subtotal.toLocaleString()}</span>
              </div>

              {orderSummary.bogoDiscount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="flex items-center gap-1">
                    <Gift className="h-3 w-3" />
                    BOGO Discount
                  </span>
                  <span>-₹{orderSummary.bogoDiscount.toLocaleString()}</span>
                </div>
              )}

              {orderSummary.bulkDiscount > 0 && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    Bulk Discount ({orderSummary.bulkDiscountPercent}%)
                  </span>
                  <span>-₹{orderSummary.bulkDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Delivery</span>
                <span className="text-sm">
                  {orderSummary.deliveryType === 'free' ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `from ₹${orderSummary.deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Estimated Total</span>
                <span className="font-bold text-lg">₹{orderSummary.grandTotal.toLocaleString()}</span>
              </div>

              <Button variant="cart" size="lg" className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
