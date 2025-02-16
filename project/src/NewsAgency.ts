// Subject (Publisher)
export interface INewsSubscriber {
  update(news: string): void;
}

export class NewsAgency {
  private subscribers: INewsSubscriber[] = [];
  private latestNews: string = '';

  subscribe(subscriber: INewsSubscriber): void {
    if (!this.subscribers.includes(subscriber)) {
      this.subscribers.push(subscriber);
    }
  }

  unsubscribe(subscriber: INewsSubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  publishNews(news: string): void {
    this.latestNews = news;
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    for (const subscriber of this.subscribers) {
      subscriber.update(this.latestNews);
    }
  }
}