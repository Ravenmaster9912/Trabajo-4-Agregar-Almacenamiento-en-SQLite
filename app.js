const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
      alert('Por favor, ingresa una descripción para la tarea');
      return;
    }
  
    const response = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion }),
    });
  
    const tarea = await response.json();
    agregarTareaALista(tarea);
    document.querySelector('#nuevaTarea').value = '';
  };
  
  const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
  };
  
  const eliminarTarea = async (id) => {
    await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
    document.querySelector(`#tarea-${id}`).remove();
  };
  
  const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');
    const li = document.createElement('li');
    li.id = `tarea-${tarea.id}`;
    li.innerHTML = `
      ${tarea.descripcion}
      <button class="delete-btn" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  };
  
  document.addEventListener('DOMContentLoaded', obtenerTareas);
  