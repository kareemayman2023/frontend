import { useState, useEffect } from 'react'

interface CalendarDay {
  day: string
  date: number
  fullDate: string // now a formatted date string
  dayName: string
}

const useNext7Days = (): CalendarDay[] => {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

  useEffect(() => {
    const getNext7Days = (): CalendarDay[] => {
      const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      const today = new Date()
      const nextDays: CalendarDay[] = []

      for (let i = 0; i < 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)

        const formatted = date.toISOString().split('T')[0]

        nextDays.push({
          day: dayNames[date.getDay()],
          date: date.getDate(),
          fullDate: formatted,
          dayName: dayNames[date.getDay()],
        })
      }

      return nextDays
    }

    setCalendarDays(getNext7Days())
  }, [])

  return calendarDays
}

export default useNext7Days
