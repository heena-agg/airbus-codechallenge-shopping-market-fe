import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly GET_PRODUCT = environment.baseUrl + 'product';
  readonly GET_CATEGORY_PRODUCT = environment.baseUrl + 'product/category/';
  readonly UPDATE_PRODUCT = environment.baseUrl + 'product/';
  readonly CREATE_PRODUCT = environment.baseUrl + 'product';

  productList : Product[] = []
  product : Product = new Product()
  productId : number = 0

  constructor(private http: HttpClient) { }

  readonly header = new HttpHeaders()
  .set("Access-Control-Allow-Origin", "*")
  .set("content-type" , "application/json")
  .set("Authorization", localStorage.getItem("Authorization") || "")
  .set("Accept", "application/json")

  public getProductList()
  {   
    return this.http.get<Product[]>(this.GET_PRODUCT , { headers : this.header})   
  }

  public createProduct(product : Product)
  {
    return this.http.post(this.CREATE_PRODUCT, product, { headers : this.header})    
  }

  public updateProduct(product : Product){
    return this.http.put(this.UPDATE_PRODUCT + product.productId, product, { headers : this.header})    
  }

  public getCategoryProduct(category : string){   
    return this.http.get<Product[]>(this.GET_CATEGORY_PRODUCT + category, { headers : this.header})   
  }


  public getCategoryList(productList : Product[])
  {    
    let categoryList : string[] = []
    for(var i =0;i<productList.length;i++){
     if(categoryList.indexOf(productList[i].category)==-1){
        categoryList.push(productList[i].category)
      }        
    } 
    return categoryList;
  }


}
