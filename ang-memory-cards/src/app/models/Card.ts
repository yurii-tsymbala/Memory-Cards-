export class Card {
  imgName: string;
  isFlipped = false;
  isEnabled = true;

  constructor(imgName: string) {
    this.imgName = imgName;
  }
}