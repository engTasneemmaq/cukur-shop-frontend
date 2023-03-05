export function setItem(key,value){
    sessionStorage.setItem(key, JSON.stringify(value));

}

export function  getItem(key){
  return  JSON.parse(sessionStorage.getItem(key))
}

export function  removeItem(key){
  return  sessionStorage.removeItem(key)
}