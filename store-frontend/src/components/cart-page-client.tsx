// "use client";
//
// import { cn } from "@/lib/utils";
// import { TCartItem } from "@/lib/types";
//
// type CartPageClientProps = {
//   className?: string;
// };
//
// export default function CartPageClient({ className }: CartPageClientProps) {
//   // fetch carts/cartsview or something
//
//   return (
//     <div className={cn("", className)}>
//       <h1 className="text-3xl font-bold pl-6">
//         {cart?.cartItems.length === 0 ? "Your cart is empty" : "Your Cart"}
//       </h1>
//       <section>
//         <div className="flex w-full mt-3 px-6">
//           <div className="w-2/3 bg-white/20">
//             <ul>
//               {cart?.cartItems.map((item) => (
//                 <li key={item.id}>
//                   <CartRow cartItem={item} />
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="w-1/3 bg-white/40">Right side (1/3)</div>
//         </div>
//       </section>
//     </div>
//   );
// }
//
// type CartRowProps = {
//   cartItem: TCartItem;
// };
//
// function CartRow({ cartItem }: CartRowProps) {
//   return (
//     <div className="flex items-center">
//       <div className="h-[30px] w-[30px] bg-white/50">Img</div>
//       <p>product name</p>
//     </div>
//   );
// }
