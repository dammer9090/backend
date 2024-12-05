 

 async function  clubCreateHandler(event){
  try{
    event.preventDefault();
  
   
     
    const formData = new FormData(event.target);

    const response = await fetch("http://localhost:4000/createClub", {
      method: "POST",
      body: formData,
    });

    if(!response.ok)
      throw new Error(error.message);
    

    const data = await response.json();

    console.log(data);

    window.location.href = '/';


       

  }catch(e){ 
    console.error("Error in creating club:", e.message);
  }
 }

 async function deleteClub(id){
  try{
    console.log(id)
      const response = await fetch(`http://localhost:4000/deleteClub/${id}`,{
          method: 'DELETE'
        })

        const data = await response.json();
        
        console.log(data)

        window.location.reload();
  }catch(error){
    console.log('failed to delete club',error)
  }
 }


 function updateClub(id){
  localStorage.setItem('clubId',id);
  window.location.href = `updateClub`;

 }


 async function clubUpdateHandler(event){
  try{
    event.preventDefault();
    const id = localStorage.getItem('clubId');
    console.log(id)
     
    const formData = new FormData(event.target);

    const response = await fetch(`http://localhost:4000/updateClub/${id}`, {
      method:"PUT",
      body:formData
    })

    const data = await response.json();


    console.log(data);

    window.location.href = '/';

  }catch(err){
    console.log('failed to update club',err)
  }
 }
 
      