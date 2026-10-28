import { z } from "zod";

export const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  providerId: z.string().min(1, "Provider ID is required"),
  serviceRequest: z.string().optional(),
  message: z.string().optional(),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  duration: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
