import { addObserver, appState, dispatch } from "../../store/store";
import { getProducts } from "../../service/getProducts"
import { getProductsState } from "../../store/actions";
import TaskForm, { Attribute as TaskFormAttribute } from "../ProductForm/ProductForm";
import Product, { Attribute as ProductAttribute } from "../ProductItem/ProductItem";

class Productlist extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this)
    }

    async connectedCallback() {

        if (appState.products === undefined || appState.products.length === 0) {
            const action = await getProductsState()
            dispatch(action);
            // console.log('products state', appState.products);
            this.render();
        } else {
            // console.log('products lleno');
            
        }
        this.render();
    }

    fetchProducts() {
        try {
            const container = this.ownerDocument.createElement('section');
            container.className = 'products-container';

            appState.products.forEach((product: any) => {
                const productComponent = this.ownerDocument.createElement('product-component') as Product;
                productComponent.setAttribute(ProductAttribute.uid, product.id.toString());
                productComponent.setAttribute(ProductAttribute.image, product.image);
                productComponent.setAttribute(ProductAttribute.description, product.title);
                productComponent.setAttribute(ProductAttribute.category, product.category);
                productComponent.setAttribute(ProductAttribute.price, product.price.toString());
                productComponent.setAttribute(ProductAttribute.rating, product.rating.rate.toString());

                container.appendChild(productComponent);
            });

            return container;
        } catch (error) {
            console.error("Error fetching products:", error);
            return null;
        }
    }

    renderTaskForm() {
        const taskForm = this.ownerDocument.createElement('task-form') as TaskForm;
        const newTaskId = new Date().getTime();
    
        taskForm.setAttribute(TaskFormAttribute.uid, newTaskId.toString());
        taskForm.setAttribute(TaskFormAttribute.utitle, '');
        taskForm.setAttribute(TaskFormAttribute.description, '');
    
        return taskForm;
      }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .dashboard {
                        display: flex;
                        justify-content: space-between;
                    }
                    .products-container, .cart-container {
                        width: 45%;
                        padding: 10px;
                    }
                </style>
                <div class="dashboard">
                    <section class="products-container">Loading products...</section>
                </div>
            `;

            // Render product list
            const productsContainer =  this.fetchProducts();
            if (productsContainer) {
                const productsSection = this.shadowRoot.querySelector('.products-container');
                if (productsSection) productsSection.replaceWith(productsContainer);
            } else {
                this.shadowRoot.querySelector('.products-container')!.innerHTML = `<p>Error loading products</p>`;
            }

            const mainContainer = this.ownerDocument.createElement('section');
            mainContainer.className = 'form-container';
            const taskForm = this.renderTaskForm();
            mainContainer.appendChild(taskForm);
            this.shadowRoot.appendChild(mainContainer);
        }
    }
}

customElements.define('app-list', Productlist);
export default Productlist;