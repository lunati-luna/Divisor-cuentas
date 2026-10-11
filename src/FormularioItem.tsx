import { useState } from 'react'
import type { Persona, Item } from './types'

interface Props { // Props: son los datos que un componente recibe de quien lo usa, como los parámetros de una función.
  personas: Persona[]
  onAgregar: (item: Item) => void
}

function FormularioItem({ personas, onAgregar }: Props) {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [seleccionados, setSeleccionados] = useState<number[]>([])

  function alternar(id: number) {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((s) => s !== id))
    } else {
      setSeleccionados([...seleccionados, id])
    }
  }

  function agregar() {
    const precioNumero = parseFloat(precio)
    if (nombre.trim() === '' || isNaN(precioNumero) || seleccionados.length === 0) return

    onAgregar({
      id: Date.now(),
      nombre: nombre.trim(),
      precio: precioNumero,
      consumidores: seleccionados,
    })

    setNombre('')
    setPrecio('')
    setSeleccionados([])
  }

  return (
    <div>
      <h2>Agregar item</h2>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Item (ej: pizza)"
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
      />

      <p>¿Quién lo consumió?</p>
      {personas.map((p) => (
        <label key={p.id}>
          <input
            type="checkbox"
            checked={seleccionados.includes(p.id)}
            onChange={() => alternar(p.id)}
          />
          {p.nombre}
        </label>
      ))}

      <button onClick={agregar}>Agregar item</button>
    </div>
  )
}

export default FormularioItem