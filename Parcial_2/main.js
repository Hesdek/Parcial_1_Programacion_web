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
        const datos = await getData('https://bbd7-2800-e2-2780-2479-2417-fe6c-d24e-ecb3.ngrok-free.app/users');
    
    }catch(error){
        console.error(`fallo al obtener los datos: ${error}`);
    }
    })();