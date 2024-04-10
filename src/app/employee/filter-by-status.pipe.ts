import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus',
  standalone: true,
})
// @Pipe({ name: 'filterByStatus' })
export class FilterByStatusPipe implements PipeTransform {

  transform(value: any[], status: boolean, filterText: string): any[] {
    return value.filter(employee => {
      const isMatch = employee.firstName.toLowerCase().includes(filterText.toLowerCase())
        || employee.lastName.toString().includes(filterText.toLowerCase())
        || employee.tz.toLowerCase().includes(filterText.toLowerCase())
        || employee.startDate.toString().includes(filterText.toLowerCase());
      return isMatch && employee.status === status;
    });
 
  }

}