let store = Immutable.Map({
    user: { name: "Lujain" },
    apod:'',
    rovers: ['Curiosity', 'Opportunity', 'Spirit','Perseverance'],
});
// add our markup to the page
const root = document.getElementById('root')

const updateStore = (s, newState) => {
    store = store.set(s,newState)
    console.log(store.get('apod').latest_photos[0].rover.name)
        render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const allrovers= ()=>{
    return  (rover) =>
    `<button onclick = getAnyRover("${rover}")>
         ${rover}
        </button>`
}

// this is Higher-Order Function #1
const roversButton =() =>{
    return store.get("rovers").map(allrovers()).join("");
}
const info =()=> {
    if(store.get('apod'))
   return `<p> <span class=t>Rover Name:   </span> ${store.get('apod').latest_photos[0].rover.name}</p><br>
    <p> <span class=t>Launch Date:  </span>${store.get('apod').latest_photos[0].rover.launch_date}</p><br>
    <p> <span class=t>Landing Date: </span>${store.get('apod').latest_photos[0].rover.landing_date}</p><br>
    <p> <span class=t>Rover Status:  </span>${store.get('apod').latest_photos[0].rover.status}</p><br>
    <p> <span class=t>Rover Photo :  </span> </p><br>  <div class=container><img alt ="${store.get('apod').latest_photos[0].rover.name}" class="image" src="${ store.get('apod').latest_photos[0].img_src}"></div>

                `;
                return `choose a rover to display information about it`
}


// create content
//this is Higher-Order Function #2
const App = () => {
    //let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.get("user").name)}
            <span></span>
            <section>
            <span></span>
                <p> ${roversButton()}     </p>
                <span></span>
                    <p>  ${info()}     </p>
               
            </section>
        </main>
        <footer></footer>
    `
}


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
     console.log('This is the event listener with second render' + store)
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${store.get("user").name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

const getAnyRover = (rover) => {
    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())
        .then(apod => updateStore('apod', apod));
     
};

