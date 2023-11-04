import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[] | null, searchKey: string, properties: string): any[] {
    if (!items) return [];
    if (!searchKey) return items;
    return (items || []).filter((item) => properties.split(',')
      .some(property => {
        switch (property) {
          case 'categoryName': return item['category'].hasOwnProperty(property) && new RegExp(searchKey, 'gi').test(item['category'][property]);
          default: return item.hasOwnProperty(property) && new RegExp(searchKey, 'gi').test(item[property]);
        }
      })
    );
  }

}