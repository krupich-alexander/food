function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    /// TABS

    const tabHeater = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelector),
          tabs = document.querySelector(tabsParentSelector);

    function hiddenTab(){
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabHeater.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTab(i){
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');

        tabHeater[i].classList.add(activeClass);
    }

    hiddenTab();
    showTab(0);

    tabs.addEventListener('click', (event) => {
       const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabHeater.forEach((item, i) => {
                if (item == target){
                    hiddenTab();
                    showTab(i);
                }
            });
        }
    });
}

export default tabs;