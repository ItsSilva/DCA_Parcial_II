import { dispatch } from "../../store/store";
import { addTask } from "../../store/actions";

export enum Attribute {
    'uid' = "uid",
    'utitle' = "utitle",
    'description' = "description"
}

class ProductForm extends HTMLElement {
    uid?: number;
    utitle?: string;
    description?: string;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.uid) {
            this[propName] = newValue ? Number(newValue) : undefined;
        } else {
            this[propName] = newValue;
        }
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section>
                <h1>Task Form</h1>
                <form class="form">
                    <input type="text" id="title" placeholder="Title of your task" required>
                    <input type="text" id="description" placeholder="Description of your task" required>
                    <button class="add-btn">Add Task</button>
                </form>
                <div class='container'></div>
            </section>
            `;
        }

        const titleInput = this.shadowRoot?.querySelector<HTMLInputElement>('#title');
        const descriptionInput = this.shadowRoot?.querySelector<HTMLInputElement>('#description');
        const addBtn = this.shadowRoot?.querySelector('.add-btn');

        addBtn?.addEventListener('click', (e) => {
            e.preventDefault();

            const title = titleInput?.value || '';
            const description = descriptionInput?.value || '';

            if (title && description) {
                dispatch(addTask({ utitle: title, description: description }));
                
                // Clear the form fields after dispatching
                if (titleInput) titleInput.value = '';
                if (descriptionInput) descriptionInput.value = '';
            } else {
                console.error('Title and description are required to add a task');
            }
        });
    }
}

customElements.define('task-form', ProductForm);
export default ProductForm;