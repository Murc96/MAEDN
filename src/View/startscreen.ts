
class StartScreen {
  constructor() {
    this.createStartScreen();
  }
  createStartScreen() {
    const container = document.getElementById("start_ui");
    const ue1 = document.createElement("h1");
    ue1.textContent = "Mensch Ärgere Dich Nicht";
    container?.appendChild(ue1);

    const p1 = document.createElement("input");
    p1.setAttribute("type", "text");
    p1.placeholder = "Spieler 1";
    p1.id = "playerOne";
    container?.appendChild(p1);

    const p2 = document.createElement("input");
    p2.setAttribute("type", "text");
    p2.placeholder = "Spieler 2";
    p2.id = "playerTwo";
    container?.appendChild(p2);

    const p3 = document.createElement("input");
    p3.setAttribute("type", "text");
    p3.placeholder = "Spieler 3";
    p3.id = "playerThree";
    container?.appendChild(p3);

    const p4 = document.createElement("input");
    p4.setAttribute("type", "text");
    p4.placeholder = "Spieler 4";
    p4.id = "playerFour";
    container?.appendChild(p4);


    // Special rules selection
    const specialRulesContainer = document.createElement("div");
    specialRulesContainer.id = "specialRulesContainer";

    // Special rules checkboxes
    const schlagzwangCheckbox = document.createElement("input");
    schlagzwangCheckbox.setAttribute("type", "checkbox");
    schlagzwangCheckbox.id = "schlagzwangCheckbox";
    const schlagzwangLabel = document.createElement("label");
    schlagzwangLabel.setAttribute("for", "schlagzwangCheckbox");
    schlagzwangLabel.textContent = "Schlagzwang";

    const friendlyFireCheckbox = document.createElement("input");
    friendlyFireCheckbox.setAttribute("type", "checkbox");
    friendlyFireCheckbox.id = "friendlyFireCheckbox";
    const friendlyFireLabel = document.createElement("label");
    friendlyFireLabel.setAttribute("for", "friendlyFireCheckbox");
    friendlyFireLabel.textContent = "Friendly Fire";

    const philanthropCheckbox = document.createElement("input");
    philanthropCheckbox.setAttribute("type", "checkbox");
    philanthropCheckbox.id = "philanthropCheckbox";
    const philanthropLabel = document.createElement("label");
    philanthropLabel.setAttribute("for", "philanthropCheckbox");
    philanthropLabel.textContent = "Philanthrop";

    const loneFighterCheckbox = document.createElement("input");
    loneFighterCheckbox.setAttribute("type", "checkbox");
    loneFighterCheckbox.id = "loneFighterCheckbox";
    const loneFighterLabel = document.createElement("label");
    loneFighterLabel.setAttribute("for", "loneFighterCheckbox");
    loneFighterLabel.textContent = "Lone Fighter";

    const secondRoundCheckbox = document.createElement("input");
    secondRoundCheckbox.setAttribute("type", "checkbox");
    secondRoundCheckbox.id = "secondRoundCheckbox";
    const secondRoundLabel = document.createElement("label");
    secondRoundLabel.setAttribute("for", "secondRoundCheckbox");
    secondRoundLabel.textContent = "Second Round";

    specialRulesContainer.appendChild(schlagzwangCheckbox);
    specialRulesContainer.appendChild(schlagzwangLabel);
    specialRulesContainer.appendChild(document.createElement("br"));
    specialRulesContainer.appendChild(friendlyFireCheckbox);
    specialRulesContainer.appendChild(friendlyFireLabel);
    specialRulesContainer.appendChild(document.createElement("br"));
    specialRulesContainer.appendChild(philanthropCheckbox);
    specialRulesContainer.appendChild(philanthropLabel);
    specialRulesContainer.appendChild(document.createElement("br"));
    specialRulesContainer.appendChild(loneFighterCheckbox);
    specialRulesContainer.appendChild(loneFighterLabel);
    specialRulesContainer.appendChild(document.createElement("br"));
    specialRulesContainer.appendChild(secondRoundCheckbox);
    specialRulesContainer.appendChild(secondRoundLabel);

    container?.appendChild(specialRulesContainer);

    const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.id = "startButton";
    container?.appendChild(startButton);
  }


  changeScreens() {
    const startScreen = document.getElementById("start");
    const gameScreen = document.getElementById("content");
    startScreen!.style.display = "none";
    gameScreen!.style.display = "flex";
  }

  getCheckedRules(): string[] {
    const checkedRules: string[] = [];
    if ((document.getElementById("schlagzwangCheckbox") as HTMLInputElement).checked) {
      checkedRules.push("Schlagzwang");
    }
    if ((document.getElementById("friendlyFireCheckbox") as HTMLInputElement).checked) {
      checkedRules.push("FriendlyFire");
    }
    if((document.getElementById("philanthropCheckbox") as HTMLInputElement).checked) {
      checkedRules.push("Philanthrop");
    }
    if((document.getElementById("loneFighterCheckbox") as HTMLInputElement).checked) {
      checkedRules.push("LoneFighter");
    }
    if((document.getElementById("secondRoundCheckbox") as HTMLInputElement).checked) {
      checkedRules.push("SecondRound");
    }
    return checkedRules;
  }
}

export { StartScreen };
