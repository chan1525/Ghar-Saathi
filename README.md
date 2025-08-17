# GHAR SAATHI - Your Dream Home Construction Companion 🏡

Ghar Saathi is a full-stack web application designed to simplify the complex process of home construction. It connects users with everything they need in one place, from finding the perfect plot of land and skilled laborers to securing home loans and sourcing construction materials, all personalized to their local area.

## ✨ Key Features

* **Smart User Registration**: New users are automatically geo-tagged based on their pincode using the Geoapify API, enabling a personalized experience from the start.
* **Personalized Discovery**: The platform intelligently pre-calculates a user's proximity to major service areas to deliver ultra-fast, relevant search results for **Laborers** and **Materials**.
* **Real-Time Proximity Search**: For high-value assets like **Land Sites** and **Buildings**, the app performs real-time driving distance calculations to provide a precisely sorted list of the nearest properties.
* **Interactive EMI Calculator**: A dynamic, client-side tool for users to calculate and plan their home loan EMIs with interactive sliders for down payment and loan amount.
* **Comprehensive Listings**: Users can browse and filter through various categories, including contractors, legal teams, and more.

---

## 🛠️ Tech Stack

### Frontend
* **React**: For building the user interface.
* **React Router v5**: For client-side routing and navigation.
* **Axios & Fetch API**: For making HTTP requests to the backend.
* **CSS**: For styling, with a mix of standard CSS, inline styles, and CSS Modules.

### Backend
* **Node.js & Express**: For the server and REST API.
* **PostgreSQL**: As the primary relational database.
* **Geoapify API**: An external service for all geolocation, geocoding, and routing calculations.

---

## 🏗️ Architecture Overview

The application follows a classic client-server model. The React single-page application (SPA) communicates with the Node.js/Express backend via a REST API.

The most interesting architectural decision is the dual-strategy approach to location-based searches:

1.  **Pre-computation for Speed**: For categories like laborers and materials, the system performs a one-time, heavy calculation during user signup to determine the user's closest cities. Future queries for these categories are then extremely fast, as they just retrieve from this pre-computed list.
2.  **Real-time for Precision**: For sites and buildings, where exact distance matters most, the system calculates the point-to-point driving distance in real-time for every request, ensuring maximum accuracy at the cost of slower response times.

---

## 🚀 Getting Started

### Prerequisites
* Node.js and npm
* PostgreSQL installed and running
* A free API key from [Geoapify](https://www.geoapify.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ghar-saathi.git](https://github.com/your-username/ghar-saathi.git)
    cd ghar-saathi
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Backend:**
    * Navigate to the directory containing `server.js`.
    * Create a `.env` file and add your database credentials and API key:
        ```env
        DB_USER=postgres
        DB_HOST=localhost
        DB_DATABASE=gharsati
        DB_PASSWORD=your_db_password
        DB_PORT=5432
        GEOAPIFY_API_KEY=your_geoapify_api_key
        ```
    * *Note: You will need to update `server.js` to use these environment variables instead of the hardcoded values.*

4.  **Run the Application:**
    * **Start the Backend Server:**
        ```bash
        node server.js
        ```
    * **Start the Frontend React App:**
        ```bash
        npm start
        ```
    The application will be available at `http://localhost:3000`.

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                                          |
|--------|----------------------|------------------------------------------------------|
| `POST` | `/signup`            | Registers a new user and performs geo-calculations.  |
| `POST` | `/login`             | Authenticates a user.                                |
| `POST` | `/fetchSites`        | Fetches all sites, sorted by real-time distance.     |
| `POST` | `/fetchbuildings`    | Fetches all buildings, sorted by real-time distance. |
| `POST` | `/fetchlabours`      | Fetches laborers from pre-calculated nearby cities.  |
| `POST` | `/fetchMaterials`    | Fetches materials from pre-calculated nearby cities. |
