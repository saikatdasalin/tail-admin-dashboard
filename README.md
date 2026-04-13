# Tail Admin Dashboard

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS. Tail Admin Dashboard provides a comprehensive solution for building powerful admin panels with beautiful UI components and rich functionality.

## 🚀 Features

- **Modern UI Components** - Pre-built, customizable UI elements using Radix UI and Tailwind CSS
- **Responsive Design** - Mobile-first responsive layout that works on all screen sizes
- **Data Tables** - Advanced data table with sorting, filtering, and pagination using TanStack Table
- **Charts & Graphs** - Multiple chart types (line, bar) powered by ApexCharts
- **Authentication Pages** - Sign In and Sign Up pages with form validation
- **Calendar Integration** - Full calendar functionality with FullCalendar
- **E-commerce Features** - Sales metrics, order tracking, and customer demographics
- **Dark Mode Support** - Built-in theme toggling for light and dark modes
- **Forms & Validation** - Comprehensive form handling with date pickers and multi-select inputs
- **User Profiles** - Customizable user profile pages with various information cards
- **Drag & Drop** - File upload and drag-drop functionality with React DnD

## 📋 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── auth/           # Authentication related components
│   ├── charts/         # Chart components
│   ├── common/         # Common components (breadcrumb, cards, etc.)
│   ├── ecommerce/      # E-commerce specific components
│   ├── form/           # Form and input components
│   ├── header/         # Header and navigation components
│   ├── tables/         # Table components
│   ├── ui/             # Base UI components
│   └── UserProfile/    # User profile related components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── icons/              # SVG icons
├── layout/             # Layout components
├── lib/                # Utility functions
├── pages/              # Page components
├── Route/              # Routing configuration
└── styles/             # Global styles
```

## 🛠️ Tech Stack

- **Frontend Framework** - React 19
- **Language** - TypeScript
- **Styling** - Tailwind CSS
- **Build Tool** - Vite
- **Routing** - React Router v7
- **UI Components** - Radix UI, Lucide Icons
- **Charts** - ApexCharts
- **Tables** - TanStack Table (React Table)
- **Calendar** - FullCalendar
- **Form Handling** - React Hook Form, Flatpickr
- **File Upload** - React Dropzone
- **Drag & Drop** - React DnD
- **Helmet** - React Helmet for document head management

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tail-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port shown in your terminal).

## 🔨 Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the production-ready bundle
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## 🌙 Theme Support

The dashboard includes built-in light and dark mode support. Users can toggle between themes using the theme toggle button in the header.

## 📱 Responsive Breakpoints

The dashboard is fully responsive and works seamlessly on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1280px and up)

## 🎨 Customization

### Colors & Styling

All colors and styles are defined using Tailwind CSS configuration. Modify `tailwind.config.js` to customize the color scheme and theme.

### Components

UI components are located in `src/components/ui/` and can be easily customized to match your brand guidelines.

## 📊 Pages Included

- **Dashboard** - Overview page with key metrics and charts
- **E-commerce** - Sales and product analytics
- **Tables** - Data table examples with various features
- **Forms** - Form elements and validation examples
- **Charts** - Chart component examples (bar and line charts)
- **Calendar** - Calendar integration page
- **Authentication** - Sign In and Sign Up pages
- **User Profiles** - User profile display pages
- **UI Elements** - Showcase of all available UI components
- **Blank Page** - Template for creating new pages

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options

- **Vercel** - Deploy directly from GitHub with zero configuration
- **Netlify** - Connect your GitHub repository for automatic deployments
- **Docker** - Create a Docker image for containerized deployment
- **Traditional Hosting** - Upload the `dist/` folder to any static hosting service

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support and questions, please open an issue on the project repository or contact the development team.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

For detailed documentation on specific features, components, or configurations, please refer to the inline code comments and component documentation within the project.

---

**Version:** 2.0.2  
**Last Updated:** 2026