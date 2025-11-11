
var users = [
    {
      "id": 1,
      "forename": "Pepe",
      "surname": "Fielding"
    },
    {
      "id": 2,
      "forename": "Tim",
      "surname": "Berners-Lee"
    }
  ]

export function getUsers () {
    // replace with actual database query
    return users
}

export function getUserById ( id ) {
  // replace with actual database query
  return users.find(item => item.id === id)
}

export function createUser( newData ) {
    // find next id (auto-increment simulation)
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  
    const newId = { id: nextId }
    const newUser = { ...newId, ...newData }
  
    // "insert" to simulated database
    users.push( newUser )
  
    // return the new user (like an INSERT returning its row)
    return newUser
  }
  
export function updateUser( id, data ) {
  let existing = getUserById( id )
  if (existing) { // merge data to existing object in the users array
    for ( const [ key, value ] of Object.entries( data ))
      existing[ key ] = value
  } else { // add new user to users array
    const newuser = { id: id, ...data }
    users.push( newuser )
  }
}