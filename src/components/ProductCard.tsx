import { useState } from 'react';
import { Product, useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart, setCartOpen } = useStore();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    toast({
      title: 'Added to cart!',
      description: `${product.name} (${selectedSize}, ${selectedColor}) x${quantity}`,
    });
    setIsPreviewOpen(false);
    setQuantity(1);
    setCartOpen(true);
  };

  return (
    <>
      <article
        className="group relative bg-card rounded-xl overflow-hidden shadow-soft transition-all duration-500 hover:shadow-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered && 'scale-110'
            )}
          />

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              -{discount}%
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-foreground/20 flex items-center justify-center gap-3 transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-card hover:scale-110 transition-transform"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="cart"
              size="icon"
              className="rounded-full shadow-card hover:scale-110 transition-transform"
              onClick={() => setIsPreviewOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-card-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Product Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-y-auto">
          <div className="grid md:grid-cols-2">
            {/* Product Image Gallery */}
            <div className="relative aspect-square md:aspect-auto bg-secondary/30">
              <div className="relative h-full">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 animate-fade-in"
                />

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto no-scrollbar">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          "w-12 h-16 rounded-md overflow-hidden border-2 transition-all flex-shrink-0",
                          activeImageIndex === idx ? "border-primary scale-110" : "border-transparent opacity-70 hover:opacity-100"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6 md:p-8 flex flex-col relative">
              <DialogHeader className="text-left">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <DialogTitle className="font-display text-2xl font-bold">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <DialogDescription className="mt-4 text-base leading-relaxed">
                  {product.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6 flex-1 pb-20 md:pb-0">
                {/* Size Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground">Size</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="text-sm font-medium text-foreground">Color</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                          selectedColor === color
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        )}
                      >
                        {selectedColor === color && <Check className="h-3 w-3" />}
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-foreground">Quantity</label>
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="sticky bottom-0 bg-background pt-4 md:static md:bg-transparent md:pt-6 md:mt-auto border-t md:border-none -mx-6 px-6 -mb-6 pb-6 md:mx-0 md:px-0 md:mb-0 md:pb-0">
                <Button
                  variant="cart"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ₹{(product.price * quantity).toLocaleString()}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
