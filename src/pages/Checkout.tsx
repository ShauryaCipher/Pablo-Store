import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CheckCircle2, Gift, Percent, Truck } from 'lucide-react';
import paymentQR from '@/assets/payment-qr.jpeg';
import { toast } from '@/hooks/use-toast';
import {
  calculateOrderSummary,
  DELIVERY_CHARGES,
  BULK_DISCOUNTS,
  BOGO_CATEGORIES,
} from '@/lib/offers';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod'>('upi');
  const [isCodConfirmed, setIsCodConfirmed] = useState(false);

  const orderSummary = calculateOrderSummary(cart, deliveryType);

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    setStep('success');
    clearCart();
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for shopping with Pablo Clothing',
    });
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="container max-w-md text-center py-12 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We've received your payment confirmation and will process your order shortly.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order details have been sent to your email.
          </p>
          <Button onClick={() => navigate('/')} size="lg">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-frost border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => (step === 'payment' ? setStep('details') : navigate('/'))}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 'payment' ? 'Back to Details' : 'Back to Shop'}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'details' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
              >
                1
              </div>
              <span className={step === 'details' ? 'font-medium' : 'text-muted-foreground'}>
                Details
              </span>
            </div>
            <div className="w-12 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
              >
                2
              </div>
              <span className={step === 'payment' ? 'font-medium' : 'text-muted-foreground'}>
                Payment
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {step === 'details' ? (
                <form onSubmit={handleSubmitDetails} className="space-y-6">
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <h2 className="font-display text-xl font-bold mb-6">Shipping Details</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit phone number"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Street address, apartment, etc."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            placeholder="6-digit PIN code"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="bg-card rounded-xl p-6 shadow-soft">
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Delivery Options
                    </h2>
                    <RadioGroup
                      value={deliveryType}
                      onValueChange={(value) => setDeliveryType(value as 'standard' | 'express')}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-muted-foreground">5-7 business days</p>
                            </div>
                            <span className="font-semibold">
                              {orderSummary.deliveryType === 'free' ? (
                                <span className="text-green-600">FREE</span>
                              ) : (
                                `₹${DELIVERY_CHARGES.standard}`
                              )}
                            </span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                            <span className="font-semibold">
                              {orderSummary.deliveryType === 'free' ? (
                                <span className="text-green-600">FREE</span>
                              ) : (
                                `₹${DELIVERY_CHARGES.express}`
                              )}
                            </span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    {orderSummary.deliveryType === 'free' && (
                      <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
                        <Gift className="h-4 w-4" />
                        Free delivery on orders above ₹{DELIVERY_CHARGES.freeThreshold}!
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="cart" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              ) : (
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h2 className="font-display text-xl font-bold mb-6">Select Payment Method</h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as 'upi' | 'cod')}
                    className="grid grid-cols-2 gap-4 mb-8"
                  >
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer font-medium">UPI Payment</Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer font-medium">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'upi' ? (
                    <div className="text-center">
                      <div className="bg-card border-2 border-border rounded-xl p-6 inline-block mb-4">
                        <img
                          src={paymentQR}
                          alt="Payment QR Code"
                          className="w-64 h-auto mx-auto"
                        />
                      </div>
                      <p className="text-lg font-bold mb-2">Amount: ₹{orderSummary.grandTotal.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Scan the QR code with any UPI app (Paytm, GPay, PhonePe, etc.)
                      </p>
                      <div className="space-y-3">
                        <Button variant="cart" size="lg" className="w-full" onClick={handleConfirmPayment}>
                          I have completed the payment
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Click the button above after completing your payment
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-4">
                          Please confirm your delivery PIN Code to check Cash on Delivery availability in your area.
                        </p>
                        <div className="max-w-md mx-auto space-y-4 text-left">
                          <div>
                            <Label htmlFor="cod-pincode">Confirm Pin Code</Label>
                            <Input
                              id="cod-pincode"
                              value={formData.pincode}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 6) {
                                  setFormData({ ...formData, pincode: value });
                                }
                              }}
                              placeholder="Enter 6-digit PIN code"
                              className="mt-1"
                              maxLength={6}
                            />
                          </div>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsCodConfirmed(true)}
                            disabled={formData.pincode.length !== 6}
                          >
                            Confirm & Check Availability
                          </Button>
                        </div>
                      </div>

                      {isCodConfirmed && (
                        <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-6 animate-in fade-in slide-in-from-top-2 duration-300 text-center">
                          <p className="text-lg font-bold">Not Available For Cash On Delivery to Your Location</p>
                          <p className="text-sm mt-2 opacity-90">Unfortunately, COD is currently unavailable for the provided PIN code. Please choose UPI payment to continue with your order.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24 space-y-4">
                <h3 className="font-display text-lg font-bold">Order Summary</h3>



                {/* Cart Items */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-18 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} • {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({orderSummary.totalItems} items)</span>
                    <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>

                  {orderSummary.bogoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        BOGO Discount
                      </span>
                      <span>-₹{orderSummary.bogoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {orderSummary.bulkDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Percent className="h-3 w-3" />
                        Bulk Discount ({orderSummary.bulkDiscountPercent}%)
                      </span>
                      <span>-₹{orderSummary.bulkDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Delivery ({deliveryType})
                    </span>
                    <span className={orderSummary.deliveryType === 'free' ? 'text-green-600' : ''}>
                      {orderSummary.deliveryType === 'free' ? 'FREE' : `₹${orderSummary.deliveryCharge}`}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>₹{orderSummary.grandTotal.toLocaleString()}</span>
                </div>

                {(orderSummary.bogoDiscount > 0 || orderSummary.bulkDiscount > 0) && (
                  <p className="text-xs text-green-600 text-center">
                    You're saving ₹{(orderSummary.bogoDiscount + orderSummary.bulkDiscount).toLocaleString()}!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
