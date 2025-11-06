<script setup lang="ts">
import http from '@/plugins/axios'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import { computed, ref, watch } from 'vue'
import { DatePicker } from 'primevue'
import type { Programa } from '@/models/programa'
import type { NivelAcademico } from '@/models/nivelAcademico'

const ENDPOINT = 'programas'
const props = defineProps({
  mostrar: Boolean,
  programa: {
    type: Object as () => Programa,
    default: () => ({}) as Programa,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const nivelAcademico = ref<NivelAcademico[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const programa = ref<Programa>({ ...props.programa })
const estado = ['En Planificación', 'En curso', 'Finalizado']

async function obtenerNivelAcademico() {
  nivelAcademico.value = await http.get('niveles-academicos').then((response) => response.data)
}
watch(
  () => props.mostrar,
  async (nuevoValor) => {
    if (nuevoValor) {
      await obtenerNivelAcademico()
      console.log('Niveles académicos cargados:', nivelAcademico.value)

      if (props.programa?.id) {
        try {
          // Obtener el programa actualizado del servidor
          const response = await http.get(`${ENDPOINT}/${props.programa.id}`)
          const programaActualizado = response.data

          programa.value = {
            ...programaActualizado,
            idNivelAcademico: programaActualizado.nivelAcademico?.id ?? 0,
            fechaInicio: new Date(programaActualizado.fechaInicio),
            estado:
              estado.find(
                (e) => e.toLowerCase() === (programaActualizado.estado?.toLowerCase() ?? ''),
              ) ?? '',
          }
          console.log('Programa cargado para edición:', programa.value)
        } catch (error) {
          console.error('Error al cargar el programa para editar:', error)
          alert('Error al cargar los datos del programa')
        }
      } else {
        programa.value = {
          idNivelAcademico: 0,
          nombre: '',
          descripcion: '',
          version: 0,
          duracionMeses: 0,
          costo: 0,
          fechaInicio: new Date(),
          estado: '',
        } as Programa
      }
    }
  },
)

async function handleSave() {
  try {
    const body = {
      idNivelAcademico: programa.value.idNivelAcademico,
      nombre: programa.value.nombre,
      descripcion: programa.value.descripcion,
      version: programa.value.version,
      duracionMeses: programa.value.duracionMeses,
      costo: programa.value.costo,
      fechaInicio: programa.value.fechaInicio.toISOString(),
      estado: programa.value.estado,
    }
    console.log('Datos que envío:', body)
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${programa.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    programa.value = {} as Programa
    dialogVisible.value = false
  } catch (error) {
    console.error('Error guardando programa:', error)
    alert('Error al guardar el programa. Revisa la consola para más detalles.')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Programa'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nivelAcademico" class="font-semibold w-3">Nivel Academico</label>
        <Select
          id="nivelAcademico"
          v-model="programa.idNivelAcademico"
          :options="nivelAcademico"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText id="nombre" v-model="programa.nombre" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripcion</label>
        <Textarea
          id="descripcion"
          v-model="programa.descripcion"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="version" class="font-semibold w-3">Version</label>
        <InputNumber
          id="version"
          v-model.number="programa.version"
          class="flex-auto"
          autocomplete="off"
          type="number"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracionMeses" class="font-semibold w-3">Duracion en Meses</label>
        <InputNumber
          id="duracionMeses"
          v-model="programa.duracionMeses"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="costo" class="font-semibold w-3">Costo</label>
        <InputNumber id="costo" v-model="programa.costo" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fechaInicio" class="font-semibold w-3">Fecha de Inicio</label>
        <DatePicker
          id="fechaInicio"
          v-model="programa.fechaInicio"
          class="flex-auto"
          date-format="yy-mm-dd"
          show-icon
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-3">Estado</label>
        <Select
          id="estado"
          v-model="programa.estado"
          :options="estado"
          placeholder="Seleccionar estado"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
