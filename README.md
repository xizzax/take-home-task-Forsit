<<<<<<< HEAD
# forsit_take-home-task

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
=======
# Inventory Management Dashboard

A Vue 3-powered inventory dashboard for small businesses to manage products by category, stock levels, pricing, and more. Built with `ag-grid-vue3` and Tailwind-inspired styling.

---

## Features

- Add new products with category, price, and stock
- Search & filter products by name, category, or stock status
- View stock level status (In Stock / Low Stock / Out of Stock)
- Update inventory quantity for selected products
-  Alert for low/out-of-stock products
- Dynamic sorting and filtering using AG Grid

---

## Tech Stack

- [Vue 3 Composition API](https://vuejs.org/)
- [AG Grid (Community)](https://www.ag-grid.com/)
- [Lodash](https://lodash.com/)
- [Font Awesome](https://fontawesome.com/)

---

## Project Structure

```

src/
├── components/
│   └── InventoryDashboard.vue   # Main component
├── data/
│   └── DummyData.js             # Sample product data
├── App.vue
├── main.js

````

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inventory-dashboard.git
cd inventory-dashboard
````

### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

### 3. Run the Project

```bash
npm run dev
```

### 4. Visit the App

Open your browser and navigate to:

```
http://localhost:5173/
```

---

## Dependencies

The key dependencies used in this project:

```json
"dependencies": {
  "vue": "^3.x",
  "ag-grid-community": "^31.x",
  "ag-grid-vue3": "^31.x",
  "lodash": "^4.x",
  "@fortawesome/fontawesome-free": "^6.x"
}
```

Install any missing packages using:

```bash
npm install ag-grid-community ag-grid-vue3 lodash @fortawesome/fontawesome-free
```

---

## Dashboard Navigation

### Main Dashboard

* Displays all products in an interactive AG Grid.
* Columns include: ID, Name, Category, Unit Sale Price, Quantity, Stock Level.
* Clicking a row opens a modal to **update inventory**.

### Search

* Use the top-left search bar to filter products by **name** or **category**.

### Filters

* Use dropdowns on the top-right to filter by:

  * **Category** (e.g., Cosmetics, Health, Food & Drink)
  * **Stock Level** (In Stock, Low Stock, Out of Stock)

### Add Product

* Click **Add Product** to open a modal.
* Enter name, category, unit price, quantity, and cost.
* Fields are validated before submission.

### Stock Alerts

* If any product is low or out of stock, a red alert box will notify you.
* Click **Close** to dismiss it.

---

## Sample Data

The product data is located in:

```
src/data/DummyData.js
```

You can modify this file to add or remove default products.

---

## Future Enhancements

* User authentication
* Revenue & cost analysis charts
* Import/export inventory as CSV
* Product image support

---

## License

This project is open-source and free to use.

---

## Questions?

Feel free to open an issue or reach out at \[[iz.cs.22.10@gmail.com](mailto:iz.cs.22.10example.com)].
>>>>>>> ba2748996f2f5bf9f3b74afaa48446a95a7bc991
