import type { Persona, Item } from './types'

export function calcularTotales(personas: Persona[], items: Item[]): Record<number, number> {
  const totales: Record<number, number> = {}

  for (const persona of personas) {
    totales[persona.id] = 0
  }

  for (const item of items) {
    if (item.consumidores.length === 0) continue

    const parte = item.precio / item.consumidores.length

    for (const idPersona of item.consumidores) {
      totales[idPersona] += parte
    }
  }

  return totales
}