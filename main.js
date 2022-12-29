let observer;
document.addEventListener('DOMContentLoaded',init);

function init(){
    let p = document.querySelector('main>p');
    p.addEventListener('click',change);

    let config = {
        attributes: true, 
        attributeOldValue: true,
        attributeFilter: ['data-thing', 'title', 'style'],
        childList: true, 
        subtree: true, 
        characterData: false,
        characterDataOldValue: false
    };
    /* childList, attributes, characterData */

    observer = new MutationObserver(mutated);
    observer.observe(p, config); 

    function change(ev){
        let p = ev.currentTarget;
        p.textContent = 'This is new content';
        p.style.backgroundColor = 'green';
        p.setAttribute('data-thing', 123);
        p.title = 'NEW TITLE'
        
        let span = document.createElement('span');
        span.textContent = ' SOME SPAN TEXT';
        p.appendChild(span)
    }

    function mutated(mutationList){
        console.log(mutationList);
        for (let mutation of mutationList){
            if(mutation.type == 'childList'){
                console.log('A node has been added or removed');
            }else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
                console.log( mutation.oldValue );
            }
        }
    }
 observer.takeRecords();
//   observer.disconnect();
}