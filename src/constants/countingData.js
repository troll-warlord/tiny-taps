// Objects pool - add more entries here to increase variety.
const OBJECTS = [
  { name: 'Ball', emoji: '⚽' },
  { name: 'Star', emoji: '⭐' },
  { name: 'Heart', emoji: '❤️' },
  { name: 'Apple', emoji: '🍎' },
  { name: 'Flower', emoji: '🌸' },
  { name: 'Sun', emoji: '☀️' },
  { name: 'Moon', emoji: '🌙' },
  { name: 'Balloon', emoji: '🎈' },
  { name: 'Diamond', emoji: '💎' },
  { name: 'Butterfly', emoji: '🦋' },
]

// Questions 1–10, each pairing a unique count with a unique object.
export const COUNTING_QUESTIONS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  count: i + 1,
  object: OBJECTS[i],
}))
