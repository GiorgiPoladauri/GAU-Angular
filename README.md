# GAU Shop (Angular 19)

Product list + product details pages.

- Data is loaded through `ProductService` (HttpClient -> `public/data/products.json`)
- List page: search, category filter, free-shipping filter, sorting (price, rating, orders, name), grid/list view. State is kept in the URL query params.
- Details page: `/product/:id` with image gallery, quantity-based price tiers, specs, supplier box, save for later, related products.

## Run
```
npm install
npx ng serve -o
```
Open http://localhost:4200
