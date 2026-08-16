"use client";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product={id:number;name:string;price:number;category:string};
type Form={name:string;email:string;phone:string;address:string;city:string;state:string;pincode:string};
const empty:Form={name:"",email:"",phone:"",address:"",city:"",state:"",pincode:""};
declare global { interface Window { Razorpay:any } }
export default function Checkout(){
 const router=useRouter(); const [cart,setCart]=useState<number[]>([]); const [products,setProducts]=useState<Product[]>([]); const [form,setForm]=useState< Form >(empty); const [provider,setProvider]=useState("razorpay"); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("not-cart")||"[]"))}catch{setCart([])} fetch("/api/products",{cache:"no-store"}).then(r=>r.json()).then(d=>setProducts(d.products||[])).catch(()=>setError("Unable to load products."))},[]);
 const items=useMemo(()=>cart.map(id=>products.find(p=>p.id===id)).filter(Boolean) as Product[],[cart,products]); const total=items.reduce((s,p)=>s+p.price,0); const money=(v:number)=>`₹${v.toLocaleString("en-IN")}`;
 async function pay(e:React.FormEvent){e.preventDefault();setError("");if(!items.length){setError("Your bag is empty.");return} if(Object.values(form).some(v=>!v.trim())){setError("Please complete all delivery details.");return} setBusy(true);
   try{const r=await fetch("/api/payments/create",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({customer:form,items:cart,provider})}); const d=await r.json(); if(!r.ok)throw new Error(d.error||"Payment setup failed");
    if(provider==="stripe"){window.location.href=d.url;return}
    if(d.razorpay){const rz=new window.Razorpay({...d.razorpay,prefill:{name:form.name,email:form.email,contact:form.phone},theme:{color:"#111111"},handler:()=>{localStorage.setItem("not-cart","[]");router.push(`/order-success?order=${d.orderNumber}`)}}); rz.open();}
   }catch(err:any){setError(err.message||"Unable to start payment.");setBusy(false)}
 }
 return <main className="checkoutPage"><Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive"/><header className="simpleHeader"><Link href="/" className="brand"><img src="/not-logo-taupe.png" alt="NoT — Need of Time"/></Link><Link href="/">← Back to shop</Link></header><div className="checkoutWrap"><div><p className="eyebrow">NO T · CHECKOUT</p><h1>Complete your order.</h1><form onSubmit={pay} className="checkoutForm"><section><h2>Delivery details</h2><div className="formGrid">{([['name','Full name'],['email','Email'],['phone','Phone'],['address','Address'],['city','City'],['state','State'],['pincode','PIN code']] as const).map(([k,l])=><label key={k} className={k==='address'?'wide':''}>{l}<input type={k==='email'?'email':'text'} inputMode={k==='phone'||k==='pincode'?'numeric':undefined} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}/></label>)}</div></section><section><h2>Payment</h2><div className="paymentChoices"><label><input type="radio" checked={provider==='razorpay'} onChange={()=>setProvider('razorpay')}/> Razorpay · UPI / cards / netbanking</label><label><input type="radio" checked={provider==='stripe'} onChange={()=>setProvider('stripe')}/> Stripe · international cards</label></div><div className="paymentNotice"><strong>Secure payment</strong><p>Payment is handled by your selected provider. No card details are stored by NoT.</p></div></section>{error&&<p className="formError">{error}</p>}<button className="primary full" disabled={busy}>{busy?'Opening payment…':`Pay ${money(total)}`}</button></form></div><aside className="summary"><h2>Order summary</h2>{items.map((i,n)=><div className="summaryItem" key={`${i.id}-${n}`}><span>{i.name}</span><strong>{money(i.price)}</strong></div>)}<div className="summaryTotal"><span>Total</span><strong>{money(total)}</strong></div></aside></div></main>;
}
