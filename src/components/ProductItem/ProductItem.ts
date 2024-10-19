import { appState, dispatch } from "../../store/store";
import { removeFromCart } from "../../store/actions"

export enum Attribute {
    'uid' = 'uid',
    'image' = 'image',
    'description' = 'description',
    'category' = 'category',
    'price' = 'price',
    'rating' = 'rating',
}

class Product extends HTMLElement {
    uid?: number;
    image?: string;
    description?: string;
    category?: string;
    price?: number;
    rating?: number;

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.price || propName === Attribute.rating ||  propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <style>
        .product-card {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            width: 200px;
            text-align: center;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    .product-card img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }

        .product-card h2 {
            font-size: 1.2em;
            margin: 10px 0;
        }

        .product-card p {
            margin: 5px 0;
        }

        .product-card button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .product-card button:hover {
            background-color: #0056b3;
        }
        </style>


            <div class="product-card">
                <h2>${this.description || 'No description'}</h2>
                <img src="${this.image || ''}" alt="${this.description || ''}" />
                <p>Category: ${this.category || 'N/A'}</p>
                <p>Price: ${this.price ? `$${this.price}` : 'N/A'}</p>
                <p>Rating: ${this.rating ? `${this.rating}/5` : 'No rating'}</p>
                <button class="remove-btn">Remove</button>
            </div>
        `
        const removeBtn = this.shadowRoot.querySelector('.remove-btn');
        removeBtn?.addEventListener('click', () => {
            dispatch(removeFromCart(this.uid));
            console.log(appState.item);
            
        });;
    }
}


customElements.define('product-component', Product);
export default Product;