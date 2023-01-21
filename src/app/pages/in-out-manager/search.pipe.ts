import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerEmailFilter',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      const money = val.amount.toString();
      let rVal =
        val.id?.toLocaleLowerCase().includes(args) ||
        val.icon?.toLocaleLowerCase().includes(args) ||
        val.type?.toLocaleLowerCase().includes(args) ||
        money?.toLocaleLowerCase().includes(args) ||
        val.note?.toLocaleLowerCase().includes(args) ||
        val.time?.toLocaleLowerCase().includes(args);

      // let rVal =
      //   (val.id?.toLocaleLowerCase().includes(args)) ||
      //   (val.email?.toLocaleLowerCase().includes(args));
      return rVal;
    });
  }
}
