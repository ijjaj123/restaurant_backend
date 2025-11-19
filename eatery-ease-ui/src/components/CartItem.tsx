import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
  const itemTotal = price * item.cartQuantity;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.cartQuantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                min="1"
                max="99"
                value={item.cartQuantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 h-8 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.cartQuantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-muted-foreground">₹{price.toFixed(0)} each</p>
              <p className="text-lg font-bold text-accent">₹{itemTotal.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
