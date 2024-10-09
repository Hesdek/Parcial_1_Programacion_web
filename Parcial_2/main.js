async function getData(endpoint){
    try{
        const response = await axios.get(endpoint);
        const data = response.data;
        return data;
    } catch(error){
        console.error(`fallo la peticion: ${error}`);
    }
}

(async() => {
    try{
        const datos = await getData('https://reqres.in/api/users?page=2');
        const data = datos.data;
        const main = document.querySelector("main");
        const contenedor = document.createElement("div");
        contenedor.setAttribute("class", "container");

        main.appendChild(contenedor);
    }catch(error){
        console.error(`fallo al obtener los datos: ${error}`);
    }
})();