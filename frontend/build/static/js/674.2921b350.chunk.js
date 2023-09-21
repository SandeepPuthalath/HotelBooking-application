"use strict";(self.webpackChunkclient2=self.webpackChunkclient2||[]).push([[674,319],{27319:function(e,s,n){var l=n(79139),a=(n(72791),n(80184));s.Z=function(){return(0,a.jsxs)("div",{className:"bg-black bg-opacity-50  backdrop-filter backdrop-blur-sm absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center",children:[(0,a.jsx)(l.Spinner,{className:"h-16 w-16 text-blue-500/10"}),";"]})}},73674:function(e,s,n){n.r(s),n.d(s,{default:function(){return G}});var l=n(72791),a=n(57689),r=n(59434),i=n(74165),t=n(15861),d=n(55705),c=n(8007),o=n(31243),x=n(23197),m=o.Z.create({baseURL:"".concat(x.gT.BASE_URL,"/adminAuth"),headers:{"Content-Type":"application/json"}}),u=n(30456),h=n(80997),j=n(80184),p=function(){var e=(0,r.I0)(),s=(0,a.s0)(),n=c.Ry({email:c.Z_().email("Invalid email address").required("Email is required"),password:c.Z_().required("Password is required")});return(0,j.jsx)("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:(0,j.jsxs)("div",{className:"max-w-md w-full mx-4 p-6 bg-white rounded shadow-md",children:[(0,j.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"Login"}),(0,j.jsx)(d.J9,{initialValues:{email:"",password:""},validationSchema:n,onSubmit:function(n,l){var a=l.setErrors,r=l.setSubmitting;console.log(n);try{var d=function(){var l=(0,t.Z)((0,i.Z)().mark((function l(){var a,r,t,d,c,o,j;return(0,i.Z)().wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,m.post(x.$g,n);case 2:if(a=l.sent,console.log(a),!a.error){l.next=9;break}throw console.log("error",a.error),new Error(null===(r=a.error)||void 0===r?void 0:r.message);case 9:console.log("success",a),localStorage.setItem("authTokens",JSON.stringify(null===(t=a.data)||void 0===t?void 0:t.data)),j={adminAuthToken:JSON.stringify(null===(d=a.data)||void 0===d?void 0:d.data),admin:(0,u.Z)(null===(c=a.data)||void 0===c||null===(o=c.data)||void 0===o?void 0:o.access)},e((0,h.o4)(j)),setTimeout((function(){s("/admin")}),1e3);case 14:case"end":return l.stop()}}),l)})));return function(){return l.apply(this,arguments)}}();d()}catch(c){a({login:c.message})}finally{r(!1)}},children:(0,j.jsxs)(d.l0,{children:[(0,j.jsxs)("div",{className:"mb-4",children:[(0,j.jsx)("label",{htmlFor:"email",className:"block text-gray-700 font-bold mb-2",children:"Email"}),(0,j.jsx)(d.gN,{type:"email",id:"email",name:"email",placeholder:"Enter your email",className:"w-full p-2 border rounded focus:outline-none focus:border-blue-500"}),(0,j.jsx)(d.Bc,{name:"email",component:"div",className:"text-red-500 mt-1"})]}),(0,j.jsxs)("div",{className:"mb-4",children:[(0,j.jsx)("label",{htmlFor:"password",className:"block text-gray-700 font-bold mb-2",children:"Password"}),(0,j.jsx)(d.gN,{type:"password",id:"password",name:"password",placeholder:"Enter your password",className:"w-full p-2 border rounded focus:outline-none focus:border-blue-500"}),(0,j.jsx)(d.Bc,{name:"password",component:"div",className:"text-red-500 mt-1"})]}),(0,j.jsx)("button",{type:"submit",className:"w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700",children:"Login"})]})})]})})},f=n(1413),v=n(7144),b=n(39126),g=n(56355),N=n(11087),y=n(27319),w=function(e){var s=e.value,n=e.icon,l=e.desc,a=e.color;return(0,j.jsx)("div",{className:"px-5 py-2 bg-white rounded-md shadow-md",children:(0,j.jsxs)("div",{className:"flex justify-center items-center gap-5",children:[(0,j.jsxs)("div",{className:"".concat(a," flex justify-center items-center"),children:["USER"===n&&(0,j.jsx)(b._Tb,{size:40}),"BOOKING"===n&&(0,j.jsx)(g.f0S,{size:40}),"HOTEL"===n&&(0,j.jsx)(g.X2f,{size:40}),"MONEY"===n&&(0,j.jsx)(g.t9y,{size:40})]}),(0,j.jsxs)("div",{className:"text-center text-gray-900",children:[(0,j.jsx)("h3",{className:"text-3xl font-bold",children:s}),(0,j.jsx)("p",{className:"text-xs",children:l})]})]})})},k=function(e){var s=e.firstName,n=e.lastName,l=e.email,a=e.pic,r=e.role;return(0,j.jsxs)("div",{className:"min-w-[15rem] hover:bg-blue-gray-200 hover:shadow-lg bg-blue-gray-50 rounded-md shadow-md",children:[(0,j.jsx)("div",{className:"py-5 flex justify-center items-center ",children:(0,j.jsx)("div",{className:"",children:(0,j.jsx)("img",{className:"w-36 h-36 rounded-full border-2 border-gray-300",src:a||"/defaults/blank-profile.png",alt:"Extra large avatar"})})}),(0,j.jsxs)("div",{className:"text-center pb-5 text-gray-900",children:[(0,j.jsx)("h3",{className:"text-xl capitalize font-semibold",children:null===s||void 0===s?void 0:s.concat(" ",n)}),(0,j.jsx)("p",{children:l}),(0,j.jsx)("p",{className:"uppercase font-bold ".concat("business"===r?"text-red-500":"text-green-500"),children:r})]})]})},S=function(){var e=(0,r.I0)(),s=(0,r.v9)((function(e){var s;return null===e||void 0===e||null===(s=e.AdminDashboard)||void 0===s?void 0:s.loading})),n=(0,r.v9)((function(e){return e.adminDashboard})),a=n.totalUsers,i=n.totalHotels,t=n.totalRevenu,d=n.totalBookings,c=n.newUsers;return l.useEffect((function(){e((0,v.x)())}),[]),s?(0,j.jsx)(y.Z,{}):(0,j.jsx)("div",{className:"px-2 py-2",children:(0,j.jsxs)("div",{className:"grid gap-2",children:[(0,j.jsxs)("div",{className:"grid md:grid-cols-3 gap-2",children:[(0,j.jsx)(w,{value:a,icon:"USER",desc:"Total number of users",color:"text-blue-500"}),(0,j.jsx)(w,{value:d,icon:"BOOKING",desc:"Total number of bookings",color:"text-red-500"}),(0,j.jsx)(w,{value:i,icon:"HOTEL",desc:"Total number of hotels",color:"text-gray-800"})]}),(0,j.jsx)("div",{children:(0,j.jsx)(w,{value:t,icon:"MONEY",desc:"Total number of revenu",color:"text-green-500"})}),(0,j.jsx)("div",{className:"px-2 mt-5",children:(0,j.jsx)("h1",{className:"text-2xl font-semibold",children:"New Users"})}),(0,j.jsx)("div",{className:"w-full relative overflow-x-auto no-scrollbar flex gap-3 px-3 py-3 mb-20 bg-white rounded-md",children:null===c||void 0===c?void 0:c.map((function(e){return(0,j.jsx)(N.rU,{to:"/admin/user/".concat(null===e||void 0===e?void 0:e._id),children:(0,j.jsx)(k,(0,f.Z)({},e))},null===e||void 0===e?void 0:e._id)}))})]})})},A=n(79139),Z=n(20480),z=n(17685),E=n(61300),U=n(66555),T=n(16856),I=n(68014);function O(){var e=(0,r.I0)();return(0,j.jsxs)("div",{className:"w-full border-r-2",children:[(0,j.jsxs)("div",{className:"w-full px-5 py-4 border-b-2  border-gray-300 flex item-center justify-center md:justify-between",children:[(0,j.jsx)(g.X2f,{fontSize:30,className:"text-gray-900"}),(0,j.jsx)("h1",{className:"text-2xl uppercase font-semibold text-gray-900 hidden md:block cursor-default",children:"Book It"})]}),(0,j.jsxs)("div",{className:"flex flex-col justify-center items-center py-5",children:[(0,j.jsxs)("ul",{className:"w-full text-md text-gray-900 font-semibold ",children:[(0,j.jsx)("li",{className:"hover:bg-gray-200 px-5 py-2",children:(0,j.jsx)(N.rU,{to:"/admin",children:(0,j.jsxs)("div",{className:"flex gap-5",children:[(0,j.jsx)(Z.Z,{className:"h-5 w-5"}),(0,j.jsx)("span",{className:"hidden md:block",children:"Dashborad"})]})})}),(0,j.jsx)("li",{className:"hover:bg-gray-200 px-5 py-2",children:(0,j.jsx)(N.rU,{to:"users",children:(0,j.jsxs)("div",{className:"flex gap-5",children:[(0,j.jsx)(z.Z,{className:"h-5  md:w-5"}),(0,j.jsx)("span",{className:"hidden md:block",children:"Users"})]})})}),(0,j.jsx)("li",{className:"hover:bg-gray-200 px-5 py-2",children:(0,j.jsx)(N.rU,{to:"applications",children:(0,j.jsxs)("div",{className:"flex gap-5",children:[(0,j.jsx)(E.Z,{className:"h-5  md:w-5"}),(0,j.jsx)("span",{className:"hidden md:block",children:"Applications"})]})})}),(0,j.jsx)("li",{className:"hover:bg-gray-200 px-5 py-2",children:(0,j.jsx)(N.rU,{to:"Destination",children:(0,j.jsxs)("div",{className:"flex gap-5",children:[(0,j.jsx)(T.P0t,{className:"h-5  md:w-5"}),(0,j.jsx)("span",{className:"hidden md:block",children:"Destinations"})]})})}),(0,j.jsx)("li",{className:"hover:bg-gray-200 px-5 py-2",children:(0,j.jsx)(N.rU,{to:"banners",children:(0,j.jsxs)("div",{className:"flex gap-5",children:[(0,j.jsx)(I.$aL,{className:"h-5  md:w-5"}),(0,j.jsx)("span",{className:"hidden md:block",children:"Banners"})]})})})]}),(0,j.jsx)("div",{className:"border-t-2 text-gray-900 border-gray-300 w-full font-semibold",children:(0,j.jsxs)("div",{onClick:function(){e((0,h.rK)())},className:"hover:bg-gray-200 flex gap-5 cursor-pointer px-5 py-2 mt-5",children:[(0,j.jsx)(U.Z,{className:"h-5  md:w-5"}),(0,j.jsx)("p",{className:"hidden md:block",children:" Log Out"})]})})]})]})}var W=n(3397),F=n(44970);function B(){return(0,j.jsx)(A.Navbar,{className:"rounded-none w-full px-4 py-3",children:(0,j.jsx)("div",{className:"flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900",children:(0,j.jsxs)("div",{className:"ml-auto flex gap-1 md:mr-4",children:[(0,j.jsx)(A.IconButton,{variant:"text",color:"blue-gray",children:(0,j.jsx)(W.Z,{className:"h-4 w-4"})}),(0,j.jsx)(A.IconButton,{variant:"text",color:"blue-gray",children:(0,j.jsx)(F.Z,{className:"h-4 w-4"})})]})})})}var L=function(){return(0,j.jsxs)("div",{className:"grid grid-cols-12  bg-white",children:[(0,j.jsx)("div",{className:"h-screen col-span-2 flex justify-center md:col-span-3",children:(0,j.jsx)(O,{})}),(0,j.jsx)("div",{className:"col-span-10 md:col-span-9",children:(0,j.jsxs)("div",{className:"grid",children:[(0,j.jsx)(B,{}),(0,j.jsx)("div",{className:"p-4 h-[36rem] bg-gray-300 overflow-auto",children:(0,j.jsx)(a.j3,{})})]})})]})},P=n(62430),R=(0,l.lazy)((function(){return Promise.all([n.e(830),n.e(53),n.e(800)]).then(n.bind(n,3800))})),_=(0,l.lazy)((function(){return n.e(644).then(n.bind(n,50644))})),D=l.lazy((function(){return Promise.all([n.e(830),n.e(692),n.e(323)]).then(n.bind(n,82323))})),q=(0,l.lazy)((function(){return n.e(317).then(n.bind(n,83317))})),C=(0,l.lazy)((function(){return Promise.all([n.e(820),n.e(202),n.e(3)]).then(n.bind(n,57003))})),J=(0,l.lazy)((function(){return n.e(544).then(n.bind(n,33544))})),H=(0,l.lazy)((function(){return n.e(806).then(n.bind(n,54806))})),K=(0,l.lazy)((function(){return n.e(344).then(n.bind(n,77344))})),G=function(){var e=(0,r.v9)((function(e){var s;return JSON.parse(null===(s=e.admin)||void 0===s?void 0:s.adminAuthToken)}));return(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(a.Z5,{children:[(0,j.jsx)(a.AW,{path:"/login",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(a.Fg,{to:"/admin"}):(0,j.jsx)(p,{})}),(0,j.jsxs)(a.AW,{path:"/",element:(0,j.jsx)(L,{}),children:[(0,j.jsx)(a.AW,{index:!0,element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(S,{}):(0,j.jsx)(a.Fg,{to:"/admin/login"})}),(0,j.jsx)(a.AW,{path:"users",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(H,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"})}),(0,j.jsx)(a.AW,{path:"applications",element:(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(K,{})})}),(0,j.jsx)(a.AW,{path:"user/:userId",element:(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(J,{})})}),(0,j.jsx)(a.AW,{path:"destination",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(C,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"})}),(0,j.jsxs)(a.AW,{path:"banners",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(q,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"}),children:[(0,j.jsx)(a.AW,{index:!0,element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(_,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"})}),(0,j.jsx)(a.AW,{path:":bannerId",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(D,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"})}),(0,j.jsx)(a.AW,{path:"add-banner",element:null!==e&&void 0!==e&&e.access?(0,j.jsx)(l.Suspense,{children:(0,j.jsx)(R,{})}):(0,j.jsx)(a.Fg,{to:"/admin/login"})})]}),(0,j.jsx)(a.AW,{path:"*",element:(0,j.jsx)(P.Z,{url:"/admin"})})]})]})})}}}]);
//# sourceMappingURL=674.2921b350.chunk.js.map