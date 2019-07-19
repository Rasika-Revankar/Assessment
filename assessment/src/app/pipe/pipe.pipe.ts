import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname'
})
export class PipePipe implements PipeTransform {
  transform(value: string): string {

    return value.includes('Mrs. ' || 'Mrs.' || 'Mr.' || 'Mr. ') ? value.split(' ')[1] : value.split(' ')[0];
  }
}
