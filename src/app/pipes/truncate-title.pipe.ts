import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateTitle',
  standalone: false,
})
export class TruncateTitlePipe implements PipeTransform {
  wordCount = 5;

  transform(value: string | undefined, ...args: unknown[]): unknown {
    return `${value?.split(' ').slice(0, this.wordCount).join(' ')}...`;
  }
}
