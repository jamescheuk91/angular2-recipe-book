import { Component } from 'angular2/core';
import { RouterLink } from 'angular2/router';
//import { Observable } from 'rxjs/Observable';
import { DataService } from '../shared/services/data.service';
import { Sorter } from '../shared/sorter';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SortByDirective } from '../shared/directives/sortby.directive';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';

@Component({ 
  selector: 'receip-books', 
  providers: [DataService],
  templateUrl: 'app/recipe-book/recipe-books.component.html',
  directives: [RouterLink, FilterTextboxComponent, SortByDirective],
  pipes: [CapitalizePipe, TrimPipe]
})
export class ReceipBooksComponent {

  title: string;
  filterText: string;
  listDisplayModeEnabled: boolean;
  receipBooks: any[] = [];
  filteredReceipBooks: any[] = [];
  sorter: Sorter;

  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.title = 'receip-books';
    this.filterText = 'Filter receip-books:';
    this.listDisplayModeEnabled = false;

    this.dataService.getReceipBooks()
        .subscribe((receipBooks:any[]) => {
          this.receipBooks = this.filteredReceipBooks = receipBooks;
        });

    this.sorter = new Sorter();
  }

  changeDisplayMode(mode: string) {
      this.listDisplayModeEnabled = (mode === 'List');
  }

  filterChanged(data: string) {
    if (data && this.receipBooks) {
        data = data.toUpperCase();
        let props = ['firstName', 'lastName', 'address', 'city', 'orderTotal'];
        let filtered = this.receipBooks.filter(item => {
            let match = false;
            for (let prop of props) {
                //console.log(item[prop] + ' ' + item[prop].toUpperCase().indexOf(data));
                if (item[prop].toString().toUpperCase().indexOf(data) > -1) {
                  match = true;
                  break;
                }
            };
            return match;
        });
        this.filteredReceipBooks = filtered;
    }
    else {
      this.filteredReceipBooks = this.receipBooks;
    }
  }

  deleteCustomer(id: number) {

  }

  sort(prop: string) {
      //Check for complex type such as 'state.name'
      if (prop && prop.indexOf('.')) {
        
      }
      this.sorter.sort(this.filteredReceipBooks, prop);
  }

}
