import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchText : string ) {
    return products.filter( (product : Product) => 
      product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase()) ||
      product.productId == parseInt(searchText, 10) || 
      product.units == parseInt(searchText, 10) 
    );
  }

}
