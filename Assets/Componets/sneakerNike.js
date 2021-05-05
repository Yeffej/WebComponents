class SneakerNike extends HTMLElement {
    constructor() {
        super()

        this.initializeAttr()
        this.attachShadow({mode: "open"})
    }
    initializeAttr() {
        this.productTitle = "";
        this.img = "";
        this.semiTitle = "";
        this.price = "";
        this.brand = "";
    }
    getFormattedPrice() {
        return `$${this.price}`;
    }
    createTemplate() {
        const template = document.createElement("template")
        template.innerHTML=`
        <section class="product">
            <article class="product__info">
                <h1>${this.productTitle}</h1>
                <h3>${this.semiTitle}</h3>
                <p><slot></slot></p>
                <div class="product__info_action">
                    <span class="product__info--price">${this.getFormattedPrice()}</span>
                    <button>Buy Now</button>
                </div>
            </article>
            <figure class="product__image">
                <h1>${this.brand}</h1>
                <img alt="Imagen del producto" src=${this.img} />
            </figure>
        </section>

        ${this.getStyles()}
        `
        return template;
    }
    getStyles() {
        const mainColor = "#a0a0a0"
        const mainBackground = "#3d4f99e2"
        const style = `<style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }


        .product {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: "img info";
            width: 100%;
            height: 100%;
            min-width: 300px;
            box-shadow: 0px 0px 5px 1px #000;
        }
        .product__info {
            grid-area: info;
            padding: 4em 1em;
            font-family: sans-serif;
        }
        .product__info h1 {
            font-size: 3em;
            color: #1f1f1f;
            text-align: start;
            font-weight: 600;
        }
        .product__info h3 {
            font-size: 1.3em;
            margin-bottom: 1em;
            color: ${mainColor};
            font-weight: 900;
        }
        .product__info p {
            font-size: .8em;
            text-align: start;
            padding-left: 20%;
            margin-bottom: 3em;
            color: #222;
        }
        .product__info_action {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .product__info--price {
            font-size: 2em;
            color: ${mainColor};
            font-weight: 900;
            text-align: start;
        }
        .product__info button {
            font-size: 1em;
            font-weight: 600;
            border-radius: 10px;
            padding: .5em;
            color: #fff;
            background-color: ${mainBackground};
            outline: none;
            transition: 200ms;
        }
        .product__info button:active {
            transform: scale(.8);
        }
        
        
        .product__image {
            grid-area: img;
            background-color: ${mainBackground};
            position: relative;
        }
        .product__image h1{
            margin-left: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 5em;
            font-weight: 900;
            color: #3f4b7e;
        }
        .product__image img {
            width: 150%;
            min-width: 200px;
            max-width: 630px;
            position: absolute;
            top: 15%;
            transform: translateX(-25%) rotate(-30deg);
        }
        
        @media screen and (max-width: 760px) {
            .product {
                height: auto;
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                grid-template-areas: "img"
                                     "info";
            }
            .product__info{
                padding: 2em 1em;
            }
            .product__info h1{
                display: inline-block;
            }
            .product__info h3{
                display: inline-block;
            }
            .product__info p {
                padding-left: initial;
            }
            .product__image img {
                width: 80%;
                transform: none;
                top: auto;
                position: static;
            }
            .product__image h1{
                font-size: 3.5em;
            }
        }
            
        </style>
        `
        return style;
    }
    static get observedAttributes() {
        return ["product-title", "price", "img", "semi-title", "brand"]
    }
    connectedCallback() {
        const template = this.createTemplate()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

    }
    attributeChangedCallback(attr, oldValue, newValue) {
        if(oldValue !== newValue) {
            switch(attr) {
                case "product-title":
                    this.productTitle = newValue
                    break;
                case "price":
                    this.price = newValue
                    break;
                case "img":
                    this.img = newValue
                    break;
                case "semi-title":
                    this.semiTitle = newValue
                    break;
                case "brand": 
                    this.brand = newValue;
                default:
                    break;
            }
        }
        
    }
    disconnectedCallback() {

    }
}

customElements.define("sneaker-nike", SneakerNike)

export default SneakerNike;