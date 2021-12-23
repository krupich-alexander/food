import {modalHide, modalShow} from './modal';
import {postData} from '../services/services.js';

function forms(formSelector, modalTimerId) {
    // Form для отправки данных

    const form = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо. Мы с Вами свяжемся.',
        error: 'Произошла ошибка'
    };

    form.forEach(item => {
         formData(item);
    });

    function formData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
         
            postData('http://localhost:3000/requests', json)
            .then((data) => {
                console.log(data);
                formThanks(message.success);
                statusMessage.remove();
            }).catch((data) => {
                formThanks(message.error);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function formThanks(message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');
        modalShow('.modal', modalTimerId);

        const newForm = document.createElement('div');
        newForm.classList.add('modal__dialog');
        newForm.innerHTML = `
            <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(newForm);

        setTimeout(() => {
        newForm.remove();
        modalDialog.classList.remove('hide');
        modalHide('.modal');
        },4000);
    }

}

export default forms;