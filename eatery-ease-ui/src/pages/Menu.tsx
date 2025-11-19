import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { loadProducts, Product } from '@/lib/api';
import { mockProducts } from '@/lib/mockData';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await loadProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      // Use mock data as fallback when backend is unavailable
      setProducts(mockProducts);
      toast.info('Showing sample menu. Backend is currently unavailable.');
    } finally {
      setLoading(false);
    }
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of dishes, carefully prepared with the finest ingredients
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No products available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
