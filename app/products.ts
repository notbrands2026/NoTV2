export type Product={id:number;name:string;category:string;price:number;oldPrice?:number;image:string;sizes:string[];badge?:string};
export const products:Product[]=[
{id:1,name:"Sage Day Dress",category:"Dresses",price:1799,image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",sizes:["XS","S","M","L","XL"],badge:"NEW"},
{id:2,name:"Cloud Cotton Shirt",category:"Tops",price:1099,image:"https://images.unsplash.com/photo-1564257577054-8d085a9d2a2a?auto=format&fit=crop&w=900&q=85",sizes:["S","M","L","XL"]},
{id:3,name:"Easy Wide-Leg Trousers",category:"Bottoms",price:1399,image:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=85",sizes:["26","28","30","32","34"],badge:"BESTSELLER"},
{id:4,name:"Terracotta Co-ord",category:"Sets",price:2299,oldPrice:2699,image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",sizes:["S","M","L","XL"],badge:"SALE"},
{id:5,name:"Sunday Midi Dress",category:"Dresses",price:1899,image:"https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=85",sizes:["XS","S","M","L","XL"]},
{id:6,name:"Sand Knit Top",category:"Tops",price:899,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",sizes:["S","M","L","XL"]},
{id:7,name:"Everyday Linen Pants",category:"Bottoms",price:1499,image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",sizes:["26","28","30","32","34"],badge:"NEW"},
{id:8,name:"Soft Blue Lounge Set",category:"Sets",price:2099,image:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",sizes:["S","M","L","XL"]}
];
