"use strict";(self.webpackChunkclient2=self.webpackChunkclient2||[]).push([[631],{54631:function(e,r,t){t.r(r),t.d(r,{default:function(){return P}});var o=t(1413),n=t(72791),s=t(59434),i=t(57689),a=t(44365),l=t(79139),c=t(29439),d=t(56355),u=t(74165),m=t(15861),p=t(78820),h=t(23197),x=t(34279),f=t(80184);function j(e){var r=e.open,t=e.onClose,o=e.roomId,i=e.hotelId,j=(0,s.I0)(),g=(0,n.useState)(""),v=(0,c.Z)(g,2),y=(v[0],v[1]),b=(0,n.useState)(""),N=(0,c.Z)(b,2),I=N[0],Z=N[1],w=(0,n.useRef)(null),k=function(){var e=(0,m.Z)((0,u.Z)().mark((function e(){var r;return(0,u.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I){e.next=2;break}return e.abrupt("return");case 2:(r=new FormData).append("file",I),r.append("upload_preset",h.d3),fetch("https://api.cloudinary.com/v1_1/".concat(h.Zm,"/upload"),{method:"POST",body:r}).then((function(e){return e.json()})).then((function(e){y(e.secure_url);var r=(0,x.separatePhotoId)(e.secure_url);y(r),j((0,a.X7)({hotelId:i,roomId:o,imgId:r}))})).catch((function(e){console.error("Error uploading image:",e)}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(l.Dialog,{className:"relative flex-col items-center justify-center",open:r,handler:t,children:[(0,f.jsx)("div",{onClick:t,className:"absolute right-0 top-0 cursor-pointer",children:(0,f.jsx)(p.SV5,{color:"black",size:30})}),(0,f.jsx)(l.DialogHeader,{className:"flex justify-center items-center",children:"Add an Image"}),(0,f.jsx)(l.DialogBody,{className:"mx-6 my-2 border flex justify-center items-center rounded-md",children:I?(0,f.jsx)("div",{className:"",children:(0,f.jsx)("img",{className:"h-96 w-full object-contain",src:I?URL.createObjectURL(I):"/defaults/default-image.jpg",alt:"img-blur-shadow"})}):(0,f.jsxs)("div",{className:"flex py-40 justify-center item-center",children:[(0,f.jsx)(d.DUB,{onClick:function(){w.current.click()},className:"cursor-pointer",size:50}),(0,f.jsx)("input",{onChange:function(e){Z(e.target.files[0])},className:"hidden",ref:w,id:"file-upload",type:"file",name:"image",variant:"static",label:"Max people"})]})}),(0,f.jsx)(l.DialogFooter,{className:"flex justify-center items-center",children:(0,f.jsx)(l.Button,{className:"border-none",variant:"gradient",color:"green",onClick:k,children:(0,f.jsxs)("span",{className:"flex gap-2",children:[(0,f.jsx)(d.DUB,{}),"Upload"]})})})]})})}var g=function(e){var r=e.photos,t=e.roomId,o=e.hotelId,s=n.useState(0),i=(0,c.Z)(s,2),a=i[0],u=i[1],m=n.useState(!1),p=(0,c.Z)(m,2),x=p[0],g=p[1],v=function(){g((function(e){return!e}))};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"mx-2 my-2",children:[(0,f.jsxs)("figure",{children:[r&&(0,f.jsx)("img",{loading:"lazy",className:"h-96 w-full rounded-lg object-cover object-center",src:"https://res.cloudinary.com/".concat(h.Zm,"/image/upload/v1689876154/BookIt_uploades/").concat(r[a],".jpg"),alt:""}),(0,f.jsxs)(l.Typography,{as:"small",variant:"small",className:"mt-2 text-center font-normal",children:["image ",a]})]}),(0,f.jsxs)("div",{className:"flex flex-row overflow-x-auto h-52  justify-center items-center gap-2 my-2",children:[null===r||void 0===r?void 0:r.map((function(e,r){return(0,f.jsx)("img",{onClick:function(){u(r)},className:"rounded-lg object-cover object-center cursor-pointer ".concat(a===r?"w-48 h-36":"w-40 h-28"),src:"https://res.cloudinary.com/".concat(h.Zm,"/image/upload/v1689876154/BookIt_uploades/").concat(e,".jpg"),alt:""},r)})),(0,f.jsx)("div",{onClick:v,className:"flex justify-center cursor-pointer items-center px-20 h-28 rounded-lg border border-gray-400 bg-gray-300",children:(0,f.jsx)(d.wEH,{color:"gray"})})]})]}),(0,f.jsx)(j,{open:x,onClose:v,roomId:t,hotelId:o})]})},v=t(1776),y=t(55705),b=t(9085),N=t(8007),I=N.Ry().shape({title:N.Z_().required("Title is required"),price:N.Rx().required("Price is required"),maxPeople:N.Rx().required("Max people is required"),desc:N.Z_().required("Description is required")}),Z=function(e){var r=e._id,t=e.title,i=e.price,d=(e.type,e.maxPeople),u=e.desc,m=(0,s.I0)(),p=n.useState(!0),h=(0,c.Z)(p,2),x=h[0],j=h[1],g=(0,y.TA)({initialValues:{title:t,price:i,maxPeople:d,desc:u},validationSchema:I,onSubmit:function(e,t){t.setSubmitting,t.setErrors;try{console.log(e),m((0,a.VE)({_id:r,body:e}))}catch(o){b.Am.error("Somthing went wrong")}}});return(0,f.jsxs)("div",{className:"flex w-72 flex-col gap-6",children:[(0,f.jsx)(l.Input,(0,o.Z)((0,o.Z)({},g.getFieldProps("title")),{},{error:g.touched.title&&Boolean(g.errors.title),variant:"standard",label:"Title",disabled:x})),g.touched.title&&g.errors.title&&(0,f.jsx)(l.Typography,{variant:"small",color:"red",children:g.errors.title}),(0,f.jsx)(l.Input,(0,o.Z)((0,o.Z)({},g.getFieldProps("price")),{},{error:g.touched.price&&Boolean(g.errors.price),variant:"standard",label:"Price",disabled:x})),g.touched.price&&g.errors.price&&(0,f.jsx)(l.Typography,{variant:"small",color:"red",children:g.errors.price}),(0,f.jsx)(l.Input,(0,o.Z)((0,o.Z)({},g.getFieldProps("maxPeople")),{},{error:g.touched.maxPeople&&Boolean(g.errors.maxPeople),variant:"standard",label:"Max people",disabled:x})),g.touched.maxPeople&&g.errors.maxPeople&&(0,f.jsx)(l.Typography,{variant:"small",color:"red",children:g.errors.maxPeople}),(0,f.jsx)(l.Textarea,(0,o.Z)((0,o.Z)({},g.getFieldProps("desc")),{},{error:g.touched.desc&&Boolean(g.errors.desc),variant:"standard",label:"description",disabled:x})),g.touched.desc&&g.errors.desc&&(0,f.jsx)(l.Typography,{variant:"small",color:"red",children:g.errors.desc}),(0,f.jsxs)("div",{className:"flex justify-center items-center gap-3",children:[(0,f.jsx)(l.Button,{variant:"text",color:x?"blue":"red",onClick:function(){return j((function(e){return!e}))},children:x?(0,f.jsx)("span",{children:"Edit"}):(0,f.jsx)("span",{children:"Cancel"})}),(0,f.jsx)(l.Button,{variant:"gradient",color:"green",onClick:g.handleSubmit,disabled:x,children:(0,f.jsx)("span",{children:"Save"})})]})]})},w=t(21830),k=t.n(w),C=t(27319),P=function(e){var r=e.hotelId,t=(0,s.v9)((function(e){return e.roomDetails.loading})),c=(0,s.v9)((function(e){return e.roomDetails.data})),u=(0,s.v9)((function(e){return e.roomDetails.error})),m=(0,s.I0)(),p=(0,i.UO)((function(e){return null===e||void 0===e?void 0:e.roomId})).roomId;return n.useEffect((function(){m((0,a.zV)({hotelId:r,roomId:p})),m((0,v.q$)())}),[]),t?(0,f.jsx)(C.Z,{}):u?(0,f.jsxs)("h1",{children:["Error: ",null===u||void 0===u?void 0:u.message]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"relative flex py-4 justify-center items-center shadow",children:[(0,f.jsx)("div",{onClick:function(){k().fire({title:"Are you sure?",text:"You won't be able to revert this!",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((function(e){e.isConfirmed&&k().fire("Deleted!","Your file has been deleted.","success")}))},className:"absolute right-10 cursor-pointer",children:(0,f.jsx)(d.Xm5,{size:30,color:"red"})}),(0,f.jsx)(l.Typography,{variant:"h3",children:"Room Details"})]}),(0,f.jsxs)("div",{className:"grid md:grid-cols-2 my-5 gap-2",children:[(0,f.jsx)("div",{className:"md:col-span-1",children:(0,f.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,f.jsx)(g,{photos:null===c||void 0===c?void 0:c.photos,roomId:null===c||void 0===c?void 0:c._id,hotelId:r})})}),(0,f.jsx)("div",{className:"md:col-span-1",children:(0,f.jsx)("div",{className:"flex justify-center items-center",children:(0,f.jsx)(Z,(0,o.Z)({},c))})})]})]})}}}]);
//# sourceMappingURL=631.c9542f73.chunk.js.map