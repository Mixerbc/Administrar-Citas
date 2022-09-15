const mascotaInput = document.querySelector("#mascota")
const propietarioInput  = document.querySelector("#propietario")
const telefonoInput  = document.querySelector("#telefono")
const fechaInput  = document.querySelector("#fecha")
const horaInput  = document.querySelector("#hora")
const sintomasInput  = document.querySelector("#sintomas")

const formulario = document.querySelector("#nueva-cita")
const contenedorCitas = document.querySelector("#citas")
 Eventos()
function Eventos(){

    mascota.addEventListener("input",datosCita);
    propietarioInput.addEventListener("input",datosCita)
    telefonoInput.addEventListener("input",datosCita);
    fechaInput.addEventListener("input",datosCita);
    horaInput.addEventListener("input",datosCita);
    sintomasInput.addEventListener("input",datosCita);
    
    formulario.addEventListener("submit", nuevaCita)



}

let editando;

class UI {
    
    imprimirAlerta(mensaje,tipo){

     const  divMensaje = document.createElement("div")
     divMensaje.classList.add("text-center","alert","d-block","col-12")
     
     if(tipo === "error"){
        divMensaje.classList.add("alert-danger")
     }
     else{


     divMensaje.classList.add("alert-success")
     }
     divMensaje.textContent = mensaje

     document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"))

     setTimeout(()=>{

        divMensaje.remove()

     },4000)

    }

    imprimirCita({citas}){

        this.limpiarHTML()


        citas.forEach( cita => {

            const {mascota,propietario,telefono,fecha,hora,sintomas,id } = cita

             const divCita  = document.createElement("div")
             divCita.classList.add("cita","p-3")
             divCita.dataset.id = id


             const mascostaDiv = document.createElement("h2")
             mascostaDiv.classList.add("card-title","font-weight-bolder")
             mascostaDiv.textContent = mascota

            
             const propietarioDiv = document.createElement("p")
             propietarioDiv.innerHTML = `

             <span class="font-weight-bolder">Propietario: </span>${propietario}
             
             `;

            const telefonoDiv = document.createElement("p")
             telefonoDiv.innerHTML = `

             <span class="font-weight-bolder">Telefono: </span>${telefono}
             
             `;
             const fechaDiv = document.createElement("p")
             fechaDiv.innerHTML = `

             <span class="font-weight-bolder">Fecha: </span>${fecha}
             
             `;
             const horaDiv = document.createElement("p")
             horaDiv.innerHTML = `

             <span class="font-weight-bolder">Hora: </span>${hora}
             
             `;
             const sintomasDiv = document.createElement("p")
             sintomasDiv.innerHTML = `

             <span class="font-weight-bolder">Sintomas: </span>${sintomas}
             
             `;

             const btnEliminar = document.createElement("button")
             btnEliminar.classList.add("btn","btn-danger","mr-2")
             btnEliminar.innerHTML = "Eliminar"

             const btnEditar = document.createElement("button")
             btnEditar.classList.add("btn","btn-info","mr-2")
             btnEditar.innerHTML = "Editar"



             divCita.appendChild(mascostaDiv)
             divCita.appendChild(propietarioDiv)
             divCita.appendChild(telefonoDiv)
             divCita.appendChild(fechaDiv)
             divCita.appendChild(horaDiv)
             divCita.appendChild(sintomasDiv)
             divCita.appendChild(btnEliminar)
             divCita.appendChild(btnEditar)


             contenedorCitas.appendChild(divCita)

             
             btnEliminar.onclick = () => eliminarCita(id)
             btnEditar.onclick = () => editarCita(cita)
        });

         }
        limpiarHTML(){
            while(contenedorCitas.firstChild){
                contenedorCitas.removeChild(contenedorCitas.firstChild)
            }

            
        }


}

class Citas {
    constructor(){

        this.citas = []
    }

    agregarCitas(cita){
        this.citas = [...this.citas,cita]


    }
    eliminarCita(id){
        
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    RenovarCita(citaActualizada){
        
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada: cita)

    }

}

const ui = new UI()
const  AdministrarCitas = new Citas()

const citaObjeto = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora:"",
    sintomas: ""
}

function datosCita(e){
 citaObjeto[e.target.name] = e.target.value
 

}

 function nuevaCita(e){
    e.preventDefault()

    const {mascota,propietario,telefono,fecha,hora,sintomas } = citaObjeto

    if(mascota === "" || propietario === "" || telefono === "" || fecha === "" || hora === "" || sintomas === ""){

        ui.imprimirAlerta("Todos los campos son obligatorios","error")

        return
    }
     if(editando){


        AdministrarCitas.RenovarCita({...citaObjeto})


        ui.imprimirAlerta("Editado correctamente")
        formulario.querySelector("button[type='submit']").textContent="Crear cita"
        formulario.querySelector("button[type='submit']").classList.remove("btn-info")
        formulario.querySelector("button[type='submit']").classList.add("btn-success")

        editando = false


        
     }
     else{

        ui.imprimirAlerta("Se agrego correctamente")
     citaObjeto.id = Date.now();

    AdministrarCitas.agregarCitas({...citaObjeto})
     }

    

    formulario.reset()

    limpiarCitas()
    
    ui.imprimirCita(AdministrarCitas)

    

    

    



}

function limpiarCitas(){
    citaObjeto.mascota = ""
    citaObjeto.propietario = ""
    citaObjeto.telefono = ""
    citaObjeto.fecha = ""
    citaObjeto.sintomas= ""
    citaObjeto.hora = ""
}
function eliminarCita(id){
    

    AdministrarCitas.eliminarCita(id)
    ui.imprimirAlerta("La  cita se elimino correctamente")
    ui.imprimirCita(AdministrarCitas)

   

}
 function editarCita(cita){

    const {mascota,propietario,telefono,fecha,hora,sintomas,id } = cita
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value  = hora
    sintomasInput.value = sintomas



    citaObjeto.mascota = mascota
    citaObjeto.propietario = propietario
    citaObjeto.telefono = telefono
    citaObjeto.fecha = fecha
    citaObjeto.hora = hora
    citaObjeto.sintomas = sintomas
    citaObjeto.id = id

    formulario.querySelector("button[type='submit']").textContent="Guardar Datos"
    formulario.querySelector("button[type='submit']").classList.remove("btn-success")
    formulario.querySelector("button[type='submit']").classList.add("btn-info")

    editando = true
    


 }
