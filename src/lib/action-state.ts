// Plain types/values shared between server actions and the client forms that
// call them. A "use server" file may only export async functions, so this
// data lives here instead of alongside createBooking/submitContact.

export interface BookingActionState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
}

export const initialBookingState: BookingActionState = {
  status: "idle",
  message: "",
};

export interface ContactActionState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
}

export const initialContactState: ContactActionState = {
  status: "idle",
  message: "",
};
