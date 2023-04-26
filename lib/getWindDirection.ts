export default function getWindDirection(degrees: string) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    let deg = Number(degrees)
    // The number of possible directions (8) 
    const numDirections = directions.length;
    // Convert degrees to a value between 0 and 360
    deg = (deg + 360) % 360;  
    // Calculate the index of the closest direction
    const index = Math.round(deg / (360 / numDirections)) % numDirections;
    return directions[index];
}