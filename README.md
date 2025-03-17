# CS:GO Marketplace

Elevate your gaming experience with the Justipay CS:GO marketplace – your premier destination for seamless trade of CS:GO items.

## Getting Started

Jump straight into using the Justipay CS:GO marketplace with these simple setup instructions.

### Quick Setup

Follow these steps to set up your local development environment:

1. **Clone Repository**

   - Obtain a copy of the source code on your local machine by cloning the repository.

     ```bash
     git clone <repository-url>
     ```

2. **Install Dependencies**

   - Navigate to the project directory and install the required NPM packages:

     ```bash
     npm install
     ```

3. **Run Development Server**

   - Initiate the development server to start coding right away:

     ```bash
     npm run dev
     ```

   - Access your local build by opening [http://localhost:3000](http://localhost:3000) in your web browser. You should see the marketplace live.

### Production Deployment

Ensure your production environment is ready by meeting the following prerequisites:

- **docker compose** - for defining and running multi-container Docker applications.
- **git** - to clone and manage your source code versions.

#### Deployment Steps

Deploy your application to a server following this process:

1. **Clone Repository**

   - Transfer the repository contents to your server by cloning it.

     ```bash
     git clone <repository-url>
     ```

2. **Configure Environment Variables**

   - Duplicate `.env.example` as `.env` and populate it with your specific configuration. Essential variables include:

     - `NEXT_PUBLIC_VERCEL_URL`: Your site's base URL (e.g., `http://localhost:3000`)
     - `NEXT_PUBLIC_GTM_ID`: Google Tag Manager ID (e.g., `GTM-XXXXXX`)
     - `NEXT_PUBLIC_API_URL`: Backend API URL and port (e.g., `http://api.yourdomain.com`)
     - `NEXT_PUBLIC_API_PAYMENT_PK_KEY`: Payment gateway public key (e.g., `pk_test_XXXX`)

3. **Docker Initialization**

   - Start by building your Docker images:

     ```bash
     docker compose build
     ```

   - Launch your services in detached mode:

     ```bash
     docker compose up -d
     ```

   - Your application should now be live. Visit the `NEXT_PUBLIC_VERCEL_URL` in a browser to confirm.
