// import { addObserver, appState } from "../store/store";
// import  Productlist  from "../components/Productlist/Productlist"
// import "../components/Productlist/Productlist"

// class Dashboard extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//         addObserver(this);
//     }

//     connectedCallback() {
//         this.render();
//         console.log(appState.product);
//     }

//     render() {
//         if (this.shadowRoot) {
//             this.shadowRoot.innerHTML = `
//             <app-list></app-list>
//             `;
//         }
//     }
// }

// customElements.define('app-dashboard', Dashboard);
// export default Dashboard;