
// Simple CSV converter
export function objectToCsv(itemsArray) {
    const csvString = [
      [
        "id",
        "forename",
        "surname"
      ],
      ...itemsArray.map(item => [
        item.id,
        item.forename,
        item.surname
      ])
    ]
     .map(e => e.join(",")) 
     .join("\n");
    return csvString
}
