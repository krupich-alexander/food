function modalHide(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modalShow(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // MODAL

    const modal = document.querySelector(modalSelector),
          modalBtns = document.querySelectorAll(triggerSelector);

    
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => modalShow(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == ''){
            modalHide(modalSelector);
        }
    });
    
    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (key === 'Escape'){
            modalHide(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=document.documentElement.scrollHeight){
            modalShow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {modalHide};
export {modalShow};