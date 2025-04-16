<template>
    <div v-show="!isEditMode">
        <h1>user profile </h1>
    
        <img :src="image"/>
    
        <span>Name = </span><b id="name">{{ name }}</b>
        <hr />
    
        <span>email = </span><b id="email">{{ email }}</b>
        <hr />
    
        <span>hobby = </span><b id="hobby">{{ hobby }}</b>
        <hr /> 
    
        <button @click="HandleEdit()">Edit profile</button>
    
    </div>
    <div v-show="isEditMode">

       <h1>user profile</h1>

       <img :src="image"/>

        <span>Name = </span>
        <input type="text" id="input-name" v-model="name">
         <hr />

        <span>email = </span>
        <input type="text" id="input-email" v-model="email">
        <hr />

        <span>hobby = </span>
        <input type="text" id="input-hobby" v-model="hobby">
        <hr /> 

        <button @click="HandleUpdate()">Update profile</button>

     </div>
</template>
<script>
  //import { json } from "express";
import image from "./elena.jpg"
  export default { 
     name: "app",
    data() {
       return {
        image: image,
        name :"",
        email:"",
        hobby:"",
        isEditMode: false
      }
    
    },
    async created(){
       const userdata = await this.fetchUserProfile();
       this.name=userdata.name
       this.email=userdata.email
       this.hobby=userdata.hobby
       
    },
  
    methods:  {
       HandleEdit() {

        this.isEditMode = true
        
     },
      async HandleUpdate() { 
        const payload= {
            name: this.name,
            email: this.email,
            hobby: this.hobby
        }
        const resJson = await this.updateuserprofile(payload)
        console.log(resJson)

        this.isEditMode = false
   
     },
     async fetchUserProfile(){
        const res = await fetch('get-profile')
        return await res.json()
     },
     async updateuserprofile(payload){
        const res = await fetch('update-profile', {
            method: "post",
            headers:   {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'

            },
            body: JSON.stringify(payload)
        })
        return await res.json()
     }
    }
}
   
    
  
</script>
<style>
img{
    width: 400px ;

    height: 300px ;

    display: block ;

    margin-bottom:20px ;


    border: 50px;
}
div{   
    
    margin: 40px auto;
    width: 80%;
    
}
hr{
    margin-bottom: 30px;
    margin-top: 30px;
    width: 400 px;
    
    
}
body{
    background-color: rgb(40, 107, 138);
    color: rgb(28, 29, 30);
}
button{

    border-radius: 5px;
    width: 160px;
    height: 45px;
    font-size: 15px;

}
button:hover {
    cursor: pointer;
}
input{

    width: 250px;
    font-size: 15px;
    padding: 10px;
}


</style>