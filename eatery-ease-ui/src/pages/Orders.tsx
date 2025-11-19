import { useState, useEffect } from 'react';
import { loadOrders, updateOrderStatus, Order } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await loadOrders();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders. Please check your connection.');
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success(`Order ${newStatus === 'completed' ? 'completed' : 'reopened'} successfully`);
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: 'secondary',
      completed: 'default',
      cancelled: 'destructive',
    };
    
    return (
      <Badge variant={variants[status.toLowerCase()] || 'outline'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Orders Dashboard</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>
          <Button onClick={fetchOrders} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-lg text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Dish Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.dish_name || `Dish ${order.dish}`}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(order.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={order.status === 'completed' ? 'outline' : 'default'}
                        onClick={() => handleStatusUpdate(order.id, order.status)}
                        disabled={updatingId === order.id}
                      >
                        {updatingId === order.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : order.status === 'completed' ? (
                          'Reopen'
                        ) : (
                          'Complete'
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
