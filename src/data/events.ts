export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-22', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Career talk', date: '2026-10-29', place: 'Hall A', seats: 50 },
  { id: 3, title: 'Hackathon kickoff', date: '2026-11-05', place: 'Lab 101', seats: 30 },
  { id: 4, title: 'Board games evening', date: '2026-11-12', place: 'Room 210', seats: 3 },
]