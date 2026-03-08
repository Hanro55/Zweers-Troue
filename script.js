
import { db, storage } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

const gallery = document.getElementById("gallery");

async function loadPhotos(){

const querySnapshot = await getDocs(collection(db,"photos"));

gallery.innerHTML="";

querySnapshot.forEach((doc)=>{

const data=doc.data();

let div=document.createElement("div");
div.innerHTML=`
<h4>${data.name}</h4>
<img src="${data.url}">
`;

gallery.appendChild(div);

});

}

window.uploadPhoto = async function(){

let name=document.getElementById("name").value;
if(name==="") name="Anoniem";

let file=document.getElementById("photo").files[0];

let storageRef=ref(storage,"photos/"+Date.now()+file.name);

await uploadBytes(storageRef,file);

let url=await getDownloadURL(storageRef);

await addDoc(collection(db,"photos"),{
name:name,
url:url,
date:new Date()
});

loadPhotos();

}

loadPhotos();
