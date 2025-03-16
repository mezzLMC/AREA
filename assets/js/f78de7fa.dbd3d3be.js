"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2717],{4736:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>a});const r=JSON.parse('{"id":"technical/2get_started","title":"Get started","description":"This project is built using Docker to facilitate an efficient and consistent development environment. The project structure separates the back-end, web, and mobile servers, each contained within its own directory.","source":"@site/docs/technical/2get_started.md","sourceDirName":"technical","slug":"/technical/2get_started","permalink":"/AREA/docs/technical/2get_started","draft":false,"unlisted":false,"editUrl":"https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz/edit/main/docs/technical/2get_started.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Project Overview","permalink":"/AREA/docs/technical/1technical-docs"},"next":{"title":"External APIs","permalink":"/AREA/docs/technical/3api"}}');var s=n(4848),o=n(8453);const i={sidebar_position:2},c="Get started",l={},a=[{value:"Project Structure",id:"project-structure",level:2},{value:"Docker Compose",id:"docker-compose",level:2},{value:"Server Configuration",id:"server-configuration",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"get-started",children:"Get started"})}),"\n",(0,s.jsx)(t.p,{children:"This project is built using Docker to facilitate an efficient and consistent development environment. The project structure separates the back-end, web, and mobile servers, each contained within its own directory."}),"\n",(0,s.jsx)(t.h2,{id:"project-structure",children:"Project Structure"}),"\n",(0,s.jsx)(t.p,{children:"The project contains the following directories:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"/web/api/"}),": Contains the back-end server code. See the ",(0,s.jsx)(t.a,{href:"/docs/category/area-api-reference",children:"API Overview"})," for more information."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"/web/pages/"}),": Contains the front-end server code."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"/mobile/"}),": Contains the mobile application code."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"/worker/"}),": Contains the worker service code, responsible for handling background tasks and processing."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"/shared/"}),": Contains shared code that is used across different parts of the project."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["Each directory has its own ",(0,s.jsx)(t.code,{children:"Dockerfile"}),", and there is a central ",(0,s.jsx)(t.code,{children:"docker-compose.yml"})," file located at the root of the project."]}),"\n",(0,s.jsx)(t.h2,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"docker-compose.yml"})," file orchestrates the building and launching of the entire project. It does the following:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Calls the ",(0,s.jsx)(t.code,{children:"Dockerfile"})," in each respective directory (",(0,s.jsx)(t.code,{children:"/server/"}),", ",(0,s.jsx)(t.code,{children:"/front/"}),", and ",(0,s.jsx)(t.code,{children:"/mobile/"}),")."]}),"\n",(0,s.jsx)(t.li,{children:"Builds the entire project, ensuring all services are set up correctly."}),"\n",(0,s.jsx)(t.li,{children:"Starts the servers and binds PostrgreSQL, allowing the database to be utilized by the application."}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"server-configuration",children:"Server Configuration"}),"\n",(0,s.jsx)(t.p,{children:"After running the Docker containers, the servers can be accessed at the following addresses:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Front-end server"}),": ",(0,s.jsx)(t.a,{href:"http://localhost:8081",children:"http://localhost:8080"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Back-end server"}),": ",(0,s.jsx)(t.a,{href:"http://localhost:8080",children:"http://localhost:8080"})]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Mobile APK download"}),": ",(0,s.jsx)(t.a,{href:"http://localhost:8080/client.apk",children:"http://localhost:8080/client.apk"})]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsx)(t.p,{children:"Using Docker for this project streamlines the development process and ensures that all components of the application can run seamlessly across different environments. The structure allows for easy management and scalability as the project evolves."})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>c});var r=n(6540);const s={},o=r.createContext(s);function i(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);