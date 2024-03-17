import { Player } from "../Components/player";
import { GameCube } from "../Components/gamecube";
import { GameBoard } from "../Components/gameboard";
import { Figure } from "../Components/figure";
import { GameBoardUi } from "../View/gameboardview";
import { GameRules } from "./gamerules";
import { StartScreen } from "../View/startscreen";

class Play {
  public players: Player[];
  private currentPlayerIndex: number;
  public gameCube: GameCube;
  public gameBoard: GameBoard;
  private gameBoardUi: GameBoardUi;
  private gamePhase: number;
  private gameRules: GameRules;
  private startScreen: StartScreen;

  constructor(startScreen: StartScreen) {
    this.gameBoard = new GameBoard();
    this.players = [];
    this.currentPlayerIndex = 0;
    this.gameCube = new GameCube();
    this.gameBoardUi = new GameBoardUi();
    this.createNewGame();
    this.gamePhase = 0;
    this.gameRules = new GameRules();
    this.startScreen = startScreen;
    this.setGameRulesFromCheckboxes();
  }

  createNewGame(): void {
    this.gameBoardUi.createGrid();
  }

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  private setGameRulesFromCheckboxes(): void {
    const checkedRules = this.startScreen.getCheckedRules();
    this.gameRules.setRulesFromCheckboxes(checkedRules);
    console.log("Activated Rules:", checkedRules);
  }

  ifRuleIsEnabled(rule: string): boolean {
    return this.gameRules.isRuleEnabled(rule);
  }

  checkForSpecialRules() {
    if (this.ifRuleIsEnabled("Philanthrop")) {
      this.applyPhilanthropRule();
    }
    if (this.ifRuleIsEnabled("LoneFighter")) {
      this.applyLoneFighterRule();
    }
    if(this.ifRuleIsEnabled("Schlagzwang")) {
      this.applySchlagzwangRule();
    }
    
    if(this.ifRuleIsEnabled("SecondRound")) {
      this.applySecondRoundRule();
    }
  }
  applyPhilanthropRule() {
    console.log("philanthrop rule is active");
  }

  applyLoneFighterRule() {
    console.log("Lone Fighter Rule is active");
  }

  applySchlagzwangRule() {
    console.log("Schlagzwang is active");
  }

  applyFriendlyFireRule(currentPlayer: Player, targetPos: number): void {
    const figures = currentPlayer.myFigures;
    
    // Check if any other figure occupies the target position
    const overlappingFigure = figures.find(figure => figure.position === targetPos);
    
    // If an overlapping figure is found and it's not the moved figure itself
    if (overlappingFigure && overlappingFigure.position !== targetPos) {
        console.log("Friendly Fire rule activated!");
        
        // Remove the overlapping figure from the board
        overlappingFigure.removeFromField();
        overlappingFigure.placeOnField(); // Place it back to the start zone
        
    }
}

  applySecondRoundRule() {
    console.log("Second Round rule is active");
  }

  playGame(): void {
    const grid = document.getElementById("playField") as HTMLDivElement;
    this.startScreen.changeScreens();
    this.gameBoardUi.updateGameboardPlayerBank(this.players);
    grid.addEventListener("click", (e) => {
      this.checkGamePhase(e.target);
      this.gameBoardUi.updateGameBoardUi(this.gameBoard);
    });



  }
  checkGamePhase(element: EventTarget | null) {
    let idNum: number | null;
    const currentPlayer = this.getCurrentPlayer();
    console.log("player ", currentPlayer);
    this.gameBoardUi.updateGameBoardUi(this.gameBoard);
    //gamephase 1 | würfeln
    if (
      this.gameRules.getGamePhase() === 0 &&
      (element as HTMLElement).id === "gameCube"
    ) {
      this.rollDice();
      if (this.gameRules.checkCanMoveOnThrow(this.gameCube, currentPlayer)) {
        this.gameBoardUi.highlightFiguresToMove(currentPlayer);
        this.gameRules.setGamePhaseTwo();
        this.gameRules.resetNoFigureOnFieldAttempts();
      } else if (this.gameRules.getNoFigureOnFieldAttempts() < 2) {
        this.gameRules.addNoFigureOnFieldAttempts();
      } else {
        this.gameRules.resetNoFigureOnFieldAttempts();
        this.nextTurn();
      }
      this.checkForSpecialRules()
    }
    //gamephase 2 | Figurebewegung
    else if (this.gameRules.getGamePhase() === 1) {
      idNum = this.getChosenFigureId(currentPlayer, element as HTMLDivElement);
      if (typeof idNum == "number") {
        this.moveCurrentPlayerFigure(currentPlayer.myFigures[idNum]);
        this.gameBoardUi.updateGameboardPlayerBank(this.players);
        this.gameBoardUi.updateGameBoardPlayerEndzone(this.getCurrentPlayer());
        this.nextTurn();
        this.gameRules.setGamePhaseOne();
        this.gameBoardUi.unlightFiguresToMove(currentPlayer);
      }
    }
    if (currentPlayer.checkAllFiguresInEndzone()) {
      console.log(`Player ${currentPlayer.color} has won`);
      this.endGame();
    }
  }
  endGame(): void {
    this.gameRules.setEndGame();
  }

  getChosenFigureId(
    currentPlayer: Player,
    element: EventTarget
  ): number | null {
    let figureId = null;

    if (
      (element as HTMLDivElement).classList.contains(
        `${currentPlayer.color}Figure1`
      )
    ) {
      return (figureId = 0);
    } else if (
      (element as HTMLDivElement).classList.contains(
        `${currentPlayer.color}Figure2`
      )
    ) {
      return (figureId = 1);
    } else if (
      (element as HTMLDivElement).classList.contains(
        `${currentPlayer.color}Figure3`
      )
    ) {
      return (figureId = 2);
    } else if (
      (element as HTMLDivElement).classList.contains(
        `${currentPlayer.color}Figure4`
      )
    ) {
      return (figureId = 3);
    }
    return figureId;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  nextTurn(): void {
    if (!this.gameRules.handleGameCube6(this.gameCube)) {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }
  }

  rollDice(): void {
    this.gameCube.rollCube();
    this.gameBoardUi.gameCubeUi.showGameCubeNum(this.gameCube.rolledNum);
    //const getCurrentPlayer = this.getCurrentPlayer();
    //TODO Würfelanimatione, Zug geht verloren wenn 6
    /* 
    for (let i = 0; i < 10; i++) {
      this.rollTimeout(i);
    } */
  } /* 
  rollTimeout(i: number) {
    setTimeout(() => {
      this.gameCube.rollCube();
      this.gameBoardUi.gameCubeUi.showGameCubeNum(this.gameCube.getRolledNum());
    }, 40 * i);
  }
 */
  moveCurrentPlayerFigure(figureToMove: Figure): void {
    const currentPlayer = this.getCurrentPlayer();
    const rolledNum = this.gameCube.getRolledNum();
    const targetPos = rolledNum + figureToMove.position;

    if (
      figureToMove.isOnField &&
      targetPos <= 40 &&
      figureToMove.getMaxDistance(targetPos)
    ) {
      this.gameBoard.moveFigure(figureToMove, rolledNum);
      figureToMove.moveOnPlayerBoard(rolledNum);
      if(this.ifRuleIsEnabled("FriendlyFire")) {
        this.applyFriendlyFireRule(currentPlayer, targetPos);
      }
    } else if (
      figureToMove.isOnField &&
      targetPos > 40 &&
      figureToMove.getMaxDistance(targetPos)
    ) {
      figureToMove.moveOnPlayerBoard(rolledNum);
      //currentPlayer.addFigureInEndzone(figureToMove);
      figureToMove.setIsInEndzone();
      figureToMove.removeFromField();
      this.gameBoard.moveFigure(figureToMove, rolledNum);
    } else if (!figureToMove.isOnField) {
      figureToMove.placeOnField();
      this.gameBoard.placeFigure(currentPlayer, figureToMove);
    } else {
      console.log("Fehler moveCurrentPlayerFigure");
    }
  }
  isGameEnd(player: Player): boolean {
    return player.checkAllFiguresInEndzone();
  }
}

export { Play };
