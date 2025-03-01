import{u as x,a as u,b as g,j as e,B as n,c as h,G as i,d as s,n as r,T as y,e as f}from"./index-BlvmEKfA.js";import{E as v}from"./EventsList-CxVI84n0.js";import{u as j}from"./Event-C-oAqnht.js";const t=r(y)`
    color: #361c00;
    font-family: "IBM Plex Serif";
    position: relative;
    margin: 16px 0;
`;r.img`
    width: 50%;
    position: absolute;
    border-radius: 8px;
    opacity: 0;
    top: 0%;
    transition: opacity 1s ease;

    &.img-1 {
        animation-name: fade-in-img1;
        animation-delay: 1.5s;
        left: 40%;
        bottom: -300%;
    }

    &.img-2 {
        animation-name: fade-in-img2;
        bottom: -200%;
        animation-delay: 1s;
    }

    @keyframes fade-in-img1 {
        0% {
            top: -20%;
        }

        100% {
            top: 0%;
            opacity: 1;
        }
    }

    @keyframes fade-in-img2 {
        0% {
            top: -20%;
        }

        100% {
            top: 50%;
            opacity: 1;
        }
    }

    animation-duration: 1s;
    animation-fill-mode: forwards;
`;const B=function(){const l=x(),{isAuth:c}=u(),{openModal:d}=g();function o(a){l.navigate({to:a})}const{data:m,isLoading:p}=j({queryKey:["query-events"],queryFn:async()=>await f("/event?limit=4").then(a=>a.data)});return e.jsx(n,{sx:{backgroundImage:"url('/home_waves2.svg')",backgroundSize:"70%",backgroundPositionX:"100%",backgroundRepeat:"no-repeat",backgroundColor:"#F2A90040"},children:e.jsxs(h,{children:[e.jsx(n,{sx:{display:"flex",alignItems:"center",height:"100vh"},children:e.jsx(i,{container:!0,sx:{width:"100%"},spacing:"auto",children:e.jsxs(i,{size:7,children:[e.jsx(t,{variant:"h6",sx:{mb:2},children:"Your favorite events platform"}),e.jsx(t,{variant:"h2",fontWeight:600,children:"Discover and share events"}),e.jsx(t,{variant:"h4",children:"Explore, engage and join events that bring people together."}),e.jsxs(n,{sx:{display:"flex",columnGap:1},children:[e.jsx(s,{variant:"contained",size:"large",onClick:()=>o("/events"),children:"Explore now"}),e.jsx(s,{variant:"contained",color:"secondary",size:"large",onClick:()=>c?o("/createEvent"):d("You need to be logged in to create a event."),children:"Create your event"})]})]})})}),e.jsxs(n,{sx:{display:"flex",justifyContent:"center",flexDirection:"column",py:15},children:[e.jsx(t,{variant:"h3",sx:{paddingBottom:3,textAlign:"center"},children:"See what's happening now"}),!p&&e.jsx(v,{events:m})]})]})})};export{B as component};
