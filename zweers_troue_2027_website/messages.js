
import { db } from './firebase.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

window.sendMessage = async function(){

let name=document.getElementById("name").value;
if(name==="") name="Anoniem";

let msg=document.getElementById("message").value;
let type=document.getElementById("type").value;

await addDoc(collection(db,"messages"),{
name:name,
message:msg,
type:type
});

alert("Boodskap gestuur!");
}
