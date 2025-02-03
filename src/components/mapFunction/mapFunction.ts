import { article } from "../../constants/constants";

const setupInfo = () => {
    const infoContainer = document.createElement("div");
    infoContainer.className = "containers";
    infoContainer.id = "info-container";
    article.appendChild(infoContainer);

    infoContainer.innerHTML = `
        <h2 id="title">Scroll of Thrones</h2>
        <section>
        <h3>Made by: Jessica Ågren</h3>
        <h4>API:s used:</h4>
            <p>An API of Ice and Fire</p>
            <p>Game of Thrones Quotes API</p>
            <h4>House sigils from:</h4>
            <p>Westeros</p>
        </section>
    `;
};

export default setupInfo;