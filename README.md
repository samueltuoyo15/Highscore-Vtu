# High Score VTU Platform

High Score VTU is a modern, high-performance financial technology application designed to facilitate seamless Virtual Top-Up (VTU) services and bill payments. Built with the latest web technologies, it offers a secure and user-friendly interface for purchasing airtime, data bundles, cable TV subscriptions, electricity tokens, and processing bank transfers.

## Table of Contents

- Project Overview
- Key Features
- Technology Stack
- Prerequisites
- Installation Guide
- Running the Application
- Project Structure
- Application Pages
- Contributing
- License

## Project Overview

This project serves as a digital vending solution that connects users with major service providers in Nigeria. It is designed to be responsive, ensuring a consistent experience across desktop and mobile devices. The architecture emphasizes performance, SEO optimization, and intuitive user experience.

## Key Features

1. **Airtime Top-up**: Instant airtime recharge for all major networks (MTN, Airtel, Glo, 9mobile).
2. **Data Bundles**: Purchase of internet data plans including SME, Corporate, and Gifting options.
3. **Cable TV Subscription**: Real-time subscription renewal for DSTV, GOTV, and Startimes services with smartcard validation.
4. **Electricity Bill Payment**: Payment integration for prepaid and postpaid meters across various distribution companies (IKEDC, AEDC, etc.).
5. **Internet Services**: Subscriptions for specialized internet providers like Smile and Spectranet.
6. **Wallet System**: sophisticated wallet management allowing funding via bank transfer or card, and balance tracking.
7. **Transaction History**: Detailed log of all user transactions with status tracking (Success, Pending, Failed).
8. **Bank Transfer**: Facility to transfer funds to bank accounts with recipient name verification.

## Technology Stack

The application is built using a modern frontend stack to ensure speed, type safety, and maintainability.

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Library**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState)
- **Font**: Geist Sans / Geist Mono

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- Node.js (Version 18.17 or higher recommended)
- npm or pnpm (Package Manager)
- Git (Version Control)

## Installation Guide

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd FinTech
   ```

2. **Navigate to the Client Directory**
   The frontend application is located in the client folder.

   ```bash
   cd client
   ```

3. **Install Dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Environment Variables**
   Create a .env.local file in the root of the client directory if necessary.
   (Currently, the application uses mock data and does not require active API keys for UI demonstration).

## Running the Application

To start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

To build for production:

```bash
npm run build
npm start
```

## Project Structure

The project follows the standard Next.js App Router structure:

```
FinTech/
├── client/
│   ├── app/                # Application routes and pages
│   │   ├── (auth)/         # Authentication routes
│   │   ├── airtime/        # Airtime purchase implementation
│   │   ├── cable/          # Cable TV subscription implementation
│   │   ├── data/           # Data bundle purchase implementation
│   │   ├── electricity/    # Electricity bill payment implementation
│   │   ├── history/        # Transaction history
│   │   ├── internet/       # ISP subscription
│   │   ├── transfer/       # Bank transfer
│   │   ├── wallet/         # Wallet funding and details
│   │   └── page.tsx        # Landing/Home page
│   ├── components/         # Reusable UI components (Header, Footer, etc.)
│   ├── public/             # Static assets (Images, Icons)
│   └── globals.css         # Global styles and Tailwind directives
└── README.md               # Project documentation
```

## Application Pages

- **Home**: Dashboard showing wallet balance, quick actions, and service grid.
- **Airtime Page**: Interface for selecting network and entering amount.
- **Data Page**: Tabbed interface for choosing networks and specific data plans.
- **Cable Page**: Form for IUC number verification and package selection.
- **Electricity Page**: Selection for different DISCOs and meter number validation.
- **Wallet Page**: Displays account balance, virtual account details for manual funding, and payment gateway options.

## Contributing

Contributions to improve the platform are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear description messages.
4. Push to your branch and submit a Pull Request.

## License

This project is open-source and available for use under standard usage terms.
