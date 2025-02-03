import { article } from "../../constants/constants";

const setupInfo = () => {
    const creditsContainer = document.createElement("div");
    creditsContainer.className = "containers";
    creditsContainer.id = "credits-container";
    article.appendChild(creditsContainer);

    creditsContainer.innerHTML = `
        <h2 id="title">Scroll of Thrones</h2>
        <section>
        <h3>Made by: Jessica Ågren</h3>
        <a href="https://www.linkedin.com/in/jessicaagren/" target="_blank"><img src="/media/icons/linkedin.png" alt="Linkedin" style="width:42px;height:42px;"></a>
        <a href="https://github.com/jessicaagren" target="_blank"><img src="/media/icons/github.png" alt="Github" style="width:42px;height:42px;"></a>
        <h4>API:s used:</h4>
            <p><a href="https://anapioficeandfire.com/" target="_blank">An API of Ice and Fire</a></p>
            <p><a href="https://gameofthronesquotes.xyz/" target="_blank">Game of Thrones Quotes API</a></p>
            <h4>House sigils from:</h4>
            <p><a href="https://awoiaf.westeros.org/index.php/List_of_Houses" target="_blank">A Wiki of Ice and Fire</a></p>
        </section>
    `;
};

export default setupInfo;