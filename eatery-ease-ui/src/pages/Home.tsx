import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, Clock, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hero-start to-hero-end text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to Delicious Bites
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Experience culinary excellence with our carefully crafted dishes. 
              Fresh ingredients, authentic flavors, delivered with love.
            </p>
            <Link to="/menu">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                View Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Expert Chefs</h3>
              <p className="text-muted-foreground">
                Our skilled culinary team brings years of experience to every dish
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Fast Service</h3>
              <p className="text-muted-foreground">
                Quick preparation without compromising on quality or taste
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Premium Quality</h3>
              <p className="text-muted-foreground">
                Only the finest, freshest ingredients make it to your plate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-foreground">
            Ready to Order?
          </h2>
          <p className="text-lg mb-8 text-secondary-foreground/80 max-w-2xl mx-auto">
            Browse our delicious menu and place your order in just a few clicks
          </p>
          <Link to="/menu">
            <Button size="lg" variant="default" className="text-lg px-8 py-6">
              Explore Menu
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
