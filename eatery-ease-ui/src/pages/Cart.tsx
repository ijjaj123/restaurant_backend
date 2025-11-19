import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/CartItem';
import { orderProduct } from '@/lib/api';
import { toast } from 'sonner';
import { ShoppingBag, Loader2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);

    try {
      // Place orders for all cart items
      const orderPromises = cartItems.map((item) =>
        orderProduct(item.id, item.cartQuantity, customerName.trim())
      );

      await Promise.all(orderPromises);

      toast.success(`Successfully placed ${cartItems.length} order(s)!`);
      clearCart();
      setCustomerName('');
      
      // Redirect to orders page
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (error) {
      toast.error('Failed to place orders. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4 text-foreground">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Add some delicious items from our menu to get started!
            </p>
            <Link to="/menu">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Your Name *</Label>
                  <Input
                    id="customer-name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{cartCount}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">₹{cartTotal.toFixed(0)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </Button>
                <Link to="/menu" className="w-full">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
