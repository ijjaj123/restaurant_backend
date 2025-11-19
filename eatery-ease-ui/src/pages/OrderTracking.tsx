import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loadOrders, Order } from '@/lib/api';
import { toast } from 'sonner';
import { Search, Clock, CheckCircle, XCircle, Package, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const OrderTracking = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await loadOrders();
      setOrders(data);
      if (searchName) {
        filterOrders(data, searchName);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [searchName]);

  const filterOrders = (orderList: Order[], name: string) => {
    const filtered = orderList.filter(
      (order) => order.customer_name.toLowerCase() === name.toLowerCase()
    );
    setFilteredOrders(filtered);
  };

  const handleSearch = () => {
    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    setLoading(true);
    setSearchName(customerName.trim());
    filterOrders(orders, customerName.trim());
    setLoading(false);
    
    if (filteredOrders.length === 0) {
      toast.info('No orders found for this name');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    let variant: "default" | "secondary" | "destructive" | "outline" = "default";
    
    if (statusLower === 'completed') variant = "default";
    else if (statusLower === 'pending') variant = "secondary";
    else if (statusLower === 'cancelled') variant = "destructive";
    
    return (
      <Badge variant={variant} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Track Your Orders</h1>
          <p className="text-lg text-muted-foreground">
            Enter your name to view your order status in real-time
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Orders</CardTitle>
            <CardDescription>Enter the name you used when placing your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="customer-name" className="sr-only">Customer Name</Label>
                <Input
                  id="customer-name"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {searchName && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Orders for {searchName}
              </h2>
              <Badge variant="outline">
                {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
              </Badge>
            </div>

            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">No Orders Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any orders under this name.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-foreground">
                            Order #{order.id}
                          </h3>
                          <p className="text-muted-foreground">
                            {order.dish_name || `Dish #${order.dish}`}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                        <p className="font-medium text-foreground">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                        <p className="font-medium text-foreground">
                          {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-3 text-foreground">Order Status</p>
                      <div className="relative">
                        <div className="flex justify-between">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              order.status !== 'cancelled' ? 'bg-green-500' : 'bg-muted'
                            }`}>
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs mt-2 text-muted-foreground">Received</p>
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              order.status.toLowerCase() === 'pending' ? 'bg-yellow-500' : 
                              order.status.toLowerCase() === 'completed' ? 'bg-green-500' : 'bg-muted'
                            }`}>
                              <Clock className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs mt-2 text-muted-foreground">Preparing</p>
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              order.status.toLowerCase() === 'completed' ? 'bg-green-500' : 'bg-muted'
                            }`}>
                              <Package className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs mt-2 text-muted-foreground">Ready</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {!searchName && (
          <Card>
            <CardContent className="py-16 text-center">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Ready to Track Your Order?</h3>
              <p className="text-muted-foreground">
                Enter your name above to view all your orders and their current status
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
