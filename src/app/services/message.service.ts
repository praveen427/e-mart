import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSource = new BehaviorSubject<any>(null);
  message$ = this.messageSource.asObservable();

  show(type: 'success' | 'danger' | 'info', text: string) {
    this.messageSource.next({ type, text });
    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.messageSource.next(null);
  }
}
