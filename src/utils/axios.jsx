import axios from 'axios';

// Base url to make requests to the movies directories
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// what does this mean is that its basically append 
// instance.get('/evangadi-group1') to what is in line 6

export default instance;