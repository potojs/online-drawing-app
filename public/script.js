function joinRoom(room) {
  if(room){
    location.pathname = `/room/${room}`
  }else{
    alert("plz enter a room id")
  }
}
document.querySelector("button").addEventListener("click", ()=>{
  joinRoom(document.querySelector("input").value);
})
document.querySelector("input").addEventListener("keypress", e=>{
  if(e.keyCode === 13){
    joinRoom(e.target.value);
  }
})