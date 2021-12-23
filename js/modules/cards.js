import {getResource} from '../services/services.js';

function cards() {
    // MenuCard

    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parse = document.querySelector(parentSelector);
            this.usdToUA = 27;
            this.changeToUAH();
        }
        changeToUAH(){this.price = this.price * this.usdToUA;}

        render(){

            const div = document.createElement('div');

                if (this.classes.length === 0){
                    this.classes = 'menu__item';
                    div.classList.add(this.classes);
                } else {
                    this.classes.forEach(className => div.classList.add(className));
                }

            div.innerHTML = `<img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;
        this.parse.append(div);
        }
    }

    getResource('http://localhost:3000/menu')
        .then (data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

}

export default cards;