"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Reviews from "@/components/reviews"
import Location from "@/components/location"
import ContactFooter from "@/components/contact-footer"
import BookingModal from "@/components/booking-modal"

export default function Page() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <main>
      <Navbar onBooking={() => setBookingOpen(true)} />
      <Hero onBooking={() => setBookingOpen(true)} />
      <Services onBooking={() => setBookingOpen(true)} />
      <Reviews />
      <Location />
      <ContactFooter onBooking={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  )
}
