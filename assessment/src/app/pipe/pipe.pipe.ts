import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstname'
})
export class PipePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
 
    if (!value) { return ''; }
    if (value.includes('Mrs. ')) {
      return value.split(' ')[1]
    }
    return value.split(' ')[0];
  }

}
