import { INewsSubscriber } from './NewsAgency';

export class NewsSubscriber implements INewsSubscriber {
  private name: string;
  private newsLog: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  update(news: string): void {
    this.newsLog.push(news);
    console.log(`${this.name} received news: ${news}`);
  }

  getNewsLog(): string[] {
    return this.newsLog;
  }

  getName(): string {
    return this.name;
  }
}