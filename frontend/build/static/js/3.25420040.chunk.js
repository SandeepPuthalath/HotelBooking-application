"use strict";(self.webpackChunkclient2=self.webpackChunkclient2||[]).push([[3],{57003:function(e,t,a){a.r(t),a.d(t,{default:function(){return B}});var r=a(1413),n=a(74165),s=a(15861),l=a(29439),o=a(72791),i=a(67156),c=a(79139),d=a(59434),u=a(27319),m=a(51476),x=a(23197),p=a(56355),h=a(53724),f=a(34279),g=a(78820),j=a(80184);function v(e){var t=e.open,a=e.setOpen,r=e.photo,n=(e._id,e.name),s=(0,d.I0)(),m=(0,d.v9)((function(e){return e.uploadImg.loading})),v=o.useState(!1),b=(0,l.Z)(v,2),y=(b[0],b[1]),N=o.useState(null),w=(0,l.Z)(N,2),Z=w[0],I=w[1],B=o.useState(""),z=(0,l.Z)(B,2),C=z[0],k=z[1],S=o.useRef(null),D=o.useState(!1),A=(0,l.Z)(D,2),R=A[0],T=A[1];return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(c.Dialog,{className:"relative",size:"lg",open:t,handler:function(){return a((function(e){return!e}))},children:[m&&(0,j.jsx)(u.Z,{}),(0,j.jsxs)(c.DialogHeader,{className:"justify-between",children:[(0,j.jsxs)("div",{className:"flex items-center gap-3",children:[(0,j.jsx)(c.Avatar,{size:"sm",variant:"circular",alt:"tania andrew",src:r?"https://res.cloudinary.com/".concat(x.Zm,"/image/upload/v1689876154/BookIt_uploades/").concat(r,".jpg"):"/defaults/default-image.jpg"}),(0,j.jsxs)("div",{className:"-mt-px flex justify-center items-center gap-2",children:[R?(0,j.jsx)(c.Input,{value:n,variant:"outlined",label:"name"}):(0,j.jsx)(c.Typography,{variant:"small",color:"blue-gray",className:"font-medium",children:n}),R&&(0,j.jsx)(c.Button,{size:"sm",children:"save"}),(0,j.jsx)(c.IconButton,{onClick:function(){return T((function(e){return!e}))},variant:"text",color:"blue-gray",children:R?(0,j.jsx)(g.oHP,{color:"red",className:"bg-red-100 rounded-full p-1",size:20}):(0,j.jsx)(i.Z,{className:"h-4 w-4"})})]})]}),(0,j.jsx)("div",{className:"flex items-center gap-2"})]}),(0,j.jsx)(c.DialogBody,{divider:!0,className:"p-0",children:(0,j.jsx)("img",{alt:"nature",className:"h-[28rem] w-full object-cover object-center",src:C||(r?"https://res.cloudinary.com/".concat(x.Zm,"/image/upload/v1689876154/BookIt_uploades/").concat(r,".jpg"):"/defaults/default-image.jpg")})}),(0,j.jsxs)(c.DialogFooter,{className:"justify-between",children:[(0,j.jsx)(c.Button,{size:"sm",variant:"outlined",color:"blue-gray",className:"flex items-center gap-3",onClick:function(){S.current.click(),y((function(e){return!e}))},children:"Choose"}),(0,j.jsxs)(c.Button,{size:"sm",variant:"outlined",color:"blue-gray",className:"flex items-center gap-3",onClick:function(){if(!Z)return a(!1);s((0,h.OR)(Z)).then((function(e){var t;console.log(e);var a=(0,f.separatePhotoId)(null===e||void 0===e||null===(t=e.payload)||void 0===t?void 0:t.secure_url);console.log(a)}))},children:[(0,j.jsx)(p.DUB,{size:20}),"Upload"]}),(0,j.jsx)("input",{onChange:function(e){var t=e.target.files[0];I(t),k(URL.createObjectURL(t))},className:"hidden",ref:S,name:"image",type:"file"})]})]})})}var b=["Name","Created at","Updated at","Actions"];function y(){var e=(0,d.I0)(),t=(0,d.v9)((function(e){return e.allDestinations.loading})),a=(0,d.v9)((function(e){return e.allDestinations.data})),n=((0,d.v9)((function(e){return e.allDestinations.error})),o.useState(!1)),s=(0,l.Z)(n,2),p=s[0],h=s[1],f=o.useState(null),g=(0,l.Z)(f,2),y=g[0],N=g[1];return o.useEffect((function(){e((0,m.cH)())}),[]),t?(0,j.jsx)(u.Z,{}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(c.Card,{className:"rounded-none shadow-none",children:[(0,j.jsx)(c.CardBody,{className:"px-0",children:(0,j.jsxs)("table",{className:"w-full min-w-max table-auto text-left",children:[(0,j.jsx)("thead",{children:(0,j.jsx)("tr",{children:b.map((function(e){return(0,j.jsx)("th",{className:"border-y border-blue-gray-100 bg-blue-gray-50/50 p-4",children:(0,j.jsx)(c.Typography,{variant:"small",color:"blue-gray",className:"font-normal leading-none opacity-70",children:e})},e)}))})}),(0,j.jsx)("tbody",{children:a.map((function(e,t){var r=e._id,n=e.name,s=e.photo,l=e.createdAt,o=e.updatedAt,d=t===a.length-1?"p-4":"p-4 border-b border-blue-gray-50";return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{className:d,children:(0,j.jsxs)("div",{className:"flex items-center gap-3  cursor-pointer",onClick:function(){N({_id:r,name:n,photo:s}),h(!0)},children:[(0,j.jsx)(c.Avatar,{src:s?"https://res.cloudinary.com/".concat(x.Zm,"/image/upload/v1689876154/BookIt_uploades/").concat(s,".jpg"):"/defaults/default-image-80.png",alt:n,size:"md",className:"border border-blue-gray-50 bg-blue-gray-50/50 object-cover p-1  hover:border-gray-900"}),(0,j.jsx)(c.Typography,{variant:"small",color:"blue-gray",className:"font-bold",children:n})]})}),(0,j.jsx)("td",{className:d,children:(0,j.jsx)(c.Typography,{variant:"small",color:"blue-gray",className:"font-normal",children:l.split("T")[0]})}),(0,j.jsx)("td",{className:d,children:(0,j.jsx)(c.Typography,{variant:"small",color:"blue-gray",className:"font-normal",children:o.split("T")[0]})}),(0,j.jsx)("td",{className:d,children:(0,j.jsx)(c.Tooltip,{content:"Edit destination",children:(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",children:(0,j.jsx)(i.Z,{className:"h-4 w-4"})})})})]},t)}))})]})}),(0,j.jsxs)(c.CardFooter,{className:"flex items-center justify-between border-t border-blue-gray-50 p-4",children:[(0,j.jsx)(c.Button,{variant:"outlined",color:"blue-gray",size:"sm",children:"Previous"}),(0,j.jsxs)("div",{className:"flex items-center gap-2",children:[(0,j.jsx)(c.IconButton,{variant:"outlined",color:"blue-gray",size:"sm",children:"1"}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"2"}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"3"}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"..."}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"8"}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"9"}),(0,j.jsx)(c.IconButton,{variant:"text",color:"blue-gray",size:"sm",children:"10"})]}),(0,j.jsx)(c.Button,{variant:"outlined",color:"blue-gray",size:"sm",children:"Next"})]})]}),(0,j.jsx)(v,(0,r.Z)({open:p,setOpen:h},y))]})}var N=a(8007),w=a(55705),Z=a(49172),I=N.Ry().shape({name:N.Z_().required("Pleace enter a name"),photo:N.nK().required("Choose an image")}),B=function(){var e=(0,d.I0)(),t=(0,d.v9)((function(e){return e.uploadImg.loading})),a=o.useState(""),i=(0,l.Z)(a,2),m=i[0],x=i[1],p=o.useState(null),g=(0,l.Z)(p,2),v=g[0],b=g[1],N=o.useState(!1),B=(0,l.Z)(N,2),z=B[0],C=B[1];o.useEffect((function(){return e((0,h.Fi)()),function(){return e((0,Z.oA)())}}),[e]);var k=(0,w.TA)({initialValues:{name:"",photo:""},validationSchema:I,onSubmit:function(){var t=(0,s.Z)((0,n.Z)().mark((function t(a){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e((0,h.OR)(v)).then(function(){var t=(0,s.Z)((0,n.Z)().mark((function t(r){var s;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a.photo=(0,f.separatePhotoId)(null===r||void 0===r||null===(s=r.payload)||void 0===s?void 0:s.secure_url),e((0,Z.sA)(a));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}),S=function(){C((function(e){return!e})),k.resetForm(),b(null),x("")};return(0,j.jsx)("div",{className:"px-1 py-1",children:(0,j.jsxs)("div",{className:"flex flex-col bg-white",children:[(0,j.jsx)("div",{className:"flex justify-center items-center py-2",children:(0,j.jsx)("h3",{className:"font-bold uppercase text-2xl text-gray-900",children:"Destinations"})}),(0,j.jsxs)("div",{className:"grid gap-2",children:[z?(0,j.jsx)("div",{className:"",children:(0,j.jsxs)("div",{className:"grid md:grid-cols-2 ",children:[(0,j.jsxs)("div",{className:" relative md:col-span-1   border-gray-200 flex justify-center items-center",children:[(0,j.jsxs)("figure",{className:"relative px-2 py-2",children:[t&&(0,j.jsx)(u.Z,{}),(0,j.jsx)("img",{loading:"lazy",className:"md:min-h-[15rem] w-72 md:max-h-[15rem] shadow-sm shadow-gray-500  rounded-md object-cover object-center",src:m&&!k.errors.photo?m:"/defaults/default-image.jpg",alt:"destinatiom img"})]}),k.errors.photo&&(0,j.jsx)("span",{className:"absolute top-5 text-red-500",children:k.errors.photo})]}),(0,j.jsx)("div",{className:"md:col-span-1 px-10 py-10 md:px-5 md:py-5",children:(0,j.jsxs)("div",{className:"flex flex-col gap-5 justify-center items-center",children:[(0,j.jsx)("div",{className:"w-full text-center text-gray-900 text-md font-semibold uppercase",children:"Add Destination form"}),(0,j.jsx)(c.Input,(0,r.Z)((0,r.Z)({},k.getFieldProps("name")),{},{error:Boolean(k.errors.name),label:k.errors.name?"Please enter the name":"Enter destination name"})),(0,j.jsx)(c.Input,{onChange:function(e){var t=e.target.files[0];b(t);var a=URL.createObjectURL(t);k.setFieldValue("photo",a),x(a)},error:k.touched.photo&&Boolean(k.errors.photo),label:k.errors.name?"Please choose and image":"Enter destination name",type:"file"}),(0,j.jsxs)("div",{className:"w-full flex justify-end items-center gap-2",children:[(0,j.jsx)("button",{className:"bg-red-50 text-red-700 text-sm font-bold uppercase px-3 py-2 rounded-sm",onClick:S,children:"cancel"}),(0,j.jsx)("button",{onClick:k.handleSubmit,className:"bg-gray-900 text-gray-50 text-sm font-bold uppercase px-3 py-2 rounded-sm",children:"submit"})]})]})})]})}):(0,j.jsx)("div",{className:"flex justify-end items-center px-5",children:(0,j.jsx)("button",{onClick:S,className:"px-3 py-2 bg-blue-700 text-xs text-gray-50 font-semibold uppercase rounded-sm my-1 shadow-md",children:"Add Destination"})}),(0,j.jsx)("div",{className:"px-2",children:(0,j.jsx)(y,{})})]})]})})}},67156:function(e,t,a){var r=a(44925),n=a(72791),s=["title","titleId"];var l=n.forwardRef((function(e,t){var a=e.title,l=e.titleId,o=(0,r.Z)(e,s);return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:t,"aria-labelledby":l},o),a?n.createElement("title",{id:l},a):null,n.createElement("path",{d:"M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"}))}));t.Z=l}}]);
//# sourceMappingURL=3.25420040.chunk.js.map