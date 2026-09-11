# SnapShop

> A full-stack phone e-commerce platform built with Next.js, TypeScript, Drizzle ORM, PostgreSQL, and Stripe.

[![Live Demo](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge\&logo=vercel)](https://snapshop-six.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge\&logo=github)](https://github.com/aungheeinzay/PhoneSaleSnapShop)

## Overview

**SnapShop** is a full-stack e-commerce platform focused on selling mobile phones and managing the complete shopping workflow.

The application combines product discovery, authentication, product variants, image management, shopping and order flows, online payments, email workflows, and an admin dashboard into a single Next.js application.

The project was built to explore how a modern e-commerce system can handle both customer-facing experiences and backend business logic.

---

## Live Demo

**Website:**
https://snapshop-six.vercel.app/

**Source Code:**
https://github.com/aungheeinzay/PhoneSaleSnapShop

---

## Features

### 🛍️ Product Catalog

* Browse available phones
* Search products
* Product detail pages
* Product variants
* Variant-specific images
* Product tags
* Product pricing
* Responsive product UI

---

### 🔎 Product Discovery

Users can discover products through:

* Search
* Product filters
* Tags
* Product categories
* Product variants

The live application exposes search and filtering controls directly in the shopping interface.

---

### 👤 Authentication

Authentication is implemented using **NextAuth v5** with a Drizzle adapter.

Supported authentication methods include:

* Email/password authentication
* Google OAuth
* GitHub OAuth
* JWT sessions
* Password hashing with bcrypt
* Email verification
* Password reset
* Two-factor authentication support
* Role-based user state

---

### 📱 Product Variants

Products are separated from their variants to support different configurations.

```text
Product
   │
   ├── Variant
   │      ├── Color
   │      ├── Product Type
   │      ├── Images
   │      └── Tags
   │
   └── Variant
```

This allows the same product to have multiple configurations without duplicating the main product record.

---

### 🖼️ Image Management

Product variants can contain multiple images.

The database stores:

* Image URL
* Image name
* File size
* Display order
* Upload key

Images are related directly to product variants and are automatically removed when their parent variant is deleted.

---

### 🛒 Order Management

The application supports an end-to-end order workflow.

```text
Customer
   ↓
Product
   ↓
Cart
   ↓
Checkout
   ↓
Payment
   ↓
Order
   ↓
Order Items
```

Orders contain:

* Customer
* Total amount
* Status
* Creation date
* Receipt URL
* Ordered products
* Quantity
* Selected variants

---

### 💳 Stripe Payments

Stripe is integrated into the checkout workflow for online payments.

The application uses:

* Stripe.js
* React Stripe
* Stripe server SDK
* Customer creation
* Payment processing
* Order/payment actions

New users can also be associated with a Stripe customer during account creation.

---

### 📧 Email Workflows

The project uses **Resend** and React Email for transactional email workflows.

The application includes server-side email actions for account-related workflows such as:

* Email verification
* Password recovery
* Authentication-related emails

---

### 🔐 Role-Based Access

Users have different roles within the system.

```text
User
 ├── user
 └── admin
```

The user's role is included in the authenticated session and can be used to control access to protected functionality.

---

### 📊 Admin Dashboard

The project includes a dedicated dashboard area for managing application data.

The dashboard architecture is separated from the public shopping experience and provides a foundation for administrative operations.

---

### 📈 Data Visualization

The project uses **Recharts** for dashboard-oriented data visualization and analytics interfaces.

This provides a foundation for displaying information such as:

* Sales
* Orders
* Product statistics
* Business metrics

---

## Tech Stack

| Technology               | Purpose                    |
| ------------------------ | -------------------------- |
| **Next.js 15**           | Full-stack React framework |
| **React 19**             | UI development             |
| **TypeScript**           | Type safety                |
| **Tailwind CSS 4**       | Styling                    |
| **Drizzle ORM**          | Database ORM               |
| **Neon PostgreSQL**      | Database                   |
| **NextAuth v5**          | Authentication             |
| **Zustand**              | Client state management    |
| **Stripe**               | Online payments            |
| **UploadThing**          | File/image uploads         |
| **Resend**               | Transactional email        |
| **React Email**          | Email templates            |
| **Tiptap**               | Rich text editing          |
| **React Hook Form**      | Form management            |
| **Zod**                  | Schema validation          |
| **next-safe-action**     | Type-safe server actions   |
| **Recharts**             | Data visualization         |
| **Sonner**               | Toast notifications        |
| **Lucide / React Icons** | UI icons                   |

These technologies are reflected in the repository's dependency configuration.

---

## Architecture

The application follows a full-stack Next.js architecture:

```text
┌─────────────────────────────────────┐
│           Next.js Frontend          │
│                                     │
│  Product UI                         │
│  Authentication                     │
│  Dashboard                          │
│  Checkout                           │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          Server Actions             │
│                                     │
│  Products                           │
│  Orders                             │
│  Payments                           │
│  Authentication                     │
│  Email                              │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│           Drizzle ORM               │
└────────────────┬────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          Neon PostgreSQL            │
└─────────────────────────────────────┘

        External Services
        ┌────────┬──────────┬─────────┐
        │ Stripe │ Resend   │ Upload  │
        │        │          │ Thing   │
        └────────┴──────────┴─────────┘
```

---

## Database Design

The database is built with **Drizzle ORM + PostgreSQL**.

### Main Entities

```text
User
 │
 ├── Account
 ├── Orders
 ├── Email Verification
 ├── Password Reset
 └── Two Factor Tokens

Product
 │
 └── Product Variant
        ├── Variant Images
        └── Variant Tags

Order
 │
 └── Order Products
        ├── Product
        └── Product Variant
```

The schema defines relationships between users, products, variants, images, tags, orders, and order items using PostgreSQL foreign keys and Drizzle relations.

---

## Authentication Architecture

```text
                    Authentication
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       Google           GitHub        Credentials
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                     NextAuth
                          ↓
                    JWT Session
                          ↓
                  Drizzle Adapter
                          ↓
                    PostgreSQL
```

Credentials authentication validates login data and compares passwords using bcrypt, while OAuth providers include Google and GitHub.

---

## Payment Flow

```text
Product
   ↓
Cart
   ↓
Checkout
   ↓
Stripe
   ↓
Payment
   ↓
Create Order
   ↓
Order History
```

Stripe is integrated on both the client and server sides, with dedicated payment and order actions in the backend.

---

## Project Structure

```text
PhoneSaleSnapShop/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── conform-email/
│   ├── dashboard/
│   ├── product/
│   │   └── [id]/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── hook/
│   └── useMediaQuery.ts
│
├── lib/
│
├── server/
│   ├── actions/
│   │   ├── actions.ts
│   │   ├── analysis.ts
│   │   ├── email.ts
│   │   ├── login-action.ts
│   │   ├── order.ts
│   │   ├── payment.ts
│   │   ├── product.ts
│   │   ├── register-action.ts
│   │   └── variants.ts
│   │
│   ├── auth.ts
│   ├── index.ts
│   └── schema.ts
│
├── store/
├── types/
├── public/
│
├── drizzle.config.ts
├── next.config.ts
└── package.json
```

The repository currently separates the application into `app`, `components`, `server`, `store`, `types`, and supporting modules, with dedicated server actions for authentication, products, orders, payments, email, and variants.

---

## Server-Side Workflow

The application uses server-side actions to keep important business logic away from the client.

```text
Client
  │
  ▼
Form
  │
  ▼
Zod Validation
  │
  ▼
Server Action
  │
  ├── Authentication
  ├── Authorization
  ├── Business Logic
  └── Database Operation
          │
          ▼
      PostgreSQL
```

This architecture is used across product, authentication, order, payment, and email workflows.

---

## Validation & Forms

The application uses:

* React Hook Form
* Zod
* next-safe-action

This provides a type-safe workflow from form input to server-side business logic.

```text
User Input
    ↓
React Hook Form
    ↓
Zod
    ↓
Server Action
    ↓
Database
```

---

## State Management

Client-side state is managed using **Zustand** where global or cross-component state is required.

This keeps UI state separate from server-side database state.

---

## Responsive Design

The application is designed to work across different screen sizes.

A reusable `useMediaQuery` hook is included for responsive behavior and breakpoint-aware UI logic.

---

## Security

Security-related implementation includes:

* Password hashing with bcrypt
* JWT-based sessions
* OAuth authentication
* Role-based access
* Server-side authentication checks
* Zod input validation
* Protected server actions
* Database foreign-key relationships
* Two-factor authentication support

Authentication configuration and session customization are handled on the server.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aungheeinzay/PhoneSaleSnapShop.git

cd PhoneSaleSnapShop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and configure the required services:

```env
DATABASE_URL="your_neon_database_url"

AUTH_SECRET="your_auth_secret"

AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

AUTH_GITHUB_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"

STRIPE_SECRET_KEY="your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

RESEND_API_KEY="your_resend_api_key"

UPLOADTHING_TOKEN="your_uploadthing_token"
```

> Never commit real credentials or secret keys to Git.

### 4. Generate database migrations

```bash
npm run db:generate
```

### 5. Push the schema

```bash
npm run db:push
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev
```

Start the development server with Turbopack.

```bash
npm run build
```

Create a production build.

```bash
npm run start
```

Start the production server.

```bash
npm run lint
```

Run ESLint.

```bash
npm run db:generate
```

Generate Drizzle migrations.

```bash
npm run db:push
```

Push the database schema.

The available scripts are defined in the repository's `package.json`.

---

## Technical Highlights

This project demonstrates practical experience with:

* Full-stack Next.js development
* Next.js App Router
* Server Actions
* PostgreSQL database design
* Drizzle ORM
* Authentication architecture
* OAuth integration
* JWT sessions
* Role-based access control
* Two-factor authentication
* Product variant modeling
* Relational database design
* Order management
* Payment integration
* Stripe
* Image upload workflows
* Transactional email
* Form validation
* Client-side state management
* Dashboard development
* Data visualization
* Responsive UI

---

## Key Engineering Decisions

### Product & Variant Separation

Instead of storing every product configuration in a single table, products and variants are separated:

```text
Product
   ↓
ProductVariant
   ↓
VariantImages
VariantTags
```

This provides a more flexible structure for products that have multiple colors, types, and images.

### Server-Side Business Logic

Sensitive operations such as:

* Payments
* Orders
* Authentication
* Product mutations
* Email workflows

are handled through server-side logic rather than trusting the client.

### External Service Integration

The application integrates multiple external services:

```text
Application
    │
    ├── Neon PostgreSQL
    ├── Stripe
    ├── UploadThing
    ├── Resend
    └── OAuth Providers
```

This demonstrates experience working with third-party APIs and external service boundaries.

---

## Screenshots

### Store

*Add screenshot here*

### Product Details

*Add screenshot here*

### Dashboard

*Add screenshot here*

### Checkout

*Add screenshot here*

### Authentication

*Add screenshot here*

---

## Deployment

The application is deployed on Vercel.

**Live Demo:**

https://snapshop-six.vercel.app/

---

## Repository

**GitHub:**

https://github.com/aungheeinzay/PhoneSaleSnapShop

---

## Future Improvements

Possible future improvements include:

* Advanced inventory management
* Stock tracking
* Coupon and promotion system
* Product reviews and ratings
* Wishlist functionality
* Advanced analytics
* Order tracking
* Automated testing
* Real-time order notifications
* Improved recommendation system

---

## Author

**Aung Heein Zay**

Full-Stack Developer focused on building modern web applications with **Next.js, TypeScript, React, PostgreSQL, and scalable backend architecture**.
