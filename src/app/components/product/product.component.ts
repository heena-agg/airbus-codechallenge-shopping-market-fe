import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList : Product[] = []
  product : Product = new Product()
  searchText : string = ""
  disabled : boolean = true
  category : string = ""
  categoryList : string[] = []
  isAddOrUpdate : boolean = false
  index : number = 0

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getProductList()    
  }

  setAddProductBoolean()
  {
    console.log("product add called")
    this.isAddOrUpdate = true
    this.product = new Product()
  }

  setUpdateProductBoolean()
  {
    console.log("product update called")
    this.isAddOrUpdate = false;    
  }

  getProductList()
  {
     this.productService.getProductList()
     .subscribe(
      (response : Product[]) => { 
        this.productList = response      
        this.categoryList = this.productService.getCategoryList(this.productList)
        this.categoryList.push("All")
      },
      error => {
        alert(error.httpStatus  + "\n" + error.errorDescription)
      }
    )
  }

  getCategoryProduct()
  {
    this.productService.getCategoryProduct(this.category)
    .subscribe(
      response => {       
        this.productList = response  
      },
      error => {
        alert(error.httpStatus  + "\n" + error.errorDescription)
      }
    )
  }

  categorySelected(category : string)
  {
    this.category = category   
    if(this.category=="All"){
      this.getProductList()
    }else{
      this.getCategoryProduct()
    }    
  } 

  onProductSelect(product : Product, index : number){
    this.product = product   
    this.disabled = false
    this.index = index
  }

  saveProductDetails()
  {
    console.log("save clicked")
      if(this.isAddOrUpdate){
        console.log("add")
        this.createProduct()
      } else{
        console.log("update")
        this.updateProduct()
      }
  }

  createProduct()
  {
    this.productService.createProduct(this.product)
    .subscribe(
      response => {
          alert("product created")  
          this.getProductList()        
      },
      error => {
        alert(error.httpStatus  + "\n" + error.errorDescription)
      }
    )    
  }

  updateProduct()
  {
    this.productService.updateProduct(this.product)
    .subscribe(
      response => {        
        alert("updated the product")
        this.clearUpdate()
         },
      error => {        
        alert(error.httpStatus  + "\n" + error.errorDescription)
        this.clearUpdate()
        this.getProductList()
      }
    )
  }

  clearUpdate()
  {
    this.product = new Product()   
    this.disabled = true;
    (<HTMLInputElement>document.getElementById("product_" + this.index) || {}).checked = false;
 
  }

}
