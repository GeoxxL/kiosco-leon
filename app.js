

window.onload= inicio
//npm install -g json-server
//json-server --watch db.json
function inicio(){
    getClientes()
    getProductos()
    document.getElementById("btnPruebas").addEventListener("click",pruevas)
    document.getElementById("btnMostrarMercaderia").addEventListener("click",mostrarMercaderia)
    document.getElementById("btnAgregarMercaderia").addEventListener("click",agregarMercaderia)
    document.getElementById("btnMostrarCliente").addEventListener("click",mostrarCliente)
    document.getElementById("btnAgregarCliente").addEventListener("click",agregarCliente)
    document.getElementById("btnMostrarRegistro").addEventListener("click",mostrarRegistro)
    document.getElementById("btnVender").addEventListener("click",vender)
    mostrarMercaderia()

}

function pruevas(){
    setTimeout(()=>{a()},500);
    
    pruevaB()
    }     
function a(){alert("hola")}

const pruevaB = async () => {
    await a();
    alert("hola 2")
}
function hora(){
    let date = new Date();
let fecha = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + " : " + date.getHours()+";"+ date.getMinutes();
return fecha
}

function mostrarMercaderia(){
    document.getElementById("salidaMercaderia").innerHTML = "";
    axios({
        method: 'GET',
        url: 'http://localhost:3000/MERCADERIA'
    })
    .then( res => {
        for (item of res.data){
            document.getElementById("salidaMercaderia").innerHTML += item.enUso + " " + item.producto+": $" + item.precioVenta+" : " + item.stock+" " + "<button onclick=borrarMercaderia("+ item.id +")>Borrar</button>" + "<button onClick=modificarMercaderia("+ item.id +")>Modificar</button>" + "<br>"
        }
    })
    .catch( err=> {
        console.log(err)
    })
}

function mostrarCliente(){
    document.getElementById("salidaCliente").innerHTML = "";
    axios({
        method: 'GET',
        url: 'http://localhost:3000/CLIENTE'
    })
    .then( res => {
        for (item of res.data){
            document.getElementById("salidaCliente").innerHTML += item.enUso+ " "+item.nombre+" N: "+item.numero+" C: "+item.cuenta+" "+ "<button onclick=borrarCliente("+ item.id +")>Borrar</button>" + "<button onClick=modificarCliente("+ item.id +")>Modificar</button>" + "<br>"
        }
    })
    .catch( err=> {
        console.log(err)
    })
}

function mostrarRegistro(){
    document.getElementById("salidaRegistro").innerHTML = "";
    axios({
        method: 'GET',
        url: 'http://localhost:3000/REGISTRO'
    })
    .then( res => {
        for (item of res.data){
            document.getElementById("salidaRegistro").innerHTML += item.fecha+ "  "+ item.cliente+"  " + item.producto +"  "+ item.precioVenta+" * " + item.cantidad+" = " + item.total +" "+ "<button onClick=cancelarVenta("+ item.id +","+ item.anulada +")>"+item.anulada+"</button>" + "<br>"
        }
    })
    .catch( err=> {
        console.log(err)
    })
}
function cancelarVenta(){
    alert ("hola")
}

function agregarMercaderia(){
    if (document.getElementById("producto").value != "" && document.getElementById("precioVenta").value != "" && document.getElementById("precioCompra").value != "" && document.getElementById("stock").value != "")
    {
    axios({
          method: 'POST',
          url: 'http://localhost:3000/MERCADERIA',
          data: {
            producto: document.getElementById("producto").value,
            precioVenta: document.getElementById("precioVenta").value,
            precioCompra: document.getElementById("precioCompra").value,
            stock: document.getElementById("stock").value,
            enUso: false

          }

    })
    .then( alert("se registro correctamente"))
    .catch( err=> console.log(err))
}
else
{
    alert("no coloco los datos")
}
}
function agregarCliente(){
    if (document.getElementById("nombre").value != "" && document.getElementById("numero").value != "" && document.getElementById("cuenta").value != "")
    {
    axios({
          method: 'POST',
          url: 'http://localhost:3000/CLIENTE',
          data: {
            nombre: document.getElementById("nombre").value,
            numero: document.getElementById("numero").value,
            cuenta: document.getElementById("cuenta").value,
            enUso: false

          }

    })
    .then( alert("se registro correctamente"))
    .catch( err=> console.log(err))
}
else
{
    alert("no coloco los datos")
}
}


function borrarMercaderia(id)
{
    
    axios({
        method: 'GET',
        url: 'http://localhost:3000/MERCADERIA/?id=' + id,
        })
        .then( res=>{for (item of res.data){if (item.enUso === true){ alert("no se puede borrar porque ya hay ventas registradas");return;} }

        document.getElementById("salidaMercaderia").innerHTML = ""
        axios(
            {
                method: "DELETE",
                url:"http://localhost:3000/MERCADERIA/"+ id
            }
        )
        .then(res => alert("el dato se borro correctamente"))
        .catch(err => console.log(err))

        })

}
function borrarCliente(id)
{
    axios({
        method: 'GET',
        url: 'http://localhost:3000/CLIENTE/?id=' + id,
        })
        .then( res=>{for (item of res.data){if (item.enUso === true){ alert("no se puede borrar porque ya hay ventas registradas");return;} }

    document.getElementById("salidaCliente").innerHTML = ""
    axios(
        {
            method: "DELETE",
            url:"http://localhost:3000/CLIENTE/"+ id
        }
    )
    .then(res => alert("el dato se borro correctamente"))
    .catch(err => console.log(err))
})
}

function modificarMercaderia(id)
{
    document.getElementById("salidaMercaderia").innerHTML = ""
    if (document.getElementById("producto").value != "" && document.getElementById("precioVenta").value != "" && document.getElementById("precioCompra").value != "" && document.getElementById("stock").value != "")
    {
        axios(
            {
                method:"PUT",
                url:"http://localhost:3000/MERCADERIA/" + id,
                data:
                {
                producto: document.getElementById("producto").value,
                precioVenta: document.getElementById("precioVenta").value,
                precioCompra: document.getElementById("precioCompra").value,
                stock: document.getElementById("stock").value,
    
                }
            }
            )
            .then(alert("el dato se modifico correctamente"))
            .catch( err => console,log(err))
    }
    else
    {
        alert("no coloco los datos")
    }
}
function modificarCliente(id)
{
    document.getElementById("salidaCliente").innerHTML = ""
    if (document.getElementById("nombre").value != "" && document.getElementById("numero").value != "" && document.getElementById("cuenta").value != "")
    {
        axios(
            {
                method:"PUT",
                url:"http://localhost:3000/CLIENTE/" + id,
                data:
                {
                    nombre: document.getElementById("nombre").value,
                    numero: document.getElementById("numero").value,
                    cuenta: document.getElementById("cuenta").value,
                
    
                }
            }
            )
            .then(alert("el dato se modifico correctamente"))
            .catch( err => console,log(err))
    }
    else
    {
        alert("no coloco los datos")
    }
    
}
function getProductos(){

    axios({
        method: 'GET',
        url: 'http://localhost:3000/MERCADERIA'
    })
    .then( res => {
        for (item of res.data){
            document.getElementById("selectProducto").innerHTML += "<option value="+ item.id +">"+ item.producto +"</option>"
        }
    })
    .catch( err=> {
        console.log(err)
    })

}
function getClientes(){

    axios({
        method: 'GET',
        url: 'http://localhost:3000/CLIENTE'
    })
    .then( res => {
        document.getElementById("selectCliente").innerHTML += '<option value="-1">...</option>'
        for (item of res.data){
            document.getElementById("selectCliente").innerHTML += "<option value="+ item.id +">"+ item.nombre +"</option>"
        }
    })
    .catch( err=> {
        console.log(err)
    })

}

async function vender(){
    

    if (document.getElementById("ventaCantidad").value > 0)
    {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/MERCADERIA/?id=' + document.getElementById("selectProducto").value
        })
        .then( res=>{for (item of res.data){localStorage.setItem("precioVenta", item.precioVenta);localStorage.setItem("precioCompra", item.precioCompra); localStorage.setItem("stock", item.stock);localStorage.setItem("producto", item.producto)}
        })
        axios({
            method: 'GET',
            url: 'http://localhost:3000/CLIENTE/?id=' + document.getElementById("selectCliente").value
        })
        .then( res=>{for (item of res.data){localStorage.setItem("cuenta", item.cuenta);localStorage.setItem("nombre", item.nombre);localStorage.setItem("numero", item.numero)}

        registrarVenta()
        })

       
}
else
{
    alert("no coloco la cantidad")
}
    

}

async function registrarVenta() {
    if(localStorage.getItem("stock") < document.getElementById("ventaCantidad").value){

        alert("stock insuficiente")
    }
    else{
    let date = new Date();
    let fecha = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + ":" + date.getHours()+";"+ date.getMinutes();
    
        axios({
            method: 'POST',
            url: 'http://localhost:3000/REGISTRO',
            data: {
              fecha: fecha,
              cliente: localStorage.getItem("nombre"),
              producto: localStorage.getItem("producto"),
              precioVenta: localStorage.getItem("precioVenta"),
              cantidad: document.getElementById("ventaCantidad").value,
              total: localStorage.getItem("precioVenta") * document.getElementById("ventaCantidad").value,
              idP: document.getElementById("selectProducto").value,
              idC: document.getElementById("selectCliente").value,
              anulada: false
    
            }
    
      })
      .then( alert("se registro correctamente"))
      .catch( err=> console.log(err))

 
let producto = await axios.patch("http://localhost:3000/MERCADERIA/"+document.getElementById("selectProducto").value,{stock: localStorage.getItem("stock") - document.getElementById("ventaCantidad").value,enUso: true})
 .then(alert("producto ctualizado"))

    let cliente = await axios.patch("http://localhost:3000/CLIENTE/"+document.getElementById("selectCliente").value,{cuenta: localStorage.getItem("cuenta") - (localStorage.getItem("precioVenta") * document.getElementById("ventaCantidad").value),enUso: true})
    .then(alert("cliente actualizado"))
 
}

}

async function cancelarVenta(id, anulada){
    
    if(anulada){alert("la venta ya se anulo");return;}
    else{

        axios({
        method: 'GET',
        url: 'http://localhost:3000/REGISTRO/?id=' + id,
        })
        .then( res=>{for (item of res.data){localStorage.setItem("cantidad", item.cantidad);localStorage.setItem("total", item.total);localStorage.setItem("idP", item.idP);localStorage.setItem("idC", item.idC)}
        alert("1")
          axios({
            method: "GET",
            url: 'http://localhost:3000/MERCADERIA/?id=' + localStorage.getItem("idP"),
          })
          .then(res=>{for(item of res.data){localStorage.setItem("stock", item.stock)}
          alert("2")
        axios({
            method: 'GET',
            url: 'http://localhost:3000/CLIENTE/?id=' + localStorage.getItem("idC"),
            })
            .then( res=>{for (item of res.data){localStorage.setItem("cuenta", item.cuenta)}
            alert("3")
            devolver(id)

            
            })
            })
            })
            

    }
    }
    async function devolver(id){
       
        let anularVenta = await axios.patch("http://localhost:3000/REGISTRO/"+id,{anulada: true})
        .then(alert("registro actualizado"))

        let producto = await axios.patch("http://localhost:3000/MERCADERIA/"+ localStorage.getItem("idP"),{stock:  (parseInt(localStorage.getItem("stock")) + parseInt(localStorage.getItem("cantidad"))) })
        .then(alert("producto ctualizado"))
          
           
        let cliente = await axios.patch("http://localhost:3000/CLIENTE/"+ localStorage.getItem("idC"),{cuenta: (parseInt(localStorage.getItem("cuenta")) + parseInt(localStorage.getItem("total")))})
       .then(alert("cliente actualizado"))


  
       
    }


