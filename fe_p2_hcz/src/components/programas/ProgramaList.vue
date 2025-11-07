<script setup lang="ts">
import type { Programa } from '@/models/programa'
import http from '@/plugins/axios'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'programas'
const programa = ref<Programa[]>([])
const emit = defineEmits(['edit'])
const programaDelete = ref<Programa | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  try {
    const response = await http.get(`${ENDPOINT}?_expand=nivelAcademico`)
    programa.value = response.data
    console.log('Programas con niveles académicos:', programa.value)
    // Verificar si los niveles académicos están llegando correctamente
    programa.value.forEach((p) => {
      console.log(`Programa ${p.id} - Nivel Académico:`, p.nivelAcademico)
    })
  } catch (error) {
    console.error('Error al recuperar programas:', error)
    alert('Error al cargar la lista de programas')
  }
}

const programasFiltrados = computed(() => {
  return programa.value.filter(
    (programa) =>
      (programa.nombre ?? '').toString().toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (programa.descripcion ?? '')
        .toString()
        .toLowerCase()
        .includes(busqueda.value.toLowerCase()) ||
      (programa.nivelAcademico?.nombre ?? '')
        .toString()
        .toLowerCase()
        .includes(busqueda.value.toLowerCase()) ||
      (programa.estado ?? '').toString().toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(programa: Programa) {
  emit('edit', programa)
}

function mostrarEliminarConfirm(programa: Programa) {
  programaDelete.value = programa
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${programaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div>
      <div class="col-7 pl-0 mt-3">
        <InputGroup>
          <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
          <InputText
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre, descripcion, nivel academico o estado"
          />
        </InputGroup>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nro.</th>
            <th>Nivel Academico</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Version</th>
            <th>Duracion del Programa</th>
            <th>Costo</th>
            <th>Fecha de Inicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(programa, index) in programasFiltrados" :key="programa.id">
            <td>{{ index + 1 }}</td>
            <td>
              <span v-if="programa.nivelAcademico">{{ programa.nivelAcademico.nombre }}</span>
              <span v-else class="text-gray-500">No asignado</span>
            </td>
            <td>{{ programa.nombre }}</td>
            <td>{{ programa.descripcion }}</td>
            <td>{{ programa.version }}</td>
            <td>{{ programa.duracionMeses }} meses</td>
            <td>
              {{
                Number(programa.costo).toLocaleString('es-BO', {
                  style: 'currency',
                  currency: 'BOB',
                })
              }}
            </td>
            <td>
              {{
                new Date(programa.fechaInicio).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </td>
            <td>{{ programa.estado }}</td>
            <td>
              <Button
                icon="pi pi-pencil"
                aria-label="Editar"
                text
                @click="emitirEdicion(programa)"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Eliminar"
                severity="danger"
                text
                @click="mostrarEliminarConfirm(programa)"
              />
            </td>
          </tr>
          <tr v-if="programasFiltrados.length === 0">
            <td colspan="10">No se encontraron resultados.</td>
          </tr>
        </tbody>
      </table>
      <Dialog
        v-model:visible="mostrarConfirmDialog"
        header="Confirmar Eliminación"
        :style="{ width: '25rem' }"
      >
        <p>¿Estás seguro de que deseas eliminar este registro?</p>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            @click="mostrarConfirmDialog = false"
          />
          <Button type="button" label="Eliminar" @click="eliminar" />
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style scoped></style>
