import type { Persona, Item } from './types'
import { calcularTotales } from './calculos'

interface Props {
  personas: Persona[]
  items: Item[]
}

function Resumen({ personas, items }: Props) {
  const totales = calcularTotales(personas, items)
  const totalCuenta = items.reduce((suma, i) => suma + i.precio, 0)
  const sinAsignar = items
  .filter((i) => i.consumidores.length === 0)
  .reduce((suma, i) => suma + i.precio, 0)

  return (
    <div>
      <h2>Cuánto paga cada uno</h2>
      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            {p.nombre}: ${totales[p.id].toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total de la cuenta: ${totalCuenta.toFixed(2)}</p>
      {sinAsignar > 0 && (
  <p>Sin asignar: ${sinAsignar.toFixed(2)}</p>
)}
    </div>
  )
}

export default Resumen