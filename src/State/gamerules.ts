import { Player } from "../Components/player";
import { GameCube } from "../Components/gamecube";
import { StartScreen } from "../View/startscreen";

class GameRules {
  private gamePhase: number;
  private attempt: number;
  private enabledRules: Set<string>;


  constructor() {
    this.gamePhase = 0;
    this.attempt = 0;
    this.enabledRules = new Set<string>();
  }
  getGamePhase() {
    return this.gamePhase;
  }
  setGamePhaseOne() {
    this.gamePhase = 0;
  }
  setGamePhaseTwo() {
    this.gamePhase = 1;
  }
  setEndGame() {
    this.gamePhase = 3;
  }
  addNoFigureOnFieldAttempts() {
    this.attempt++;
  }
  getNoFigureOnFieldAttempts() {
    return this.attempt;
  }
  resetNoFigureOnFieldAttempts() {
    this.attempt = 0;
  }
  handleGameCube6(gamecube: GameCube): boolean {
    if (gamecube.checkFor6()) {
      this.resetNoFigureOnFieldAttempts();
    }
    return gamecube.checkFor6();
  }
  checkCanMoveOnThrow(gamecube: GameCube, currentPlayer: Player): boolean {
    console.log("num =", gamecube.getRolledNum());

    if (currentPlayer.checkFiguresOnFieled()) {
      console.log("hello check on field");
      return true;
    } else if (gamecube.checkFor6()) {
      console.log("hello gamecube check 6");
      return true;
    } else {
      console.log("hello checkmove false");
      return false;
    }
  }

  isRuleEnabled(rule: string): boolean {
    return this.enabledRules.has(rule);
  }

  // Method to enable a rule
  enableRule(rule: string): void {
    this.enabledRules.add(rule);
  }

  // Method to set rules based on checked checkboxes
  setRulesFromCheckboxes(checkedRules: string[]): void {
    checkedRules.forEach((rule) => {
      this.enableRule(rule);
    });
  }
}

export { GameRules };
