import Idea from "./idea.js";
class App {

    static counter = 0;
   
    constructor() {
        this.ideaList = [];
        this.currentIdea = null;
        this.$title = document.querySelector('input[name="title"]');
        this.$body = document.querySelector('textarea[name="body"]');
        this.$saveBtn = document.querySelector('.btn-save');
        this.$savedIdeas = document.querySelector('.saved-ideas');
        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener('click', (event) => {
           this.saveIdea(event);
        });
    }


    saveIdea(event) {
        let {target} = event;
        if (target.classList.contains('btn-save')) {
            event.preventDefault();
            let title = this.$title.value;
            let body = this.$body.value;
            if (title && body) {
                this.currentIdea = new Idea(App.counter++, title, body);
                this.ideaList.push(this.currentIdea);
                this.addIdeaToDom();
            } else if (!title || !body) {
                this.$saveBtn.classList.add('btn-disabled');
                this.$saveBtn.disabled = true;
            }
            this.clearInputs();
        } 
    }

    addIdeaToDom() {
        const ideaHTML = this.ideaList.map((idea) => {
            return (
                ` <article class="idea">
                    <header class="header">
                        <img class="star" src="./assests/star-active.svg" alt="star"/>
                        <img class="close" src="./assests/menu-close.svg" alt="close"/>
                    </header>
                    <section id=${idea.id} class="desc">
                        <h3 class="idea-title">${idea.title}</h3>
                        <p class="idea-desc">${idea.body}</p>
                    </section>
                    <footer class="footer">
                        <div class="comment-content">
                            <img class="comment" src="./assests/comment.svg" alt="comment" />
                            <p class="comment-txt">Comment</p>
                        </div>
                    </footer>
                  </article> 
                `
            )
        }).join('');

        this.$savedIdeas.innerHTML = ideaHTML;

    }

    clearInputs() {
        this.$title.value = '';
        this.$body.value = '';
    }

}


new App();