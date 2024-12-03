"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { fetchEventById, type Event } from "@/lib/api"
import Loader from "@/components/ui/loader"

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventById(params.id)
      .then((data) => {
        setEvent(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching event:", error)
        setLoading(false)
      })
  }, [params.id])

  if (loading) return <Loader />
  if (!event) return <div className="p-4">Мероприятие не найдено</div>

  return (
    <div className="container mx-auto p-4 bg-transparent">
      <div className="max-w-2xl mx-auto">
        <div className="relative w-full h-64 mb-6">
          <Image
            src={event.image ?? "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover rounded-xl"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        
        {event.price && (
          <div className="mb-4">
            <span className="font-semibold">Цена: </span>
            <span>{event.price}</span>
          </div>
        )}
        
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>
        
        
      </div>
    </div>
  )
} 