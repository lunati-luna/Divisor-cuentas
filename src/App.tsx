import { useState } from 'react'
import type { Persona, Item } from './types'
import FormularioItem from './FormularioItem'
import Resumen from './Resumen'

function App() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nombre, setNombre] = useState('')
  const [items, setItems] = useState<Item[]>([])

  function agregarPersona() {
    if (nombre.trim() === '') return
    const nueva: Persona = { id: Date.now(), nombre: nombre.trim() }
    setPersonas([...personas, nueva])
    setNombre('')
  }

  function agregarItem(item: Item) {
    setItems([...items, item])

  }

  function borrarItem(id: number) {
  setItems(items.filter((i) => i.id !== id))
  }

  function borrarPersona(id: number) {
  setPersonas(personas.filter((p) => p.id !== id))
  setItems(
    items.map((i) => ({
      ...i,
      consumidores: i.consumidores.filter((c) => c !== id),
    }))
  )
  }
  

  return (
    <div>
      <h1>Divisor de cuentas</h1>

      <h2>Personas</h2>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <button onClick={agregarPersona}>Agregar</button>

      <ul>
  {personas.map((p) => (
    <li key={p.id}>
      {p.nombre}
      <button onClick={() => borrarPersona(p.id)}>Borrar</button>
    </li>
  ))}
</ul>

      <FormularioItem personas={personas} onAgregar={agregarItem} />

      <h2>Items</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.nombre} - ${i.precio} (
            {personas
              .filter((p) => i.consumidores.includes(p.id))
              .map((p) => p.nombre)
              .join(', ')}
            )
            
            <button onClick={() => borrarItem(i.id)}>Borrar</button>
          </li>
        ))}
      </ul>
      <Resumen personas={personas} items={items} />
    </div>
  )
}

export default App