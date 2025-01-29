import { searchCharacters } from "../../api/asoiafAPI";
import { article } from "../../constants/constants";

const input = document.createElement("input");
input.type = "text";
input.placeholder = ". . .";
input.id = "search-input";
article.appendChild(input);

