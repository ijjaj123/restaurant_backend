# Dine Easy - Full Stack Restaurant Management System

A complete restaurant management system with React frontend and Django REST API backend.

## Project Structure

```
restaurant_backend/
├── restaurant_management/    # Django project settings
├── home/                      # Home app (info, views)
├── orders/                    # Orders app (models, serializers, APIs)
├── products/                  # Products app (menu items, serializers, APIs)
├── account/                   # Account app (user profiles)
├── restaurant-ui/             # React frontend
│   ├── src/
│   │   ├── pages/            # Home, Menu, Cart, Orders, Admin, NotFound
│   │   ├── components/       # Navbar, ProductCard, CartItem, UI components
│   │   ├── contexts/         # CartContext for state management
│   │   ├── hooks/            # use-toast, use-mobile
│   │   ├── lib/              # api.js, mockData.js, utils.js
│   │   ├── App.js            # Main app with routing
│   │   └── index.css         # Tailwind CSS styles
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── public/
├── db.sqlite3                 # SQLite database
├── manage.py                  # Django management script
└── tools/                     # Utility scripts
```

## Quick Start (Development)

### 1. Start Django Backend

```bash
cd c:\Users\DELL\django1\restaurant_backend
python manage.py runserver 127.0.0.1:8000
```

Backend will be available at: `http://127.0.0.1:8000`

APIs available:
- `http://127.0.0.1:8000/api/products/items/` — Product list
- `http://127.0.0.1:8000/api/orders/orders/` — Orders
- `http://127.0.0.1:8000/api/home/info/` — Restaurant info
- `http://127.0.0.1:8000/api/account/profiles/` — User profiles

### 2. Start React Frontend

In a new terminal:

```bash
cd c:\Users\DELL\django1\restaurant_backend\restaurant-ui
npm start
```

Frontend will open at: `http://localhost:3000`

## Features

### Customer Features
- ✅ **Home Page** — Hero section with CTA
- ✅ **Menu** — Browse dishes, view prices in ₹ (rupees)
- ✅ **Shopping Cart** — Add/remove items, adjust quantities
- ✅ **Place Orders** — Checkout with customer name
- ✅ **Order Tracking** — View order history and status
- ✅ **Responsive Design** — Works on mobile, tablet, desktop
- ✅ **Toast Notifications** — User feedback on actions

### Admin Features
- ✅ **Admin Panel** — Add new products
- ✅ **Product Management** — Create dishes with image, price, description

### Technical Features
- ✅ **Cart Context** — Global state management (localStorage persistence)
- ✅ **CORS Middleware** — Frontend can call backend APIs
- ✅ **Mock Data Fallback** — Menu shows mock data if backend unavailable
- ✅ **Tailwind CSS** — Modern, responsive styling
- ✅ **React Router** — Multi-page navigation

## API Integration

All API calls point to Django backend at `http://127.0.0.1:8000/api/`.

To change the API base URL for production:

**In `restaurant-ui/src/lib/api.js`:**
```javascript
const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api';
```

Or set the environment variable before running:
```bash
set REACT_APP_API_BASE=https://your-production-domain.com/api
npm start
```

## Deployment Options

### Option A: Serve Frontend from Django (Recommended for Single Server)

1. **Build the frontend:**
   ```bash
   cd restaurant-ui
   npm run build
   ```

2. **Copy build files to Django:**
   ```bash
   xcopy build\* ..\static\frontend\ /E
   ```

3. **Collect static files:**
   ```bash
   cd ..
   python manage.py collectstatic --noinput
   ```

4. **Update Django URLs** to serve `index.html` at `/app/`:
   ```python
   # In restaurant_management/urls.py
   from django.views.generic import TemplateView
   urlpatterns += [
       path('app/', TemplateView.as_view(template_name='app_index.html')),
   ]
   ```

5. **Run production server:**
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

Visit: `http://your-domain.com/app/`

### Option B: Separate Frontend & Backend Servers

1. **Build frontend for production:**
   ```bash
   cd restaurant-ui
   npm run build
   ```

2. **Deploy frontend build** to a static hosting service (Vercel, Netlify, GitHub Pages, etc.)

3. **Update API base** before deploying:
   ```bash
   set REACT_APP_API_BASE=https://your-api-domain.com/api
   npm run build
   ```

4. **Deploy Django backend** to a server (Heroku, AWS, DigitalOcean, etc.)

5. **Enable CORS** in Django settings:
   ```python
   INSTALLED_APPS += ['corsheaders']
   MIDDLEWARE += ['corsheaders.middleware.CorsMiddleware']
   CORS_ALLOWED_ORIGINS = [
       'https://your-frontend-domain.com',
       'http://localhost:3000',  # for dev
   ]
   ```

## Environment Variables

### Django (`.env` file or `settings.py`)
```
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com
DATABASES_URL=postgresql://user:password@host/dbname
SECRET_KEY=your-secret-key
```

### React (`restaurant-ui/.env`)
```
REACT_APP_API_BASE=http://127.0.0.1:8000/api
```

## Database Setup

### Create Superuser (Admin)
```bash
python manage.py createsuperuser
```

### Run Migrations
```bash
python manage.py migrate
```

### Access Admin Panel
```
http://127.0.0.1:8000/admin
```

## Testing

### Test Frontend → Backend API Call

1. Start both servers
2. Visit `http://localhost:3000/menu`
3. Open browser DevTools (F12)
4. Check Network tab for API calls to `127.0.0.1:8000/api/products/items/`

### Test Cart Functionality

1. Add items to cart
2. Verify items appear in cart sidebar
3. Adjust quantities
4. Check that total price updates correctly
5. Place order (should POST to `/api/orders/orders/`)

### Test Admin Panel

1. Visit `http://localhost:3000/admin`
2. Fill in product details
3. Submit form (should POST to `/api/products/items/`)
4. Verify new product appears in menu

## Troubleshooting

### Frontend won't load

- Check React dev server: `http://localhost:3000`
- Check console for errors (F12)
- Verify npm dependencies: `npm install`

### API calls failing

- Ensure Django is running: `http://127.0.0.1:8000/api/products/items/`
- Check CORS middleware is enabled in Django
- Verify `REACT_APP_API_BASE` environment variable

### Products not showing

- Check if backend is running
- Verify `/api/products/items/` returns data
- Mock data will display if backend is unavailable

### Cart not persisting

- Check browser localStorage (DevTools → Application → LocalStorage)
- Clear cache and refresh page

## Production Checklist

- [ ] Set `DEBUG=False` in Django settings
- [ ] Update `ALLOWED_HOSTS` for your domain
- [ ] Change `SECRET_KEY` to a secure value
- [ ] Update `REACT_APP_API_BASE` to production API URL
- [ ] Enable HTTPS (SSL certificate)
- [ ] Configure email backend for password reset (if needed)
- [ ] Set up database backups
- [ ] Enable rate limiting on APIs
- [ ] Set up monitoring/logging
- [ ] Test all user flows end-to-end

## Support

For issues or questions:
1. Check browser console (F12)
2. Check Django logs
3. Verify API responses in Postman or curl
4. Check database for data persistence

## License

MIT License - Feel free to use and modify!
