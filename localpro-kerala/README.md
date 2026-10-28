# LocalPro Kerala

A complete, responsive Next.js service marketplace that helps customers find trusted local service providers across Kerala, India.

## Tech Stack

- [Next.js 14](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Zod](https://zod.dev/) for validation
- [Google Apps Script](https://developers.google.com/apps-script) as REST API
- [Google Sheets](https://www.google.com/sheets/about/) as database

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and add your Google Apps Script URL:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Set Up Google Apps Script Backend

1. Open the [Google Sheet](https://docs.google.com/spreadsheets/d/1IICtQpRRfL-NWHamt-P5FRLk5jFYqfNzSvtKdZLONdo/edit)
2. Go to Extensions > Apps Script
3. Copy the code from `apps-script/Code.gs` into the Apps Script editor
4. Deploy as Web App:
   - Click Deploy > New deployment
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
5. Copy the deployment URL and add it to `.env.local`

### 4. Prepare Google Sheets

The spreadsheet may contain tabs for:
- `Providers` - Service provider information
- `Companies` - Company/agency information  
- `Bookings` - Booking records
- `Categories` - Service categories (optional)

Inspect your actual sheet headers as the code maps them dynamically. The API normalizes headers to camelCase/lowercase.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/                    # Next.js App Router pages
├── page.tsx           # Homepage
├── services/          # Service search
├── providers/         # Provider directory and details
├── companies/         # Companies directory
├── book/              # Booking form
├── bookings/          # Booking history
└── admin/             # Admin dashboard

components/            # Reusable React components
├── layout/           # Navbar, Footer
└── ui/               # UI components

lib/                   # Utilities and helpers
├── api/              # API client
├── types/            # TypeScript types
└── validation/       # Zod schemas

apps-script/           # Google Apps Script backend
└── Code.gs
```

## Features

- **Homepage**: Hero section with search, service categories, trust indicators
- **Service Search**: Filter providers by category, location, with responsive cards
- **Provider Directory**: Table view (desktop) and card view (mobile)
- **Provider Details**: Dynamic provider profiles with booking functionality
- **Companies Directory**: Browse service companies
- **Booking System**: Create bookings with form validation
- **Booking History**: View and track bookings
- **Admin Dashboard**: Manage providers, companies, and bookings (requires auth setup)

## API Endpoints (Apps Script)

- `?action=getProviders` - Fetch all providers
- `?action=getProviderById&id=XXX` - Fetch single provider
- `?action=getCompanies` - Fetch all companies
- `?action=getCompanyById&id=XXX` - Fetch single company
- `?action=getBookings` - Fetch bookings
- `?action=getCategories` - Fetch categories
- `?action=health` - Health check
- `POST` with `action=createBooking` - Create booking
- `POST` with `action=updateBookingStatus` - Update booking status
- `POST` with `action=updateProviderStatus` - Update provider status

## Notes

- The app uses real API calls to Google Apps Script. If not configured, pages show empty states.
- Admin routes require proper authentication - do not expose publicly without authorization.
- Never commit secrets or API keys to version control.
- Customer phone numbers and booking messages are not exposed publicly in listings.
- Mock data mode is not enabled by default.

## Design Reference

The UI is inspired by the Stitch designs in `stitch_local_service_directory_dashboard/` with Kerala Services Portal styling adapted to LocalPro Kerala branding.
