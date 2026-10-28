export interface Provider {
  id: string;
  providerId?: string;
  name: string;
  category?: string;
  serviceCategory?: string;
  companyId?: string;
  company?: string;
  district?: string;
  town?: string;
  location?: string;
  pricePerHour?: number | string;
  hourlyRate?: number | string;
  price?: number | string;
  profileImage?: string;
  image?: string;
  avatar?: string;
  status?: string;
  active?: boolean | string;
  availability?: string;
  verified?: boolean | string;
  description?: string;
  services?: string;
  phone?: string;
  contact?: string;
  [key: string]: any;
}

export interface Company {
  id: string;
  companyId?: string;
  name: string;
  companyName?: string;
  category?: string;
  serviceCategory?: string;
  services?: string;
  district?: string;
  town?: string;
  location?: string;
  logo?: string;
  image?: string;
  status?: string;
  [key: string]: any;
}

export interface Booking {
  id: string;
  bookingId?: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  serviceRequest?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  status?: string;
  paymentStatus?: string;
  payment?: string;
  [key: string]: any;
}

export interface ServiceCategory {
  id?: string;
  name: string;
  icon?: string;
  count?: number;
}
